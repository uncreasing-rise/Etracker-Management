const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse'); // Adjust path as necessary
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
    res
      .status(200)
      .json(new SuccessResponse('Teachers retrieved successfully', teachers));
  } catch (error) {
    console.error('Error getting all teachers:', error);
    res
      .status(500)
      .json(new ErrorResponse('Error retrieving teachers', error.message));
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
      res
        .status(200)
        .json(new SuccessResponse('Teacher retrieved successfully', teacher));
    } else {
      res.status(404).json(new ErrorResponse('Teacher not found'));
    }
  } catch (error) {
    console.error('Error getting teacher by ID:', error);
    res
      .status(500)
      .json(new ErrorResponse('Error retrieving teacher', error.message));
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
    res
      .status(201)
      .json(new SuccessResponse('Teacher created successfully', teacher));
  } catch (error) {
    console.error('Error creating teacher:', error);
    res
      .status(400)
      .json(new ErrorResponse('Error creating teacher', error.message));
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
      res
        .status(200)
        .json(new SuccessResponse('Teacher updated successfully', teacher));
    } else {
      res.status(404).json(new ErrorResponse('Teacher not found'));
    }
  } catch (error) {
    console.error('Error updating teacher:', error);
    res
      .status(400)
      .json(new ErrorResponse('Error updating teacher', error.message));
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
    const result = await deleteTeacherService(userId);
    if (result) {
      res.status(200).json(new SuccessResponse('Teacher deleted successfully'));
    } else {
      res.status(404).json(new ErrorResponse('Teacher not found'));
    }
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res
      .status(500)
      .json(new ErrorResponse('Error deleting teacher', error.message));
  }
};

module.exports = {
  getAllTeachersController,
  getTeacherByIdController,
  createTeacherController,
  updateTeacherController,
  deleteTeacherController,
};
