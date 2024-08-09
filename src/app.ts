import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './Routes/AuthRoutes'
import studentRoutes from './Routes/StudentRoutes'

const app = express()

// Middleware
app.use(express.json())

// Kết nối đến MongoDB
mongoose
  .connect('mongodb://localhost:27017/my_database')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Routes
app.use('/api', authRoutes)
app.use('/api', studentRoutes) // Sử dụng route quản lý học sinh

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
