const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const FoodBank = require('../models/foodBank');
const User = require('../models/user');
const Post = require('../models/post');


mongoose.connect(dbURI);

FoodBank.collection.drop();
User.collection.drop();
Post.collection.drop();


User
  .create([{
    username: 'Lauren Armbrust',
    email: 'lauren@gmail.com',
    password: 'pass'
  },{
    username: 'Alex Cwiek',
    email: 'alex@gmail.com',
    password: 'pass'
  },{
    username: 'Nick Cresner',
    email: 'nick@gmail.com',
    password: 'pass'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);
    return FoodBank
      .create([{
        name: 'Whitechapel Misson',
        location: { lat: 51.521610,
          lng: -0.059307
        },
        type: 'Mission',
        url: 'http://whitechapel.org.uk',
        image: 'http://eastlondonhistory.com/wp-content/uploads/2016/04/mission-logo.png',
        createdBy: users[0]
      },{
        name: 'Cambridge Food Bank',
        location: { lat: 52.232458,
          lng: 0.150994
        },
        type: 'Food Bank',
        url: 'http://cambridgecity.foodbank.org.uk',
        image: 'http://www.stpaulscambridge.org.uk/wp-content/uploads/2014/11/Cambridge-City-Foodbank.jpg',
        createdBy: users[1]
      }])
      .then((foodBanks) => {
        console.log(`${foodBanks.length} food banks created!`);
        return Post
          .create([{
            title: 'Bunch of clothes',
            separable: false,
            image: 'https://static.pexels.com/photos/322207/pexels-photo-322207.jpeg',
            location: { lat: 51.521610,
              lng: -0.059307
            },
            item: [{
              name: 'Belt',
              type: 'clothes',
              perishable: false,
              image: 'https://static.pexels.com/photos/322207/pexels-photo-322207.jpeg',
              claimed: false
            },{
              name: 'Jumper',
              type: 'clothes',
              perishable: false,
              image: 'https://static.pexels.com/photos/322207/pexels-photo-322207.jpeg',
              claimed: false
            },{
              name: 'Shoes',
              type: 'clothes',
              perishable: false,
              image: 'https://static.pexels.com/photos/322207/pexels-photo-322207.jpeg',
              claimed: false
            }],
            createdBy: users[2]
          },{
            title: 'Loads of food',
            separable: false,
            image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Food_into_a_refrigerator_-_20111002.jpg',
            location: { lat: -51.521610,
              lng: -0.059307
            },
            item: [{
              name: 'Eggs',
              type: 'food',
              perishable: true,
              image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Food_into_a_refrigerator_-_20111002.jpg',
              claimed: false
            },{
              name: 'Sausage',
              type: 'food',
              perishable: true,
              image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Food_into_a_refrigerator_-_20111002.jpg',
              claimed: false
            }],
            createdBy: users[2]
          }])
          .then((posts) => {
            console.log(`${posts.length} posts created!`);
          });
      });
  })
  // .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
