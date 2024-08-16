const sessionDAL = require('../DALs/SessionDAL');

const createSession = async (sessionData) => {
  return await sessionDAL.createSession(sessionData);
};

const getSessionById = async (sessionId) => {
  return await sessionDAL.getSessionById(sessionId);
};

const updateSession = async (sessionId, sessionData) => {
  return await sessionDAL.updateSession(sessionId, sessionData);
};

const deleteSession = async (sessionId) => {
  return await sessionDAL.deleteSession(sessionId);
};

const getSessionsByClassId = async (classId) => {
  return await sessionDAL.getSessionsByClassId(classId);
};

module.exports = {
  createSession,
  getSessionById,
  updateSession,
  deleteSession,
  getSessionsByClassId,
};
