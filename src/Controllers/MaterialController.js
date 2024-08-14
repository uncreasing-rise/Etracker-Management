const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse'); // Adjust path as necessary
const materialService = require('../Services/MaterialService');

// Create a new material
const createMaterialController = async (req, res) => {
  const { classId, teacherId } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json(new ErrorResponse('File is required'));
  }

  try {
    const material = await materialService.createMaterial(
      classId,
      teacherId,
      req.body,
      file
    );
    res
      .status(201)
      .json(new SuccessResponse('Material created successfully', material));
  } catch (error) {
    res
      .status(400)
      .json(new ErrorResponse('Error creating material', error.message));
  }
};

// Get materials by class ID
const getMaterialsByClassIdController = async (req, res) => {
  const { classId } = req.params;

  try {
    const materials = await materialService.getMaterialsByClassId(classId);
    res
      .status(200)
      .json(new SuccessResponse('Materials retrieved successfully', materials));
  } catch (error) {
    res
      .status(500)
      .json(new ErrorResponse('Error retrieving materials', error.message));
  }
};

// Get material by ID
const getMaterialByIdController = async (req, res) => {
  const { materialId } = req.params;

  try {
    const material = await materialService.getMaterialById(materialId);
    if (material) {
      res
        .status(200)
        .json(new SuccessResponse('Material retrieved successfully', material));
    } else {
      res.status(404).json(new ErrorResponse('Material not found'));
    }
  } catch (error) {
    res
      .status(500)
      .json(new ErrorResponse('Error retrieving material', error.message));
  }
};

// Update material information
const updateMaterialController = async (req, res) => {
  const { materialId } = req.params;

  try {
    const updatedMaterial = await materialService.updateMaterial(
      materialId,
      req.body
    );
    if (updatedMaterial) {
      res
        .status(200)
        .json(
          new SuccessResponse('Material updated successfully', updatedMaterial)
        );
    } else {
      res.status(404).json(new ErrorResponse('Material not found'));
    }
  } catch (error) {
    res
      .status(400)
      .json(new ErrorResponse('Error updating material', error.message));
  }
};

// Delete material by ID
const deleteMaterialController = async (req, res) => {
  const { materialId } = req.params;

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
    res
      .status(500)
      .json(new ErrorResponse('Error deleting material', error.message));
  }
};

module.exports = {
  createMaterialController,
  getMaterialsByClassIdController,
  getMaterialByIdController,
  updateMaterialController,
  deleteMaterialController,
};
