const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse'); // Adjust path as necessary
const {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
  getAllStudentOfClassService,
} = require('../Services/StudentService');
const {
  ERROR_STUDENT_NOT_FOUND,
  ERROR_STUDENT_CREATION,
  ERROR_STUDENT_UPDATE,
  ERROR_STUDENT_DELETION,
  ERROR_STUDENT_RETRIEVAL,
} = require('../Constants/ResponseMessages');

/**
 * Get all students
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllStudentsController = async (req, res) => {
  try {
    const students = await getAllStudentsService();
    res.status(200).json(students);
  } catch (error) {
    console.error(`Error getting all students: ${error.message}`);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_STUDENT_RETRIEVAL, error.message));
  }
};

/**
 * Get student by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getStudentByIdController = async (req, res) => {
  const studentId = req.params;
  try {
    const student = await getStudentByIdService(studentId);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json(new ErrorResponse(ERROR_STUDENT_NOT_FOUND));
    }
  } catch (error) {
    console.error(`Error getting student by ID: ${error.message}`);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_STUDENT_RETRIEVAL, error.message));
  }
};

/**
 * Create a new student
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createStudentController = async (req, res) => {
  try {
    const student = await createStudentService(req.body);
    res
      .status(201)
      .json(new SuccessResponse('Student created successfully', student));
  } catch (error) {
    console.error(`Error creating student: ${error.message}`);
    res
      .status(400)
      .json(new ErrorResponse(ERROR_STUDENT_CREATION, error.message));
  }
};

/**
 * Update student information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateStudentController = async (req, res) => {
  const studentId = req.params;
  try {
    const student = await updateStudentService(studentId, req.body);
    if (student) {
      res
        .status(200)
        .json(new SuccessResponse('Student updated successfully', student));
    } else {
      res.status(404).json(new ErrorResponse(ERROR_STUDENT_NOT_FOUND));
    }
  } catch (error) {
    console.error(`Error updating student: ${error.message}`);
    res
      .status(400)
      .json(new ErrorResponse(ERROR_STUDENT_UPDATE, error.message));
  }
};

/**
 * Delete student by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteStudentController = async (req, res) => {
  const studentId = req.params;
  console.log(studentId);
  try {
    const result = await deleteStudentService(studentId);
    if (result) {
      res.status(200).json(new SuccessResponse('Student deleted successfully'));
    } else {
      res.status(404).json(new ErrorResponse(ERROR_STUDENT_NOT_FOUND));
    }
  } catch (error) {
    console.error(`Error deleting student: ${error.message}`);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_STUDENT_DELETION, error.message));
  }
};

const getAllStudentOfClass = async (req, res) => {
  // Extract classId correctly from req.params
  const classId = req.params;
  console.log(classId);
  try {
    // Call the actual service or DAL function to get the students
    const result = await getAllStudentOfClassService(classId);

    if (result && result.length > 0) {
      res.status(200).json(result);
    } else {
      res
        .status(404)
        .json(new ErrorResponse('Students not found for the given class ID'));
    }
  } catch (error) {
    console.error(`Error getting student by class ID: ${error.message}`);
    res.status(500).json(new ErrorResponse('Internal Server Error'));
  }
};

module.exports = {
  getAllStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
  getAllStudentOfClass,
};
