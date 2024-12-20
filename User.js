const mongoose = require("mongoose");

    const User = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensure that the email is unique
        },
        username: {
            type: String,
            required: true,
            unique: true, // Ensure that the username is unique
        },
        password: {
            type: String,
            required: true,
            private:true,
        },
        likedSongs: {
            type: String,
            default: "",
        },
        likedPlaylists: {
            type: String,
            default: "",
        },
        subscribedArtists: {
            type: String,
            default: "",
        },
    });

    // Create the model
    const UserModel = mongoose.model("User", User);

    module.exports = UserModel  ;