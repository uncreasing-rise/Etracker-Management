const mongoose = require('mongoose');
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
  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new Error('Invalid class ID format');
  }

  try {
    const materials = await MaterialModel.find({ classId });
    if (materials.length === 0) {
      throw new Error('No materials found for the given class ID');
    }
    return materials;
  } catch (error) {
    throw new Error(`Error getting materials by class ID: ${error.message}`);
  }
};

const getMaterialById = async (materialId) => {
  if (!mongoose.Types.ObjectId.isValid(materialId)) {
    throw new Error('Invalid material ID format');
  }

  try {
    const material = await MaterialModel.findById(materialId);
    if (!material) {
      throw new Error('Material not found');
    }
    return material;
  } catch (error) {
    throw new Error(`Error getting material by ID: ${error.message}`);
  }
};

const updateMaterial = async (materialId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(materialId)) {
    throw new Error('Invalid material ID format');
  }

  try {
    const updatedMaterial = await MaterialModel.findByIdAndUpdate(
      materialId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMaterial) {
      throw new Error('Material not found');
    }

    return updatedMaterial;
  } catch (error) {
    throw new Error(`Error updating material: ${error.message}`);
  }
};

const deleteMaterial = async (materialId) => {
  if (!mongoose.Types.ObjectId.isValid(materialId)) {
    throw new Error('Invalid material ID format');
  }

  try {
    const deletedMaterial = await MaterialModel.findByIdAndDelete(materialId);
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
