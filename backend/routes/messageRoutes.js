var express = require('express');
var router = express.Router();
var messageController = require('../controllers/messageController.js');

/*
 * GET
 */
router.get('/', messageController.list);
router.get('/:gameType/:matchId', messageController.listByMatchId);



/*
router.get('/messages', (req, res) => {
    res.render('messages');
  });
*/
/*
 * GET
 */
router.get('/:id', messageController.show);

/*
 * POST
 */
router.post('/', messageController.create);

/*
 * PUT
 */
router.put('/:id', messageController.update);

/*
 * DELETE
 */
router.delete('/:id', messageController.remove);

module.exports = router;
