import { Request, Response } from 'express'
import {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
} from '../Services/StudentService'

export const getAllStudentsController = async (req: Request, res: Response) => {
  try {
    const students = await getAllStudentsService()
    res.json(students)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const getStudentByIdController = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const student = await getStudentByIdService(userId)
    if (student) {
      res.json(student)
    } else {
      res.status(404).json({ message: 'Student not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const createStudentController = async (req: Request, res: Response) => {
  try {
    const student = await createStudentService(req.body)
    res.status(201).json(student)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const updateStudentController = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const student = await updateStudentService(userId, req.body)
    if (student) {
      res.json(student)
    } else {
      res.status(404).json({ message: 'Student not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const deleteStudentController = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const student = await deleteStudentService(userId)
    if (student) {
      res.json({ message: 'Student deleted successfully' })
    } else {
      res.status(404).json({ message: 'Student not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}
