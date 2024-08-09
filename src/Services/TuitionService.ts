import { TuitionDAL } from '../DALs/TuitionDAL'

const tuitionDAL = new TuitionDAL()

export const getAllTuitionRecords = async () => {
  return tuitionDAL.findAll()
}

export const getTuitionById = async (tuitionId: string) => {
  return tuitionDAL.findById(tuitionId)
}

export const getTuitionByClassId = async (classId: string) => {
  return tuitionDAL.findByClassId(classId)
}

export const createTuitionRecord = async (tuitionData: any) => {
  return tuitionDAL.create(tuitionData)
}

export const updateTuitionRecord = async (
  tuitionId: string,
  updateData: any
) => {
  return tuitionDAL.update(tuitionId, updateData)
}

export const deleteTuitionRecord = async (tuitionId: string) => {
  return tuitionDAL.delete(tuitionId)
}
