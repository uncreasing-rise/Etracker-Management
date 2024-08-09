import { Router } from 'express'
import {
  getAllStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
} from '../Controllers/StudentController'

const router = Router()

// Route để lấy tất cả học sinh
router.get('/students', getAllStudentsController)

// Route để lấy học sinh theo ID
router.get('/students/:userId', getStudentByIdController)

// Route để tạo học sinh mới
router.post('/students', createStudentController)

// Route để cập nhật thông tin học sinh
router.put('/students/:userId', updateStudentController)

// Route để xóa học sinh
router.delete('/students/:userId', deleteStudentController)

export default router
