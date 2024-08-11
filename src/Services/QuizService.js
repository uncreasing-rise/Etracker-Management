const quizDAL = require('../DAL/QuizDAL');

const getAllQuizzesService = async () => {
  return quizDAL.getAllQuizzes();
};

const getQuizByIdService = async (quizId) => {
  return quizDAL.getQuizById(quizId);
};

const createQuizService = async (data) => {
  return quizDAL.createQuiz(data);
};

const updateQuizService = async (quizId, data) => {
  return quizDAL.updateQuiz(quizId, data);
};

const deleteQuizService = async (quizId) => {
  return quizDAL.deleteQuiz(quizId);
};

module.exports = {
  getAllQuizzesService,
  getQuizByIdService,
  createQuizService,
  updateQuizService,
  deleteQuizService,
};
