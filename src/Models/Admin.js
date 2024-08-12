const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the structure for the admin's profile
const AdminProfileSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
});

// Define the structure for the system settings
const SystemSettingsSchema = new Schema(
  {
    classConfig: {
      maxClasses: { type: Number, default: 10 },
    },
    userManagement: {
      canCreateUsers: { type: Boolean, default: true },
    },
  },
  { _id: false }
); // No need for an _id field here

// Define the structure for audit logs
const AuditLogSchema = new Schema(
  {
    action: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
); // No need for an _id field here

// Define the structure for the admin document
const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin'], default: 'Admin' },
  profile: { type: AdminProfileSchema, required: true },
  systemSettings: { type: SystemSettingsSchema, default: {} },
  auditLogs: { type: [AuditLogSchema], default: [] }, // Default to an empty array
});

// Create and export the admin model
const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;
