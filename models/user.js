
//Not currently being used, just in testing to add with other authentication

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    since: {
        type: Date,
        default: Date.now
    }
});

// mongoose.models = {};

let User = mongoose.model('User', user);

export default mongoose.models.Pet || mongoose.model('User', user)