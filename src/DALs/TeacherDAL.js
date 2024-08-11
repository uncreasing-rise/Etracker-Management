const mongoose = require('mongoose');
const TeacherModel = require('../Models/Teacher');

// Function to find a teacher by email
const findTeacherByEmail = async (email) => {
  try {
    return await TeacherModel.findOne({ 'profile.email': email }).exec();
  } catch (error) {
    console.error('Error finding teacher by email:', error);
    throw new Error('Error finding teacher');
  }
};

// Function to find a teacher by ID
const findTeacherById = async (id) => {
  try {
    return await TeacherModel.findById(id).exec();
  } catch (error) {
    console.error('Error finding teacher by ID:', error);
    throw new Error('Error finding teacher');
  }
};

// Function to create a new teacher
const createTeacher = async (teacherData) => {
  try {
    const teacher = new TeacherModel(teacherData);
    await teacher.save();
    return teacher;
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw new Error('Error creating teacher');
  }
};

// Function to update a teacher by ID
const updateTeacherById = async (id, updateData) => {
  try {
    return await TeacherModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
  } catch (error) {
    console.error('Error updating teacher by ID:', error);
    throw new Error('Error updating teacher');
  }
};

// Function to delete a teacher by ID
const deleteTeacherById = async (id) => {
  try {
    return await TeacherModel.findByIdAndDelete(id).exec();
  } catch (error) {
    console.error('Error deleting teacher by ID:', error);
    throw new Error('Error deleting teacher');
  }
};

// Function to add a material to a teacher's materials
const addMaterialToTeacher = async (teacherId, material) => {
  try {
    const teacher = await TeacherModel.findById(teacherId).exec();
    if (!teacher) {
      console.error('Teacher not found');
      return null;
    }
    teacher.materials.push(material);
    await teacher.save();
    return teacher;
  } catch (error) {
    console.error('Error adding material to teacher:', error);
    throw new Error('Error adding material');
  }
};

// Function to add an assignment to a teacher's assignments
const addAssignmentToTeacher = async (teacherId, assignment) => {
  try {
    const teacher = await TeacherModel.findById(teacherId).exec();
    if (!teacher) {
      console.error('Teacher not found');
      return null;
    }
    teacher.assignments.push(assignment);
    await teacher.save();
    return teacher;
  } catch (error) {
    console.error('Error adding assignment to teacher:', error);
    throw new Error('Error adding assignment');
  }
};

// Function to add a quiz to a teacher's quizzes
const addQuizToTeacher = async (teacherId, quiz) => {
  try {
    const teacher = await TeacherModel.findById(teacherId).exec();
    if (!teacher) {
      console.error('Teacher not found');
      return null;
    }
    teacher.quizzes.push(quiz);
    await teacher.save();
    return teacher;
  } catch (error) {
    console.error('Error adding quiz to teacher:', error);
    throw new Error('Error adding quiz');
  }
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
