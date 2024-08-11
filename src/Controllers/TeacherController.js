const {
  getAllTeachersService,
  getTeacherByIdService,
  createTeacherService,
  updateTeacherService,
  deleteTeacherService,
} = require('../Services/TeacherService');

/**
 * Get all teachers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllTeachersController = async (req, res) => {
  try {
    const teachers = await getAllTeachersService();
    res.json(teachers);
  } catch (error) {
    console.error('Error getting all teachers:', error);
    res
      .status(500)
      .json({ message: error.message || 'An unknown error occurred' });
  }
};

/**
 * Get teacher by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTeacherByIdController = async (req, res) => {
  const { userId } = req.params;
  try {
    const teacher = await getTeacherByIdService(userId);
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    console.error('Error getting teacher by ID:', error);
    res
      .status(500)
      .json({ message: error.message || 'An unknown error occurred' });
  }
};

/**
 * Create a new teacher
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createTeacherController = async (req, res) => {
  try {
    const teacher = await createTeacherService(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    console.error('Error creating teacher:', error);
    res
      .status(400)
      .json({ message: error.message || 'An unknown error occurred' });
  }
};

/**
 * Update teacher information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateTeacherController = async (req, res) => {
  const { userId } = req.params;
  try {
    const teacher = await updateTeacherService(userId, req.body);
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    console.error('Error updating teacher:', error);
    res
      .status(400)
      .json({ message: error.message || 'An unknown error occurred' });
  }
};

/**
 * Delete teacher by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteTeacherController = async (req, res) => {
  const { userId } = req.params;
  try {
    const teacher = await deleteTeacherService(userId);
    if (teacher) {
      res.json({ message: 'Teacher deleted successfully' });
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res
      .status(500)
      .json({ message: error.message || 'An unknown error occurred' });
  }
};

module.exports = {
  getAllTeachersController,
  getTeacherByIdController,
  createTeacherController,
  updateTeacherController,
  deleteTeacherController,
};
