import ClassModel, { IClass } from '../Models/Class'

export class ClassDAL {
  public async findAll(): Promise<IClass[]> {
    return ClassModel.find()
  }

  public async findById(classId: string): Promise<IClass | null> {
    return ClassModel.findById(classId)
  }

  public async create(classData: any): Promise<IClass> {
    const newClass = new ClassModel(classData)
    return newClass.save()
  }

  public async update(
    classId: string,
    updateData: any
  ): Promise<IClass | null> {
    return ClassModel.findByIdAndUpdate(classId, updateData, { new: true })
  }

  public async delete(classId: string): Promise<IClass | null> {
    return ClassModel.findByIdAndDelete(classId)
  }
}
