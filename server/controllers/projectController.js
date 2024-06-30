const Project = require('../models/Project.js');
const User = require('../models/User.js');
const Notification = require('../models/Notification.js')
const Report = require('../models/Report.js');
const Chatboard = require('../models/Chatboard'); // Import the Chatboard model
const {
    createProjectUpdateNotification,
    removeEmployeeNOtification,
    addEmployeeNOtification,
    projectAcceptanceNOtification,
    projectRejectionNOtification
} = require('./notificationController')


module.exports.createProject = async (req, res) => {
    try {
        const {
            title,
            subTitle,
            description,
            startDate,
            dueDate,
            priority,
            budget,
            projectManager
        } = req.body;



        // Create the project
        const project = await Project.create({
            title,
            subTitle,
            description,
            startDate,
            dueDate,
            priority,
            budget,
            projectManager,
        });

        const user = await User.findById(projectManager);
        user.assignedProjects.push(project._id);
        project.team.push(projectManager);
        user.projects.push(project._id);

        // Create the Chatboard associated with the project
        const chatboard = await Chatboard.create({
            project: project._id, // Use the _id of the created project
            teams: [], // Initially, no team members are added
            messages: [], // Initially, no messages are added
        });

        // Update the project's chatboard field with the created chatboard's _id
        project.chatboard = chatboard._id;
        await project.save();
        await user.save();

        res.status(200).json({
            message: 'Project and Chatboard created successfully',
            project,
            chatboard,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Unable to create a new project and chatboard',
            error: error.message,
        });
    }
};


module.exports.getProjects = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const projects = await Project.find()
            .populate('tasks')
            .populate('projectManager')
            .populate('team');
        res.status(200).json({
            projects
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


module.exports.getProject = async (req, res) => {
    try {
        const {
            projectId
        } = req.params
        const project = await Project.findById(projectId)
            .populate('projectManager')
            .populate({
                path: 'team',
                populate: {
                    path: 'projects',
                    populate: {
                        path: 'tasks'
                    }
                }
            })
            .populate('tasks')
        res.status(200).json({
            project
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateProject = async (req, res) => {
    try {
        const {
            projectId
        } = req.params;
        const {
            projectManager,
            status,
            dueDate,
            priority,
            progress,
            title,
            description,
            internalCost,
            costReason
        } = req.body;

        // update other project datas
        const project = await Project.findById(projectId);

        project.status = status;
        project.priority = priority;
        project.progress = progress;
        project.title = title;
        project.description = description;
        project.dueDate = dueDate;

        if (internalCost > 0 && project.budgetLeft - internalCost >= 0) {
            project.budgetLeft = project.budgetLeft - internalCost;
            const costInfo = {
                reason: costReason,
                amount: internalCost,
                date: new Date()
            }
            project.costList.push(costInfo);

        } else {
            return res.status(200).json({
                message: "Insufficient budget, please request for additional budget"
            });
        }

        // Remove the old project manager from the team if it exists
        if (project && project.projectManager) {
            const updatedTeam = project.team.filter(
                (user) => user && user.toString() !== project.projectManager.toString()
            );
            project.team = updatedTeam;
        }

        // Set the new project manager
        project.team.push(projectManager);
        project.projectManager = projectManager;

        const message = `Dear, The Project  Titled as "${project.title}" has been updated`
        const type = 'projectUpdate'
        createProjectUpdateNotification(project, message, type);

        await project.save();
        return res.status(200).json({
            message: 'Project updated successfully',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};


module.exports.addEmployee = async (req, res) => {
    try {
        const {
            projectId
        } = req.params;
        const {
            userId
        } = req.body;

        const project = await Project.findById(projectId);
        const isMember = (project.team).some((member) => member._id.toString() === userId);

        if (isMember) {
            res.status(409).json({
                message: "This Employee is already a member of this project"
            });
        } else {
            const user = await User.findById(userId);
            if ((!project.projectManager && user.position === 'Project Manager') || (project.projectManager && user.position !== 'Project Manager')) {
                project.team.push(userId);
                user.projects.push(project._id);
                if (user.position === 'Project Manager') {
                    project.projectManager = userId
                    user.assignedProjects.push(projectId);

                    // create notification
                    const message = `Dear ${user.name}, you have been assigned as a project manager for the project intitled as ${project.title}`
                    addEmployeeNOtification(user, message);
                } else {
                    const message = `Dear ${user.name}, You are add to the project "${project.title}"`;
                    addEmployeeNOtification(user, message);
                }
                await user.save();
                await project.save();
                res.status(200).json({
                    project,
                });
            } else {
                res.status(409).json({
                    message: "This project already has Project manager assigned"
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.removeEmployee = async (req, res) => {
    try {
        const {
            projectId
        } = req.params;
        const {
            userId
        } = req.body;

        const project = await Project.findById(projectId);
        const user = await User.findById(userId);

        if (user._id.toString() === project.projectManager._id.toString()) {
            project.projectManager = null;
            user.projects = user.assignedProjects.filter(project => project._id != projectId);

        }

        project.team = project.team.filter(
            (member) => member.toString() !== userId
        );

        user.projects = user.projects.filter(project => project._id != projectId);

        const message = `Dear ${user.name}, You are removed from the project "${project.title}"`;
        removeEmployeeNOtification(user, message);

        await project.save();
        await user.save();

        res.status(200).json({
            project,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

module.exports.createProjectReport = async (req, res) => {
    try {
        const {
            projectId
        } = req.params;

        const {
            report,
            project
        } = req.body;

        const {
            projectManager,
            dueDate
        } = project

        const newReport = await Report.create({
            project: projectId,
            projectManager,
            completionDate: dueDate,
            summary: report,
        })

        res.status(200).json({
            message: "report created successfully",
            newReport,
        })

    } catch (error) {
        console.log(error);
    }
}


module.exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find().populate('project').populate('projectManager').populate('project.team');
        res.status(200).json({
            message: "report fetched successfully",
            reports
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports.acceptProject = async (req, res) => {
    try {
        const {
            project_id,
            manager_id
        } = req.body;

        const project = await Project.findById(project_id);
        const user = await User.findById(manager_id);
        project.completionAcceptance = true;

        const message = `Gongratulation!, Dear ${user.name} The Project Entitled as "${project.title}" has been approved BY The Project Executive`;
        projectAcceptanceNOtification(user, message);

        await project.save();
        await user.save(); 

        res.status(200).json({
            message:"project accepted"
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports.cancleProject = async (req, res) => {
    try {
        const {
            report_id
        } = req.body;

        const report = await Report.findById(report_id);
        const project = await Project.findById(report.project);
        project.completionAcceptance = false;
        const manager = project.projectManager
        const user = await User.findById(manager);
        const message = `OOPS!, Dear ${user.name} The Project you copleted that is entitled as "${project.title}" has been Rejected BY The Project Executive, please try to  and report again.`;
        projectRejectionNOtification(user, message);

        await project.save();
        await user.save();
         res.status(200).json({
             message: "project rejected"
         })
    } catch (error) {
        console.log(error);
    }
}