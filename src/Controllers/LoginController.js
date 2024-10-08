const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse'); // Adjust path as necessary
const { login } = require('../Services/LoginService');
const {
  ERROR_MISSING_FIELDS,
  ERROR_INVALID_CREDENTIALS,
  ERROR_INTERNAL_SERVER,
} = require('../Constants/ResponseMessages');

// Login controller
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Request Body:', req.body);

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
    }

    // Call the login function from the service
    const { user, token } = await login(username, password);

    // Check if login was successful
    if (!user || !token) {
      return res.status(401).json(new ErrorResponse(ERROR_INVALID_CREDENTIALS));
    }

    // Respond with success
    res
      .status(200)
      .json(new SuccessResponse('Login successful', { user, token }));
  } catch (error) {
    console.error('Login error:', error.message);
    res
      .status(500)
      .json(new ErrorResponse(ERROR_INTERNAL_SERVER, error.message));
  }
};

module.exports = { loginController };
