const mongoose = require('mongoose');

// Define the schema for the Announcement model
const announcementSchema = new mongoose.Schema({
    image: {
        type: String, // Assuming the image URL will be stored as a string
        required: true,
    },
    header: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mandatory: {
        type: Boolean,
        default: false, // Assuming "mandatory" will default to false if not provided
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});
// Create the Announcement model
const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;