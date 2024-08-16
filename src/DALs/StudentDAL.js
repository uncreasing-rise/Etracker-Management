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
  return await StudentModel.findById(id).exec();
};

// Function to create a new student
const createStudent = async (studentData) => {
  const student = new StudentModel(studentData);
  return await student.save();
};

// Function to update a student by ID
const updateStudentById = async (id, updateData) => {
  return await StudentModel.findByIdAndUpdate(id, updateData, {
    new: true,
  }).exec();
};

// Function to delete a student by ID
const deleteStudentById = async (id) => {
  return await StudentModel.findByIdAndDelete(id).exec();
};

// Function to submit a quiz attempt
const submitQuizAttempt = async (studentId, quizSubmissionData) => {
  return await StudentModel.findByIdAndUpdate(
    studentId,
    { $push: { quizzes: quizSubmissionData } }, // Add the quiz submission data to the quizzes array
    { new: true }
  ).exec();
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

  return await StudentModel.findByIdAndUpdate(
    studentId,
    { $set: updateData },
    { new: true, runValidators: true } // Return the updated document and run validators
  ).exec();
};

/**
 * Generate a PDF with scores for a given class.
 * @param {Array} scores - The scores to include in the PDF.
 * @param {string} filePath - The path where the PDF will be saved.
 * @returns {Promise<string>} - The path to the generated PDF file.
 */
const generateScoresPDF = async (scores, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    // Add title
    doc.fontSize(16).text('Scores Report', { align: 'center' });
    doc.moveDown();

    // Add table headers
    doc.fontSize(12).text('Student Name', { continued: true });
    doc.text(' | ', { continued: true });
    doc.text('Class Name', { continued: true });
    doc.text(' | ', { continued: true });
    doc.text('Score Type', { continued: true });
    doc.text(' | ', { continued: true });
    doc.text('Score Name', { continued: true });
    doc.text(' | ', { continued: true });
    doc.text('Score');
    doc.moveDown();

    // Draw a line under headers
    doc.moveTo(30, doc.y).lineTo(570, doc.y).stroke();
    doc.moveDown();

    // Add table rows
    scores.forEach((score) => {
      const studentName = score.studentId?.profile?.fullName || 'N/A';
      const className = score.classId?.className || 'N/A';
      doc
        .fontSize(10)
        .text(studentName, { continued: true })
        .text(' | ', { continued: true })
        .text(className, { continued: true })
        .text(' | ', { continued: true })
        .text(score.scoreType, { continued: true })
        .text(' | ', { continued: true })
        .text(score.scoreName, { continued: true })
        .text(' | ', { continued: true })
        .text(score.score.toString());
      doc.moveDown();
    });

    // Finalize the PDF and end the stream
    doc.end();

    doc.on('end', () => {
      resolve(filePath);
    });

    doc.on('error', (error) => {
      reject(new Error(`Failed to generate PDF: ${error.message}`));
    });
  });
};

module.exports = {
  findStudentByEmail,
  findStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById,
  submitQuizAttempt,
  updateStudent,
  generateScoresPDF,
};
