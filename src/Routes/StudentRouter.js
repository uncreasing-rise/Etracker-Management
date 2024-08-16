const express = require('express');
const router = express.Router();
const {
  getAllStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
} = require('../Controllers/StudentController');
const { authenticateToken } = require('../Middlewares/Authentication');
const { authorization } = require('../Middlewares/Authorization');

router.get(
  '/',
  authenticateToken,
  authorization(['admin', 'teacher']),
  getAllStudentsController
);

router.get(
  '/:studentId',
  authenticateToken,
  authorization(['admin', 'teacher']),
  getStudentByIdController
);

router.post(
  '/',
  authenticateToken,
  authorization(['admin']),
  createStudentController
);

router.put(
  '/:studentId',
  authenticateToken,
  authorization(['admin']),
  updateStudentController
);

router.delete(
  '/:studentId',
  authenticateToken,
  authorization(['admin']),
  deleteStudentController
);

module.exports = router;
