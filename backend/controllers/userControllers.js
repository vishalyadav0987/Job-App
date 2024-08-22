const generateAndSetToken = require("../generateAndSetToken/generateAndSetToken");
const UserSchema = require("../models/UserSchema");
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary').v2;


// REGISTER - BOTH --- USER and RECRUTER
const register = async (req, res) => {
    const { fullname, email, password, phoneNumber, role } = req.body;
    try {
        let { profilePic } = req.body;
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

        if (profilePic) {
            const uploadProfileImg = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadProfileImg.secure_url
        }

        const hassedPassword = await bcryptjs.hash(password, 10);

        const newUser = new UserSchema({
            fullname,
            email,
            password: hassedPassword,
            phoneNumber,
            role,
            profile: {
                profilePic,
            }
        });

        await newUser.save();

        const token = generateAndSetToken(res, newUser._id);

        res.json({
            success: true,
            message: "User Succesfully registered.",
            data: {
                ...newUser._doc,
                password: undefined,
            },
            token,
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


        const token = generateAndSetToken(res, userExsits._id);

        res.json({
            success: true,
            data: {
                ...userExsits._doc,
                password: undefined,
            },
            token,
            message: "User Successfully logged in!"
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
    try {
        res.cookie("token", null, { maxAge: 1 });
        res.json({
            success: true,
            message: "User logout successfully.",
        })
    } catch (error) {
        console.log("Error in logout function ->", error.message);
        res.json({ success: false, message: error.message })
    }

}

// UPDATE PROFILE
const updateProfile = async (req, res) => {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    let { profilePic, resume } = req.body;
    const originNameResume = resume;
    try {
        const userId = req.user;

        if (!fullname || !email || !bio || !phoneNumber || !skills) {
            return res.json({
                success: false,
                message: "All fields are required!"
            });
        }

        const skillsArray = skills.split(",")
        const user = await UserSchema.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User not found!",
            });
        }

        if (profilePic) {
            if (user.profile.profilePic) {
                await cloudinary.uploader.destroy(user.profile.profilePic.split('/').pop().split(".")[0])
            }
            const uploadProfileImg = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadProfileImg.secure_url
        }

        if (resume) {
            if (user.profile.resume) {
                await cloudinary.uploader.destroy(user.profile.resume.split('/').pop().split(".")[0])
            }
            const uploadResume = await cloudinary.uploader.upload(resume);
            resume = uploadResume.secure_url;
        }

        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;
        user.profile.profilePic = profilePic || user.profile.profilePic;
        user.profile.resume = resume || user.profile.resume;
        user.profile.resumeOriginalName = `${originNameResume}` // Save the original file name

        await user.save();

        res.json({
            success: true,
            message: "User succesfully updated",
            data: {
                ...user._doc,
                password: undefined,
            }
        });

    } catch (error) {
        console.log("Error in updateProfile function -> ", error);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

const getUserOwnDetails = async (req, res) => {
    try {
        const userId = req.user;
        const userMe = await UserSchema.findById(userId);
        res.json({ success: true, data: userMe });
    } catch (error) {
        console.error("Error in getUserOwnDetails function: ", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong!!",
            error: error.message
        });
    }
}


module.exports = {
    register,
    login,
    logout,
    updateProfile,
    getUserOwnDetails,
}