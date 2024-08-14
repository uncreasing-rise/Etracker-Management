// src/Routes/ClassRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllClassesController,
  getClassByIdController,
  createClassController,
  updateClassController,
  deleteClassController,
  addStudentsToClass,
} = require('../Controllers/ClassController');

router.get('/', getAllClassesController);

router.get('/:classId', getClassByIdController);

router.post('/', createClassController);

router.put('/:classId', updateClassController);

router.delete('/:classId', deleteClassController);

router.post('/:classId/add-students', addStudentsToClass);

module.exports = router;
