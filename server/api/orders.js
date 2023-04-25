const router = require('express').Router();

const {
  models: { Orders },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      attributes: ['id', 'fulfilled', 'userId'],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Orders.create(req.body));
    console.log(req.body)
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const orders = await Orders.findByPk(req.params.id);
    await orders.destroy();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
