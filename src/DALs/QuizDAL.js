const QuizModel = require('../Models/Quizzes');

const getAllQuizzes = async () => {
  return QuizModel.find();
};

const getQuizById = async (quizId) => {
  return QuizModel.findById(quizId);
};

const createQuiz = async (data) => {
  const newQuiz = new QuizModel(data);
  return newQuiz.save();
};

const updateQuiz = async (quizId, data) => {
  return QuizModel.findByIdAndUpdate(quizId, data, { new: true });
};

const deleteQuiz = async (quizId) => {
  return QuizModel.findByIdAndDelete(quizId);
};

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
