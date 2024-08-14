const express = require('express');
const router = express.Router();
const {
  getAllTeachersController,
  getTeacherByIdController,
  createTeacherController,
  updateTeacherController,
  deleteTeacherController,
} = require('../Controllers/TeacherController');
const { authenticateToken } = require('../Middlewares/Authentication');
const { authorization } = require('../Middlewares/Authorization');

router.get(
  '/',
  authenticateToken,
  authorization(['admin']),
  getAllTeachersController
);

router.get(
  '/:teacherId',
  authenticateToken,
  authorization(['admin']),
  getTeacherByIdController
);

router.post(
  '/',
  authenticateToken,
  authorization(['admin']),
  createTeacherController
);

router.put(
  '/:teacherId',
  authenticateToken,
  authorization(['admin']),
  updateTeacherController
);

router.delete(
  '/:teacherId',
  authenticateToken,
  authorization(['admin']),
  deleteTeacherController
);

module.exports = router;
