const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        enum: ['project manager', 'team member'],
        default: 'team member'
    },
    sex: {
        type: String,
        required: true
    },

    account: {
        type: String,
        enum: ['active', 'not active'],
        default: 'active'
    },

    employmentDate: {
        type: Date,
        required: true
    },

    code: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
    assignedProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],

    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;