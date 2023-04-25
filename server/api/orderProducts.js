const router = require('express').Router();
const {
  models: { OrderProducts },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const orderProduct = await OrderProducts.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['orderId', 'productId'],
    });
    res.json(orderProduct);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    res.status(201).send(await OrderProducts.create(req.body));
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const orders = await OrderProducts.findByPk(req.params.id);
    await orders.destroy();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
