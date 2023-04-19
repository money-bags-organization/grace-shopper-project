const router = require('express').Router();

const {
  models: { Orders },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      attributes: ['fulfilled', 'userId'],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
