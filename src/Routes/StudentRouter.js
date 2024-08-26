const express = require('express');
const router = express.Router();
const {
  getAllStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
  getAllStudentOfClass,
} = require('../Controllers/StudentController');
const { authenticateToken } = require('../Middlewares/Authentication');
const { authorization } = require('../Middlewares/Authorization');

router.get('/', getAllStudentsController);

router.get('/:studentId', getStudentByIdController);

router.post('/', createStudentController);

router.put('/:studentId', updateStudentController);

router.delete('/:studentId', deleteStudentController);

router.get('/class/:classId', getAllStudentOfClass);

module.exports = router;
