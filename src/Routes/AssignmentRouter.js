const express = require('express');
const router = express.Router();
const {
  getAllAssignmentsController,
  getAssignmentByIdController,
  createAssignmentController,
  updateAssignmentController,
  deleteAssignmentController,
} = require('../Controllers/AssignmentController');

/**
 * @swagger
 * tags:
 *   name: Assignment
 *   description: API to manage assignments
 */

/**
 * @swagger
 * /api/classes/{classId}/assignments:
 *   get:
 *     summary: Get all assignments for a specific class
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: List of assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       500:
 *         description: Error retrieving assignments
 */
router.get('/classes/:classId/assignments', getAllAssignmentsController);

/**
 * @swagger
 * /api/classes/{classId}/assignments/{assignmentId}:
 *   get:
 *     summary: Get assignment by ID for a specific class
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *       - in: path
 *         name: assignmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: Assignment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: Assignment not found or Assignment not part of the specified class
 *       500:
 *         description: Error retrieving assignment
 */
router.get(
  '/classes/:classId/assignments/:assignmentId',
  getAssignmentByIdController
);

/**
 * @swagger
 * /api/classes/{classId}/assignments:
 *   post:
 *     summary: Create a new assignment for a specific class
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       400:
 *         description: Error creating assignment
 */
router.post('/classes/:classId/assignments', createAssignmentController);

/**
 * @swagger
 * /api/classes/{classId}/assignments/{assignmentId}:
 *   put:
 *     summary: Update assignment by ID for a specific class
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *       - in: path
 *         name: assignmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: Assignment not found or Assignment not part of the specified class
 *       400:
 *         description: Error updating assignment
 */
router.put(
  '/classes/:classId/assignments/:assignmentId',
  updateAssignmentController
);

/**
 * @swagger
 * /api/classes/{classId}/assignments/{assignmentId}:
 *   delete:
 *     summary: Delete assignment by ID for a specific class
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *       - in: path
 *         name: assignmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *       404:
 *         description: Assignment not found or Assignment not part of the specified class
 *       500:
 *         description: Error deleting assignment
 */
router.delete(
  '/classes/:classId/assignments/:assignmentId',
  deleteAssignmentController
);

module.exports = router;
