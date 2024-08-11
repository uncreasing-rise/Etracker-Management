const express = require('express');
const router = express.Router();
const {
  getAllEnrollmentsController,
  getEnrollmentByIdController,
  createEnrollmentController,
  updateEnrollmentController,
  deleteEnrollmentController,
} = require('../Controllers/EnrollmentController');

/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: API to manage enrollments
 */

/**
 * @swagger
 * /api/enrollments:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollment]
 *     responses:
 *       200:
 *         description: List of enrollments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enrollment'
 *       500:
 *         description: Error retrieving enrollments
 */
router.get('/', getAllEnrollmentsController);

/**
 * @swagger
 * /api/enrollments/{enrollmentId}:
 *   get:
 *     summary: Get enrollment by ID
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Error retrieving enrollment
 */
router.get('/:enrollmentId', getEnrollmentByIdController);

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       400:
 *         description: Error creating enrollment
 */
router.post('/', createEnrollmentController);

/**
 * @swagger
 * /api/enrollments/{enrollmentId}:
 *   put:
 *     summary: Update enrollment by ID
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Enrollment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       200:
 *         description: Enrollment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       404:
 *         description: Enrollment not found
 *       400:
 *         description: Error updating enrollment
 */
router.put('/:enrollmentId', updateEnrollmentController);

/**
 * @swagger
 * /api/enrollments/{enrollmentId}:
 *   delete:
 *     summary: Delete enrollment by ID
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Error deleting enrollment
 */
router.delete('/:enrollmentId', deleteEnrollmentController);

module.exports = router;
