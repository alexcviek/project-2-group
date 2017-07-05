const FoodBank = require('../models/foodBank');

function indexFoodBanksRoute(req, res, next){
  FoodBank
    .find()
    .exec()
    .then(foodBanks => res.json(foodBanks))
    .catch(next);
}

function showFoodBanksRoute(req, res, next){
  FoodBank
    .findById(req.params.id)
    .exec()
    .then(foodBank => {
      if(!foodBank) return res.notFound();
      return res.json(foodBank);
    })
    .catch(next);
}

function createFoodBanksRoute(req, res, next){
  if(req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.user;

  FoodBank
    .create(req.body)
    .then((foodBank) => res.status(201).json(foodBank))
    .catch(next);
}

function updateFoodBanksRoute(req, res, next){
  FoodBank
    .findById(req.params.id)
    .exec()
    .then(foodBank => {
      if(!foodBank) return res.notFound();

      foodBank = Object.assign(foodBank, req.body);
      return foodBank.save();
    })
    .then(foodBank => res.json(foodBank))
    .catch(next);
}

function deleteFoodBanksRoute(req, res, next){
  FoodBank
    .findById(req.params.id)
    .exec()
    .then((foodBank) => {
      if(!foodBank) return res.notFound();
      return foodBank.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  indexFoodBanksRoute,
  showFoodBanksRoute,
  createFoodBanksRoute,
  updateFoodBanksRoute,
  deleteFoodBanksRoute
};
