const adminDAL = require('../DALs/AdminDAL');

// Get all admins
const getAllAdminsService = async () => {
  return adminDAL.getAllAdmins();
};

// Get admin by ID
const getAdminByIdService = async (userId) => {
  return adminDAL.getAdminById(userId);
};

// Create new admin
const createAdminService = async (data) => {
  return adminDAL.createAdmin(data);
};

// Update admin information
const updateAdminService = async (userId, data) => {
  return adminDAL.updateAdmin(userId, data);
};

// Delete admin by ID
const deleteAdminService = async (userId) => {
  return adminDAL.deleteAdmin(userId);
};

module.exports = {
  getAllAdminsService,
  getAdminByIdService,
  createAdminService,
  updateAdminService,
  deleteAdminService,
};
