const mongoose = require('mongoose');
const { Schema } = mongoose;

const MaterialSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true }, // URL or path to the file
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  createdDate: { type: Date, default: Date.now },
});

const MaterialModel = mongoose.model('Material', MaterialSchema);

module.exports = MaterialModel;
