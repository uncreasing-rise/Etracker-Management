const SessionModel = require('../Models/Session');

// Create a new session
const createSession = async (sessionData) => {
  const session = new SessionModel(sessionData);
  return await session.save();
};

// Get a session by ID
const getSessionById = async (sessionId) => {
  return await SessionModel.findById(sessionId)
    .populate('classId')
    .populate('instructor')
    .exec();
};

// Update a session by ID
const updateSession = async (sessionId, sessionData) => {
  return await SessionModel.findByIdAndUpdate(sessionId, sessionData, {
    new: true,
  }).exec();
};

// Delete a session by ID
const deleteSession = async (sessionId) => {
  return await SessionModel.findByIdAndDelete(sessionId).exec();
};

// Get all sessions for a specific class
const getSessionsByClassId = async (classId) => {
  return await SessionModel.find({ classId }).populate('instructor').exec();
};

module.exports = {
  createSession,
  getSessionById,
  updateSession,
  deleteSession,
  getSessionsByClassId,
};
