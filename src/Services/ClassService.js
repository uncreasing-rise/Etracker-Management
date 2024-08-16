const classDAL = require('../DALs/ClassDAL');
const studentDAL = require('../DALs/StudentDAL');
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
    const classData = await classDAL.getClassById(classId); // Remove .lean()
    if (!classData) {
      throw new Error('Class not found');
    }

    // Log class data for debugging
    console.log('Class Data:', classData);

    // Check if students are already in the class
    const newStudentIds = studentIds.filter(
      (id) =>
        !classData.studentIds.some(
          (student) => student._id.toString() === id.toString()
        ) // Ensure ID comparison is consistent
    );

    if (newStudentIds.length === 0) {
      throw new Error('All students are already in the class');
    }

    // Update the class document with new students
    await classDAL.updateClass(classId, {
      $addToSet: { studentIds: { $each: newStudentIds } }, // Use $addToSet to avoid duplicates
    });

    // Log new student IDs for debugging
    console.log('New Student IDs to Add:', newStudentIds);

    // Update each student document to include the classId
    await Promise.all(
      newStudentIds.map(async (studentId) => {
        const student = await studentDAL.findStudentById(studentId);
        if (!student) {
          throw new Error(`Student with ID ${studentId} not found`);
        }

        // Log student data for debugging
        console.log('Student Data:', student);

        // Ensure enrolledClasses array is initialized
        if (!student.enrolledClasses) {
          student.enrolledClasses = [];
        }

        // Check if the classId is already in enrolledClasses
        if (!student.enrolledClasses.includes(classId)) {
          student.enrolledClasses.push(classId);

          // Save the updated student document
          await studentDAL.updateStudent(studentId, {
            enrolledClasses: student.enrolledClasses,
          });
        }
      })
    );

    return {
      success: true,
      message: 'Students successfully added to the class',
    };
  } catch (error) {
    console.error('Error adding students to class:', error); // Log the error
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
