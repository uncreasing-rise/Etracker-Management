const mongoose = require('mongoose');
const StudentModel = require('../Models/Student');
const fs = require('fs');
const PDFDocument = require('pdfkit');

// Function to find a student by email
const findStudentByEmail = async (email) => {
  return await StudentModel.findOne({ 'profile.email': email }).exec();
};

// Function to find a student by ID
const findStudentById = async (id) => {
  const studentId = typeof id === 'string' ? id : id.studentId;
  return await StudentModel.findById(studentId).exec();
};

// Function to create a new student
const createStudent = async (studentData) => {
  const student = new StudentModel(studentData);
  return await student.save();
};

// Function to update a student by ID
const updateStudentById = async (id, updateData) => {
  const studentId = typeof id === 'string' ? id : id.studentId;
  return await StudentModel.findByIdAndUpdate(studentId, updateData, {
    new: true,
  }).exec();
};

const deleteStudentById = async (id) => {
  const studentId = typeof id === 'string' ? id : id.studentId;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new Error('Invalid student ID');
  }

  try {
    const deletedStudent =
      await StudentModel.findByIdAndDelete(studentId).exec();
    if (!deletedStudent) {
      throw new Error('Student not found');
    }
    return deletedStudent;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error(`Failed to delete student: ${error.message}`);
  }
};

// Function to get all students
const getAllStudents = async () => {
  try {
    return await StudentModel.find()
      .populate('enrolledClasses', 'className')
      .exec();
  } catch (error) {
    throw new Error(`Failed to retrieve students: ${error.message}`);
  }
};

// Function to submit a quiz attempt
const submitQuizAttempt = async (studentId, quizSubmissionData) => {
  return await StudentModel.findByIdAndUpdate(
    studentId,
    { $push: { quizzes: quizSubmissionData } }, // Add the quiz submission data to the quizzes array
    { new: true }
  ).exec();
};

const updateStudent = async (id, updateData) => {
  const studentId = typeof id === 'string' ? id : id.studentId;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new Error('Invalid student ID');
  }

  return await StudentModel.findByIdAndUpdate(
    studentId,
    { $set: updateData },
    { new: true, runValidators: true } // Return the updated document and run validators
  ).exec();
};
const getAllStudentOfClass = async (id) => {
  const classId = typeof id === 'string' ? id : id.classId;
  return await StudentModel.find({ enrolledClasses: classId }).exec();
};

module.exports = {
  findStudentByEmail,
  findStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById,
  getAllStudents,
  submitQuizAttempt,
  updateStudent,
  getAllStudentOfClass,
};
