import { ScheduleDAL } from '../DALs/ScheduleDAL'

const scheduleDAL = new ScheduleDAL()

export const getAllSchedules = async () => {
  return scheduleDAL.findAll()
}

export const getScheduleById = async (scheduleId: string) => {
  return scheduleDAL.findById(scheduleId)
}

export const createSchedule = async (scheduleData: any) => {
  return scheduleDAL.create(scheduleData)
}

export const updateSchedule = async (scheduleId: string, updateData: any) => {
  return scheduleDAL.update(scheduleId, updateData)
}

export const deleteSchedule = async (scheduleId: string) => {
  return scheduleDAL.delete(scheduleId)
}
