const { Router } = require('express');

const { getAllQueues, addQueue, addService, getQueueById } = require('../controllers/service');

const queueRouter = Router();

queueRouter.get('', getAllQueues);
queueRouter.post('', addQueue);
queueRouter.get('/initiate', addService);
queueRouter.get('/:id', getQueueById);
// queueRouter.put('/:code', updateProductByCode);

module.exports = queueRouter;
