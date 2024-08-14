const express = require('express');
const router = express.Router();
const {
  getAllQuizzesController,
  getQuizByIdController,
  createQuizController,
  updateQuizController,
  deleteQuizController,
} = require('../Controllers/QuizController');

router.get('/class/:classId/quiz', getAllQuizzesController);

router.get('/class/:classId/quiz/:quizId', getQuizByIdController);

router.post('/class/:classId/quiz', createQuizController);

router.put('/class/:classId/quiz/:quizId', updateQuizController);

router.delete('/class/:classId/quiz/:quizId', deleteQuizController);

module.exports = router;
