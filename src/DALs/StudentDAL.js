const mongoose = require('mongoose');
const StudentModel = require('../Models/Student');

// Function to find a student by email
const findStudentByEmail = async (email) => {
  try {
    return await StudentModel.findOne({ 'profile.email': email }).exec();
  } catch (error) {
    console.error('Error finding student by email:', error);
    throw new Error('Error finding student');
  }
};

// Function to find a student by ID
const findStudentById = async (id) => {
  try {
    return await StudentModel.findById(id).exec();
  } catch (error) {
    console.error('Error finding student by ID:', error);
    throw new Error('Error finding student');
  }
};

// Function to create a new student
const createStudent = async (studentData) => {
  try {
    const student = new StudentModel(studentData);
    await student.save();
    return student;
  } catch (error) {
    console.error('Error creating student:', error);
    throw new Error('Error creating student');
  }
};

// Function to update a student by ID
const updateStudentById = async (id, updateData) => {
  try {
    const student = await StudentModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
    return student;
  } catch (error) {
    console.error('Error updating student by ID:', error);
    throw new Error('Error updating student');
  }
};

// Function to delete a student by ID
const deleteStudentById = async (id) => {
  try {
    const student = await StudentModel.findByIdAndDelete(id).exec();
    return student;
  } catch (error) {
    console.error('Error deleting student by ID:', error);
    throw new Error('Error deleting student');
  }
};

// Function to add an assignment to a student
const addAssignmentToStudent = async (studentId, assignment) => {
  try {
    const student = await StudentModel.findById(studentId).exec();
    if (!student) {
      console.error('Student not found');
      return null;
    }
    student.assignments.push(assignment);
    await student.save();
    return student;
  } catch (error) {
    console.error('Error adding assignment to student:', error);
    throw new Error('Error adding assignment');
  }
};

// Function to add a quiz to a student
const addQuizToStudent = async (studentId, quiz) => {
  try {
    const student = await StudentModel.findById(studentId).exec();
    if (!student) {
      console.error('Student not found');
      return null;
    }
    student.quizzes.push(quiz);
    await student.save();
    return student;
  } catch (error) {
    console.error('Error adding quiz to student:', error);
    throw new Error('Error adding quiz');
  }
};

// Function to add accessed material to a student
const addMaterialAccessedToStudent = async (studentId, materialAccessed) => {
  try {
    const student = await StudentModel.findById(studentId).exec();
    if (!student) {
      console.error('Student not found');
      return null;
    }
    student.materialsAccessed.push(materialAccessed);
    await student.save();
    return student;
  } catch (error) {
    console.error('Error adding material access to student:', error);
    throw new Error('Error adding material access');
  }
};

// Function to add a notification to a student
const addNotificationToStudent = async (studentId, notification) => {
  try {
    const student = await StudentModel.findById(studentId).exec();
    if (!student) {
      console.error('Student not found');
      return null;
    }
    student.notifications.push(notification);
    await student.save();
    return student;
  } catch (error) {
    console.error('Error adding notification to student:', error);
    throw new Error('Error adding notification');
  }
};

module.exports = {
  findStudentByEmail,
  findStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById,
  addAssignmentToStudent,
  addQuizToStudent,
  addMaterialAccessedToStudent,
  addNotificationToStudent,
};
