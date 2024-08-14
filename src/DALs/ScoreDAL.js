const ScoreModel = require('../Models/Score');

// Create a new score
const createScore = async (scoreData) => {
  // Ensure createdBy is included in scoreData
  if (!scoreData.createdBy) {
    throw new Error('Admin ID (createdBy) is required');
  }

  try {
    // Create a new score using the scoreData
    const score = new ScoreModel(scoreData);
    return await score.save();
  } catch (err) {
    // Handle and throw errors if any
    throw new Error('Error creating score: ' + err.message);
  }
};

// Get all scores for a specific student in a class
const getScoresByStudentAndClass = async (studentId, classId) => {
  try {
    return await ScoreModel.find({ studentId, classId })
      .populate('studentId', 'profile.fullName')
      .populate('classId', 'className')
      .exec();
  } catch (err) {
    throw new Error(`Error retrieving scores: ${err.message}`);
  }
};

// Update an existing score by ID
const updateScore = async (scoreId, updatedData) => {
  try {
    return await ScoreModel.findByIdAndUpdate(scoreId, updatedData, {
      new: true,
      runValidators: true, // Ensures validation during update
    })
      .populate('studentId', 'profile.fullName')
      .populate('classId', 'className')
      .exec();
  } catch (err) {
    throw new Error(`Error updating score: ${err.message}`);
  }
};

// Delete a score by ID
const deleteScore = async (scoreId) => {
  try {
    return await ScoreModel.findByIdAndDelete(scoreId);
  } catch (err) {
    throw new Error(`Error deleting score: ${err.message}`);
  }
};

// Get all scores in a specific class
const getAllScoresInClass = async (classId) => {
  return await ScoreModel.find({ classId })
    .populate('studentId', 'profile.fullName') // Populate student details
    .populate('classId', 'className') // Populate class details
    .populate('createdBy', 'profile.fullName') // Populate admin details
    .populate('updatedBy', 'profile.fullName') // Populate admin details

    .exec();
};

module.exports = {
  createScore,
  getScoresByStudentAndClass,
  updateScore,
  deleteScore,
  getAllScoresInClass,
};
