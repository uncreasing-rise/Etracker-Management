const AssignmentModel = require('../Models/Assignment');
const ClassModel = require('../Models/Class');

// Get all assignments for a specific class
const getAllAssignments = async (classId) => {
  return await AssignmentModel.find({ classId });
};

// Get assignment by ID for a specific class
const getAssignmentById = async (classId, assignmentId) => {
  return await AssignmentModel.findOne({ classId, _id: assignmentId });
};

// Create a new assignment for a specific class
const createAssignment = async (classId, assignmentData) => {
  // Check if class exists
  const classExists = await ClassModel.findById(classId);
  if (!classExists) {
    throw new Error('Class not found');
  }

  // Create assignment
  const assignment = new AssignmentModel({
    ...assignmentData,
    classId, // Link assignment to class
  });

  const savedAssignment = await assignment.save();

  // Update class to add the new assignment ID
  await ClassModel.findByIdAndUpdate(
    classId,
    { $push: { assignments: savedAssignment._id } },
    { new: true }
  );

  return savedAssignment;
};

// Update assignment by ID for a specific class
const updateAssignment = async (classId, assignmentId, data) => {
  return await AssignmentModel.findOneAndUpdate(
    { classId, _id: assignmentId },
    data,
    { new: true }
  );
};

// Delete assignment by ID for a specific class
const deleteAssignment = async (classId, assignmentId) => {
  return await AssignmentModel.findOneAndDelete({ classId, _id: assignmentId });
};

module.exports = {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
