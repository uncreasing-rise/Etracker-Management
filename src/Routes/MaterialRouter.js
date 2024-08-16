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

const upload = multer({ dest: 'uploads/' });

router.post(
  '/classes/:classId/materials',
  upload.single('file'),
  createMaterialController
);

router.get('/class/:classId/material', getMaterialsByClassIdController);

router.get('/class/material/:materialId', getMaterialByIdController);

router.put('/class/material/:materialId', updateMaterialController);

router.delete('/class/material/:materialId', deleteMaterialController);

module.exports = router;
