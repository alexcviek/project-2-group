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
    password: 'pass',
    passwordConfirmation: 'pass'
  },{
    username: 'Alex Cwiek',
    email: 'alex@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass'
  },{
    username: 'Nick Cresner',
    email: 'nick@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass'
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
      },{
        name: 'Battersea Fat Cat Pantry',
        location: { lat: 51.476389,
          lng: -0.151680
        },
        type: 'Private Sectory',
        url: 'http://fatcat.co.uk',
        image: 'http://i.dailymail.co.uk/i/pix/2016/10/04/17/39191F2600000578-3821775-image-a-40_1475597321353.jpg',
        createdBy: users[1]
      },{
        name: 'Hackney Food Bank',
        location: { lat: 51.5254708,
          lng: -0.099727
        },
        type: 'Food Bank',
        url: 'https://www.google.co.uk/url?sa=t&rct=j&url=http%3A%2F%2Fwww.hackney.foodbank.org.uk%2F&source=maps&ei=VaxbWYiGDcqRgAaxjbnoAg%3A203&cd=1&usg=AFQjCNG-a7mA_QZncjlS0V667Iv5DNIP6Q&ved=1i%3A1%2Ct%3A3443%2Ce%3A0%2Cp%3AVaxbWYiGDcqRgAaxjbnoAg%3A203',
        image: 'http://www.theology-centre.org.uk/wp-content/uploads/2013/08/Tesco-Foodbank-Collection-July-2013.jpg',
        createdBy: users[2]
      },{
        name: 'The Trussell Trust Food Bank',
        location: { lat: 51.5254708,
          lng: -0.099727
        },
        type: 'Food Bank',
        url: 'http://trusselltrust.org',
        image: 'https://leftfootforward.org/images/2014/02/Food-banksj.jpg',
        createdBy: users[2]
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
          },{
            title: 'Loads of food',
            separable: false,
            image: 'https://images.unsplash.com/photo-1418669112725-fb499fb61127?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
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
          },{
            title: 'Loads of food',
            separable: false,
            image: 'https://images.unsplash.com/photo-1417976528056-3c9bbbb5456c?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
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
