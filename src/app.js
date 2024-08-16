const express = require('express');
const connectDB = require('./Config/Db');
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
const classRouter = require('./Routes/ClassRouter');
const assignmentRouter = require('./Routes/AssignmentRouter');
const scoreRouter = require('./Routes/ScoreRouter');
const sessionRouter = require('./Routes/SessionRouter');
const attendanceRouter = require('./Routes/AttendanceRouter');
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

// Define routes
app.use('/api/auth', authRoutes); // Route for authentication
app.use('/api/student', studentRouter); // Route for managing Students
app.use('/api/teacher', teacherRouter); // Route for managing Teachers
app.use('/api/admin', adminRouter); // Route for managing Admins
app.use('/api/', quizRouter); // Route for managing Quizzes
app.use('/api/', assignmentRouter); // Route for managing Quizzes
app.use('/api/class', classRouter); // Route for managing Classes
app.use('/api/', scoreRouter); // Route for managing Scores
app.use('/api/', sessionRouter); // Route for managing Sessions
app.use('/api/', attendanceRouter); // Route for managing Attendance
// Error handling middleware
app.use(errorHandler);

// Set the port and start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
