const request = require('request-promise');

const groupIndex = (req, res) => {
  request({
    url: 'https://api.meetup.com/find/groups',
    method: 'GET',
    qs: {
      sign: true,
      location: 'london',
      topic_id: '16645',
      page: 150,
      category: 4,
      key: process.env.MEETUP_API_KEY
    },
    json: true
  })
  .then((data) => {

    const idArray = data.map((group) => {
      // console.log(group.id);
      return group.id;
    });

    return request({
      url: 'https://api.meetup.com/2/events',
      method: 'GET',
      qs: {
        group_id: idArray.toString(),
        key: '29621f1b7b477145431a27565f58c3f',
        sign: true,
        page: 150
      },
      json: true
    });
  })
  .then((data) => {
    res.status(200).json(data.results);
    // data.results.forEach((event) => {
    console.log(data.results);
    // });
    // res.render('hookup', {data: data.results});
    // // res.end();
  })
  .catch((err) => {
    res.status(500).json(err);
  });
};

module.exports = { groupIndex };
