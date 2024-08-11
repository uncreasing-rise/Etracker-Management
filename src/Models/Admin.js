const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the structure for the admin's profile
const AdminProfileSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

// Define the structure for the system settings
const SystemSettingsSchema = new Schema({
  classConfig: {
    maxClasses: { type: Number, required: true },
    defaultSettings: {
      classDuration: { type: Number, required: true },
      classCapacity: { type: Number, required: true },
    },
  },
  userManagement: {
    canCreateUsers: { type: Boolean, required: true },
    canDeleteUsers: { type: Boolean, required: true },
    canUpdateUsers: { type: Boolean, required: true },
  },
  reporting: {
    enabled: { type: Boolean, required: true },
    defaultReportSettings: {
      reportTypes: { type: [String], required: true },
      defaultFormat: { type: String, required: true },
    },
  },
});

// Define the structure for audit logs
const AuditLogSchema = new Schema({
  logId: { type: Schema.Types.ObjectId, required: true },
  action: { type: String, required: true },
  date: { type: Date, required: true },
  adminId: { type: Schema.Types.ObjectId, required: true },
  details: { type: String, required: true },
});

// Define the structure for the admin document
const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: AdminProfileSchema, required: true },
  systemSettings: { type: SystemSettingsSchema, required: true },
  auditLogs: [AuditLogSchema],
});

// Create and export the admin model
const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;
