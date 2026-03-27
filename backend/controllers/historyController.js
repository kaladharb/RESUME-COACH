const ResumeAnalysis = require('../models/ResumeAnalysis');

/**
 * @desc    Get last 10 history records for a specific userId
 * @route   GET /api/history/:userId
 * @access  Public
 */
const getHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Sort newest first, select only specific fields
    const history = await ResumeAnalysis.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('_id resumeScore jobRoles inputMethod createdAt');

    res.status(200).json(history);
  } catch (error) {
    console.error('Get History Error:', error);
    res.status(500).json({ message: 'Server error fetching history' });
  }
};

/**
 * @desc    Get complete detail of a single history record
 * @route   GET /api/history/detail/:id
 * @access  Public
 */
const getHistoryDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await ResumeAnalysis.findById(id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error('Get History Detail Error:', error);
    res.status(500).json({ message: 'Server error fetching record details' });
  }
};

/**
 * @desc    Delete a specific history record by ID
 * @route   DELETE /api/history/:id
 * @access  Public
 */
const deleteHistoryRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ResumeAnalysis.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Delete History Error:', error);
    res.status(500).json({ message: 'Server error deleting record' });
  }
};

module.exports = {
  getHistory,
  getHistoryDetail,
  deleteHistoryRecord,
};
