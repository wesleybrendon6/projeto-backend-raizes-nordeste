const router = require('express').Router();

const authMiddleware = require('../../middlewares/authMiddleware');

const paymentController = require('../controllers/paymentController');

router.post(
  '/',
  authMiddleware,
  paymentController.process
);

module.exports = router;