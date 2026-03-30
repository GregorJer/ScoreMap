var express = require('express');
var router = express.Router();
var volleyball_gameController = require('../controllers/volleyball_gameController.js');

/*
 * GET
 */
router.get('/', volleyball_gameController.list);

/*
 * GET
 */
router.get('/:id', volleyball_gameController.show);

/*
 * POST
 */
router.post('/', volleyball_gameController.create);
router.post('/array', volleyball_gameController.createMany);

/*
 * PUT
 */
router.put('/:id', volleyball_gameController.update);

/*
 * DELETE
 */
router.delete('/:id', volleyball_gameController.remove);

module.exports = router;
