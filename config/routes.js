const router = require('express').Router();
const foodBanksController = require('../controllers/foodBanks');
const usersController = require('../controllers/users');
const postsController = require('../controllers/posts');
// const auth = require('../controllers/auth');
// const oauth = require('../controllers/oauth');

router.route('/posts')
  .get(postsController.indexPostsRoute)
  .post(postsController.createPostsRoute);

router.route('/posts/:id')
  .get(postsController.showPostsRoute)
  .put(postsController.updatePostsRoute)
  .delete(postsController.deletePostsRoute);

router.route('/foodbanks')
  .get(foodBanksController.indexFoodBanksRoute)
  .post(foodBanksController.createFoodBanksRoute);

router.route('/foodbanks/:id')
  .get(foodBanksController.showFoodBanksRoute)
  .put(foodBanksController.updateFoodBanksRoute)
  .delete(foodBanksController.deleteFoodBanksRoute);


router.route('/users/:id')
  .get(usersController.showUsersRoute)
  .put(usersController.updateUsersRoute)
  .delete(usersController.deleteUsersRoute);

module.exports = router;
