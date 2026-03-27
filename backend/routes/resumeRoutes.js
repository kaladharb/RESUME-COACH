const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { analyzeResume } = require('../controllers/resumeController');

// POST /api/resume/analyze
// Accept multipart form data with single file field "resume"
router.post('/analyze', upload.single('resume'), analyzeResume);

module.exports = router;
