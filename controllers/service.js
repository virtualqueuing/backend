const Service = require('../models/Service');

const getAllQueues = async (req, res) => {
  const queues = await Service.find().exec();
  return res.json(queues);
};

const addService = async (req, res) => {
  const service = new Service({});
  await service.save();
  return res.status(201).json(service);
};

const addQueue = async (req, res) => {
  const { name, phoneNumber, queueNumber, guestsNumber, tableSize, notes } = req.body;
  const currentDate = new Date(Date.now());
  const matchingDate = `${currentDate.getYear() + 1900}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  // logic to check if database with today's date exists
  const todayService = await Service.findOne({ dateString: matchingDate }).exec();
  await todayService.queues.push({
    name,
    phoneNumber,
    queueNumber,
    guestsNumber,
    tableSize,
    notes,
  });
  await todayService.save();
  return res.status(201).json(todayService);
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

module.exports = { getAllQueues, addService, addQueue };
