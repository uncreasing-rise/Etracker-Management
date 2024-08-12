const classService = require('../Services/ClassService');

const getAllClassesController = async (req, res) => {
  try {
    const classes = await classService.getAllClassesService();
    res.status(200).json(classes); // 200 OK is more appropriate here
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving classes', error: error.message });
  }
};

const getClassByIdController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json({ message: 'Class ID is required' });
  }

  try {
    const classData = await classService.getClassByIdService(classId);
    if (classData) {
      res.status(200).json(classData); // 200 OK is more appropriate here
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving class', error: error.message });
  }
};

const createClassController = async (req, res) => {
  try {
    const classData = await classService.createClassService(req.body);
    res.status(201).json(classData); // 201 Created for successful creation
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating class', error: error.message });
  }
};

const updateClassController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json({ message: 'Class ID is required' });
  }

  try {
    const updatedClass = await classService.updateClassService(
      classId,
      req.body
    );
    if (updatedClass) {
      res.status(200).json(updatedClass); // 200 OK for successful update
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating class', error: error.message });
  }
};

const deleteClassController = async (req, res) => {
  const { classId } = req.params;
  if (!classId) {
    return res.status(400).json({ message: 'Class ID is required' });
  }

  try {
    const deletedClass = await classService.deleteClassService(classId);
    if (deletedClass) {
      res.status(200).json({ message: 'Class deleted successfully' }); // 200 OK for successful deletion
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting class', error: error.message });
  }
};

// Controller function to add a student to a class
const addStudentsToClass = async (req, res) => {
  const { classId, studentIds } = req.body;

  try {
    const updatedClass = await classService.addStudentsToClass(
      classId,
      studentIds
    );
    res.status(200).json({
      success: true,
      message: 'Students added to class successfully',
      data: updatedClass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllClassesController,
  getClassByIdController,
  createClassController,
  updateClassController,
  deleteClassController,
  addStudentsToClass,
};
