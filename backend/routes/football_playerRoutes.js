var express = require('express');
var router = express.Router();
var football_playerController = require('../controllers/football_playerController.js');

/*
 * GET
 */
router.get('/', football_playerController.list);

/*
 * GET
 */
router.get('/:id', football_playerController.show);

/*
 * POST
 */
router.post('/', football_playerController.create);
router.post('/array', football_playerController.createMany);

/*
 * PUT
 */
router.put('/:id', football_playerController.update);

/*
 * DELETE
 */
router.delete('/:id', football_playerController.remove);

module.exports = router;
