const scoreDAL = require('../DALs/ScoreDAL');
const AdminDAL = require('../DALs/AdminDAL');

const createScore = async (scoreData) => {
  // Create a new data object including createdBy
  const newScoreData = {
    ...scoreData,
  };

  try {
    // Call the data access layer to create the score
    return await scoreDAL.createScore(newScoreData);
  } catch (err) {
    // Handle and throw errors if any
    throw new Error('Error creating score: ' + err.message);
  }
};

const getScoresByStudentAndClass = async (studentId, classId) => {
  return await scoreDAL.getScoresByStudentAndClass(studentId, classId);
};

const updateScore = async (scoreId, updatedData, updatedBy) => {
  // Add or update the `updatedBy` field
  const updatedDataWithUser = {
    ...updatedData,
    updatedBy,
  };

  return await scoreDAL.updateScore(scoreId, updatedDataWithUser);
};

const deleteScore = async (scoreId) => {
  return await scoreDAL.deleteScore(scoreId);
};

const getAllScoresInClass = async (classId) => {
  return await scoreDAL.getAllScoresInClass(classId);
};

const getAdminDetails = async (adminId) => {
  const admin = await AdminDAL.findAdminById(adminId);
  if (!admin) {
    throw new Error('Admin not found');
  }
  return admin;
};
module.exports = {
  createScore,
  getScoresByStudentAndClass,
  updateScore,
  deleteScore,
  getAllScoresInClass,
  getAdminDetails,
};
