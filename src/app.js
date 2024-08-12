const express = require('express');
const connectDB = require('./Config/Db');
const { setupSwagger } = require('./swagger');
const cors = require('cors');
const errorHandler = require('./Middlewares/ErrorHandler');
const setHeaders = require('./Middlewares/Header');
const app = express();

// Import routes
const authRoutes = require('./Routes/AuthRouter');
const studentRouter = require('./Routes/StudentRouter');
const adminRouter = require('./Routes/AdminRouter');
const teacherRouter = require('./Routes/TeacherRouter');
const quizRouter = require('./Routes/QuizRouter');
const enrollmentRouter = require('./Routes/EnrollmentRouter');
const classRouter = require('./Routes/ClassRouter');
const assignmentRouter = require('./Routes/AssignmentRouter');
// Connect to the database
connectDB()
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if unable to connect
  });

// Enable CORS
app.use(cors());
app.use(setHeaders);

// Middleware to parse JSON requests
app.use(express.json());

// Set up Swagger for API documentation
setupSwagger(app);

// Define routes
app.use('/api/auth', authRoutes); // Route for authentication
app.use('/api/students', studentRouter); // Route for managing Students
app.use('/api/teachers', teacherRouter); // Route for managing Teachers
app.use('/api/admins', adminRouter); // Route for managing Admins
app.use('/api/', quizRouter); // Route for managing Quizzes
app.use('/api/', assignmentRouter); // Route for managing Quizzes

app.use('/api/classes', classRouter); // Route for managing Classes
app.use('/api/enrollments', enrollmentRouter); // Route for managing Enrollments

// Error handling middleware
app.use(errorHandler);

// Set the port and start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
