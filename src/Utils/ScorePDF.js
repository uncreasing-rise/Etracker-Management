const fs = require('fs');
const PDFDocument = require('pdfkit');
const ScoreModel = require('../models/Score'); // Adjust the path as needed

const generateScoresPDF = async (classId, filePath) => {
  try {
    // Fetch all scores for the class and populate the fields
    const scores = await ScoreModel.find({ classId })
      .populate({
        path: 'studentId',
        select: 'profile.fullName', // Chọn trường profile.fullName từ Student
      })
      .populate({
        path: 'classId',
        select: 'className', // Chọn trường className từ Class
      })
      .exec();

    // Kiểm tra dữ liệu đã được populate
    console.log('Scores:', scores);

    // Create a new PDF document
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    // Add title
    doc.fontSize(16).text('Scores Report', { align: 'center' });
    doc.moveDown();

    // Define table headers
    const headers = [
      'Student Name',
      'Class Name',
      'Score Type',
      'Score Name',
      'Score',
    ];

    // Add headers
    headers.forEach((header, i) => {
      doc.fontSize(12).text(header, {
        continued: i !== headers.length - 1,
        width: 120,
      });
    });
    doc.moveDown();

    // Draw a line under headers
    doc.moveTo(30, doc.y).lineTo(570, doc.y).stroke();
    doc.moveDown();

    // Add rows for each score
    scores.forEach((score) => {
      const studentName = score.studentId?.profile?.fullName || 'N/A';
      const className = score.classId?.className || 'N/A';

      doc
        .fontSize(10)
        .text(studentName, { continued: true, width: 120 })
        .text(className, { continued: true, width: 120 })
        .text(score.scoreType, { continued: true, width: 120 })
        .text(score.scoreName, { continued: true, width: 120 })
        .text(score.score.toString(), { width: 120 });

      doc.moveDown();
    });

    // Finalize the PDF and end the stream
    doc.end();
    doc.on('finish', () => {
      console.log(`PDF generated successfully at ${filePath}`);
    });
    doc.on('error', (error) => {
      console.error('Error writing PDF:', error.message);
    });
  } catch (error) {
    console.error('Error generating PDF:', error.message);
  }
};

module.exports = {
  generateScoresPDF,
};
