const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse');
const sessionService = require('../Services/SessionService');
const {
  ERROR_SESSION_NOT_FOUND,
  ERROR_SESSION_CREATION,
  ERROR_SESSION_UPDATE,
  ERROR_SESSION_DELETION,
  ERROR_SESSION_RETRIEVAL,
} = require('../Constants/ResponseMessages');

// Create a new session
const createSession = async (req, res) => {
  try {
    const sessionData = req.body;
    const session = await sessionService.createSession(sessionData);
    res.status(201).json(new SuccessResponse('Session created successfully'));
  } catch (error) {
    console.error(`Error creating session: ${error.message}`);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_SESSION_CREATION, error.message));
  }
};

// Get session by ID
const getSessionById = async (req, res) => {
  try {
    const session = await sessionService.getSessionById(req.params.sessionId);
    if (!session) {
      return res.status(404).json(new ErrorResponse(ERROR_SESSION_NOT_FOUND));
    }
    res.status(200).json(session);
  } catch (error) {
    console.error(`Error retrieving session: ${error.message}`);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_SESSION_RETRIEVAL, error.message));
  }
};

// Update session
const updateSession = async (req, res) => {
  try {
    const session = await sessionService.updateSession(
      req.params.sessionId,
      req.body
    );
    if (!session) {
      return res.status(404).json(new ErrorResponse(ERROR_SESSION_NOT_FOUND));
    }
    res.status(200).json(new SuccessResponse('Session updated successfully'));
  } catch (error) {
    console.error(`Error updating session: ${error.message}`);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_SESSION_UPDATE, error.message));
  }
};

// Delete session
const deleteSession = async (req, res) => {
  try {
    const session = await sessionService.deleteSession(req.params.sessionId);
    if (!session) {
      return res.status(404).json(new ErrorResponse(ERROR_SESSION_NOT_FOUND));
    }
    res.status(200).json(new SuccessResponse('Session deleted successfully'));
  } catch (error) {
    console.error(`Error deleting session: ${error.message}`);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_SESSION_DELETION, error.message));
  }
};

// Get sessions by class ID
const getSessionsByClassId = async (req, res) => {
  try {
    const sessions = await sessionService.getSessionsByClassId(
      req.params.classId
    );
    res.status(200).json(sessions);
  } catch (error) {
    console.error(`Error retrieving sessions: ${error.message}`);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_SESSION_RETRIEVAL, error.message));
  }
};

module.exports = {
  createSession,
  getSessionById,
  updateSession,
  deleteSession,
  getSessionsByClassId,
};
