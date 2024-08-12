const quizService = require('../Services/QuizService');

// Controller to get all quizzes for a specific class
const getAllQuizzesController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json({ message: 'Class ID is required' });
  }

  try {
    const quizzes = await quizService.getAllQuizzesService(classId);
    res.status(200).json(quizzes); // 200 OK
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving quizzes', error: error.message });
  }
};

// Controller to get quiz by ID for a specific class
const getQuizByIdController = async (req, res) => {
  const { classId, quizId } = req.params;
  if (!classId || !quizId) {
    return res
      .status(400)
      .json({ message: 'Class ID and Quiz ID are required' });
  }

  try {
    const quiz = await quizService.getQuizByIdService(classId, quizId);
    if (quiz) {
      res.status(200).json(quiz); // 200 OK
    } else {
      res
        .status(404)
        .json({ message: 'Quiz not found or not part of the specified class' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving quiz', error: error.message });
  }
};

// Controller to create a new quiz for a specific class
const createQuizController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json({ message: 'Class ID is required' });
  }

  try {
    const quizData = await quizService.createQuizService(classId, req.body);
    res.status(201).json(quizData); // 201 Created
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating quiz', error: error.message });
  }
};

// Controller to update quiz by ID for a specific class
const updateQuizController = async (req, res) => {
  const { classId, quizId } = req.params;
  if (!classId || !quizId) {
    return res
      .status(400)
      .json({ message: 'Class ID and Quiz ID are required' });
  }

  try {
    const updatedQuiz = await quizService.updateQuizService(
      classId,
      quizId,
      req.body
    );
    if (updatedQuiz) {
      res.status(200).json(updatedQuiz); // 200 OK
    } else {
      res
        .status(404)
        .json({ message: 'Quiz not found or not part of the specified class' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating quiz', error: error.message });
  }
};

// Controller to delete quiz by ID for a specific class
const deleteQuizController = async (req, res) => {
  const { classId, quizId } = req.params;
  if (!classId || !quizId) {
    return res
      .status(400)
      .json({ message: 'Class ID and Quiz ID are required' });
  }

  try {
    const deletedQuiz = await quizService.deleteQuizService(classId, quizId);
    if (deletedQuiz) {
      res.status(200).json({ message: 'Quiz deleted successfully' }); // 200 OK
    } else {
      res
        .status(404)
        .json({ message: 'Quiz not found or not part of the specified class' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting quiz', error: error.message });
  }
};

module.exports = {
  getAllQuizzesController,
  getQuizByIdController,
  createQuizController,
  updateQuizController,
  deleteQuizController,
};
