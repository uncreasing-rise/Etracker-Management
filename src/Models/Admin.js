const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the structure for the admin's profile
const AdminProfileSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
});

// Define the structure for the admin document
const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin'], default: 'Admin' },
  profile: { type: AdminProfileSchema, required: true },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedDate` before saving
AdminSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updatedDate = Date.now();
  }
  next();
});

// Create and export the admin model
const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;
