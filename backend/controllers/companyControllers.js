const CompanySchema = require('../models/CompanySchema');
const UserSchema = require('../models/UserSchema');
const cloudinary = require('cloudinary').v2;

const registerCompany = async (req, res) => {
    const { name: companyName, location } = req.body;
    const userId = req.user;
    try {
        const checkUserRole = await UserSchema.findById(userId);
        if (checkUserRole.role !== "recruiter") {
            return res.json({
                success: false,
                message: "You haven't access to register their company.",
            });
        }
        if (!companyName) {
            return res.json({
                success: false,
                message: "Enter company name.",
            });
        }
        if (!location) {
            return res.json({
                success: false,
                message: "Enter company location.",
            });
        }

        // checking company exist
        const company = await CompanySchema.findOne({
            name: { $regex: new RegExp(`^${companyName}$`, "i") }
        });

        if (company) {
            return res.json({
                success: false,
                message: "You can't register same company.",
            });
        }

        const newCompany = new CompanySchema({
            name: companyName,
            userId, // company owner id
            location
        });

        await newCompany.save();

        res.status(201).json({
            success: true,
            message: "Company registered successfully.",
            data: newCompany,
        })

    } catch (error) {
        console.log("Error in registerCompany function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

//UPDATE COMPANY
const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        let { logoImg } = req.body;
        const userId = req.user;

        // Check if the user is authorized
        const checkUserRole = await UserSchema.findById(userId);
        if (!checkUserRole || checkUserRole.role !== "recruiter") {
            return res.status(403).json({
                success: false,
                message: "You don't have access to update this company.",
            });
        }

        // Check for case-insensitive uniqueness of company name if needed
        const existingCompany = await CompanySchema.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") },
            _id: { $ne: req.params.id } // Exclude the current company being updated
        });

        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: "A company with this name already exists."
            });
        }

        // cloudinary
        if (logoImg) {
            const uploadLogo = await cloudinary.uploader.upload(logoImg);
            logoImg = uploadLogo.secure_url;
        }

        // Update company details
        const updateData = { name, description, website, location, logoImg };
        const company = await CompanySchema.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found.",
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            message: "Company information updated.",
            company
        });

    } catch (error) {
        console.log("Error in updateCompany function -> ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

// GET ALL COMPANY OF USER -- COMPANY OWNER
const getAllCompany = async (req, res) => {
    try {
        const userId = req.user;
        const companies = await CompanySchema.find({ userId });

        if (!companies) {
            return res.json({
                success: false,
                message: "You can't register company yet.",
            });
        }

        res.json({
            success: true,
            data: companies,
        })

    } catch (error) {
        console.log("Error in getAllCompany function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}


// GET COMPANY BY ID

const getSingleCompanyDetails = async (req, res) => {
    try {
        const { companyId: _id } = req.params;
        const company = await CompanySchema.findById(_id);

        if (!company) {
            return res.json({
                success: false,
                message: "You can't register company yet.",
            });
        }
        res.json({
            success: true,
            data: company,
        })

    } catch (error) {
        console.log("Error in getSingleCompanyDetails function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}


module.exports = {
    registerCompany,
    updateCompany,
    getAllCompany,
    getSingleCompanyDetails,
}