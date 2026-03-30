var express = require('express');
var router = express.Router();
var football_gameController = require('../controllers/football_gameController.js');

/*
 * GET
 */
router.get('/', football_gameController.list);

/*
 * GET
 */
router.get('/:id', football_gameController.show);

/*
 * POST
 */
router.post('/', football_gameController.create);
router.post('/array', football_gameController.createMany);

/*
 * PUT
 */
router.put('/:id', football_gameController.update);

/*
 * DELETE
 */
router.delete('/:id', football_gameController.remove);

module.exports = router;
