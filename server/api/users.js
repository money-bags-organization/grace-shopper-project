const router = require('express').Router();
const {
  models: { User },
} = require('../db');

// function isAdmin(req, res, next) {
//   if (req.user.isAdmin) {
//     next();
//   } else {
//     throw Error("You don't have permission!");
//   }
// }

router.get(
  '/',
  /*isAdmin ,*/ async (req, res, next) => {
    try {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'username'],
      });
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
