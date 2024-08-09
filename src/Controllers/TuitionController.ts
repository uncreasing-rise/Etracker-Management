import { Request, Response } from 'express'
import {
  getAllTuitionRecords,
  getTuitionById,
  getTuitionByClassId,
  createTuitionRecord,
  updateTuitionRecord,
  deleteTuitionRecord,
} from '../Services/TuitionService'

export const getAllTuitionController = async (req: Request, res: Response) => {
  try {
    const tuitionRecords = await getAllTuitionRecords()
    res.json(tuitionRecords)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const getTuitionByIdController = async (req: Request, res: Response) => {
  const { tuitionId } = req.params
  try {
    const tuitionRecord = await getTuitionById(tuitionId)
    if (tuitionRecord) {
      res.json(tuitionRecord)
    } else {
      res.status(404).json({ message: 'Tuition record not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const getTuitionByClassIdController = async (
  req: Request,
  res: Response
) => {
  const { classId } = req.params
  try {
    const tuitionRecords = await getTuitionByClassId(classId)
    res.json(tuitionRecords)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const createTuitionController = async (req: Request, res: Response) => {
  try {
    const tuitionRecord = await createTuitionRecord(req.body)
    res.status(201).json(tuitionRecord)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const updateTuitionController = async (req: Request, res: Response) => {
  const { tuitionId } = req.params
  try {
    const tuitionRecord = await updateTuitionRecord(tuitionId, req.body)
    if (tuitionRecord) {
      res.json(tuitionRecord)
    } else {
      res.status(404).json({ message: 'Tuition record not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}

export const deleteTuitionController = async (req: Request, res: Response) => {
  const { tuitionId } = req.params
  try {
    const tuitionRecord = await deleteTuitionRecord(tuitionId)
    if (tuitionRecord) {
      res.json({ message: 'Tuition record deleted successfully' })
    } else {
      res.status(404).json({ message: 'Tuition record not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}
