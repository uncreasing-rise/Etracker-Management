import { Request, Response } from 'express'
import Schedule from '../Models/Schedule'

// Lấy tất cả suất học
export const getAllSchedulesController = async (
  req: Request,
  res: Response
) => {
  try {
    const schedules = await Schedule.find()
    res.json(schedules)
  } catch {
    res.status(500).json({ message: 'An error occurred' })
  }
}

// Lấy suất học theo ID
export const getScheduleByIdController = async (
  req: Request,
  res: Response
) => {
  const { scheduleId } = req.params
  try {
    const schedule = await Schedule.findById(scheduleId)
    if (schedule) {
      res.json(schedule)
    } else {
      res.status(404).json({ message: 'Schedule not found' })
    }
  } catch {
    res.status(500).json({ message: 'An error occurred' })
  }
}

// Tạo suất học mới
export const createScheduleController = async (req: Request, res: Response) => {
  try {
    const schedule = new Schedule(req.body)
    await schedule.save()
    res.status(201).json(schedule)
  } catch {
    res.status(400).json({ message: 'An error occurred' })
  }
}

// Cập nhật suất học
export const updateScheduleController = async (req: Request, res: Response) => {
  const { scheduleId } = req.params
  try {
    const schedule = await Schedule.findByIdAndUpdate(scheduleId, req.body, {
      new: true,
    })
    if (schedule) {
      res.json(schedule)
    } else {
      res.status(404).json({ message: 'Schedule not found' })
    }
  } catch {
    res.status(400).json({ message: 'An error occurred' })
  }
}

// Xóa suất học
export const deleteScheduleController = async (req: Request, res: Response) => {
  const { scheduleId } = req.params
  try {
    const schedule = await Schedule.findByIdAndDelete(scheduleId)
    if (schedule) {
      res.json({ message: 'Schedule deleted successfully' })
    } else {
      res.status(404).json({ message: 'Schedule not found' })
    }
  } catch {
    res.status(500).json({ message: 'An error occurred' })
  }
}
