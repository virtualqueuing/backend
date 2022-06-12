const { Router } = require('express');

const {
  getAllQueues,
  addQueue,
  addService,
  getQueueById,
  getTodayQueues,
  updateQueueById,
  updateQueueStatus,
  getServiceByStatus,
} = require('../controllers/service');

const queueRouter = Router();

queueRouter.get('', getTodayQueues);
queueRouter.post('', addQueue);
queueRouter.get('/initiate', addService);
queueRouter.get('/all', getAllQueues);
queueRouter.get('/:id', getQueueById);
queueRouter.put('/:id', updateQueueById);
queueRouter.get('/:id/:action', updateQueueStatus);
queueRouter.get('/completed', getServiceByStatus);

module.exports = queueRouter;
