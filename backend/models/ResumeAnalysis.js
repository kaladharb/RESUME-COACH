const mongoose = require('mongoose');

// Define ResumeAnalysis schema
const resumeAnalysisSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'guest',
  },
  resumeText: {
    type: String,
    required: true,
  },
  inputMethod: {
    type: String,
    enum: ['pdf', 'text'],
    required: true,
  },
  resumeScore: {
    type: Number,
    required: true,
  },
  scoreReason: {
    type: String,
    default: "",
  },
  programmingLanguages: {
    type: [String],
    default: [],
  },
  toolsAndTechnologies: {
    type: [String],
    default: [],
  },
  softSkills: {
    type: [String],
    default: [],
  },
  missingSkills: {
    type: [String],
    default: [],
  },
  jobRoles: {
    type: [String],
    default: [],
  },
  strengths: {
    type: [String],
    default: [],
  },
  weaknesses: {
    type: [String],
    default: [],
  },
  improvements: {
    type: [String],
    default: [],
  },
  roadmap: [
    {
      week: String,
      tasks: [String],
    },
  ],
  atsTips: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to keep only the last 10 records per userId
resumeAnalysisSchema.post('save', async function (doc, next) {
  try {
    const userId = doc.userId;
    const count = await mongoose.model('ResumeAnalysis').countDocuments({ userId });
    
    // Automatically delete oldest record if user has more than 10
    if (count > 10) {
      // Find the oldest documents that exceed the limit of 10
      const oldestDocs = await mongoose.model('ResumeAnalysis')
        .find({ userId })
        .sort({ createdAt: 1 })
        .limit(count - 10);
        
      // Extract IDs to delete
      const idsToDelete = oldestDocs.map(d => d._id);
      
      // Delete older documents
      await mongoose.model('ResumeAnalysis').deleteMany({ _id: { $in: idsToDelete } });
    }
    next();
  } catch (err) {
    next(err);
  }
});

const ResumeAnalysis = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);

module.exports = ResumeAnalysis;
