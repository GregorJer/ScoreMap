var express = require('express');
var router = express.Router();
var football_teamController = require('../controllers/football_teamController.js');

/*
 * GET
 */
router.get('/', football_teamController.list);

/*
 * GET
 */
router.get('/:id', football_teamController.show);

/*
 * POST
 */
router.post('/', football_teamController.create);
router.post('/array', football_teamController.createMany);

/*
 * PUT
 */
router.put('/:id', football_teamController.update);

/*
 * DELETE
 */
router.delete('/:id', football_teamController.remove);

module.exports = router;
