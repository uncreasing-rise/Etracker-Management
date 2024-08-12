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

// Function to submit a quiz attempt
const submitQuizAttempt = async (studentId, quizSubmissionData) => {
  try {
    const student = await StudentModel.findByIdAndUpdate(
      studentId,
      { $push: { quizzes: quizSubmissionData } }, // Add the quiz submission data to the quizzes array
      { new: true }
    ).exec();
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  } catch (error) {
    throw new Error(`Error submitting quiz attempt: ${error.message}`);
  }
};
// Function to find multiple students by IDs
const findStudentsByIds = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('A non-empty array of IDs is required');
  }

  try {
    return await StudentModel.find({ _id: { $in: ids } }).exec();
  } catch (error) {
    console.error('Error finding students by IDs:', error);
    throw new Error('Error finding students by IDs');
  }
};

module.exports = {
  findStudentByEmail,
  findStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById,
  submitQuizAttempt,
  findStudentsByIds,
};
