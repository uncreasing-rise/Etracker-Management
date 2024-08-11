const {
  getAllAdminsService,
  getAdminByIdService,
  createAdminService,
  updateAdminService,
  deleteAdminService,
} = require('../Services/AdminService');

/**
 * Get all admins
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllAdminsController = async (req, res) => {
  try {
    const admins = await getAllAdminsService();
    res.json(admins);
  } catch (error) {
    console.error('Error getting all admins:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

/**
 * Get admin by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAdminByIdController = async (req, res) => {
  const { userId } = req.params;
  try {
    const admin = await getAdminByIdService(userId);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error getting admin by ID:', error);
    res.status(500).json({ message: 'An error occurred' });
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
    res.status(201).json(admin);
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(400).json({ message: 'An error occurred' });
  }
};

/**
 * Update admin information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateAdminController = async (req, res) => {
  const { userId } = req.params;
  try {
    const admin = await updateAdminService(userId, req.body);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(400).json({ message: 'An error occurred' });
  }
};

/**
 * Delete admin by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteAdminController = async (req, res) => {
  const { userId } = req.params;
  try {
    const admin = await deleteAdminService(userId);
    if (admin) {
      res.json({ message: 'Admin deleted successfully' });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = {
  getAllAdminsController,
  getAdminByIdController,
  createAdminController,
  updateAdminController,
  deleteAdminController,
};
