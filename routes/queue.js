const { Router } = require('express');

const {
  getAllQueues,
  addQueue,
  addService,
  getQueueById,
  getTodayQueues,
  updateQueueById,
  setQueueAbsent,
  setQueueComplete,
} = require('../controllers/service');

const queueRouter = Router();

queueRouter.get('', getTodayQueues);
queueRouter.post('', addQueue);
queueRouter.post('/initiate', addService);
queueRouter.get('/all', getAllQueues);
queueRouter.get('/:id', getQueueById);
queueRouter.put('/:id', updateQueueById);
queueRouter.put('/:id/complete', setQueueComplete);
queueRouter.put('/:id/absent', setQueueAbsent);

module.exports = queueRouter;
