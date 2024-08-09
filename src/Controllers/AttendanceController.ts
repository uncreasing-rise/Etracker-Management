import { Request, Response } from 'express'
import {
  getAllAttendanceRecords,
  getAttendanceById,
  getAttendanceByClassId,
  createAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
} from '../Services/AttendanceService'

export const getAllAttendanceController = async (
  req: Request,
  res: Response
) => {
  try {
    const attendanceRecords = await getAllAttendanceRecords()
    res.json(attendanceRecords)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const getAttendanceByIdController = async (
  req: Request,
  res: Response
) => {
  const { attendanceId } = req.params
  try {
    const attendanceRecord = await getAttendanceById(attendanceId)
    if (attendanceRecord) {
      res.json(attendanceRecord)
    } else {
      res.status(404).json({ message: 'Attendance record not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const getAttendanceByClassIdController = async (
  req: Request,
  res: Response
) => {
  const { classId } = req.params
  try {
    const attendanceRecords = await getAttendanceByClassId(classId)
    res.json(attendanceRecords)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const createAttendanceController = async (
  req: Request,
  res: Response
) => {
  try {
    const attendanceRecord = await createAttendanceRecord(req.body)
    res.status(201).json(attendanceRecord)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const updateAttendanceController = async (
  req: Request,
  res: Response
) => {
  const { attendanceId } = req.params
  try {
    const attendanceRecord = await updateAttendanceRecord(
      attendanceId,
      req.body
    )
    if (attendanceRecord) {
      res.json(attendanceRecord)
    } else {
      res.status(404).json({ message: 'Attendance record not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const deleteAttendanceController = async (
  req: Request,
  res: Response
) => {
  const { attendanceId } = req.params
  try {
    const attendanceRecord = await deleteAttendanceRecord(attendanceId)
    if (attendanceRecord) {
      res.json({ message: 'Attendance record deleted successfully' })
    } else {
      res.status(404).json({ message: 'Attendance record not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}
