import { Request, Response, NextFunction } from 'express'

// Define the middleware function
const allowCors = (req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Allow preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return // Ensure the function does not continue execution after sending the response
  }

  next()
}

export default allowCors
