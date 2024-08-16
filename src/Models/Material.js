const mongoose = require('mongoose');
const { Schema } = mongoose;

const MaterialSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrls: [{ type: String, required: true }], // Array to store multiple file URLs
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  createdDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['active', 'archived', 'in review'], // Define the possible statuses
    default: 'active', // Default status if not specified
  },
});

const MaterialModel = mongoose.model('Material', MaterialSchema);

module.exports = MaterialModel;
