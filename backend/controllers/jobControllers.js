const JobSchema = require('../models/JobSchema');

// THIS ROUTE FOR OWNER/ADMIN/RECREUTER
const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            position,
            experience,
            comapanyId
        } = req.body;
        const userId = req.user;

        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !experience || !comapanyId) {
            return res.json({
                success: false,
                message: "Enter all information about the job."
            });
        }

        const newJob = new JobSchema({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            position,
            experienceLevel: experience,
            comapanyId,
            created_By: userId,
        });

        await newJob.save();

        res.json({
            success: true,
            data: newJob,
            message: "Job successfully created."
        })
    } catch (error) {
        console.log("Error in postJob function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}


// GET ALL JOB FOR STUDENTS
const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }

        const jobs = await JobSchema.find(query).populate({
            path: "comapanyId",
        }).sort({ createdAt: -1 })

        if (!jobs) {
            return res.json({
                success: false,
                message: "No found job with this keyword.",
            });
        }

        res.json({
            success: true,
            data: jobs,
        })
    } catch (error) {
        console.log("Error in getAllJobs function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}


// GET JOB FOR STUDENTS
const getJobById = async (req, res) => {
    try {
        const { id: jobId } = req.params;
        const job = await JobSchema.findById(jobId).populate({
            path: "applications"
        });

        if (!job) {
            return res.json({
                success: false,
                message: `No found job with this id ${jobId}.`,
            });
        }

        res.json({
            success: true,
            data: job,
        })
    } catch (error) {
        console.log("Error in getJobById function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

//GET ALL JOBS OF ADMIN CREATED (LOGIN RECRUTER)
const getAllJobsOfAdmin = async (req, res) => {
    try {
        // Login recruiter id
        const userId = req.user;
        const jobs = await JobSchema.find({
            created_By: userId
        }).populate({
            path: 'comapanyId',
            createdAt: -1
        });

        if (!jobs) {
            return res.json({
                success: false,
                message: "No found job with this owner.",
            });
        }

        res.json({
            success: true,
            data: jobs,
        })
    } catch (error) {
        console.log("Error in getAllJobsOfAdmin function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    postJob,
    getAllJobs,
    getJobById,
    getAllJobsOfAdmin
}