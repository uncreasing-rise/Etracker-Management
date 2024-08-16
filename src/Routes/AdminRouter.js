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

router.get(
  '/',
  authenticateToken,
  authorization(['admin']),
  getAllAdminsController
);

router.get(
  '/:adminId',
  authenticateToken,
  authorization(['admin']),
  getAdminByIdController
);

router.post('/', createAdminController);

router.put(
  '/:adminId',
  authenticateToken,
  authorization(['admin']),
  updateAdminController
);

router.delete(
  '/:adminId',
  authenticateToken,
  authorization(['admin']),
  deleteAdminController
);

module.exports = router;
