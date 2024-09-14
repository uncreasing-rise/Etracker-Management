const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse');
const scoreService = require('../Services/ScoreService');
const {
  ERROR_ADMIN_ID_REQUIRED,
  ERROR_SCORE_ID_REQUIRED,
  ERROR_RETRIEVAL,
  ERROR_CREATION,
  ERROR_UPDATE,
  ERROR_DELETION,
  ERROR_FILE_DOWNLOAD,
} = require('../Constants/ResponseMessages');

// Create a new score
const createScore = async (req, res) => {
  try {
    const scoreData = req.body;
    const createdBy = req.user.id; // Ensure this is the correct field for the admin ID

    if (!createdBy) {
      return res.status(400).json(new ErrorResponse(ERROR_ADMIN_ID_REQUIRED));
    }

    const newScoreData = {
      ...scoreData,
      createdBy,
    };
    console.log('New score data:', newScoreData);

    const newScore = await scoreService.createScore(newScoreData);
    res.status(201).json(new SuccessResponse('Score created successfully'));
  } catch (err) {
    console.error(`Error creating score: ${err.message}`);
    res.status(500).json(new ErrorResponse(ERROR_CREATION, err.message));
  }
};

// Get scores for a student in a specific class
const getScoresByStudentAndClass = async (req, res) => {
  try {
    const { studentId, classId } = req.params;
    const scores = await scoreService.getScoresByStudentAndClass(
      studentId,
      classId
    );

    // Populate admin names if needed
    for (const score of scores) {
      if (score.createdBy) {
        const adminDetails = await scoreService.getAdminDetails(
          score.createdBy
        );
        score.createdBy = adminDetails.profile.fullName;
      }
    }

    res.status(200).json(scores);
  } catch (err) {
    console.error(`Error retrieving scores: ${err.message}`);
    res.status(500).json(new ErrorResponse(ERROR_RETRIEVAL, err.message));
  }
};

// Update an existing score
const updateScore = async (req, res) => {
  try {
    const { scoreId } = req.params;
    const updatedData = req.body;
    const updatedBy = req.user.id;

    if (!scoreId) {
      return res.status(400).json(new ErrorResponse(ERROR_SCORE_ID_REQUIRED));
    }

    const updatedScore = await scoreService.updateScore(
      scoreId,
      updatedData,
      updatedBy
    );

    // Populate admin name if needed
    if (updatedScore.createdBy) {
      const adminDetails = await scoreService.getAdminDetails(
        updatedScore.createdBy
      );
      updatedScore.createdBy = adminDetails.profile.fullName;
    }

    res.status(200).json(new SuccessResponse('Score updated successfully'));
  } catch (err) {
    console.error(`Error updating score: ${err.message}`);
    res.status(500).json(new ErrorResponse(ERROR_UPDATE, err.message));
  }
};

// Delete a score
const deleteScore = async (req, res) => {
  try {
    const { scoreId } = req.params;

    if (!scoreId) {
      return res.status(400).json(new ErrorResponse(ERROR_SCORE_ID_REQUIRED));
    }

    await scoreService.deleteScore(scoreId);
    res.status(200).json(new SuccessResponse('Score deleted successfully'));
  } catch (err) {
    console.error(`Error deleting score: ${err.message}`);
    res.status(500).json(new ErrorResponse(ERROR_DELETION, err.message));
  }
};

// Get all scores for a specific class
const getAllScoresInClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const scores = await scoreService.getAllScoresInClass(classId);

    // Populate admin names if needed
    for (const score of scores) {
      if (score.createdBy) {
        const adminDetails = await scoreService.getAdminDetails(
          score.createdBy
        );
        score.createdBy = adminDetails.profile.fullName;
      }
    }

    res
      .status(200)
      .json(new SuccessResponse('Scores retrieved successfully', scores));
  } catch (err) {
    console.error(`Error retrieving scores for class: ${err.message}`);
    res.status(500).json(new ErrorResponse(ERROR_RETRIEVAL, err.message));
  }
};

// Download scores report
const downloadScoresReport = async (req, res) => {
  try {
    const { classId } = req.params;
    const filePath = `./reports/scores_${classId}.pdf`;

    await scoreService.createScoresReport(classId, filePath);

    res.download(filePath, 'scores_report.pdf', (err) => {
      if (err) {
        console.error('Error downloading file:', err.message);
        res
          .status(500)
          .json(new ErrorResponse(ERROR_FILE_DOWNLOAD, err.message));
      }
    });
  } catch (error) {
    console.error('Error creating report:', error.message);
    res.status(500).json(new ErrorResponse(ERROR_FILE_DOWNLOAD, error.message));
  }
};

module.exports = {
  createScore,
  getScoresByStudentAndClass,
  updateScore,
  deleteScore,
  getAllScoresInClass,
  downloadScoresReport,
};
