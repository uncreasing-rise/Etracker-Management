const express = require('express');
const router = express.Router();
const {
  getAllQuizzesController,
  getQuizByIdController,
  createQuizController,
  updateQuizController,
  deleteQuizController,
} = require('../Controllers/QuizController');

/**
 * @swagger
 * tags:
 *   name: Quiz
 *   description: API to manage quizzes
 */

/**
 * @swagger
 * /api/classes/{classId}/quizzes:
 *   get:
 *     summary: Get all quizzes for a specific class
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: List of quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quiz'
 *       500:
 *         description: Error retrieving quizzes
 */
router.get('/classes/:classId/quizzes', getAllQuizzesController);

/**
 * @swagger
 * /api/classes/{classId}/quizzes/{quizId}:
 *   get:
 *     summary: Get quiz by ID for a specific class
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: string
 *         required: true
 *         description: Quiz ID
 *     responses:
 *       200:
 *         description: Quiz details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       404:
 *         description: Quiz not found or Quiz not part of the specified class
 *       500:
 *         description: Error retrieving quiz
 */
router.get('/classes/:classId/quizzes/:quizId', getQuizByIdController);

/**
 * @swagger
 * /api/classes/{classId}/quizzes:
 *   post:
 *     summary: Create a new quiz for a specific class
 *     tags: [Quiz]
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
 *             $ref: '#/components/schemas/Quiz'
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       400:
 *         description: Error creating quiz
 */
router.post('/classes/:classId/quizzes', createQuizController);

/**
 * @swagger
 * /api/classes/{classId}/quizzes/{quizId}:
 *   put:
 *     summary: Update quiz by ID for a specific class
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: string
 *         required: true
 *         description: Quiz ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quiz'
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       404:
 *         description: Quiz not found or Quiz not part of the specified class
 *       400:
 *         description: Error updating quiz
 */
router.put('/classes/:classId/quizzes/:quizId', updateQuizController);

/**
 * @swagger
 * /api/classes/{classId}/quizzes/{quizId}:
 *   delete:
 *     summary: Delete quiz by ID for a specific class
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: string
 *         required: true
 *         description: Quiz ID
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found or Quiz not part of the specified class
 *       500:
 *         description: Error deleting quiz
 */
router.delete('/classes/:classId/quizzes/:quizId', deleteQuizController);

module.exports = router;
