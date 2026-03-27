const axios = require('axios');

/**
 * Utility function to clean and parse JSON securely.
 * Automatically removes markdown blocks and trims whitespace.
 */
const safeParseJSON = (str) => {
  try {
    // 1. Remove markdown code blocks if any (e.g., ```json ... ```)
    let cleaned = str.replace(/```json/gi, '').replace(/```/g, '').trim();
    // 2. Try parsing
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON parsing error:", err.message);
    return {
      error: "Failed to parse AI response as valid JSON.",
      rawText: str
    };
  }
};

/**
 * Analyze resume text using the Groq API.
 * @param {string} resumeText - The text content of the resume
 * @returns {Object} Parse JSON result
 */
const analyzeResumeWithGroq = async (resumeText) => {
  const apiKey = process.env.GROQ_API_KEY;
  const apiUrl = process.env.GROQ_API_URL;
  const model = process.env.GROQ_MODEL;

  const systemPrompt = `You are an expert AI Resume and Career Coach. You analyze resumes and provide structured career guidance. Always respond with valid JSON only. No markdown. No text outside the JSON object.`;

  const userPrompt = `Analyze the following resume and return a JSON object with exactly these fields:
{
  "resumeScore": number between 0 and 100,
  "scoreReason": "string explaining the score in one sentence",
  "programmingLanguages": ["array of strings"],
  "toolsAndTechnologies": ["array of strings"],
  "softSkills": ["array of strings"],
  "missingSkills": ["array of strings that are commonly required but absent from resume"],
  "jobRoles": ["array of exactly 5 strings with the most suitable job role titles"],
  "strengths": ["array of strings highlighting strong points"],
  "weaknesses": ["array of strings identifying areas needing improvement"],
  "improvements": ["array of specific actionable suggestion strings with examples"],
  "roadmap": [{ "week": "Week 1", "tasks": ["task 1", "task 2"] }], // exact 12 objects
  "atsTips": ["array of specific ATS keyword and formatting suggestion strings"]
}
Resume text: ${resumeText}`;

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 4000
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiText = response.data.choices[0].message.content;
    const parsedData = safeParseJSON(aiText);

    if (parsedData.error) {
      throw new Error(parsedData.error);
    }

    return parsedData;

  } catch (error) {
    console.error('Groq API Error:', error.response?.data || error.message);
    throw new Error(JSON.stringify(error.response?.data || error.message));
  }
};

module.exports = {
  analyzeResumeWithGroq
};
