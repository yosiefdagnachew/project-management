const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },

    status: {
        type: String,
        enum: ['Planning', 'Inprogress', 'Completed'],
        default: 'Planning'
    },

    startDate: {
        type: Date,
        default:new Date()
    },

    dueDate: {
        type: Date,
        required: true
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },

    progress: {
        type: Number,
        default: 0
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

});

// Update status before findOneAndUpdate or findOneAndReplace operations
taskSchema.pre(['findOneAndUpdate', 'findOneAndReplace'], function (next) {
    const update = this.getUpdate();
    if (update.progress !== undefined) {
        const progress = update.progress;
        if (progress === 0) {
            this.set({
                status: 'Planning'
            });
        } else if (progress > 0 && progress < 100) {
            this.set({
                status: 'Inprogress'
            });
        } else if (progress === 100) {
            this.set({
                status: 'Completed'
            });
        }
    }
    next();
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;