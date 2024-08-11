const express = require('express');
const authRoutes = require('./Routes/AuthRouter');
const studentRouter = require('./Routes/StudentRouter');
const adminRouter = require('./Routes/AdminRouter');
const teacherRouter = require('./Routes/TeacherRouter');
const connectDB = require('./Config/Db');
const { setupSwagger } = require('./swagger');
const cors = require('cors');
const errorHandler = require('./Middlewares/ErrorHandler');
const setHeaders = require('./Middlewares/Header');

const app = express();

// Connect to the database
connectDB();

// Enable CORS
app.use(cors());
app.use(setHeaders);

// Middleware to parse JSON requests
app.use(express.json());

// Set up Swagger for API documentation
setupSwagger(app);

// Routes
app.use('/api/auth', authRoutes); // Route for authentication
app.use('/api/students', studentRouter); // Route for managing students
app.use('/api/teachers', teacherRouter); // Route for managing students
app.use('/api/admins', adminRouter); // Route for managing students

// Error handling middleware
app.use(errorHandler);

// Set the port and start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
