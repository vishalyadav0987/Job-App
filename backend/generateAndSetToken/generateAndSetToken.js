const jwt = require('jsonwebtoken');

const generateAndSetToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECERET, {
        expiresIn: "7d",
    });

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.cookie("token", token, options);

    return token;
}


module.exports = generateAndSetToken;