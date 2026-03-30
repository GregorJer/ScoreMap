var express = require('express');
var router = express.Router();
var handball_gameController = require('../controllers/handball_gameController.js');

/*
 * GET
 */
router.get('/', handball_gameController.list);


/*
 * GET
 */
router.get('/:id', handball_gameController.show);

/*
 * POST
 */
router.post('/', handball_gameController.create);
router.post('/array', handball_gameController.createMany)

/*
 * PUT
 */
router.put('/:id', handball_gameController.update);

/*
 * DELETE
 */
router.delete('/:id', handball_gameController.remove);

module.exports = router;
