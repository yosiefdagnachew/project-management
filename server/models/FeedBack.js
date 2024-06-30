const mongoose = require('mongoose');

const feedbackShema = new mongoose.Schema({
    summery:{
        type:String,
        required:true
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const FeedBack = mongoose.model('FeedBack', feedbackShema);
module.exports = FeedBack;