const User = require('../models/User');
const Announcement = require('../models/Announcement');
const FeedBack = require('../models/FeedBack');
const {
    announcementNotification
} = require('./notificationController')
module.exports.getUser = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const user = await User.findById(id)
            .populate('notifications')
            .populate('tasks')
            .populate({
                path: 'projects',
                populate: {
                    path: 'tasks'
                }
            })
            .populate('assignedProjects');

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        res.status(200).json({
            user
        });

    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

module.exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find().populate('notifications');
        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

module.exports.deactivate = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "account not found"
            })
        }
        user.account = 'not active';
        await user.save();
        console.log(user)
        res.status(200).json({
            message: "account deactivated"
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.activateAccount = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "account not found"
            })
        }
        user.account = 'active';
        await user.save();
       
        res.status(200).json({
            message: "account deactivated"
        })
        
    } catch (error) {
        console.log(error);
    }
}


// announcement controllers
module.exports.createAnnounce = async (req, res) => {
    try {
        const {
            picture,
            header,
            description,
            mandatory,
            date,
            time,
            location,
        } = req.body;

        const Announcements = await Announcement.create({
            image: picture,
            header,
            description,
            mandatory,
            date,
            time,
            location,
        });

        const message = 'New Announcement is available'
        const type = 'importantAnnouncement'
        const users = await User.find()
        announcementNotification(users, message, type);

        res.status(200).json({
            message: "Announcements created successfully",
            Announcements
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports.getAnnouncements = async (req, res) => {
    try {
        const announcement = await Announcement.find();

        res.status(200).json({
            announcement
        })
    } catch (error) {
        console.error(error)
    }
}


module.exports.sendFeedBack = async (req, res) => {
    try {
        const {
            summery,
        } = req.body
        const {
            id
        } = req.params

        const newFeedBack = await FeedBack.create({
            summery,
            sender: id
        })


        res.status(200).json({newFeedBack})
    } catch (error) {
        console.error(error);
    }
}

module.exports.getFeedBacks = async (req, res) => {
    try {
        const feedBack = await FeedBack.find().populate('sender');
        res.status(200).json({
            feedBack
        })
    } catch (error) {
        console.log(error)
    }
}