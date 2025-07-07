const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Applied', 'Interviewing', 'Accepted', 'Rejected', 'Ghosted'],
        default: 'Applied',
        required: true,
    },
    notes: {
        type: String,
        default: '',
    },
    appliedDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Job', jobSchema);