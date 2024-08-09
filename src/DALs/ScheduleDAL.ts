import Schedule, { ISchedule } from '../Models/Schedule'

export class ScheduleDAL {
  public async findAll(): Promise<ISchedule[]> {
    return Schedule.find()
  }

  public async findById(scheduleId: string): Promise<ISchedule | null> {
    return Schedule.findById(scheduleId)
  }

  public async create(scheduleData: any): Promise<ISchedule> {
    const schedule = new Schedule(scheduleData)
    return schedule.save()
  }

  public async update(
    scheduleId: string,
    updateData: any
  ): Promise<ISchedule | null> {
    return Schedule.findByIdAndUpdate(scheduleId, updateData, { new: true })
  }

  public async delete(scheduleId: string): Promise<ISchedule | null> {
    return Schedule.findByIdAndDelete(scheduleId)
  }
}
