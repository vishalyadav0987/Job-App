const UserSchema = require("../models/UserSchema");
const bcryptjs = require('bcryptjs');


// REGISTER - BOTH --- USER and RECRUTER
const register = async (req, res) => {
    const { fullname, email, password, phoneNumber, role } = req.body;
    try {
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.json({
                success: false,
                message: "All fields are required!"
            });
        }

        const userExsits = await UserSchema.findOne({ email });
        if (userExsits) {
            return res.json({
                success: false,
                message: "User Already exists with this email!",
            });
        }

        const hassedPassword = await bcryptjs.hash(password, 10);

        const newUser = new UserSchema({
            fullname,
            email,
            password: hassedPassword,
            phoneNumber,
            role,
        });

        await newUser.save();

        res.json({
            success: true,
            message: "User Succesfully registered.",
            data: {
                ...newUser,
                password: undefined,
            }
        })
    } catch (error) {
        console.log("Error in Register function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

const login = async (req, res) => {

}
const logout = async (req, res) => {

}


module.exports = {
    register,
    login,
    logout,
}