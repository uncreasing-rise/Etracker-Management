import { Request, Response, NextFunction } from 'express'

// Define the middleware function
const setHeaders = (req: Request, res: Response, next: NextFunction): void => {
  // Set custom headers
  res.setHeader('X-Powered-By', 'Node.js')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  // Proceed to the next middleware or route handler
  next()
}

export default setHeaders
