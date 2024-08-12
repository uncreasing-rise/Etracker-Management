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

/**
 * Updates a student document with the given update data.
 * @param {mongoose.Types.ObjectId | string} studentId - The ID of the student to update.
 * @param {Object} updateData - The data to update the student with.
 * @returns {Promise<mongoose.Document>} - The updated student document.
 */
const updateStudent = async (studentId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new Error('Invalid student ID');
  }

  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      studentId,
      { $set: updateData },
      { new: true, runValidators: true } // Return the updated document and run validators
    ).exec();

    if (!updatedStudent) {
      throw new Error('Student not found');
    }

    return updatedStudent;
  } catch (error) {
    throw new Error(`Error updating student: ${error.message}`);
  }
};

module.exports = {
  findStudentByEmail,
  findStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById,
  submitQuizAttempt,
  updateStudent,
};
