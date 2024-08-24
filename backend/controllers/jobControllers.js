const JobSchema = require('../models/JobSchema');
const UserSchema = require('../models/UserSchema');

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
            companyId
        } = req.body;
        const userId = req.user;

        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !experience || !companyId) {
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
            comapanyId: companyId,
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
// const getAllJobs = async (req, res) => {
//     try {
//         const keyword = req.query.keyword || "";
//         const query = {
//             $or: [
//                 { title: { $regex: keyword, $options: "i" } },
//                 { description: { $regex: keyword, $options: "i" } },
//             ]
//         }

//         const jobs = await JobSchema.find(query).populate({
//             path: "comapanyId",
//         }).sort({ createdAt: -1 })

//         if (!jobs) {
//             return res.json({
//                 success: false,
//                 message: "No found job with this keyword.",
//             });
//         }

//         res.json({
//             success: true,
//             data: jobs,
//         })
//     } catch (error) {
//         console.log("Error in getAllJobs function -> ", error.message);
//         res.json({
//             success: false,
//             message: error.message,
//         });
//     }
// }

const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const title = req.query.title || "";
        const location = req.query.location || "";
        const salaryGte = req.query.salaryGte;
        const salaryLte = req.query.salaryLte;

        // Constructing the query object
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        if (title) {
            query.title = { $regex: title, $options: "i" };
        }

        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        if (salaryGte || salaryLte) {
            query.salary = {};
            if (salaryGte) query.salary.$gte = salaryGte;
            if (salaryLte) query.salary.$lte = salaryLte;
        }

        // Fetching jobs based on the query
        const jobs = await JobSchema.find(query)
            .populate("comapanyId")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: jobs,
        });
    } catch (error) {
        console.log("Error in getAllJobs function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
};




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

//Update Job 
const updateJob = async (req, res) => {
    const { id: _id } = req.params;
    const userId = req.user;
    try {
        const user = await UserSchema.findById(userId);
        if (!user) {
            return res.json({
                message: "User not Found!",
                success: false,
            })
        }
        if (user.role !== "recruiter") {
            return res.json({
                success: false,
                message: "You can't access this route!",
            })
        }

        const job = await JobSchema.findById(_id);

        if (!job) {
            return res.json({
                message: "Job not Found!",
                success: false,
            })
        }

        const options = { new: true, runValidators: true };

        await JobSchema.findByIdAndUpdate(_id, req.body, options);

        res.json({
            success: true,
            message: "Job is successfully Updated!",
        });
    } catch (error) {
        console.log("Error in updateJob function -> ", error.message);
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
    getAllJobsOfAdmin,
    updateJob,
}