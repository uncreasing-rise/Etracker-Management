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

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: API to manage teachers
 */

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 *       500:
 *         description: Error retrieving teachers
 */
router.get(
  '/',
  authenticateToken,
  authorization(['admin', 'teacher']),
  getAllTeachersController
);

/**
 * @swagger
 * /api/teachers/{userId}:
 *   get:
 *     summary: Get teacher by ID
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Error retrieving teacher
 */
router.get(
  '/:userId',
  authenticateToken,
  authorization(['admin', 'teacher']),
  getTeacherByIdController
);

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       400:
 *         description: Error creating teacher
 */
router.post(
  '/',
  authenticateToken,
  authorization(['admin']),
  createTeacherController
);

/**
 * @swagger
 * /api/teachers/{userId}:
 *   put:
 *     summary: Update teacher by ID
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Teacher not found
 *       400:
 *         description: Error updating teacher
 */
router.put(
  '/:userId',
  authenticateToken,
  authorization(['admin']),
  updateTeacherController
);

/**
 * @swagger
 * /api/teachers/{userId}:
 *   delete:
 *     summary: Delete teacher by ID
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Error deleting teacher
 */
router.delete(
  '/:userId',
  authenticateToken,
  authorization(['admin']),
  deleteTeacherController
);

module.exports = router;
