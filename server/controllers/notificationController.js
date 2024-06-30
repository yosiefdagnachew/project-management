 const Notification = require('../models/Notification')
 const User = require('../models/User')

 module.exports.createProjectUpdateNotification = async (project, message, type) => {
     // Create a single notification for all team members
     const notification = await Notification.create({
         recipients: project.team,
         message: message,
         type: type,
     });

     // Update the notifications field of team members
     const userPromises = project.team.map(async (teamMember) => {
         const user = await User.findById(teamMember);
         user.notifications.push(notification);
         await user.save();
     });
     await Promise.all(userPromises);
 }

 module.exports.announcementNotification = async (users, message, type) => {
     // Create a single notification for all team members

     const notification = await Notification.create({
         recipients: users,
         message: message,
         type: type,
     });

     // Update the notifications field of team members
     const userPromises = users && users.map(async (teamMember) => {
         teamMember.notifications.push(notification);
         await teamMember.save();
     });
     await Promise.all(userPromises);
 }


 module.exports.removeEmployeeNOtification = async (user, message) => {
     const notification = await Notification.create({
         recipients: user,
         message: message,
         type: 'employeeRemoved',
     });

     user.notifications.push(notification);
 }

 module.exports.addEmployeeNOtification = async (user, message) => {
     const notification = await Notification.create({
         recipients: user,
         message: message,
         type: 'employeeAdded',
     });

     user.notifications.push(notification);
 }
 module.exports.projectAcceptanceNOtification = async (user, message) => {
     const notification = await Notification.create({
         recipients: user,
         message: message,
         type: 'projectApproval',
     });

     user.notifications.push(notification);
 }
 module.exports.projectRejectionNOtification = async (user, message) => {
     const notification = await Notification.create({
         recipients: user,
         message: message,
         type: 'projectCompletionReportRejection',
     });

     user.notifications.push(notification);
 }

 module.exports.setRead = async (req, res) => {
    try {
        const {
            notificationId
        }  = req.body
        const notification = await Notification.findById(notificationId);
        notification.isRead = true;

        await notification.save();
    } catch (error) {
        console.error(error);
    }
 }