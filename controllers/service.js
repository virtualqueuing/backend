const Service = require('../models/Service');

const getAllQueues = async (req, res) => {
  const queues = await Service.find().exec();
  return res.json(queues);
};

const addQueue = async (req, res) => {
  const { name, phoneNumber, queueNumber, guestsNumber, tableSize, notes } = req.body;
  const queue = new Service({
    queues: { name, phoneNumber, queueNumber, guestsNumber, tableSize, notes },
  });
  await queue.save();
  return res.status(201).json(queue);
};

// const getQueueById = async (req, res) => {
//   const { id } = req.params;
//   const queue = await Service.aggregate([
//     { $unwind: '$queues' },
//     { $match: { 'queues._id': id } },
//   ]).exec();
//   if (!queue) {
//     return res.status(404).json({ error: 'Queue Not Found!' });
//   }
//   return res.json(queue);
// };

module.exports = { getAllQueues, addQueue };
