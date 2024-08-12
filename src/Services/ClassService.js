const classDAL = require('../DALs/ClassDAL');

// Get all classes
const getAllClassesService = async () => {
  try {
    return await classDAL.getAllClasses();
  } catch (error) {
    throw new Error(`Error in getAllClassesService: ${error.message}`);
  }
};

// Get a class by ID
const getClassByIdService = async (classId) => {
  if (!classId) {
    throw new Error('Class ID is required');
  }

  try {
    const classData = await classDAL.getClassById(classId);
    if (!classData) {
      throw new Error('Class not found');
    }
    return classData;
  } catch (error) {
    throw new Error(`Error in getClassByIdService: ${error.message}`);
  }
};

// Create a new class with basic information
const createClassService = async (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data provided');
  }

  // Ensure basic information for creating a class
  const { className, teacherId, classDetails } = data;
  if (!className || !teacherId || !classDetails) {
    throw new Error('Class name, teacher ID, and class details are required');
  }

  try {
    const newClass = await classDAL.createClass(data);
    return newClass;
  } catch (error) {
    throw new Error(`Error in createClassService: ${error.message}`);
  }
};

// Update a class by ID
const updateClassService = async (classId, data) => {
  if (!classId) {
    throw new Error('Class ID is required');
  }

  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data provided');
  }

  try {
    const updatedClass = await classDAL.updateClass(classId, data);
    if (!updatedClass) {
      throw new Error('Class not found');
    }
    return updatedClass;
  } catch (error) {
    throw new Error(`Error in updateClassService: ${error.message}`);
  }
};

// Delete a class by ID
const deleteClassService = async (classId) => {
  if (!classId) {
    throw new Error('Class ID is required');
  }

  try {
    const deletedClass = await classDAL.deleteClass(classId);
    if (!deletedClass) {
      throw new Error('Class not found');
    }
    return deletedClass;
  } catch (error) {
    throw new Error(`Error in deleteClassService: ${error.message}`);
  }
};

const addStudentsToClass = async (classId, studentIds) => {
  if (!classId || !Array.isArray(studentIds) || studentIds.length === 0) {
    throw new Error('Class ID and an array of Student IDs are required');
  }

  try {
    // Find the class by ID using DAL
    const classData = await classDAL.getClassById(classId);
    if (!classData) {
      throw new Error('Class not found');
    }

    // Check if students are already in the class
    const newStudentIds = studentIds.filter(
      (id) => !classData.studentIds.includes(id)
    );

    if (newStudentIds.length === 0) {
      throw new Error('All students are already in the class');
    }

    // Update the class document with new students
    classData.studentIds.push(...newStudentIds);

    // Save the updated class document
    const updatedClass = await classDAL.updateClass(classId, {
      studentIds: classData.studentIds,
    });
    return updatedClass;
  } catch (error) {
    throw new Error(`Error adding students to class: ${error.message}`);
  }
};

module.exports = {
  getAllClassesService,
  getClassByIdService,
  createClassService,
  updateClassService,
  deleteClassService,
  addStudentsToClass,
};
