import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI

    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables')
    }

    await mongoose.connect(uri, {
      // No need to specify useNewUrlParser and useUnifiedTopology
      // as these are default behaviors in mongoose
    })

    console.log('MongoDB connected')
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDB connection error:', error.message)
    } else {
      console.error('MongoDB connection error:', error)
    }
    process.exit(1)
  }
}

export default connectDB
