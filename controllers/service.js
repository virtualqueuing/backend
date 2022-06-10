const Service = require('../models/Service');

// get today's matching date
const getCurrentDate = () => {
  const currentDate = new Date(Date.now());
  return `${currentDate.getYear() + 1900}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
};

/**
 * @swagger
 * components:
 *  schemas:
 *    Queue:
 *      type: Object
 *      required:
 *        - name
 *        - phoneNumber
 *        - guestsNumber
 *        - tableSize
 *      properties:
 *        name:
 *          type:string
 *          description:the name of the queue
 *        phoneNumber:
 *          type:string
 *          description:the phoneNumber of the queue
 *        queueNumber:
 *          type:number
 *          description:the queueNumber of the queue
 *        guestsNumber:
 *          type:number
 *          description:the guestsNumber of the queue
 *        tableSize:
 *          type:string
 *          description:the tableSize of the queue
 *        mealType:
 *          type:string
 *          description:the mealType of the queue
 *        status:
 *          type:sting
 *          description:the status of the queue
 *        notes:
 *          type:string
 *          description:the notes of the queue
 *      example:
 *        name: Jason
 *        phoneNumber: "0400123456"
 *        guestsNumber: 4
 *        queueNumber: 1
 *        tableSize: Medium
 *        mealType: lunch
 *        status: waiting
 *        notes: baby seat
 *
 */

/**
 *
 * @swagger
 * /v1/queues:
 *  get:
 *    summary: Return all queues
 *    tags: [Queues]
 *    responses:
 *      200:
 *        description: array of queues
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Queue'
 */
const getAllQueues = async (req, res) => {
  const queues = await Service.find().exec();
  return res.json(queues);
};

const getTodayQueues = async (req, res) => {
  const matchingDate = getCurrentDate(); // logic to check if database with today's date exists
  try {
    const todayService = await Service.findOne({ dateString: matchingDate }).exec();
    const { queues } = todayService;
    return res.json(queues);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/**
 *
 * @swagger
 * /v1/queues/initiate:
 *  get:
 *    summary: Create a new collection of queues for today
 *    tags: [Queues]
 *    responses:
 *      200:
 *        description: Empty collection
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Queue'
 */
const addService = async (req, res) => {
  const service = new Service({});
  await service.save();
  return res.status(201).json(service);
};

/**
 * @swagger
 * /v1/queues:
 *  post:
 *    summary: Create a new queue
 *    tags: [Queues]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Queue'
 *    responses:
 *      201:
 *        description: The queue is successfully added.
 *      400:
 *        description: Invalid request.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */
const addQueue = async (req, res) => {
  const { name, phoneNumber, guestsNumber, tableSize, notes } = req.body;
  const matchingDate = getCurrentDate(); // logic to check if database with today's date exists
  try {
    const todayService = await Service.findOne({ dateString: matchingDate }).exec();
    const lastQueueNumber = todayService.queues.length
      ? todayService.queues[todayService.queues.length - 1].queueNumber
      : 0;
    // const currentQueueNumber = todayService.queues.length;
    await todayService.queues.push({
      name,
      phoneNumber,
      queueNumber: lastQueueNumber + 1,
      guestsNumber,
      tableSize,
      notes,
    });
    await todayService.save();
    return res.status(201).json(todayService);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/**
 * @swagger
 * /v1/queues/{id}:
 *  get:
 *    summary: Get specific queue by id
 *    tags: [Queues]
 *    parameters:
 *      - name: id
 *        in: path
 *        description: filter queues by code
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: The queue selected by code
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Queue'
 *      404:
 *        description: Queue not found
 */
const getQueueById = async (req, res) => {
  const { id } = req.params;
  const matchingDate = getCurrentDate(); // logic to check if database with today's date exists
  const todayService = await Service.findOne({ dateString: matchingDate }).exec();
  const queue = todayService.queues.id(id);
  if (!queue) {
    return res.status(404).json({ error: 'Queue Not Found!' });
  }
  return res.json(queue);
};

const updateQueueById = async (req, res) => {
  const { id } = req.params;
  const matchingDate = getCurrentDate(); // logic to check if database with today's
  const todayService = await Service.findOne({ dateString: matchingDate }).exec();
  todayService.queues.id(id).set(req.body);
  await todayService.save();
  return res.status(201).json(todayService);
};

const updateQueueStatus = async (req, res) => {
  const { id, action } = req.params;
  const matchingDate = getCurrentDate(); // logic to check if database with today's'
  const todayService = await Service.findOne({ dateString: matchingDate }).exec();
  todayService.queues.id(id).status = action;
  await todayService.save();
  return res.status(201).json(todayService);
};

module.exports = {
  getAllQueues,
  addService,
  addQueue,
  getQueueById,
  getTodayQueues,
  updateQueueById,
  updateQueueStatus,
};
