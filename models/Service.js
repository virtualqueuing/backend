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
      validate: {
        validator: (v) => v.length === 10,
        message: (props) => `${props.value} is not a legitimate Australian number.`,
      },
    },
    location: {
      type: String,
      default: 'Sunnybank',
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
    notes: {
      type: String,
      maxlength: 250,
    },
  },
  {
    timestamps: true,
  }
);

const serviceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  queues: [QueueSchema],
});

module.exports = mongoose.model('Service', serviceSchema);
