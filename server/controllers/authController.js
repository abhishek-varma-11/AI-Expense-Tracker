const bcrypt = require("bcryptjs");

const User = require("../models/User");

async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        /*
         * Validate required fields
         */

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }

        /*
         * Normalize email
         */

        const normalizedEmail = email.trim().toLowerCase();

        /*
         * Check whether the user already exists
         */

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists"
            });
        }

        /*
         * Hash the password
         */

        const hashedPassword = await bcrypt.hash(password, 10);

        /*
         * Create the user
         */

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        /*
         * Send response
         *
         * We deliberately don't send the password back.
         */

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while creating account"
        });
    }
}

module.exports = {
    registerUser
};