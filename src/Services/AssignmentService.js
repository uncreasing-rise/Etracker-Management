const assignmentDAL = require('../DALs/AssignmentDAL');

const getAllAssignmentsService = async (classId) => {
  if (!classId) {
    throw new Error('Class ID is required');
  }

  try {
    return await assignmentDAL.getAllAssignments(classId);
  } catch (error) {
    throw new Error(`Error in getAllAssignmentsService: ${error.message}`);
  }
};

const getAssignmentByIdService = async (classId, assignmentId) => {
  if (!classId || !assignmentId) {
    throw new Error('Class ID and Assignment ID are required');
  }

  try {
    return await assignmentDAL.getAssignmentById(classId, assignmentId);
  } catch (error) {
    throw new Error(`Error in getAssignmentByIdService: ${error.message}`);
  }
};

const createAssignmentService = async (classId, data) => {
  if (!classId || !data || typeof data !== 'object') {
    throw new Error('Class ID and valid data are required');
  }

  try {
    return await assignmentDAL.createAssignment(classId, data);
  } catch (error) {
    throw new Error(`Error in createAssignmentService: ${error.message}`);
  }
};

const updateAssignmentService = async (classId, assignmentId, data) => {
  if (!classId || !assignmentId || !data || typeof data !== 'object') {
    throw new Error('Class ID, Assignment ID, and valid data are required');
  }

  try {
    return await assignmentDAL.updateAssignment(classId, assignmentId, data);
  } catch (error) {
    throw new Error(`Error in updateAssignmentService: ${error.message}`);
  }
};

const deleteAssignmentService = async (classId, assignmentId) => {
  if (!classId || !assignmentId) {
    throw new Error('Class ID and Assignment ID are required');
  }

  try {
    return await assignmentDAL.deleteAssignment(classId, assignmentId);
  } catch (error) {
    throw new Error(`Error in deleteAssignmentService: ${error.message}`);
  }
};

module.exports = {
  getAllAssignmentsService,
  getAssignmentByIdService,
  createAssignmentService,
  updateAssignmentService,
  deleteAssignmentService,
};
