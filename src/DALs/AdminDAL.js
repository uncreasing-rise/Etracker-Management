const mongoose = require('mongoose');
const AdminModel = require('../Models/Admin'); // Điều chỉnh đường dẫn đến mô hình Admin của bạn

// Function to find an admin by email
const findAdminByEmail = async (email) => {
  return await AdminModel.findOne({ 'profile.email': email }).exec();
};

// Get all admins
const get = async () => {
  return await AdminModel.find().exec();
};

// Get admin by ID
const getAdminById = async (userId) => {
  return await AdminModel.findById(userId).exec();
};

// Create a new admin
const createAdmin = async (data) => {
  const admin = new AdminModel(data);
  return await admin.save();
};

// Update admin information
const updateAdmin = async (userId, data) => {
  return await AdminModel.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  }).exec();
};

// Delete admin by ID
const deleteAdmin = async (userId) => {
  return await AdminModel.findByIdAndDelete(userId).exec();
};

// Find admin by ID with specific fields
const findAdminById = async (adminId) => {
  return await AdminModel.findById(adminId).select('profile.fullName').exec();
};

module.exports = {
  get,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  findAdminByEmail,
  findAdminById,
};
