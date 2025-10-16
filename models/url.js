const mongoose = require('mongoose');

const urlschema = mongoose.Schema({
    shortid: {
        type: String,
        require: true,
        unique: true
    },
    redirectid: {
        type: String,
        require: true
    },
    visitedhistory :[{timestamp: {type: Number}}],
    createdBY: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {timestamps: true});

const Url = mongoose.model('url', urlschema);

module.exports = Url;