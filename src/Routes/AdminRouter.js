const express = require('express');
const router = express.Router();
const {
  getAllAdminsController,
  getAdminByIdController,
  createAdminController,
  updateAdminController,
  deleteAdminController,
} = require('../Controllers/AdminController');
const { authenticateToken } = require('../Middlewares/Authentication');
const { authorization } = require('../Middlewares/Authorization');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API to manage admins
 */

/**
 * @swagger
 * /api/admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Error retrieving admins
 */
router.get(
  '/',
  authenticateToken,
  authorization(['admin']),
  getAllAdminsController
);

/**
 * @swagger
 * /api/admins/{userId}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Error retrieving admin
 */
router.get(
  '/:userId',
  authenticateToken,
  authorization(['admin']),
  getAdminByIdController
);

/**
 * @swagger
 * /api/admins:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Error creating admin
 */
router.post(
  '/',

  createAdminController
);

/**
 * @swagger
 * /api/admins/{userId}:
 *   put:
 *     summary: Update admin by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Admin not found
 *       400:
 *         description: Error updating admin
 */
router.put(
  '/:userId',
  authenticateToken,
  authorization(['admin']),
  updateAdminController
);

/**
 * @swagger
 * /api/admins/{userId}:
 *   delete:
 *     summary: Delete admin by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Error deleting admin
 */
router.delete(
  '/:userId',
  authenticateToken,
  authorization(['admin']),
  deleteAdminController
);

module.exports = router;
