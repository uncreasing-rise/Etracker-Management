const QuizModel = require('../Models/Quiz');
const ClassModel = require('../Models/Class');

// Function to create a new quiz
const createQuiz = async (classId, quizData) => {
  if (!classId || !quizData) {
    throw new Error('Class ID and quiz data are required');
  }

  // Check if the class exists
  const classExists = await ClassModel.findById(classId);
  if (!classExists) {
    throw new Error('Class not found');
  }

  // Create the quiz
  const quiz = new QuizModel({
    ...quizData,
    classId, // Link quiz with the class
  });

  const savedQuiz = await quiz.save();

  // Update the class to include the new quiz
  await ClassModel.findByIdAndUpdate(classId, {
    $push: { quizzes: savedQuiz._id },
  });

  return savedQuiz;
};

// Function to get a quiz by ID
const getQuizById = async (quizId) => {
  if (!quizId) {
    throw new Error('Quiz ID is required');
  }

  return await QuizModel.findById(quizId);
};

// Function to update a quiz by ID
const updateQuiz = async (quizId, updateData) => {
  if (!quizId) {
    throw new Error('Quiz ID is required');
  }

  const updatedQuiz = await QuizModel.findByIdAndUpdate(quizId, updateData, {
    new: true,
  });

  if (!updatedQuiz) {
    throw new Error('Quiz not found');
  }

  return updatedQuiz;
};

// Function to delete a quiz by ID
const deleteQuiz = async (quizId) => {
  if (!quizId) {
    throw new Error('Quiz ID is required');
  }

  const deletedQuiz = await QuizModel.findByIdAndDelete(quizId);

  if (!deletedQuiz) {
    throw new Error('Quiz not found');
  }

  return deletedQuiz;
};

module.exports = {
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
};
