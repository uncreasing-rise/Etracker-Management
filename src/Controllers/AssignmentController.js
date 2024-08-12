const assignmentService = require('../Services/AssignmentService');

// Controller to get all assignments for a specific class
const getAllAssignmentsController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json({ message: 'Class ID is required' });
  }

  try {
    const assignments =
      await assignmentService.getAllAssignmentsService(classId);
    res.status(200).json(assignments); // 200 OK
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving assignments', error: error.message });
  }
};

// Controller to get assignment by ID for a specific class
const getAssignmentByIdController = async (req, res) => {
  const { classId, assignmentId } = req.params;
  if (!classId || !assignmentId) {
    return res
      .status(400)
      .json({ message: 'Class ID and Assignment ID are required' });
  }

  try {
    const assignment = await assignmentService.getAssignmentByIdService(
      classId,
      assignmentId
    );
    if (assignment) {
      res.status(200).json(assignment); // 200 OK
    } else {
      res.status(404).json({
        message: 'Assignment not found or not part of the specified class',
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving assignment', error: error.message });
  }
};

// Controller to create a new assignment for a specific class
const createAssignmentController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json({ message: 'Class ID is required' });
  }

  try {
    const assignmentData = await assignmentService.createAssignmentService(
      classId,
      req.body
    );
    res.status(201).json(assignmentData); // 201 Created
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating assignment', error: error.message });
  }
};

// Controller to update assignment by ID for a specific class
const updateAssignmentController = async (req, res) => {
  const { classId, assignmentId } = req.params;
  if (!classId || !assignmentId) {
    return res
      .status(400)
      .json({ message: 'Class ID and Assignment ID are required' });
  }

  try {
    const updatedAssignment = await assignmentService.updateAssignmentService(
      classId,
      assignmentId,
      req.body
    );
    if (updatedAssignment) {
      res.status(200).json(updatedAssignment); // 200 OK
    } else {
      res.status(404).json({
        message: 'Assignment not found or not part of the specified class',
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating assignment', error: error.message });
  }
};

// Controller to delete assignment by ID for a specific class
const deleteAssignmentController = async (req, res) => {
  const { classId, assignmentId } = req.params;
  if (!classId || !assignmentId) {
    return res
      .status(400)
      .json({ message: 'Class ID and Assignment ID are required' });
  }

  try {
    const deletedAssignment = await assignmentService.deleteAssignmentService(
      classId,
      assignmentId
    );
    if (deletedAssignment) {
      res.status(200).json({ message: 'Assignment deleted successfully' }); // 200 OK
    } else {
      res.status(404).json({
        message: 'Assignment not found or not part of the specified class',
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting assignment', error: error.message });
  }
};

module.exports = {
  getAllAssignmentsController,
  getAssignmentByIdController,
  createAssignmentController,
  updateAssignmentController,
  deleteAssignmentController,
};
