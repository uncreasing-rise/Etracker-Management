import { Request, Response } from 'express'
import {
  getAllTeachersService,
  getTeacherByIdService,
  createTeacherService,
  updateTeacherService,
  deleteTeacherService,
} from '../Services/TeacherService'

// Lấy tất cả giáo viên
export const getAllTeachersController = async (req: Request, res: Response) => {
  try {
    const teachers = await getAllTeachersService()
    res.json(teachers)
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' })
  }
}

// Lấy thông tin giáo viên theo ID
export const getTeacherByIdController = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const teacher = await getTeacherByIdService(userId)
    if (teacher) {
      res.json(teacher)
    } else {
      res.status(404).json({ message: 'Teacher not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' })
  }
}

// Tạo mới giáo viên
export const createTeacherController = async (req: Request, res: Response) => {
  try {
    const teacher = await createTeacherService(req.body)
    res.status(201).json(teacher)
  } catch (error) {
    res.status(400).json({ message: 'An error occurred' })
  }
}

// Cập nhật thông tin giáo viên
export const updateTeacherController = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const teacher = await updateTeacherService(userId, req.body)
    if (teacher) {
      res.json(teacher)
    } else {
      res.status(404).json({ message: 'Teacher not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'An error occurred' })
  }
}

// Xóa giáo viên theo ID
export const deleteTeacherController = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const teacher = await deleteTeacherService(userId)
    if (teacher) {
      res.json({ message: 'Teacher deleted successfully' })
    } else {
      res.status(404).json({ message: 'Teacher not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' })
  }
}
