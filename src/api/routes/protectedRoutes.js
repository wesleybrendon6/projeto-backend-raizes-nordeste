const router = require('express').Router();

const authMiddleware = require('../../middlewares/authMiddleware');

router.get(
  '/dashboard',
  authMiddleware,
  (req, res) => {

    return res.json({
      message: 'ROTA PROTEGIDA LIBERADA',
      userId: req.userId
    });

  }
);

module.exports = router;