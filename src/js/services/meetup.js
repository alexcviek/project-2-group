angular
.module('sausageApp')
.service('meetupService', MeetupService);

MeetupService.$inject = ['$http'];
function MeetupService($http) {
  this.getMeetups = function getMeetups() {
    return $http
      .get('/api/meetup')
      .then((response) => {
        return response.data.map(meetup => {
          return {
            name: meetup.name,
            description: meetup.description,
            event_url: meetup.event_url ? `${meetup.event_url}` : null,
            startTime: meetup.time,
            location: { lat: Number(meetup.group.group_lat), lng: Number(meetup.group.group_lon) },
            address: meetup.venue ? `${meetup.venue.name}, ${meetup.venue.address_1}` : null
          };
        });
      });

  };
}
