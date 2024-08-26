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

  getAllAdminsController
);

router.get(
  '/:adminId',

  getAdminByIdController
);

router.post('/', createAdminController);

router.put(
  '/:adminId',

  updateAdminController
);

router.delete(
  '/:adminId',

  deleteAdminController
);

module.exports = router;
