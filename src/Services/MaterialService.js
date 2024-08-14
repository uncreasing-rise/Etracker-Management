const materialDAL = require('../DALs/MaterialDAL');
const uploadFile = require('../Utils/UploadFile');

const createMaterial = async (classId, teacherId, materialData, files) => {
  if (!classId || !teacherId || !materialData) {
    throw new Error('Class ID, teacher ID, and material data are required');
  }

  if (!Array.isArray(files) || files.length === 0) {
    throw new Error('At least one file is required');
  }

  try {
    // Upload the files and get the URLs
    const fileUrls = await Promise.all(files.map(file => uploadFile(file)));

    // Create the material
    const material = await materialDAL.createMaterial({
      ...materialData,
      classId,
      teacherId,
      fileUrls,
    });

    return material;
  } catch (error) {
    throw new Error(`Error creating material: ${error.message}`);
  }
};

const getMaterialsByClassId = async (classId) => {
  if (!classId) {
    throw new Error('Class ID is required');
  }

  try {
    const materials = await materialDAL.getMaterialsByClassId(classId);
    if (materials.length === 0) {
      throw new Error('No materials found for the given class ID');
    }
    return materials;
  } catch (error) {
    throw new Error(`Error getting materials by class ID: ${error.message}`);
  }
};

const getMaterialById = async (materialId) => {
  if (!materialId) {
    throw new Error('Material ID is required');
  }

  try {
    const material = await materialDAL.getMaterialById(materialId);
    if (!material) {
      throw new Error('Material not found');
    }
    return material;
  } catch (error) {
    throw new Error(`Error getting material by ID: ${error.message}`);
  }
};

const updateMaterial = async (materialId, updateData) => {
  if (!materialId) {
    throw new Error('Material ID is required');
  }

  try {
    const updatedMaterial = await materialDAL.updateMaterial(materialId, updateData);
    if (!updatedMaterial) {
      throw new Error('Material not found');
    }
    return updatedMaterial;
  } catch (error) {
    throw new Error(`Error updating material: ${error.message}`);
  }
};

const deleteMaterial = async (materialId) => {
  if (!materialId) {
    throw new Error('Material ID is required');
  }

  try {
    const deletedMaterial = await materialDAL.deleteMaterial(materialId);
    if (!deletedMaterial) {
      throw new Error('Material not found');
    }
    return deletedMaterial;
  } catch (error) {
    throw new Error(`Error deleting material: ${error.message}`);
  }
};

module.exports = {
  createMaterial,
  getMaterialsByClassId,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
};
