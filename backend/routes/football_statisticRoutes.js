var express = require('express');
var router = express.Router();
var football_statisticController = require('../controllers/football_statisticController.js');

/*
 * GET
 */
router.get('/', football_statisticController.list);

/*
 * GET
 */
router.get('/:id', football_statisticController.show);

/*
 * POST
 */
router.post('/', football_statisticController.create);
router.post('/array', football_statisticController.createMany);

/*
 * PUT
 */
router.put('/:id', football_statisticController.update);

/*
 * DELETE
 */
router.delete('/:id', football_statisticController.remove);

module.exports = router;
