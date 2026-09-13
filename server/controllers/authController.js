const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

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


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        /*
         * Validate required fields
         */

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        /*
         * Normalize email
         */

        const normalizedEmail = email.trim().toLowerCase();

        /*
         * Find the user
         */

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        /*
         * Compare the entered password
         * with the hashed password in MongoDB
         */

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        /*
         * Generate JWT
         */

        const token = generateToken(user._id);

        /*
         * Send response
         */

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while logging in"
        });
    }
}

async function getCurrentUser(req, res) {
    try {
        /*
         * The auth middleware has already verified
         * the JWT and placed the user ID on req.user.
         */

        const user = await User.findById(
            req.user.userId
        ).select("-password");

        /*
         * The token may be valid, but the user
         * could have been deleted from the database.
         */

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        /*
         * Send the authenticated user's information.
         */

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(
            "Get current user error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error while fetching user"
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
};