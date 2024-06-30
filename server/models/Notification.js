const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: [
            "projectCompletion",
            "taskCompletion",
            "taskAssignment",
            "managerAssignment",
            "deadlineReminder",
            "newComment",
            "fileUpload",
            "projectUpdate",
            "meetingInvitation",
            "importantAnnouncement",
            "bugFix",
            "projectCompletionReportRejection",
            "paymentReminder",
            "teamInvitation",
            "projectApproval",
            "employeeAdded",
            "employeeRemoved",
        ],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;