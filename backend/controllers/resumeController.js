const { extractTextFromPDF } = require('../utils/pdfParser');
const { analyzeResumeWithGroq } = require('../services/groqService');
const ResumeAnalysis = require('../models/ResumeAnalysis');

/**
 * @desc    Analyze a resume (file or text) and return JSON
 * @route   POST /api/resume/analyze
 * @access  Public
 */
const analyzeResume = async (req, res) => {
  try {
    let resumeText = '';
    let inputMethod = 'text';

    // 1. Check if request has file or body.resumeText
    if (req.file) {
      // 2. If file uploaded and mimetype is application/pdf, extract text
      if (req.file.mimetype === 'application/pdf') {
        inputMethod = 'pdf';
        resumeText = await extractTextFromPDF(req.file.buffer);
      } else if (req.file.mimetype === 'text/plain') {
        inputMethod = 'text';
        resumeText = req.file.buffer.toString('utf-8');
      }
    } else if (req.body.resumeText) {
      // 3. If file is text or body.resumeText exists
      resumeText = req.body.resumeText;
      inputMethod = 'text';
    }

    // 4. Validate that resumeText is not empty, return 400 if empty
    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ message: 'No resume text provided. Please upload a structured text or PDF.' });
    }

    // 5. Call analyzeResumeWithGroq(resumeText)
    const analysisResult = await analyzeResumeWithGroq(resumeText);

    // 6. Save full result to MongoDB
    const newAnalysis = new ResumeAnalysis({
      userId: 'guest',
      inputMethod,
      resumeText,
      // Mapping directly from the Groq result
      resumeScore: analysisResult.resumeScore || 0,
      scoreReason: analysisResult.scoreReason || '',
      programmingLanguages: analysisResult.programmingLanguages || [],
      toolsAndTechnologies: analysisResult.toolsAndTechnologies || [],
      softSkills: analysisResult.softSkills || [],
      missingSkills: analysisResult.missingSkills || [],
      jobRoles: analysisResult.jobRoles || [],
      strengths: analysisResult.strengths || [],
      weaknesses: analysisResult.weaknesses || [],
      improvements: analysisResult.improvements || [],
      roadmap: analysisResult.roadmap || [],
      atsTips: analysisResult.atsTips || [],
    });

    const savedRecord = await newAnalysis.save();

    // 7. Return the analysis JSON plus the MongoDB record _id
    return res.status(200).json({
      _id: savedRecord._id,
      ...analysisResult
    });

  } catch (error) {
    console.error('Analyze Resume Error:', error);
    res.status(500).json({ message: error.message || 'Server error during analysis' });
  }
};

module.exports = {
  analyzeResume,
};
