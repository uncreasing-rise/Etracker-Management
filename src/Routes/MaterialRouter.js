// src/Routes/MaterialRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  createMaterialController,
  getMaterialsByClassIdController,
  getMaterialByIdController,
  updateMaterialController,
  deleteMaterialController,
} = require('../Controllers/MaterialController');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * tags:
 *   name: Material
 *   description: API to manage materials
 */

/**
 * @swagger
 * /classes/{classId}/materials:
 *   post:
 *     summary: Create a new material for a specific class
 *     tags: [Material]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *       - in: header
 *         name: teacherId
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Material created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 *       400:
 *         description: Error creating material
 */
router.post(
  '/classes/:classId/materials',
  upload.single('file'),
  createMaterialController
);

/**
 * @swagger
 * /classes/{classId}/materials:
 *   get:
 *     summary: Get all materials for a specific class
 *     tags: [Material]
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     responses:
 *       200:
 *         description: List of materials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Material'
 *       500:
 *         description: Error retrieving materials
 */
router.get('/classes/:classId/materials', getMaterialsByClassIdController);

/**
 * @swagger
 * /materials/{materialId}:
 *   get:
 *     summary: Get material by ID
 *     tags: [Material]
 *     parameters:
 *       - in: path
 *         name: materialId
 *         schema:
 *           type: string
 *         required: true
 *         description: Material ID
 *     responses:
 *       200:
 *         description: Material details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 *       404:
 *         description: Material not found
 *       500:
 *         description: Error retrieving material
 */
router.get('/materials/:materialId', getMaterialByIdController);

/**
 * @swagger
 * /materials/{materialId}:
 *   put:
 *     summary: Update material by ID
 *     tags: [Material]
 *     parameters:
 *       - in: path
 *         name: materialId
 *         schema:
 *           type: string
 *         required: true
 *         description: Material ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Material'
 *     responses:
 *       200:
 *         description: Material updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 *       404:
 *         description: Material not found
 *       400:
 *         description: Error updating material
 */
router.put('/materials/:materialId', updateMaterialController);

/**
 * @swagger
 * /materials/{materialId}:
 *   delete:
 *     summary: Delete material by ID
 *     tags: [Material]
 *     parameters:
 *       - in: path
 *         name: materialId
 *         schema:
 *           type: string
 *         required: true
 *         description: Material ID
 *     responses:
 *       200:
 *         description: Material deleted successfully
 *       404:
 *         description: Material not found
 *       500:
 *         description: Error deleting material
 */
router.delete('/materials/:materialId', deleteMaterialController);

module.exports = router;
