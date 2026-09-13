const jwt = require("jsonwebtoken");

function protect(req, res, next) {
    try {
        /*
         * Get the Authorization header
         */

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        /*
         * Expected format:
         *
         * Authorization: Bearer <token>
         */

        const parts = authHeader.split(" ");

        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });
        }

        const token = parts[1];

        /*
         * Verify the JWT
         */

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        /*
         * Store the authenticated user's ID
         * on the request object.
         */

        req.user = {
            userId: decoded.userId
        };

        /*
         * Continue to the controller
         */

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

module.exports = protect;