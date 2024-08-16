const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse');
const {
  getAllTeachersService,
  getTeacherByIdService,
  createTeacherService,
  updateTeacherService,
  deleteTeacherService,
} = require('../Services/TeacherService');
const {
  ERROR_TEACHER_NOT_FOUND,
  ERROR_TEACHER_CREATION,
  ERROR_TEACHER_UPDATE,
  ERROR_TEACHER_DELETION,
  ERROR_TEACHER_RETRIEVAL,
} = require('../Constants/ResponseMessages');

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
    console.error(`Error getting all teachers: ${error.message}`);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_TEACHER_RETRIEVAL, error.message));
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
      res.status(404).json(new ErrorResponse(ERROR_TEACHER_NOT_FOUND));
    }
  } catch (error) {
    console.error(`Error getting teacher by ID: ${error.message}`);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_TEACHER_RETRIEVAL, error.message));
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
    console.error(`Error creating teacher: ${error.message}`);
    res
      .status(400)
      .json(new ErrorResponse(ERROR_TEACHER_CREATION, error.message));
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
      res.status(404).json(new ErrorResponse(ERROR_TEACHER_NOT_FOUND));
    }
  } catch (error) {
    console.error(`Error updating teacher: ${error.message}`);
    res
      .status(400)
      .json(new ErrorResponse(ERROR_TEACHER_UPDATE, error.message));
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
      res.status(404).json(new ErrorResponse(ERROR_TEACHER_NOT_FOUND));
    }
  } catch (error) {
    console.error(`Error deleting teacher: ${error.message}`);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_TEACHER_DELETION, error.message));
  }
};

module.exports = {
  getAllTeachersController,
  getTeacherByIdController,
  createTeacherController,
  updateTeacherController,
  deleteTeacherController,
};
