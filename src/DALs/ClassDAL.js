const ClassModel = require('../Models/Classes');

const getAllClasses = async () => {
  return ClassModel.find();
};

const getClassById = async (classId) => {
  return ClassModel.findById(classId);
};

const createClass = async (data) => {
  const newClass = new ClassModel(data);
  return newClass.save();
};

const updateClass = async (classId, data) => {
  return ClassModel.findByIdAndUpdate(classId, data, { new: true });
};

const deleteClass = async (classId) => {
  return ClassModel.findByIdAndDelete(classId);
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
