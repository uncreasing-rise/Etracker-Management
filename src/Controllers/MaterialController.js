// src/Controllers/MaterialController.js
const materialService = require('../Services/MaterialService');

const createMaterialController = async (req, res) => {
  const { classId, teacherId } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'File is required' });
  }

  try {
    const material = await materialService.createMaterial(
      classId,
      teacherId,
      req.body,
      file
    );
    res.status(201).json(material);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating material', error: error.message });
  }
};

const getMaterialsByClassIdController = async (req, res) => {
  const { classId } = req.params;

  try {
    const materials = await materialService.getMaterialsByClassId(classId);
    res.status(200).json(materials);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving materials', error: error.message });
  }
};

const getMaterialByIdController = async (req, res) => {
  const { materialId } = req.params;

  try {
    const material = await materialService.getMaterialById(materialId);
    if (material) {
      res.status(200).json(material);
    } else {
      res.status(404).json({ message: 'Material not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving material', error: error.message });
  }
};

const updateMaterialController = async (req, res) => {
  const { materialId } = req.params;

  try {
    const updatedMaterial = await materialService.updateMaterial(
      materialId,
      req.body
    );
    if (updatedMaterial) {
      res.status(200).json(updatedMaterial);
    } else {
      res.status(404).json({ message: 'Material not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating material', error: error.message });
  }
};

const deleteMaterialController = async (req, res) => {
  const { materialId } = req.params;

  try {
    const deletedMaterial = await materialService.deleteMaterial(materialId);
    if (deletedMaterial) {
      res.status(200).json({ message: 'Material deleted successfully' });
    } else {
      res.status(404).json({ message: 'Material not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting material', error: error.message });
  }
};

module.exports = {
  createMaterialController,
  getMaterialsByClassIdController,
  getMaterialByIdController,
  updateMaterialController,
  deleteMaterialController,
};
