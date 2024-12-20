require("dotenv").config();
const jwt = require("jsonwebtoken");


// Generate a new token
const getToken = async (email, user) => {
    try {
        const payload = {
            sub: user._id, // Subject (user ID)
            email: email,  // Email of the user
        };

        // Sign the token with a secret and set an expiration time
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token valid for 1 hour
        });

        return token;
    } catch (error) {
        console.error("Error generating token:", error.message);
        throw new Error("Failed to generate token");
    }
};

// Middleware to authenticate and verify token
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded payload to req.user

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token validation error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Verify token explicitly (can be used in other utilities)
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Return decoded payload if valid
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null; // Return null if token is invalid or expired
    }
};

module.exports = {
    getToken,
    authenticateToken,
    verifyToken,
};