const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/appointments', appointmentController.create);
router.get('/appointments', appointmentController.findAllByUser);

module.exports = router;