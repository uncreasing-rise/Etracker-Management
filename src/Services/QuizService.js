const quizDAL = require('../DALs/QuizDAL');

const getAllQuizzesService = async (classId) => {
  if (!classId) {
    throw new Error('Class ID is required');
  }

  try {
    return await quizDAL.getAllQuizzes(classId);
  } catch (error) {
    throw new Error(`Error in getAllQuizzesService: ${error.message}`);
  }
};

const getQuizByIdService = async (classId, quizId) => {
  if (!classId || !quizId) {
    throw new Error('Class ID and Quiz ID are required');
  }

  try {
    return await quizDAL.getQuizById(classId, quizId);
  } catch (error) {
    throw new Error(`Error in getQuizByIdService: ${error.message}`);
  }
};

const createQuizService = async (classId, data) => {
  if (!classId || !data || typeof data !== 'object') {
    throw new Error('Class ID and valid data are required');
  }

  try {
    return await quizDAL.createQuiz(classId, data);
  } catch (error) {
    throw new Error(`Error in createQuizService: ${error.message}`);
  }
};

const updateQuizService = async (classId, quizId, data) => {
  if (!classId || !quizId || !data || typeof data !== 'object') {
    throw new Error('Class ID, Quiz ID, and valid data are required');
  }

  try {
    return await quizDAL.updateQuiz(classId, quizId, data);
  } catch (error) {
    throw new Error(`Error in updateQuizService: ${error.message}`);
  }
};

const deleteQuizService = async (classId, quizId) => {
  if (!classId || !quizId) {
    throw new Error('Class ID and Quiz ID are required');
  }

  try {
    return await quizDAL.deleteQuiz(classId, quizId);
  } catch (error) {
    throw new Error(`Error in deleteQuizService: ${error.message}`);
  }
};

module.exports = {
  getAllQuizzesService,
  getQuizByIdService,
  createQuizService,
  updateQuizService,
  deleteQuizService,
};
