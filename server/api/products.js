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
      attributes: ['id', 'name', 'price', 'quantity'],
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleproduct = await Products.findByPk(req.params.id);
    res.json(singleproduct);
  } catch (error) {
    next(error);
  }
});

//David and Malcolms Edit//
router.delete('/:id', async (req, res, next) => {
  try {
    const products = await Products.findByPk(req.params.id);
    await products.destroy();
    res.send(products);
  } catch (error) {
    next(error);
  }
});


  router.put('/:id', async (req, res, next) => {
    try {
      const singleproduct = await Products.findByPk(req.params.id);
      res.send(await singleproduct.update(req.body));
    } catch (error) {
      next(error);
    }
  });

  //End David and Malcolms Edit//

  router.post('/', async (req, res, next) => {
    try {
      res.status(201).send(await Products.create(req.body));
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
