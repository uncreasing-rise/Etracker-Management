const express = require('express');
const router = express.Router();
const {
  getAllAssignmentsController,
  getAssignmentByIdController,
  createAssignmentController,
  updateAssignmentController,
  deleteAssignmentController,
} = require('../Controllers/AssignmentController');

router.get('/class/:classId/assignment', getAllAssignmentsController);

router.get(
  '/classes/:classId/assignment/:assignmentId',
  getAssignmentByIdController
);

router.post('/class/:classId/assignment', createAssignmentController);

router.put(
  '/class/:classId/assignment/:assignmentId',
  updateAssignmentController
);

router.delete(
  '/class/:classId/assignment/:assignmentId',
  deleteAssignmentController
);

module.exports = router;
