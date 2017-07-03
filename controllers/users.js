const User = require('../models/user');

function showUsersRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      res.json(user);
    })
    .catch(next);
}

function updateUsersRoute(req, res, next) {
  if(req.file ) req.body.image = req.file.filename;
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      console.log(req.params.id);

      for(const field in req.body) {
        user[field] = req.body[field]; // field references a class in a div on the views/auth/login,register,edit&new
      }

      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
}

function deleteUsersRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      return user.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}


module.exports = {
  showUsersRoute,
  updateUsersRoute,
  deleteUsersRoute
};
