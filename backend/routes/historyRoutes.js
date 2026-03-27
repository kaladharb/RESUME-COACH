const express = require('express');
const router = express.Router();
const { getHistory, getHistoryDetail, deleteHistoryRecord } = require('../controllers/historyController');

// GET /api/history/:userId
router.get('/:userId', getHistory);

// GET /api/history/detail/:id
router.get('/detail/:id', getHistoryDetail);

// DELETE /api/history/:id
router.delete('/:id', deleteHistoryRecord);

module.exports = router;
