const mongoose = require('mongoose');

const projectCompletionReportSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completionDate: {
        type: Date,
        required: true
    },

    reportSendat:{
        type:Date,
        default:Date.now()
    },
    summary: {
        type: String,
    },
    feedback: {
        type: String,
        default:''
    }
});

const ProjectCompletionReport = mongoose.model('ProjectCompletionReport', projectCompletionReportSchema);
module.exports = ProjectCompletionReport;