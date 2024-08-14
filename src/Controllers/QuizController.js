const { SuccessResponse, ErrorResponse } = require('../Interfaces/MessageResponse'); // Adjust path as necessary
const quizService = require('../Services/QuizService');

// Controller to get all quizzes for a specific class
const getAllQuizzesController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json(new ErrorResponse('Class ID is required'));
  }

  try {
    const quizzes = await quizService.getAllQuizzesService(classId);
    res.status(200).json(new SuccessResponse('Quizzes retrieved successfully', quizzes));
  } catch (error) {
    res.status(500).json(new ErrorResponse('Error retrieving quizzes', error.message));
  }
};

// Controller to get quiz by ID for a specific class
const getQuizByIdController = async (req, res) => {
  const { classId, quizId } = req.params;
  if (!classId || !quizId) {
    return res.status(400).json(new ErrorResponse('Class ID and Quiz ID are required'));
  }

  try {
    const quiz = await quizService.getQuizByIdService(classId, quizId);
    if (quiz) {
      res.status(200).json(new SuccessResponse('Quiz retrieved successfully', quiz));
    } else {
      res.status(404).json(new ErrorResponse('Quiz not found or not part of the specified class'));
    }
  } catch (error) {
    res.status(500).json(new ErrorResponse('Error retrieving quiz', error.message));
  }
};

// Controller to create a new quiz for a specific class
const createQuizController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json(new ErrorResponse('Class ID is required'));
  }

  try {
    const quizData = await quizService.createQuizService(classId, req.body);
    res.status(201).json(new SuccessResponse('Quiz created successfully', quizData));
  } catch (error) {
    res.status(400).json(new ErrorResponse('Error creating quiz', error.message));
  }
};

// Controller to update quiz by ID for a specific class
const updateQuizController = async (req, res) => {
  const { classId, quizId } = req.params;
  if (!classId || !quizId) {
    return res.status(400).json(new ErrorResponse('Class ID and Quiz ID are required'));
  }

  try {
    const updatedQuiz = await quizService.updateQuizService(classId, quizId, req.body);
    if (updatedQuiz) {
      res.status(200).json(new SuccessResponse('Quiz updated successfully', updatedQuiz));
    } else {
      res.status(404).json(new ErrorResponse('Quiz not found or not part of the specified class'));
    }
  } catch (error) {
    res.status(400).json(new ErrorResponse('Error updating quiz', error.message));
  }
};

// Controller to delete quiz by ID for a specific class
const deleteQuizController = async (req, res) => {
  const { classId, quizId } = req.params;
  if (!classId || !quizId) {
    return res.status(400).json(new ErrorResponse('Class ID and Quiz ID are required'));
  }

  try {
    const deletedQuiz = await quizService.deleteQuizService(classId, quizId);
    if (deletedQuiz) {
      res.status(200).json(new SuccessResponse('Quiz deleted successfully'));
    } else {
      res.status(404).json(new ErrorResponse('Quiz not found or not part of the specified class'));
    }
  } catch (error) {
    res.status(500).json(new ErrorResponse('Error deleting quiz', error.message));
  }
};

module.exports = {
  getAllQuizzesController,
  getQuizByIdController,
  createQuizController,
  updateQuizController,
  deleteQuizController,
};
