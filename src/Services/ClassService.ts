import { ClassDAL } from '../DALs/ClassDAL'

const classDAL = new ClassDAL()

export const getAllClasses = async () => {
  return classDAL.findAll()
}

export const getClassById = async (classId: string) => {
  return classDAL.findById(classId)
}

export const createClass = async (classData: any) => {
  return classDAL.create(classData)
}

export const updateClass = async (classId: string, updateData: any) => {
  return classDAL.update(classId, updateData)
}

export const deleteClass = async (classId: string) => {
  return classDAL.delete(classId)
}
