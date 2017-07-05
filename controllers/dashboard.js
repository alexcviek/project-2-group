const FoodBank = require('../models/foodBank');
const Post = require('../models/post');

function dashboard(req, res, next){
  FoodBank
  .find()
  .exec()
  .then(foodBanks => res.json(foodBanks))
  .catch(next);
}

module.exports = {
  dashboard
};
