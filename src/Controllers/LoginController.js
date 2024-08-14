const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse'); // Adjust path as necessary
const { login } = require('../Services/LoginService');

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Request Body:', req.body);

    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json(new ErrorResponse('Username and password are required'));
    }

    // Call the login function from the service
    const { user, token } = await login(username, password);

    // Check if login was successful
    if (!user || !token) {
      return res
        .status(401)
        .json(new ErrorResponse('Invalid username or password'));
    }

    // Respond with success
    res
      .status(200)
      .json(new SuccessResponse('Login successful', { user, token }));
  } catch (error) {
    console.error('Login error:', error.message);
    res
      .status(500)
      .json(new ErrorResponse('Internal server error', error.message));
  }
};

module.exports = { loginController };
