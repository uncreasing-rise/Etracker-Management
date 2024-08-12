// src/DALs/MaterialDAL.js
const MaterialModel = require('../Models/Material');

const createMaterial = async (materialData) => {
  try {
    const material = new MaterialModel(materialData);
    return await material.save();
  } catch (error) {
    throw new Error(`Error creating material: ${error.message}`);
  }
};

const getMaterialsByClassId = async (classId) => {
  try {
    return await MaterialModel.find({ classId });
  } catch (error) {
    throw new Error(`Error getting materials by class ID: ${error.message}`);
  }
};

const getMaterialById = async (materialId) => {
  try {
    return await MaterialModel.findById(materialId);
  } catch (error) {
    throw new Error(`Error getting material by ID: ${error.message}`);
  }
};

const updateMaterial = async (materialId, updateData) => {
  try {
    return await MaterialModel.findByIdAndUpdate(materialId, updateData, {
      new: true,
    });
  } catch (error) {
    throw new Error(`Error updating material: ${error.message}`);
  }
};

const deleteMaterial = async (materialId) => {
  try {
    return await MaterialModel.findByIdAndDelete(materialId);
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
