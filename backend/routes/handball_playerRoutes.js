var express = require('express');
var router = express.Router();
var handball_playerController = require('../controllers/handball_playerController.js');

/*
 * GET
 */
router.get('/', handball_playerController.list);

/*
 * GET
 */
router.get('/:id', handball_playerController.show);

/*
 * POST
 */
router.post('/', handball_playerController.create);
router.post('/array', handball_playerController.createMany);

/*
 * PUT
 */
router.put('/:id', handball_playerController.update);

/*
 * DELETE
 */
router.delete('/:id', handball_playerController.remove);

module.exports = router;
