const AdminModel = require('../Models/Admin');
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

// Function to create a new admin
const createAdmin = async (adminData) => {
  try {
    // Check if password is provided
    if (!adminData.password) {
      throw new Error('Password is required');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(adminData.password, 10); // 10 is the salt rounds

    // Create a new admin object with the hashed password
    const admin = new AdminModel({
      ...adminData,
      password: hashedPassword,
    });

    // Save the admin to the database
    await admin.save();

    // Return the created admin object
    return admin;
  } catch (error) {
    console.error('Error creating admin:', error);
    throw new Error('Error creating admin');
  }
};
// Function to update an admin by ID
const updateAdminById = async (id, updateData) => {
  try {
    const admin = await AdminModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
    return admin;
  } catch (error) {
    console.error('Error updating admin by ID:', error);
    throw new Error('Error updating admin');
  }
};

// Function to delete an admin by ID
const deleteAdminById = async (id) => {
  try {
    const admin = await AdminModel.findByIdAndDelete(id).exec();
    return admin;
  } catch (error) {
    console.error('Error deleting admin by ID:', error);
    throw new Error('Error deleting admin');
  }
};

module.exports = {
  findAdminByEmail,
  createAdmin,
  updateAdminById,
  deleteAdminById,
};
