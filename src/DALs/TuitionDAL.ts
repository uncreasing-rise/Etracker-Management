import Tuition, { ITuition } from '../Models/Tuition';

export class TuitionDAL {
  public async findAll(): Promise<ITuition[]> {
    return Tuition.find();
  }

  public async findById(tuitionId: string): Promise<ITuition | null> {
    return Tuition.findById(tuitionId);
  }

  public async findByClassId(classId: string): Promise<ITuition[]> {
    return Tuition.find({ classId });
  }

  public async create(tuitionData: any): Promise<ITuition> {
    const tuition = new Tuition(tuitionData);
    return tuition.save();
  }

  public async update(tuitionId: string, updateData: any): Promise<ITuition | null> {
    return Tuition.findByIdAndUpdate(tuitionId, updateData, { new: true });
  }

  public async delete(tuitionId: string): Promise<ITuition | null> {
    return Tuition.findByIdAndDelete(tuitionId);
  }
}
