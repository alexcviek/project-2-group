/* global navigator */

angular
  .module('sausageApp')
  .service('userLocation', UserLocation);

UserLocation.$inject = ['$rootScope'];
function UserLocation($rootScope) {
  let currentLocation = null;

  navigator.geolocation.watchPosition((position) => {
    currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
    $rootScope.$broadcast('locationChanged', currentLocation);
  });

  this.getLocation = function getLocation() { //confirm geolocation active and functional
    return currentLocation;
  };
}
