const {
  getAllAdminsService,
  getAdminByIdService,
  createAdminService,
  updateAdminService,
  deleteAdminService,
} = require('../Services/AdminService');
const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse');
const {
  SUCCESS_CREATE,
  SUCCESS_UPDATE,
  ERROR_MISSING_FIELDS,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
  SUCCESS_DELETE,
} = require('../Constants/ResponseMessages');

/**
 * Get all admins
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllAdminsController = async (req, res) => {
  try {
    const admins = await getAllAdminsService();
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error getting all admins:', error);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_INTERNAL_SERVER, error.message));
  }
};

/**
 * Get admin by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAdminByIdController = async (req, res) => {
  const { adminId } = req.params;
  try {
    const admin = await getAdminByIdService(adminId);
    if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(404).json(new ErrorResponse(ERROR_NOT_FOUND));
    }
  } catch (error) {
    console.error('Error getting admin by ID:', error);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_INTERNAL_SERVER, error.message));
  }
};

/**
 * Create a new admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createAdminController = async (req, res) => {
  try {
    const admin = await createAdminService(req.body);
    res.status(201).json(new SuccessResponse(SUCCESS_CREATE));
  } catch (error) {
    console.error('Error creating admin:', error);
    res
      .status(400)
      .json(new ErrorResponse(ERROR_MISSING_FIELDS, error.message));
  }
};

/**
 * Update admin information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateAdminController = async (req, res) => {
  const { adminId } = req.params;
  try {
    const admin = await updateAdminService(adminId, req.body);
    if (admin) {
      res.status(200).json(new SuccessResponse(SUCCESS_UPDATE));
    } else {
      res.status(404).json(new ErrorResponse(ERROR_NOT_FOUND));
    }
  } catch (error) {
    console.error('Error updating admin:', error);
    res
      .status(400)
      .json(new ErrorResponse(ERROR_MISSING_FIELDS, error.message));
  }
};

/**
 * Delete admin by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteAdminController = async (req, res) => {
  const { adminId } = req.params;
  try {
    const result = await deleteAdminService(adminId);
    if (result) {
      res.status(200).json(new SuccessResponse(SUCCESS_DELETE));
    } else {
      res.status(404).json(new ErrorResponse(ERROR_NOT_FOUND));
    }
  } catch (error) {
    console.error('Error deleting admin:', error);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_INTERNAL_SERVER, error.message));
  }
};

module.exports = {
  getAllAdminsController,
  getAdminByIdController,
  createAdminController,
  updateAdminController,
  deleteAdminController,
};
