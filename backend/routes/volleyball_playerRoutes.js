var express = require('express');
var router = express.Router();
var volleyball_playerController = require('../controllers/volleyball_playerController.js');

/*
 * GET
 */
router.get('/', volleyball_playerController.list);
router.get('/insert_player', volleyball_playerController.insertPlayer);
router.get('/jsonPlayers', volleyball_playerController.getAllPlayers);

/*
 * GET
 */
router.get('/:id', volleyball_playerController.show);

/*
 * POST
 */
router.post('/', volleyball_playerController.create);
router.post('/array', volleyball_playerController.createMany);

/*
 * PUT
 */
router.put('/:id', volleyball_playerController.update);

/*
 * DELETE
 */
router.delete('/:id', volleyball_playerController.remove);

module.exports = router;
