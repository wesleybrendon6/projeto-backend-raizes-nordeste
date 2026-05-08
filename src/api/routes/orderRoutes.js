const router = require('express').Router();

const authMiddleware = require('../../middlewares/authMiddleware');

const orderController = require('../controllers/orderController');

router.post(
  '/',
  authMiddleware,
  orderController.create
);

router.get(
  '/',
  authMiddleware,
  orderController.list
);

router.patch(
  '/:id/status',
  authMiddleware,
  orderController.updateStatus
);

module.exports = router;