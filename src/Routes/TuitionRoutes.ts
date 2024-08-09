import { Router } from 'express'
import {
  getAllTuitionController,
  getTuitionByIdController,
  getTuitionByClassIdController,
  createTuitionController,
  updateTuitionController,
  deleteTuitionController,
} from '../Controllers/TuitionController'

const router = Router()

router.get('/tuition', getAllTuitionController)
router.get('/tuition/:tuitionId', getTuitionByIdController)
router.get('/tuition/class/:classId', getTuitionByClassIdController)
router.post('/tuition', createTuitionController)
router.put('/tuition/:tuitionId', updateTuitionController)
router.delete('/tuition/:tuitionId', deleteTuitionController)

export default router
