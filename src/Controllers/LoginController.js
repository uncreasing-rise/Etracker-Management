const { login } = require('../Services/LoginService');

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Request Body:', req.body);

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'username and password are required' });
    }

    // Assuming login function is imported from another module
    const { user, token } = await login(username, password);

    if (!user || !token) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ user, token }); // Assuming `user` includes the role
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal server error' }); // 500 for unexpected errors
  }
};

// Export the controller
module.exports = { loginController };
