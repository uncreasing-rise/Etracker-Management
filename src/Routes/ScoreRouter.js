const express = require('express');
const router = express.Router();
const scoreController = require('../Controllers/ScoreController');
const { authenticateToken } = require('../Middlewares/Authentication');
const { authorization } = require('../Middlewares/Authorization');
// Create a new score
router.post(
  '/scores',
  authenticateToken,
  authorization(['admin']),
  scoreController.createScore
);

// Get all scores for a student in a class
router.get(
  '/class/:classId/student/:studentId/scores',
  authenticateToken,
  authorization(['admin']),
  scoreController.getScoresByStudentAndClass
);

// Update a score
router.put(
  '/scores/:scoreId',
  authenticateToken,
  authorization(['admin']),
  scoreController.updateScore
);

// Delete a score
router.delete(
  '/scores/:scoreId',
  authenticateToken,
  authorization(['admin']),
  scoreController.deleteScore
);

router.get(
  '/class/:classId/scores',
  authenticateToken,
  authorization(['admin']),
  scoreController.getAllScoresInClass
);

router.get('/class/:classId/report', scoreController.downloadScoresReport);

module.exports = router;
