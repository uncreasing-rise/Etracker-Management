import mongoose, { Schema, Document } from 'mongoose';

interface ITuition extends Document {
  classId: string;
  amount: number;
  dueDate: Date;
  status: 'paid' | 'unpaid';
}

const TuitionSchema: Schema = new Schema({
  classId: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'unpaid'], required: true },
});

const Tuition = mongoose.model<ITuition>('Tuition', TuitionSchema);

export default Tuition;
export { ITuition };
