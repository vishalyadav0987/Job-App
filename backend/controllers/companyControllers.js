const CompanySchema = require('../models/CompanySchema');

const registerCompany = async (req, res) => {
    const { name: companyName, location } = req.body;
    const userId = req.user;
    try {
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
        const company = await CompanySchema.findOne({ name: companyName });

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

        return res.status(201).json({
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

module.exports = {
    registerCompany,
}