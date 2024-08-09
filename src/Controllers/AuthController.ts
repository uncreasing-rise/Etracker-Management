import { Request, Response } from 'express'
import { loginUser } from '../Services/AuthService'

export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const result = await loginUser(email, password)
    res.json(result)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
