import { Router } from 'express'
import {
  getAllAttendanceController,
  getAttendanceByIdController,
  getAttendanceByClassIdController,
  createAttendanceController,
  updateAttendanceController,
  deleteAttendanceController,
} from '../Controllers/AttendanceController'

const router = Router()

router.get('/attendance', getAllAttendanceController)
router.get('/attendance/:attendanceId', getAttendanceByIdController)
router.get('/attendance/class/:classId', getAttendanceByClassIdController)
router.post('/attendance', createAttendanceController)
router.put('/attendance/:attendanceId', updateAttendanceController)
router.delete('/attendance/:attendanceId', deleteAttendanceController)

export default router
