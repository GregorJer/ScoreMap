var express = require('express');
var router = express.Router();
var handball_teamController = require('../controllers/handball_teamController.js');

/*
 * GET
 */
router.get('/', handball_teamController.list);

/*
 * GET
 */
router.get('/:id', handball_teamController.show);

/*
 * POST
 */
router.post('/', handball_teamController.create);
router.post('/array', handball_teamController.createMany)

/*
 * PUT
 */
router.put('/:id', handball_teamController.update);

/*
 * DELETE
 */
router.delete('/:id', handball_teamController.remove);

module.exports = router;
