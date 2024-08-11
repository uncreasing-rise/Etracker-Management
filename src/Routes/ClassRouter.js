// src/Routes/ClassRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllClassesController,
  getClassByIdController,
  createClassController,
  updateClassController,
  deleteClassController,
} = require('../Controllers/ClassController');

/**
 * @swagger
 * tags:
 *   name: Class
 *   description: API to manage classes
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Class]
 *     responses:
 *       200:
 *         description: List of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       500:
 *         description: Error retrieving classes
 */
router.get('/', getAllClassesController);

/**
 * @swagger
 * /api/classes/{classId}:
 *   get:
 *     summary: Get class by ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Class details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found
 *       500:
 *         description: Error retrieving class
 */
router.get('/:classId', getClassByIdController);

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Class]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         description: Error creating class
 */
router.post('/', createClassController);

/**
 * @swagger
 * /api/classes/{classId}:
 *   put:
 *     summary: Update class by ID
 *     tags: [Class]
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
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Class updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found
 *       400:
 *         description: Error updating class
 */
router.put('/:classId', updateClassController);

/**
 * @swagger
 * /api/classes/{classId}:
 *   delete:
 *     summary: Delete class by ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 *       500:
 *         description: Error deleting class
 */
router.delete('/:classId', deleteClassController);

module.exports = router;
