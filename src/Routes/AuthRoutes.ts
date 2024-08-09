import { Router } from 'express'
import { loginUserController } from '../Controllers/AuthController'

const router = Router()

// Route đăng nhập
router.post('/login', loginUserController)

export default router
