const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        required: true,
    },
    realName: {
        type: String,
    },
    surname: {
        type: String,
    },
    youtubeChannelUrl: {
        type: String,
    },
    bio: {
        type: String,
    },
    hobby: { // hobby/hobbies
        type: String,
    },
    hasCompletedLogin: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
