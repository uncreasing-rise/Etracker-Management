const mongoose = require('mongoose');
const MaterialModel = require('../Models/Material');

const createMaterial = async (materialData) => {
  const material = new MaterialModel(materialData);
  return await material.save();
};

const getMaterialsByClassId = async (classId) => {
  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new Error('Invalid class ID format');
  }

  const materials = await MaterialModel.find({ classId });
  if (materials.length === 0) {
    throw new Error('No materials found for the given class ID');
  }
  return materials;
};

const getMaterialById = async (materialId) => {
  if (!mongoose.Types.ObjectId.isValid(materialId)) {
    throw new Error('Invalid material ID format');
  }

  const material = await MaterialModel.findById(materialId);
  if (!material) {
    throw new Error('Material not found');
  }
  return material;
};

const updateMaterial = async (materialId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(materialId)) {
    throw new Error('Invalid material ID format');
  }

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
};

const deleteMaterial = async (materialId) => {
  if (!mongoose.Types.ObjectId.isValid(materialId)) {
    throw new Error('Invalid material ID format');
  }

  const deletedMaterial = await MaterialModel.findByIdAndDelete(materialId);
  if (!deletedMaterial) {
    throw new Error('Material not found');
  }
  return deletedMaterial;
};

module.exports = {
  createMaterial,
  getMaterialsByClassId,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
};
