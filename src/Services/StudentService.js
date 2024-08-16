const {
  findStudentByEmail,
  findStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
} = require('../DALs/StudentDAL');

/**
 * Get all students
 * @returns {Promise<Array>} - A promise that resolves to an array of students
 */
const getAllStudentsService = async () => {
  try {
    return await getAllStudents();
  } catch (error) {
    console.error('Error getting all students:', error);
    throw new Error('Error getting students');
  }
};

/**
 * Get student by ID
 * @param {string} userId - The ID of the student
 * @returns {Promise<Object|null>} - A promise that resolves to the student object or null if not found
 */
const getStudentByIdService = async (userId) => {
  try {
    return await findStudentById(userId);
  } catch (error) {
    console.error('Error getting student by ID:', error);
    throw new Error('Error getting student');
  }
};

/**
 * Create a new student
 * @param {Object} studentData - The data of the student to create
 * @returns {Promise<Object>} - A promise that resolves to the created student object
 */
const createStudentService = async (studentData) => {
  try {
    return await createStudent(studentData);
  } catch (error) {
    console.error('Error creating student:', error);
    throw new Error('Error creating student');
  }
};

/**
 * Update student information
 * @param {string} userId - The ID of the student to update
 * @param {Object} updateData - The data to update
 * @returns {Promise<Object|null>} - A promise that resolves to the updated student object or null if not found
 */
const updateStudentService = async (userId, updateData) => {
  try {
    return await updateStudent(userId, updateData);
  } catch (error) {
    console.error('Error updating student:', error);
    throw new Error('Error updating student');
  }
};

/**
 * Delete student by ID
 * @param {string} userId - The ID of the student to delete
 * @returns {Promise<Object|null>} - A promise that resolves to the deleted student object or null if not found
 */
const deleteStudentService = async (userId) => {
  try {
    return await deleteStudent(userId);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error('Error deleting student');
  }
};

module.exports = {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
};
