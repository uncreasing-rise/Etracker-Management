const assignmentService = require('../Services/AssignmentService');
const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse'); // Adjust path as necessary
const {
  SUCCESS_CREATE,
  SUCCESS_UPDATE,
  ERROR_MISSING_FIELDS,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
  SUCCESS_DELETE,
} = require('../Constants/ResponseMessages');

// Controller to get all assignments for a specific class
const getAllAssignmentsController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
  }

  try {
    const assignments =
      await assignmentService.getAllAssignmentsService(classId);
    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error retrieving assignments:', error);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_INTERNAL_SERVER, error.message));
  }
};

// Controller to get assignment by ID for a specific class
const getAssignmentByIdController = async (req, res) => {
  const { classId, assignmentId } = req.params;
  if (!classId || !assignmentId) {
    return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
  }

  try {
    const assignment = await assignmentService.getAssignmentByIdService(
      classId,
      assignmentId
    );
    if (assignment) {
      res.status(200).json(assignment);
    } else {
      res.status(404).json(new ErrorResponse(ERROR_NOT_FOUND));
    }
  } catch (error) {
    console.error('Error retrieving assignment:', error);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_INTERNAL_SERVER, error.message));
  }
};

// Controller to create a new assignment for a specific class
const createAssignmentController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
  }

  try {
    const assignmentData = await assignmentService.createAssignmentService(
      classId,
      req.body
    );
    res.status(201).json(new SuccessResponse(SUCCESS_CREATE));
  } catch (error) {
    console.error('Error creating assignment:', error);
    res
      .status(400)
      .json(new ErrorResponse('Error creating assignment', error.message));
  }
};

// Controller to update assignment by ID for a specific class
const updateAssignmentController = async (req, res) => {
  const { classId, assignmentId } = req.params;
  if (!classId || !assignmentId) {
    return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
  }

  try {
    const updatedAssignment = await assignmentService.updateAssignmentService(
      classId,
      assignmentId,
      req.body
    );
    if (updatedAssignment) {
      res.status(200).json(new SuccessResponse(SUCCESS_UPDATE));
    } else {
      res.status(404).json(new ErrorResponse(ERROR_NOT_FOUND));
    }
  } catch (error) {
    console.error('Error updating assignment:', error);
    res
      .status(400)
      .json(new ErrorResponse('Error updating assignment', error.message));
  }
};

// Controller to delete assignment by ID for a specific class
const deleteAssignmentController = async (req, res) => {
  const { classId, assignmentId } = req.params;
  if (!classId || !assignmentId) {
    return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
  }

  try {
    const deletedAssignment = await assignmentService.deleteAssignmentService(
      classId,
      assignmentId
    );
    if (deletedAssignment) {
      res.status(200).json(new SuccessResponse(SUCCESS_DELETE));
    } else {
      res.status(404).json(new ErrorResponse(ERROR_NOT_FOUND));
    }
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_INTERNAL_SERVER, error.message));
  }
};

module.exports = {
  getAllAssignmentsController,
  getAssignmentByIdController,
  createAssignmentController,
  updateAssignmentController,
  deleteAssignmentController,
};
