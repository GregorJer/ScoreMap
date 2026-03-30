var express = require('express');
var router = express.Router();
var volleyball_statisticController = require('../controllers/volleyball_statisticController.js');

/*
 * GET
 */
router.get('/', volleyball_statisticController.list);

/*
 * GET
 */
router.get('/:id', volleyball_statisticController.show);

/*
 * POST
 */
router.post('/', volleyball_statisticController.create);
router.post('/array', volleyball_statisticController.createMany);

/*
 * PUT
 */
router.put('/:id', volleyball_statisticController.update);

/*
 * DELETE
 */
router.delete('/:id', volleyball_statisticController.remove);

module.exports = router;
