const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse'); // Adjust path as necessary
const materialService = require('../Services/MaterialService');
const {
  ERROR_FILE_REQUIRED,
  ERROR_CLASS_ID_REQUIRED,
  ERROR_MATERIAL_ID_REQUIRED,
  ERROR_RETRIEVAL,
  ERROR_CREATION,
  ERROR_UPDATE,
  ERROR_DELETION,
} = require('../Constants/ResponseMessages');

// Create a new material
const createMaterialController = async (req, res) => {
  const { classId, teacherId } = req.params;
  const files = req.files; // Expecting multiple files

  if (!files || files.length === 0) {
    return res.status(400).json(new ErrorResponse(ERROR_FILE_REQUIRED));
  }

  try {
    const material = await materialService.createMaterial(
      classId,
      teacherId,
      req.body,
      files
    );
    res.status(201).json(new SuccessResponse('Material created successfully'));
  } catch (error) {
    res.status(400).json(new ErrorResponse(ERROR_CREATION, error.message));
  }
};

// Get materials by class ID
const getMaterialsByClassIdController = async (req, res) => {
  const { classId } = req.params;

  if (!classId) {
    return res.status(400).json(new ErrorResponse(ERROR_CLASS_ID_REQUIRED));
  }

  try {
    const materials = await materialService.getMaterialsByClassId(classId);
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json(new ErrorResponse(ERROR_RETRIEVAL, error.message));
  }
};

// Get material by ID
const getMaterialByIdController = async (req, res) => {
  const { materialId } = req.params;

  if (!materialId) {
    return res.status(400).json(new ErrorResponse(ERROR_MATERIAL_ID_REQUIRED));
  }

  try {
    const material = await materialService.getMaterialById(materialId);
    if (material) {
      res.status(200).json(material);
    } else {
      res.status(404).json(new ErrorResponse('Material not found'));
    }
  } catch (error) {
    res.status(500).json(new ErrorResponse(ERROR_RETRIEVAL, error.message));
  }
};

// Update material information
const updateMaterialController = async (req, res) => {
  const { materialId } = req.params;

  if (!materialId) {
    return res.status(400).json(new ErrorResponse(ERROR_MATERIAL_ID_REQUIRED));
  }

  try {
    const updatedMaterial = await materialService.updateMaterial(
      materialId,
      req.body
    );
    if (updatedMaterial) {
      res
        .status(200)
        .json(new SuccessResponse('Material updated successfully'));
    } else {
      res.status(404).json(new ErrorResponse('Material not found'));
    }
  } catch (error) {
    res.status(400).json(new ErrorResponse(ERROR_UPDATE, error.message));
  }
};

// Delete material by ID
const deleteMaterialController = async (req, res) => {
  const { materialId } = req.params;

  if (!materialId) {
    return res.status(400).json(new ErrorResponse(ERROR_MATERIAL_ID_REQUIRED));
  }

  try {
    const deletedMaterial = await materialService.deleteMaterial(materialId);
    if (deletedMaterial) {
      res
        .status(200)
        .json(new SuccessResponse('Material deleted successfully'));
    } else {
      res.status(404).json(new ErrorResponse('Material not found'));
    }
  } catch (error) {
    res.status(500).json(new ErrorResponse(ERROR_DELETION, error.message));
  }
};

module.exports = {
  createMaterialController,
  getMaterialsByClassIdController,
  getMaterialByIdController,
  updateMaterialController,
  deleteMaterialController,
};
