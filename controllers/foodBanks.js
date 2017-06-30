const FoodBank = require('../models/foodBank');

function indexFoodBanksRoute(req, res, next){
  FoodBank
    .find()
    .exec()
    .then(foodBanks => res.json(foodBanks))
    .catch(next);
}

module.exports = {
  indexFoodBanksRoute
};
