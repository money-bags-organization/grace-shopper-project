const router = require('express').Router();
const { orderProducts } = require('../db');

router.get('/orderProducts', async (req, res, next) => {
  try {
    const orderProduct = await orderProducts.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['orderId', 'productId'],
    });
    res.json('test');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
