import { Request, Response } from 'express'
import {
  getAllAdminsService,
  getAdminByIdService,
  createAdminService,
  updateAdminService,
  deleteAdminService,
} from '../Services/AdminService'

// Lấy tất cả quản trị viên
export const getAllAdminsController = async (req: Request, res: Response) => {
  try {
    const admins = await getAllAdminsService()
    res.json(admins)
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' })
  }
}

// Lấy thông tin quản trị viên theo ID
export const getAdminByIdController = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const admin = await getAdminByIdService(userId)
    if (admin) {
      res.json(admin)
    } else {
      res.status(404).json({ message: 'Admin not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' })
  }
}

// Tạo mới quản trị viên
export const createAdminController = async (req: Request, res: Response) => {
  try {
    const admin = await createAdminService(req.body)
    res.status(201).json(admin)
  } catch (error) {
    res.status(400).json({ message: 'An error occurred' })
  }
}

// Cập nhật thông tin quản trị viên
export const updateAdminController = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const admin = await updateAdminService(userId, req.body)
    if (admin) {
      res.json(admin)
    } else {
      res.status(404).json({ message: 'Admin not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'An error occurred' })
  }
}

// Xóa quản trị viên theo ID
export const deleteAdminController = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const admin = await deleteAdminService(userId)
    if (admin) {
      res.json({ message: 'Admin deleted successfully' })
    } else {
      res.status(404).json({ message: 'Admin not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' })
  }
}
