const { Router } = require('express');

const {
  getAllQueues,
  addQueue,
  addService,
  getQueueById,
  getTodayQueues,
} = require('../controllers/service');

const queueRouter = Router();

queueRouter.get('', getTodayQueues);
queueRouter.post('', addQueue);
queueRouter.get('/initiate', addService);
queueRouter.get('/all', getAllQueues);
queueRouter.get('/:id', getQueueById);
// queueRouter.put('/:code', updateProductByCode);

module.exports = queueRouter;
