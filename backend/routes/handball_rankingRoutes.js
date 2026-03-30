var express = require('express');
var router = express.Router();
var handball_rankingController = require('../controllers/handball_rankingController.js');

/*
 * GET
 */
router.get('/', handball_rankingController.list);

/*
 * GET
 */
router.get('/:id', handball_rankingController.show);

/*
 * POST
 */
router.post('/', handball_rankingController.create);
router.post('/array', handball_rankingController.createMany)

/*
 * PUT
 */
router.put('/:id', handball_rankingController.update);

/*
 * DELETE
 */
router.delete('/:id', handball_rankingController.remove);

module.exports = router;
