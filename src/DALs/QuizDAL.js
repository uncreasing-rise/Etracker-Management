const QuizModel = require('../Models/Quiz');
const ClassModel = require('../Models/Class');

// Function to create a new quiz
const createQuiz = async (classId, quizData) => {
  if (!classId || !quizData) {
    throw new Error('Class ID và dữ liệu quiz là bắt buộc');
  }

  try {
    // Kiểm tra sự tồn tại của lớp
    const classExists = await ClassModel.findById(classId);
    if (!classExists) {
      throw new Error('Lớp không tìm thấy');
    }

    // Tạo quiz
    const quiz = new QuizModel({
      ...quizData,
      classId, // Liên kết quiz với lớp
    });

    const savedQuiz = await quiz.save();

    // Cập nhật lớp để bao gồm quiz mới
    await ClassModel.findByIdAndUpdate(classId, {
      $push: { quizzes: savedQuiz._id },
    });

    return savedQuiz;
  } catch (error) {
    throw new Error(`Lỗi khi tạo quiz: ${error.message}`);
  }
};
// Function to get a quiz by ID
const getQuizById = async (quizId) => {
  if (!quizId) {
    throw new Error('Quiz ID is required');
  }

  try {
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return quiz;
  } catch (error) {
    throw new Error(`Error retrieving quiz: ${error.message}`);
  }
};

// Function to update a quiz by ID
const updateQuiz = async (quizId, updateData) => {
  if (!quizId) {
    throw new Error('Quiz ID is required');
  }

  try {
    const updatedQuiz = await QuizModel.findByIdAndUpdate(quizId, updateData, {
      new: true,
    });
    if (!updatedQuiz) {
      throw new Error('Quiz not found');
    }
    return updatedQuiz;
  } catch (error) {
    throw new Error(`Error updating quiz: ${error.message}`);
  }
};

// Function to delete a quiz by ID
const deleteQuiz = async (quizId) => {
  if (!quizId) {
    throw new Error('Quiz ID is required');
  }

  try {
    const deletedQuiz = await QuizModel.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      throw new Error('Quiz not found');
    }
    return deletedQuiz;
  } catch (error) {
    throw new Error(`Error deleting quiz: ${error.message}`);
  }
};

module.exports = {
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
};
