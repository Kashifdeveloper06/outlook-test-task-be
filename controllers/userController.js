// register.routes.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Register = require('../models/register.model');

const registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        // Check if username or email already exists
        const existingUser = await Register.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        // Create new user
        const newRegister = new Register({ username, email, password: hashedPassword });
        await newRegister.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}









//login api

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create and send JWT token
        const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { registerUser,loginUser };
