const jwt = require('jsonwebtoken');

const protectedRoute = async (req, res, next) => {
    const { token } = req.cookies;
    try {
        if (!token) {
            return res.json({
                success: false,
                message: "Unauthorized - No token!",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECERET);

        const userId = decoded.userId

        req.user = userId;

        next();

    } catch (error) {
        console.log("Error in protectedRoute function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = protectedRoute;