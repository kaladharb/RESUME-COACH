const axios = require('axios');
const FormData = require('form-data');

const sampleResume = `John Doe | johndoe@email.com | LinkedIn: linkedin.com/in/johndoe
Summary: Final year B.Tech Computer Science student with strong interest in software development and machine learning.
Skills: Python, JavaScript, React, Node.js, SQL, Git, TensorFlow basics
Projects:
1. Student Result Management System using Python and MySQL
2. Weather App using React and OpenWeather API
Education: B.Tech Computer Science, XYZ University, 2024, CGPA 7.8
Certifications: Python for Everybody - Coursera, Web Development Bootcamp - Udemy`;

async function runTests() {
  let recordId;
  
  try {
    console.log("--- TEST 2: Analyze Resume ---");
    const formData = new FormData();
    formData.append('resumeText', sampleResume);
    
    // Explicitly add boundaries
    const response = await axios.post('http://localhost:5000/api/resume/analyze', formData, {
      headers: formData.getHeaders()
    });
    
    const data = response.data;
    console.log("Fields present:", Object.keys(data).join(', '));
    if (data._id && data.resumeScore !== undefined && data.roadmap?.length === 12) {
      console.log("✅ TEST 2 PASSED: Received valid structured JSON");
      recordId = data._id;
    } else {
      console.log("❌ TEST 2 FAILED: Response was missing valid roadmap or fields", JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.log("❌ TEST 2 FAILED with API call error:");
    console.log(e.response?.data || e.message);
  }

  if (!recordId) return console.log("Aborting further api tests since test 2 failed.");

  try {
    console.log("\n--- TEST 3: Fetch History ---");
    const res = await axios.get('http://localhost:5000/api/history/guest');
    if (Array.isArray(res.data) && res.data.some(r => r._id === recordId)) {
      console.log("✅ TEST 3 PASSED: History contains record");
    } else {
      console.log("❌ TEST 3 FAILED", res.data);
    }
  } catch (e) {
    console.log("❌ TEST 3 FAILED:", e.message);
  }

  try {
    console.log("\n--- TEST 4: Fetch History Detail ---");
    const res = await axios.get(`http://localhost:5000/api/history/detail/${recordId}`);
    if (res.data._id === recordId && res.data.resumeText) {
      console.log("✅ TEST 4 PASSED: Detail fetched successfully");
    } else {
      console.log("❌ TEST 4 FAILED", res.data);
    }
  } catch (e) {
    console.log("❌ TEST 4 FAILED:", e.message);
  }

  try {
    console.log("\n--- TEST 5: Delete History ---");
    const res = await axios.delete(`http://localhost:5000/api/history/${recordId}`);
    if (res.data.message) {
      console.log("✅ TEST 5 PASSED: Record deleted successfully");
    } else {
      console.log("❌ TEST 5 FAILED", res.data);
    }
  } catch (e) {
    console.log("❌ TEST 5 FAILED:", e.message);
  }
}

runTests();
