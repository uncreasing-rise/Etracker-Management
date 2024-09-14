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

  getAllTeachersController
);

router.get(
  '/:teacherId',

  getTeacherByIdController
);

router.post(
  '/',

  createTeacherController
);

router.put(
  '/:teacherId',

  updateTeacherController
);

router.delete(
  '/:teacherId',

  deleteTeacherController
);

module.exports = router;
