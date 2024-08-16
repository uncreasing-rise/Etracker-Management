const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse'); // Adjust path as necessary
const classService = require('../Services/ClassService');
const {
  SUCCESS_CREATE_UPDATE,
  ERROR_MISSING_FIELDS,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../Constants/ResponseMessages');

// Get all classes
const getAllClassesController = async (req, res) => {
  try {
    const classes = await classService.getAllClassesService();
    res
      .status(200)
      .json(new SuccessResponse('Classes retrieved successfully', classes));
  } catch (error) {
    console.error('Error retrieving classes:', error);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_INTERNAL_SERVER, error.message));
  }
};

// Get class by ID
const getClassByIdController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
  }

  try {
    const classData = await classService.getClassByIdService(classId);
    if (classData) {
      res
        .status(200)
        .json(new SuccessResponse('Class retrieved successfully', classData));
    } else {
      res.status(404).json(new ErrorResponse(ERROR_NOT_FOUND));
    }
  } catch (error) {
    console.error('Error retrieving class:', error);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_INTERNAL_SERVER, error.message));
  }
};

// Create a new class
const createClassController = async (req, res) => {
  try {
    const classData = await classService.createClassService(req.body);
    res
      .status(201)
      .json(new SuccessResponse('Class created successfully', classData));
  } catch (error) {
    console.error('Error creating class:', error);
    res
      .status(400)
      .json(new ErrorResponse('Error creating class', error.message));
  }
};

// Update class information
const updateClassController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
  }

  try {
    const updatedClass = await classService.updateClassService(
      classId,
      req.body
    );
    if (updatedClass) {
      res
        .status(200)
        .json(new SuccessResponse('Class updated successfully', updatedClass));
    } else {
      res.status(404).json(new ErrorResponse(ERROR_NOT_FOUND));
    }
  } catch (error) {
    console.error('Error updating class:', error);
    res
      .status(400)
      .json(new ErrorResponse('Error updating class', error.message));
  }
};

// Delete class by ID
const deleteClassController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
  }

  try {
    const deletedClass = await classService.deleteClassService(classId);
    if (deletedClass) {
      res.status(200).json(new SuccessResponse('Class deleted successfully'));
    } else {
      res.status(404).json(new ErrorResponse(ERROR_NOT_FOUND));
    }
  } catch (error) {
    console.error('Error deleting class:', error);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_INTERNAL_SERVER, error.message));
  }
};

// Add students to a class
const addStudentsToClass = async (req, res) => {
  const { studentIds } = req.body;
  const { classId } = req.params;

  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
  }

  try {
    const updatedClass = await classService.addStudentsToClass(
      classId,
      studentIds
    );
    res
      .status(200)
      .json(
        new SuccessResponse(
          'Students added to class successfully',
          updatedClass
        )
      );
  } catch (error) {
    console.error('Error adding students to class:', error);
    res
      .status(400)
      .json(new ErrorResponse('Error adding students to class', error.message));
  }
};

module.exports = {
  getAllClassesController,
  getClassByIdController,
  createClassController,
  updateClassController,
  deleteClassController,
  addStudentsToClass,
};
