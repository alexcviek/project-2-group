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
        name: 'Brent Food Bank',
        location: { lat: 51.549431,
          lng: -0.249593
        },
        type: 'Food Bank',
        url: 'https://brent.foodbank.org.uk/',
        image: 'https://brent.foodbank.org.uk/wp-content/uploads/sites/23/2016/02/warehouse_volunteers_20150324_0092-237x235.jpg',
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
      },{
        name: 'Stoke Newington Food Bank',
        location: { lat: 51.5608971,
          lng: -0.1542394
        },
        type: 'Food Bank',
        url: 'https://www.google.co.uk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=9&ved=0ahUKEwi1sYXHhPTUAhVFJMAKHQjoCfgQgU8IWjAI&url=http%3A%2F%2Fhackney.foodbank.org.uk%2F&usg=AFQjCNHY30le3sLkHt0VJGZL6ZRq6wagBA&cad=rja',
        image: 'https://hackney.foodbank.org.uk/wp-content/uploads/sites/162/2016/01/warehouse_volunteers_20150330_0045-e1452785212962-237x235.jpg',
        createdBy: users[2]
      },{
        name: 'Westminster Chapel',
        location: { lat: 51.4988641,
          lng: -0.2081405
        },
        type: 'Westminster Chapel',
        url: 'http://www.westminsterchapel.org.uk/',
        image: 'http://www.westminsterchapel.org.uk/wp-content/themes/westminster/images/westminster_logo_main.png',
        createdBy: users[2]
      },{
        name: 'Oxfam Donation Point',
        location: { lat: 51.4796261,
          lng: -0.1925649
        },
        type: 'Donation Point',
        url: 'http://www.oxfam.org.uk/',
        image: 'http://loveincstatic.blob.core.windows.net/lovemoney/Oxfam%20PA-5199621.jpg',
        createdBy: users[2]
      }])
      .then((foodBanks) => {
        console.log(`${foodBanks.length} food banks created!`);
        return Post
          .create([{
            title: 'Bunch of clothes',
            separable: false,
            image: 'https://static.pexels.com/photos/322207/pexels-photo-322207.jpeg',
            location: { lat: 51.521611,
              lng: -0.059308
            },
            items: [{
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
            createdBy: users[2],
            comments: [{
              text: 'Thank you for separating the items in the photo. Will definitely be sending an email to inquire whether the items have been reserved.',
              createdBy: users[1]
            }]
          },{
            title: 'Going on vacation, help us clean out our fridge!',
            separable: false,
            image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Food_into_a_refrigerator_-_20111002.jpg',
            location: { lat: -51.521613,
              lng: -0.059304
            },
            items: [{
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
            title: 'Random Items',
            separable: false,
            image: 'https://images.unsplash.com/photo-1418669112725-fb499fb61127?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
            location: { lat: -51.521612,
              lng: -0.059306
            },
            items: [{
              name: 'Food',
              type: 'food',
              perishable: true,
              image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Food_into_a_refrigerator_-_20111002.jpg',
              claimed: false
            },{
              name: 'Clothes',
              type: 'food',
              perishable: true,
              image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Food_into_a_refrigerator_-_20111002.jpg',
              claimed: false
            }],
            createdBy: users[1]
          },{
            title: 'Furniture',
            separable: false,
            image: 'https://images.unsplash.com/photo-1417976528056-3c9bbbb5456c?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
            location: { lat: -51.521610,
              lng: -0.059307
            },
            items: [{
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
            createdBy: users[1]
          },{
            title: 'Childrens Items',
            separable: false,
            image: 'https://media.defense.gov/2014/Jul/30/2000829099/670/394/0/140728-F-TB066-025.JPG',
            location: { lat: -51.521615,
              lng: -0.059307
            },
            items: [{
              name: 'Clothing for Infants and Toddlers',
              type: 'clothing',
              perishable: false,
              image: 'https://media.defense.gov/2014/Jul/30/2000829099/670/394/0/140728-F-TB066-025.JPG',
              claimed: false
            },{
              name: 'Toys',
              type: 'other',
              perishable: false,
              image: 'http://maxpixel.freegreatpicture.com/static/photo/1x/Bobby-Car-Childrens-Vehicles-Toys-Bobby-Car-Races-268380.jpg',
              claimed: false
            }],
            createdBy: users[2]
          },{
            title: 'Baby Items',
            separable: false,
            image: 'https://cdn.pixabay.com/photo/2015/09/21/16/27/toys-950148_960_720.jpg',
            location: { lat: -51.521616,
              lng: -0.059307
            },
            items: [{
              name: 'Toys for Infants and Toddlers',
              type: 'clothing',
              perishable: false,
              image: 'https://media.defense.gov/2014/Jul/30/2000829099/670/394/0/140728-F-TB066-025.JPG',
              claimed: false
            },{
              name: 'Toys',
              type: 'other',
              perishable: false,
              image: 'http://maxpixel.freegreatpicture.com/static/photo/1x/Bobby-Car-Childrens-Vehicles-Toys-Bobby-Car-Races-268380.jpg',
              claimed: false
            }],
            createdBy: users[0]
          }])
          .then((posts) => {
            console.log(`${posts.length} posts created!`);
          });
      });
  })
  // .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
