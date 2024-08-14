const generateAndSetToken = require("../generateAndSetToken/generateAndSetToken");
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
                ...newUser._doc,
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
    const { email, password, role } = req.body;
    try {
        if (!email || !password || !role) {
            return res.json({
                success: false,
                message: "All fields are required!"
            });
        }

        const userExsits = await UserSchema.findOne({ email });
        if (!userExsits) {
            return res.json({
                success: false,
                message: "Invalid crendential!",
            });
        }

        const isMatch = await bcryptjs.compare(password, userExsits.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid crendential!",
            });
        }

        if (role !== userExsits.role) {
            return res.json({
                success: false,
                message: "Account doesn't exist with current role.",
            });
        }


        generateAndSetToken(res, userExsits._id);

        res.json({
            success: true,
            data: {
                ...userExsits._doc,
                password: undefined,
            }
        })

    } catch (error) {
        console.log("Error in login function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

const logout = async (req, res) => {

}


module.exports = {
    register,
    login,
    logout,
}