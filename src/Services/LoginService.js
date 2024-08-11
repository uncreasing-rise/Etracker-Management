const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../Models/Student');
const Admin = require('../Models/Admin');
const Teacher = require('../Models/Teacher');

const SECRET_KEY = process.env.SECRET_KEY;

const models = {
  admin: Admin,
  teacher: Teacher,
  student: Student,
};

const login = async (email, password) => {
  try {
    // Iterate over models to find the user
    let user = null;
    let role = '';

    for (const [key, model] of Object.entries(models)) {
      user = await model.findOne({ email });
      if (user) {
        role = key;
        break;
      }
    }

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role }, SECRET_KEY, {
      expiresIn: '1h', // Token expiration time
    });

    return { user, token };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

module.exports = { login };
