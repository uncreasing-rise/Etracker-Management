const mongoose = require('mongoose');
const TeacherModel = require('../Models/Teacher');

// Function to find a teacher by email
const findTeacherByEmail = async (email) => {
  return await TeacherModel.findOne({ 'profile.email': email }).exec();
};

// Function to find a teacher by ID
const findTeacherById = async (id) => {
  return await TeacherModel.findById(id).exec();
};

// Function to create a new teacher
const createTeacher = async (teacherData) => {
  const teacher = new TeacherModel(teacherData);
  return await teacher.save();
};

// Function to update a teacher by ID
const updateTeacherById = async (id, updateData) => {
  return await TeacherModel.findByIdAndUpdate(id, updateData, {
    new: true,
  }).exec();
};

// Function to delete a teacher by ID
const deleteTeacherById = async (id) => {
  return await TeacherModel.findByIdAndDelete(id).exec();
};

// Function to add a material to a teacher's materials
const addMaterialToTeacher = async (teacherId, material) => {
  return await TeacherModel.findByIdAndUpdate(
    teacherId,
    { $push: { materials: material } },
    { new: true }
  ).exec();
};

// Function to add an assignment to a teacher's assignments
const addAssignmentToTeacher = async (teacherId, assignment) => {
  return await TeacherModel.findByIdAndUpdate(
    teacherId,
    { $push: { assignments: assignment } },
    { new: true }
  ).exec();
};

// Function to add a quiz to a teacher's quizzes
const addQuizToTeacher = async (teacherId, quiz) => {
  return await TeacherModel.findByIdAndUpdate(
    teacherId,
    { $push: { quizzes: quiz } },
    { new: true }
  ).exec();
};

module.exports = {
  findTeacherByEmail,
  findTeacherById,
  createTeacher,
  updateTeacherById,
  deleteTeacherById,
  addMaterialToTeacher,
  addAssignmentToTeacher,
  addQuizToTeacher,
};
