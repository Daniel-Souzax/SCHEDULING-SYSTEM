const express = require('express');
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()
router.use(authMiddleware);

router.post('/services', serviceController.create);
router.get('/services', serviceController.findAll);
router.get('/services/:id', serviceController.findById);
router.put('/services/:id', serviceController.update);
router.delete('/services/:id', serviceController.delete);

module.exports = router;