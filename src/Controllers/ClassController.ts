import { Request, Response } from 'express'
import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} from '../Services/ClassService'

export const getAllClassesController = async (req: Request, res: Response) => {
  try {
    const classes = await getAllClasses()
    res.json(classes)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const getClassByIdController = async (req: Request, res: Response) => {
  const { classId } = req.params
  try {
    const classData = await getClassById(classId)
    if (classData) {
      res.json(classData)
    } else {
      res.status(404).json({ message: 'Class not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const createClassController = async (req: Request, res: Response) => {
  try {
    const classData = await createClass(req.body)
    res.status(201).json(classData)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const updateClassController = async (req: Request, res: Response) => {
  const { classId } = req.params
  try {
    const classData = await updateClass(classId, req.body)
    if (classData) {
      res.json(classData)
    } else {
      res.status(404).json({ message: 'Class not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const deleteClassController = async (req: Request, res: Response) => {
  const { classId } = req.params
  try {
    const classData = await deleteClass(classId)
    if (classData) {
      res.json({ message: 'Class deleted successfully' })
    } else {
      res.status(404).json({ message: 'Class not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}
