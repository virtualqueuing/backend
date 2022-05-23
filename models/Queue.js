const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        phoneNumber: {
            type: Number,
            required: true,
            validate: {
                validator: v => v.toString().length === 10,
                message: props => `${props.value} is not a valid phone number. ` 
            },
        },
        queuePosition: {
            type: Number,
            required: true,
        },
        tableSize: {
            type: Number,
            min: 1,
            max: 8,
            required: true,
        },
        description: {
            type: String,
        },
        arrived: {
            type: Boolean,
            required: true,
            default: true,
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: () => new Date(),
        }
    }
)

const dailyQueueSchema = new mongoose.schema(
    {
        dailyQueue: {
        type: [queueSchema],
        }
    } 
)

module.exports = mongoose.model('DailyQueue', dailyQueueSchema)