const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse'); // Adjust path as necessary
const scoreService = require('../Services/ScoreService');

// Create a new score
const createScore = async (req, res) => {
  try {
    // Extract data from request
    const scoreData = req.body;
    const createdBy = req.user.id; // Ensure this is the correct field for the admin ID

    // Check if createdBy is present
    if (!createdBy) {
      return res
        .status(400)
        .json(new ErrorResponse('Admin ID (createdBy) is required'));
    }

    // Add createdBy to scoreData
    const newScoreData = {
      ...scoreData,
      createdBy, // Set createdBy here
    };
    console.log('New score data:', newScoreData); // Logging the data being created

    // Call the service to create the score
    const newScore = await scoreService.createScore(newScoreData);

    // Respond with the created score
    res
      .status(201)
      .json(new SuccessResponse('Score created successfully', newScore));
  } catch (err) {
    console.error(`Error creating score: ${err.message}`); // Log the error for debugging
    res
      .status(500)
      .json(new ErrorResponse('Error creating score', err.message));
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

    res
      .status(200)
      .json(new SuccessResponse('Scores retrieved successfully', scores));
  } catch (err) {
    console.error(`Error retrieving scores: ${err.message}`); // Log the error
    res
      .status(500)
      .json(new ErrorResponse('Error retrieving scores', err.message));
  }
};

// Update an existing score
const updateScore = async (req, res) => {
  try {
    const { scoreId } = req.params;
    const updatedData = req.body;
    const updatedBy = req.user.id;
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

    res
      .status(200)
      .json(new SuccessResponse('Score updated successfully', updatedScore));
  } catch (err) {
    console.error(`Error updating score: ${err.message}`); // Log the error
    res
      .status(500)
      .json(new ErrorResponse('Error updating score', err.message));
  }
};

// Delete a score
const deleteScore = async (req, res) => {
  try {
    const { scoreId } = req.params;

    // Ensure that scoreId is valid
    if (!scoreId) {
      return res.status(400).json(new ErrorResponse('Score ID is required'));
    }

    // Call the service to delete the score
    await scoreService.deleteScore(scoreId);

    // Respond with a success message
    res.status(200).json(new SuccessResponse('Score deleted successfully'));
  } catch (err) {
    // Log the error and respond with a 500 status
    console.error(`Error deleting score: ${err.message}`);
    res
      .status(500)
      .json(new ErrorResponse('Error deleting score', err.message));
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
    console.error(`Error retrieving scores for class: ${err.message}`); // Log the error
    res
      .status(500)
      .json(
        new ErrorResponse('Error retrieving scores for class', err.message)
      );
  }
};

module.exports = {
  createScore,
  getScoresByStudentAndClass,
  updateScore,
  deleteScore,
  getAllScoresInClass,
};
