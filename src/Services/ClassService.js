const classDAL = require('../DALs/ClassDAL');

const getAllClassesService = async () => {
  return classDAL.getAllClasses();
};

const getClassByIdService = async (classId) => {
  return classDAL.getClassById(classId);
};

const createClassService = async (data) => {
  return classDAL.createClass(data);
};

const updateClassService = async (classId, data) => {
  return classDAL.updateClass(classId, data);
};

const deleteClassService = async (classId) => {
  return classDAL.deleteClass(classId);
};

module.exports = {
  getAllClassesService,
  getClassByIdService,
  createClassService,
  updateClassService,
  deleteClassService,
};
