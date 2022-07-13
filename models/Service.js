const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => v.length === 10,
        message: (props) => `${props.value} is not a legitimate Australian number.`,
      },
    },
    location: {
      type: String,
      enum: ['Brisbane CBD', 'Sunnybank', 'Chermside'],
    },
    queueNumber: {
      type: Number,
      required: true,
      default: 0,
    },
    guestsNumber: {
      type: Number,
      required: true,
    },
    tableSize: {
      type: String,
      required: true,
    },
    mealType: {
      type: String,
      default: 'Lunch',
    },
    status: {
      type: String,
      required: true,
      default: 'Waiting',
    },
    absentReason: {
      type: String,
    },
    notes: {
      type: [
        {
          type: String,
          maxLength: 260,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const serviceSchema = new mongoose.Schema({
  dateString: {
    type: String,
    default: () => {
      const day = new Date(Date.now());
      return `${day.getYear() + 1900}-${day.getMonth() + 1}-${day.getDate()}`;
    },
    immutable: true,
  },
  queues: [QueueSchema],
});

module.exports = mongoose.model('Service', serviceSchema);
