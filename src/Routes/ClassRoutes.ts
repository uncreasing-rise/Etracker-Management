import { Router } from 'express'
import {
  getAllClassesController,
  getClassByIdController,
  createClassController,
  updateClassController,
  deleteClassController,
} from '../Controllers/ClassController'

const router = Router()

router.get('/classes', getAllClassesController)
router.get('/classes/:classId', getClassByIdController)
router.post('/classes', createClassController)
router.put('/classes/:classId', updateClassController)
router.delete('/classes/:classId', deleteClassController)

export default router
