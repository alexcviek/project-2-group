const router = require('express').Router();
const foodBanksController = require('../controllers/foodBanks');
const usersController = require('../controllers/users');
const postsController = require('../controllers/posts');
// const auth = require('../controllers/auth');
// const oauth = require('../controllers/oauth');

router.route('/posts')
  .get(postsController.indexPostsRoute);

router.route('/foodbanks')
  .get(foodBanksController.indexFoodBanksRoute);

router.route('/users/:id')
  .get(usersController.showUsersRoute)
  .put(usersController.updateUsersRoute)
  .delete(usersController.deleteUsersRoute);

module.exports = router;
