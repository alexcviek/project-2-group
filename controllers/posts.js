const Post = require('../models/post');

function indexPostsRoute(req, res, next) {
  Post
    .find()
    .exec()
    .then((posts) => res.json(posts))
    .catch(next);
}

function createPostsRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  // req.body.createdBy = req.user;

  Post
  .create(req.body)
  .then((post) => res.status(201).json(post))
  .catch(next);
}

function showPostsRoute(req, res, next) {
  Post
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if(!post) return res.notFound();

      res.json(post);
    })
    .catch(next);
}

function updatePostsRoute(req, res, next){
  Post
    .findById(req.params.id)
    .exec()
    .then(posts => {
      if(!posts) return res.notFound();

      posts = Object.assign(posts, req.body);
      return posts.save();
    })
    .then(post => res.json(post))
    .catch(next);
}

function deletePostsRoute(req, res, next) {
  Post
    .findById(req.params.id)
    .exec()
    .then((post) => {
      if(!post) return res.notFound();

      return post.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}
//
// function addPostsCommentRoute(req, res, next) {
//
//   req.body.createdBy = req.user;
//
//   Post
//     .findById(req.params.id)
//     .exec()
//     .then((post) => {
//       if(!post) return res.notFound();
//
//       const comment = post.comments.create(req.body);
//       post.comments.push(comment);
//
//       return post.save()
//         .then(() => res.json(comment));
//     })
//     .catch(next);
// }
//
// function deletePostsCommentRoute(req, res, next) {
//   Post
//     .findById(req.params.id)
//     .exec()
//     .then((post) => {
//       if(!post) return res.notFound();
//
//       const comment = post.comments.id(req.params.commentId);
//       comment.remove();
//
//       return post.save();
//     })
//     .then(() => res.status(204).end())
//     .catch(next);
// }


module.exports = {
  indexPostsRoute,
  createPostsRoute,
  showPostsRoute,
  updatePostsRoute,
  deletePostsRoute
  // addPostsCommentRoute,
  // deletePostsCommentRoute
};
