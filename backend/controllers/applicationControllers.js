const ApplicationSchema = require('../models/ApplicationSchema');
const JobSchema = require('../models/JobSchema');
const UserSchema = require('../models/UserSchema');


//FOR STUDENTS
const applyJob = async (req, res) => {
    try {
        // login student
        const userId = req.user;
        const { id: jobId } = req.params;

        // Check user Role
        const user = await UserSchema.findById(userId);

        if (user.role !== "student" || !user) {
            return res.json({
                success: false,
                message: "You can't apply for Job."
            });
        }

        // check application already register or not in this company or not
        const applicationExist = await ApplicationSchema.findOne({
            jobId, applicantId: userId
        })


        if (applicationExist) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await JobSchema.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        // creation application
        const newApplication = new ApplicationSchema({
            applicantId: userId,
            jobId,
        });

        await newApplication.save();

        job.applications.push(newApplication._id);
        await job.save();
        res.json({
            success: true,
            message: "You succesfully applied for Job.",
            data: newApplication,
        })

    } catch (error) {
        console.log("Error in applyJob function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

// APPLICATION OF APPLICANT (LOGIN USER/STUDENT)
const applicantOfApplication = async (req, res) => { // getAppliedJobs 
    try {
        const userId = req.user;
        const applications = await ApplicationSchema.find({
            applicantId: userId
        }).populate({
            path: "jobId",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "comapanyId",
                options: { sort: { createdAt: -1 } },
            }
        });

        if (!applications) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        };
        res.status(200).json({
            success: true,
            data: applications,
        })
    } catch (error) {
        console.log("Error in applicantOfApplication function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}


// admin dekhega kitna user ne apply kiya hai
const getAllApplicantOnJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user;
        const user = await UserSchema.findById(userId);
        if (user.role !== "recruiter") {
            return res.status(400).json({
                message: "You can't eligible this",
                success: false
            })
        }
        const applicants = await JobSchema.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicantId",
                options: { sort: { createdAt: -1 } },

            }
        });

        if (!applicants) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };
        res.status(200).json({
            succees: true,
            data: applicants,
        });
    } catch (error) {
        console.log("Error in getAllApplicantOnJob function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

// UPDATE STATUS OF APPLICATION
const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        const userId = req.user;
        const user = await UserSchema.findById(userId);
        if (user.role !== "recruiter") {
            return res.status(400).json({
                message: "You can't eligible this",
                success: false
            })
        }
        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
            })
        };

        // find the application by applicantion id
        const application = await ApplicationSchema.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log("Error in updateStatus function -> ", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    applyJob,
    applicantOfApplication,
    getAllApplicantOnJob,
    updateStatus,
}