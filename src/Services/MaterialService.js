// src/Services/MaterialService.js
const materialDAL = require('../DALs/MaterialDAL');
const uploadFile = require('../Utils/UploadFile');

const createMaterial = async (classId, teacherId, materialData, file) => {
  if (!classId || !teacherId || !materialData) {
    throw new Error('Class ID, teacher ID, and material data are required');
  }

  try {
    // Upload the file and get the URL
    const fileUrl = await uploadFile(file);

    // Create the material
    const material = await materialDAL.createMaterial({
      ...materialData,
      classId,
      teacherId,
      fileUrl,
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
    return await materialDAL.getMaterialsByClassId(classId);
  } catch (error) {
    throw new Error(`Error getting materials by class ID: ${error.message}`);
  }
};

const getMaterialById = async (materialId) => {
  if (!materialId) {
    throw new Error('Material ID is required');
  }

  try {
    return await materialDAL.getMaterialById(materialId);
  } catch (error) {
    throw new Error(`Error getting material by ID: ${error.message}`);
  }
};

const updateMaterial = async (materialId, updateData) => {
  if (!materialId) {
    throw new Error('Material ID is required');
  }

  try {
    return await materialDAL.updateMaterial(materialId, updateData);
  } catch (error) {
    throw new Error(`Error updating material: ${error.message}`);
  }
};

const deleteMaterial = async (materialId) => {
  if (!materialId) {
    throw new Error('Material ID is required');
  }

  try {
    return await materialDAL.deleteMaterial(materialId);
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
