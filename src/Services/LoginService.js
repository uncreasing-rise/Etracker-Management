const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../Models/Student');
const Admin = require('../Models/Admin');
const Teacher = require('../Models/Teacher');

// Use JWT_SECRET from environment variables
const SECRET_KEY = process.env.JWT_SECRET;

const models = {
  admin: Admin,
  teacher: Teacher,
  student: Student,
};

const login = async (username, password) => {
  try {
    let user = null;
    let role = '';

    // Iterate over models to find the user
    for (const [key, model] of Object.entries(models)) {
      user = await model.findOne({ username });
      if (user) {
        role = key;
        console.log('User Role:', key); // Debugging line
        break;
      }
    }

    if (!user) {
      throw new Error('User not found');
    }

    // Debugging output
    console.log('User:', user); // Check if user is retrieved correctly
    console.log('Stored Password Hash:', user.password); // Debugging
    console.log('Provided Password:', password);

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role }, SECRET_KEY, {
      expiresIn: '1h', // Token expiration time
    });

    return { user, token }; // Return the user and token
  } catch (error) {
    console.error('Login Error:', error); // Log error details
    throw new Error(`Login failed: ${error.message}`);
  }
};

module.exports = { login };
