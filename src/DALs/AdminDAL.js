const mongoose = require('mongoose');
const AdminModel = require('../Models/Admin'); // Adjust the path to your Admin model
const bcrypt = require('bcrypt');

// Function to find an admin by email
const findAdminByEmail = async (email) => {
  try {
    const admin = await AdminModel.findOne({ 'profile.email': email }).exec();
    return admin;
  } catch (error) {
    console.error('Error finding admin by email:', error);
    throw new Error('Error finding admin');
  }
};

// Get all admins
const get = async () => {
  try {
    return await AdminModel.find().exec();
  } catch (err) {
    throw new Error(`Error fetching admins: ${err.message}`);
  }
};

// Get admin by ID
const getAdminById = async (userId) => {
  try {
    return await AdminModel.findById(userId).exec();
  } catch (err) {
    throw new Error(`Error fetching admin by ID: ${err.message}`);
  }
};

// Create a new admin
const createAdmin = async (data) => {
  try {
    const admin = new AdminModel(data);
    return await admin.save();
  } catch (err) {
    throw new Error(`Error creating admin: ${err.message}`);
  }
};

// Update admin information
const updateAdmin = async (userId, data) => {
  try {
    return await AdminModel.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    }).exec();
  } catch (err) {
    throw new Error(`Error updating admin: ${err.message}`);
  }
};

// Delete admin by ID
const deleteAdmin = async (userId) => {
  try {
    return await AdminModel.findByIdAndDelete(userId).exec();
  } catch (err) {
    throw new Error(`Error deleting admin: ${err.message}`);
  }
};

// Find admin by ID with specific fields
const findAdminById = async (adminId) => {
  try {
    return await AdminModel.findById(adminId).select('profile.fullName').exec();
  } catch (error) {
    console.error(`Error finding admin by ID: ${error.message}`);
    throw new Error('Error finding admin');
  }
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
