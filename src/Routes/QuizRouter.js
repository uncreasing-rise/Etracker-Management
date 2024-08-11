// src/Routes/QuizRoutes.js

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
 * /api/quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quiz]
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
router.get('/', getAllQuizzesController);

/**
 * @swagger
 * /api/quizzes/{quizId}:
 *   get:
 *     summary: Get quiz by ID
 *     tags: [Quiz]
 *     parameters:
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
 *         description: Quiz not found
 *       500:
 *         description: Error retrieving quiz
 */
router.get('/:quizId', getQuizByIdController);

/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quiz]
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
router.post('/', createQuizController);

/**
 * @swagger
 * /api/quizzes/{quizId}:
 *   put:
 *     summary: Update quiz by ID
 *     tags: [Quiz]
 *     parameters:
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
 *         description: Quiz not found
 *       400:
 *         description: Error updating quiz
 */
router.put('/:quizId', updateQuizController);

/**
 * @swagger
 * /api/quizzes/{quizId}:
 *   delete:
 *     summary: Delete quiz by ID
 *     tags: [Quiz]
 *     parameters:
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
 *         description: Quiz not found
 *       500:
 *         description: Error deleting quiz
 */
router.delete('/:quizId', deleteQuizController);

module.exports = router;
