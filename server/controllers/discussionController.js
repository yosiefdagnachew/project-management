const Chatboard = require('../models/Chatboard');

module.exports.createMessage = async (req, res) => {
    try {
        const {
            content,
            id,
            projectId
        } = req.body;

        // Find the Chatboard associated with the projectId
        const discussionBoard = await Chatboard.findOne({
            project: projectId
        });

        if (!discussionBoard) {
            return res.status(404).json({
                message: 'Chatboard not found'
            });
        }
        // Create the new message
        const newMessage = {
            sender: id,
            content,
            timestamp: new Date(),
        };

        // Add the new message to the chatboard's messages array
        discussionBoard.messages.push(newMessage);

        // Save the updated chatboard
        await discussionBoard.save();

        res.status(200).json({
            newMessage,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Unable to create a new message',
            error: error.message,
        });
    }
};


module.exports.getMessages = async (req, res) => {
    try {
        const {
            projectId,
            chatboard
        } = req.params;

        // Find the Chatboard associated with the projectId and chatboardId
const discussionBoard = await Chatboard.findOne({
    _id: chatboard,
    project: projectId,
}).populate({
    path: 'messages.sender',
    options: {
        strictPopulate: false
    }
});


        if (!discussionBoard) {
            return res.status(404).json({
                message: 'Chatboard not found',
            });
        }

        // Extract the messages from the chatboard
        const messages = discussionBoard.messages;

        return res.status(200).json({
            messages,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};