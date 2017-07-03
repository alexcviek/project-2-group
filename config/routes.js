const router = require('express').Router();
const foodBanksController = require('../controllers/foodBanks');
const usersController = require('../controllers/users');
const postsController = require('../controllers/posts');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const imageUpload = require('../lib/imageUpload');

router.route('/posts')
  .get(postsController.indexPostsRoute)
  .post(imageUpload, postsController.createPostsRoute);

router.route('/posts/:id')
  .get(postsController.showPostsRoute)
  .put(imageUpload, postsController.updatePostsRoute)
  .delete(postsController.deletePostsRoute);

router.route('/foodbanks')
  .get(foodBanksController.indexFoodBanksRoute)
  .post(foodBanksController.createFoodBanksRoute);

router.route('/foodbanks/:id')
  .get(foodBanksController.showFoodBanksRoute)
  .put(imageUpload, foodBanksController.updateFoodBanksRoute)
  .delete(foodBanksController.deleteFoodBanksRoute);


router.route('/users/:id')
  .get(usersController.showUsersRoute)
  .put(imageUpload, usersController.updateUsersRoute)
  .delete(usersController.deleteUsersRoute);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/github')
  .post(oauth.github);

router.route('/oauth/facebook')
  .post(oauth.facebook);

module.exports = router;
