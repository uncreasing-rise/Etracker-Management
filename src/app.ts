import express from 'express'
import authRoutes from './Routes/AuthRoutes'
import studentRoutes from './Routes/StudentRoutes'
import connectDB from './Config/Db'
import { setupSwagger } from './swagger'
import cors from 'cors'
import errorHandler from './Middlewares/ErrorHandler'
import setHeaders from './Middlewares/Header'
const app = express()

// Middleware
connectDB()

// Enable CORS
app.use(cors())
app.use(setHeaders)

// Middleware to parse JSON requests
app.use(express.json())
setupSwagger(app)

// Routes
app.use('/api/auth', authRoutes) // Route for authentication
app.use('/api/students', studentRoutes) // Route for managing students

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
