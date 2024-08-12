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

const createAssignment = async (classId, assignmentData) => {
  if (!classId || !assignmentData) {
    throw new Error('Class ID and assignment data are required');
  }

  try {
    // Kiểm tra xem lớp học có tồn tại không
    const classExists = await ClassModel.findById(classId);
    if (!classExists) {
      throw new Error('Class not found');
    }

    // Tạo bài tập
    const assignment = new AssignmentModel({
      ...assignmentData,
      classId, // Liên kết bài tập với lớp học
    });

    const savedAssignment = await assignment.save();

    // Cập nhật lớp học để thêm ID của bài tập mới vào danh sách assignments
    await ClassModel.findByIdAndUpdate(
      classId,
      { $push: { assignments: savedAssignment._id } },
      { new: true }
    );

    return savedAssignment;
  } catch (error) {
    throw new Error(`Error creating assignment: ${error.message}`);
  }
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
