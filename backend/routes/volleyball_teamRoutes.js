var express = require('express');
var router = express.Router();
var volleyball_teamController = require('../controllers/volleyball_teamController.js');

/*
 * GET
 */
router.get('/', volleyball_teamController.list);


/*
 * GET
 */
router.get('/:id', volleyball_teamController.show);

/*
 * POST
 */
router.post('/', volleyball_teamController.create);
router.post('/array', volleyball_teamController.createMany);

/*
 * PUT
 */
router.put('/:id', volleyball_teamController.update);

/*
 * DELETE
 */
router.delete('/:id', volleyball_teamController.remove);

module.exports = router;
