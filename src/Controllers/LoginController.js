const { login } = require('../Services/LoginService');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Request Body:', req.body);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Assuming login function is imported from another module
    const { user, token } = await login(email, password);

    if (!user || !token) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ user, token }); // Assuming `user` includes the role
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal server error' }); // 500 for unexpected errors
  }
};

// Export the controller
module.exports = { loginController };
