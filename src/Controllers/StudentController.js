const {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
} = require('../Services/StudentService');

/**
 * Get all students
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllStudentsController = async (req, res) => {
  try {
    const students = await getAllStudentsService();
    res.json(students);
  } catch (error) {
    console.error('Error getting all students:', error);
    res
      .status(500)
      .json({ message: error.message || 'An unknown error occurred' });
  }
};

/**
 * Get student by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getStudentByIdController = async (req, res) => {
  const { userId } = req.params;
  try {
    const student = await getStudentByIdService(userId);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error getting student by ID:', error);
    res
      .status(500)
      .json({ message: error.message || 'An unknown error occurred' });
  }
};

/**
 * Create a new student
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createStudentController = async (req, res) => {
  try {
    const student = await createStudentService(req.body);
    res.status(201).json(student);
  } catch (error) {
    console.error('Error creating student:', error);
    res
      .status(400)
      .json({ message: error.message || 'An unknown error occurred' });
  }
};

/**
 * Update student information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateStudentController = async (req, res) => {
  const { userId } = req.params;
  try {
    const student = await updateStudentService(userId, req.body);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error updating student:', error);
    res
      .status(400)
      .json({ message: error.message || 'An unknown error occurred' });
  }
};

/**
 * Delete student by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteStudentController = async (req, res) => {
  const { userId } = req.params;
  try {
    const student = await deleteStudentService(userId);
    if (student) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    res
      .status(500)
      .json({ message: error.message || 'An unknown error occurred' });
  }
};

module.exports = {
  getAllStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
};
