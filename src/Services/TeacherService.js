const Teacher = require('../Models/Teacher');

/**
 * Get all teachers
 * @returns {Promise<Array>} - A promise that resolves to an array of teachers
 */
const getAllTeachersService = async () => {
  try {
    return await Teacher.find();
  } catch (error) {
    console.error('Error getting all teachers:', error);
    throw new Error('Error getting teachers');
  }
};

/**
 * Get teacher by ID
 * @param {string} userId - The ID of the teacher
 * @returns {Promise<Object|null>} - A promise that resolves to the teacher object or null if not found
 */
const getTeacherByIdService = async (userId) => {
  try {
    return await Teacher.findOne({ userId });
  } catch (error) {
    console.error('Error getting teacher by ID:', error);
    throw new Error('Error getting teacher');
  }
};

/**
 * Create a new teacher
 * @param {Object} data - The data of the teacher to create
 * @returns {Promise<Object>} - A promise that resolves to the created teacher object
 */
const createTeacherService = async (data) => {
  try {
    const teacher = new Teacher(data);
    return await teacher.save();
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw new Error('Error creating teacher');
  }
};

/**
 * Update teacher information
 * @param {string} userId - The ID of the teacher to update
 * @param {Object} data - The data to update
 * @returns {Promise<Object|null>} - A promise that resolves to the updated teacher object or null if not found
 */
const updateTeacherService = async (userId, data) => {
  try {
    return await Teacher.findOneAndUpdate({ userId }, data, { new: true });
  } catch (error) {
    console.error('Error updating teacher:', error);
    throw new Error('Error updating teacher');
  }
};

/**
 * Delete teacher by ID
 * @param {string} userId - The ID of the teacher to delete
 * @returns {Promise<Object|null>} - A promise that resolves to the deleted teacher object or null if not found
 */
const deleteTeacherService = async (userId) => {
  try {
    return await Teacher.findOneAndDelete({ userId });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw new Error('Error deleting teacher');
  }
};

module.exports = {
  getAllTeachersService,
  getTeacherByIdService,
  createTeacherService,
  updateTeacherService,
  deleteTeacherService,
};
