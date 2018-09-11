import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Tracker = new Schema({
    project: {
        type: String
    },
    date: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    }
});

export default mongoose.model('Tracker', Tracker);