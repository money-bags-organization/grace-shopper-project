const router = require('express').Router();
const {
  models: { User },
} = require('../db');

// function isAdmin(req, res, next) {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     throw Error("You don't have permission!");
//   }
// }

router.get(
  '/',
  /*isAdmin,*/ async (req, res, next) => {
    try {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'username', 'email', 'password', 'isAdmin'],
      });
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:id', async (req, res, next) => {
  try {
    const singleuser = await User.findByPk(req.params.id);
    res.json(singleuser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
