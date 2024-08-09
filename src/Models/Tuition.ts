import mongoose, { Schema, Document } from 'mongoose';

interface ITuition extends Document {
  studentId: string;
  classId: string;
  amount: number;
  dueDate: Date;
  status: 'paid' | 'unpaid';
  paymentDate?: Date;
}

const TuitionSchema: Schema = new Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'unpaid'], required: true },
  paymentDate: { type: Date },
});

const Tuition = mongoose.model<ITuition>('Tuition', TuitionSchema);

export default Tuition;
export { ITuition };
