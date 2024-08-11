const quizService = require('../Services/QuizService');

const getAllQuizzesController = async (req, res) => {
  try {
    const quizzes = await quizService.getAllQuizzesService();
    res.json(quizzes);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving quizzes', error: error.message });
  }
};

const getQuizByIdController = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await quizService.getQuizByIdService(quizId);
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving quiz', error: error.message });
  }
};

const createQuizController = async (req, res) => {
  try {
    const quiz = await quizService.createQuizService(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating quiz', error: error.message });
  }
};

const updateQuizController = async (req, res) => {
  const { quizId } = req.params;
  try {
    const updatedQuiz = await quizService.updateQuizService(quizId, req.body);
    if (updatedQuiz) {
      res.json(updatedQuiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating quiz', error: error.message });
  }
};

const deleteQuizController = async (req, res) => {
  const { quizId } = req.params;
  try {
    const deletedQuiz = await quizService.deleteQuizService(quizId);
    if (deletedQuiz) {
      res.json({ message: 'Quiz deleted successfully' });
    } else {
      res.status(404).json({ message: 'Quiz not found' });
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
