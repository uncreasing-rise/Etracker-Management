const classService = require('../Services/ClassService');

const getAllClassesController = async (req, res) => {
  try {
    const classes = await classService.getAllClassesService();
    res.json(classes);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving classes', error: error.message });
  }
};

const getClassByIdController = async (req, res) => {
  const { classId } = req.params;
  try {
    const classData = await classService.getClassByIdService(classId);
    if (classData) {
      res.json(classData);
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
    res.status(201).json(classData);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating class', error: error.message });
  }
};

const updateClassController = async (req, res) => {
  const { classId } = req.params;
  try {
    const updatedClass = await classService.updateClassService(
      classId,
      req.body
    );
    if (updatedClass) {
      res.json(updatedClass);
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
  try {
    const deletedClass = await classService.deleteClassService(classId);
    if (deletedClass) {
      res.json({ message: 'Class deleted successfully' });
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting class', error: error.message });
  }
};

module.exports = {
  getAllClassesController,
  getClassByIdController,
  createClassController,
  updateClassController,
  deleteClassController,
};
