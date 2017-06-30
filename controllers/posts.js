const Post = require('../models/post');

function indexPostsRoute(res, req, next) {
  Post
    .find()
    .exec()
    .then((posts) => res.json(posts))
    .catch(next);
}


module.exports = {
  indexPostsRoute
};
