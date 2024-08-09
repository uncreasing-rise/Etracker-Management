import { Router } from 'express'
import {
  getAllSchedulesController,
  getScheduleByIdController,
  createScheduleController,
  updateScheduleController,
  deleteScheduleController,
} from '../Controllers/ScheduleController'

const router = Router()

router.get('/schedules', getAllSchedulesController)
router.get('/schedules/:scheduleId', getScheduleByIdController)
router.post('/schedules', createScheduleController)
router.put('/schedules/:scheduleId', updateScheduleController)
router.delete('/schedules/:scheduleId', deleteScheduleController)

export default router
