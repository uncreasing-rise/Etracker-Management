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

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: API to manage students
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Error retrieving students
 */
router.get(
  '/',
  authenticateToken,
  authorization(['admin', 'teacher']),
  getAllStudentsController
);

/**
 * @swagger
 * /api/students/{userId}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       500:
 *         description: Error retrieving student
 */
router.get(
  '/:userId',
  authenticateToken,
  authorization(['admin', 'teacher']),
  getStudentByIdController
);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Error creating student
 */
router.post(
  '/',
  authenticateToken,
  authorization(['admin']),
  createStudentController
);

/**
 * @swagger
 * /api/students/{userId}:
 *   put:
 *     summary: Update student by ID
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *       400:
 *         description: Error updating student
 */
router.put(
  '/:userId',
  authenticateToken,
  authorization(['admin']),
  updateStudentController
);

/**
 * @swagger
 * /api/students/{userId}:
 *   delete:
 *     summary: Delete student by ID
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Error deleting student
 */
router.delete(
  '/:userId',
  authenticateToken,
  authorization(['admin']),
  deleteStudentController
);

module.exports = router;
