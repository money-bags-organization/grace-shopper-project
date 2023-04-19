const router = require('express').Router();
const {
  models: { Products },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const product = await Products.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['name', 'price', 'quantity'],
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
