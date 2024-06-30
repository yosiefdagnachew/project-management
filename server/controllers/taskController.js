const Task = require('../models/Task.js');
const Project = require('../models/Project.js');

const calculateProgress = (project) => {
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.reduce((count, task) => {
        if (task.status === 'Completed') {
            return count + 1;
        }
        return count;
    }, 0);

    project.progress = Math.floor((completedTasks / totalTasks) * 100);

    // Update project status based on progress
    if (project.progress === 100) {
        project.status = 'Completed';
    } else if (project.progress === 0) {
        project.status = 'Planning';
    } else {
        project.status = 'In Progress';
    }
};

module.exports.createTask = async (req, res) => {
    try {
        const {
            id,
            projectId
        } = req.params;
        const {
            title,
            description,
            priority,
            assignedTo,
            dueDate,
            createdBy,
            project
        } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy,
            project
        });

        const owner_project = await Project.findById(projectId);
        owner_project.tasks.push(task);

        calculateProgress(owner_project);

        await owner_project.save();

        res.status(200).json({
            message: "Task created successfully",
            task
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

module.exports.getTasks = async (req, res) => {
    try {
        const {
            projectId,
        } = req.params;

        const {
            priority,
            status
        } = req.body;

        const tasks = await Task.find({
                project: projectId
            })
            .populate('assignedTo')
            .populate({
                path: 'project',
                populate: {
                    path: 'team'
                }
            })
            .populate('createdBy');

        res.status(200).json({
            tasks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


module.exports.updateTask = async (req, res) => {
    const {
        taskid
    } = req.params;
    const updateObj = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskid, updateObj, {
            new: true
        });

        if (!updatedTask) {
            return res.status(404).json({
                error: 'Task not found'
            });
        }

        const project = await Project.findOne({
            _id: updatedTask.project
        }).populate('tasks');

        if (project) {
            calculateProgress(project);

            await project.save(); // Save the updated project
        }

        return res.status(200).json({
            message: 'Task updated successfully',
            updatedTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};