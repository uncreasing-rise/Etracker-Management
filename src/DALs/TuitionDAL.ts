import Tuition, { ITuition } from '../Models/Tuition'

export class TuitionDAL {
  // Fetch all tuition records
  public async findAll(): Promise<ITuition[]> {
    return Tuition.find().exec()
  }

  // Fetch a tuition record by its ID
  public async findById(tuitionId: string): Promise<ITuition | null> {
    return Tuition.findById(tuitionId).exec()
  }

  // Fetch all tuition records for a specific class ID
  public async findByClassId(classId: string): Promise<ITuition[]> {
    return Tuition.find({ classId }).exec()
  }

  // Create a new tuition record
  public async create(tuitionData: ITuition): Promise<ITuition> {
    const tuition = new Tuition(tuitionData)
    return tuition.save()
  }

  // Update an existing tuition record by its ID
  public async update(
    tuitionId: string,
    updateData: Partial<ITuition>
  ): Promise<ITuition | null> {
    return Tuition.findByIdAndUpdate(tuitionId, updateData, {
      new: true,
    }).exec()
  }

  // Delete a tuition record by its ID
  public async delete(tuitionId: string): Promise<ITuition | null> {
    return Tuition.findByIdAndDelete(tuitionId).exec()
  }
}
