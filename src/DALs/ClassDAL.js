// dal/classDAL.js
const ClassModel = require('../Models/Class');

// Function to get all classes
const getAllClasses = async () => {
  return ClassModel.find();
};

// Function to get a class by ID
const getClassById = async (classId) => {
  return ClassModel.findById(classId)
    .populate('teacherId')
    .populate('studentIds');
};

// Function to create a new class
const createClass = async (data) => {
  const newClass = new ClassModel(data);
  return newClass.save();
};

// Function to update a class by ID
const updateClass = async (classId, data) => {
  return ClassModel.findByIdAndUpdate(classId, data, { new: true })
    .populate('teacherId')
    .populate('studentIds');
};

// Function to delete a class by ID
const deleteClass = async (classId) => {
  return ClassModel.findByIdAndDelete(classId);
};

// Function to find a class by ID (used for adding students)
const findById = async (classId) => {
  return ClassModel.findById(classId);
};

// Function to save an updated class document
const saveClass = async (classData) => {
  return classData.save();
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  findById,
  saveClass,
};
