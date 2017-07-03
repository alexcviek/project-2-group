/* global google */
angular
.module('sausageApp')
.directive('googleMap', googleMap);

function googleMap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map">GOOGLE MAP HERE</div>',
    scope: {
      center: '=',
      foodBanks: '='
    },
    link(scope, element) {

      let map = null;
      let smallMapMarker = null;
      let markers = [];
      let infowindow = null;

      scope.$watch('center', updateCenter, true);
      scope.$watch('foodBanks', addMarkers, true);
      scope.$on('$destroy', destroyMap);

      if(element.hasClass('large')) initLargeMap();
      if(element.hasClass('small')) initSmallMap();

      function initLargeMap(){
        map = new google.maps.Map(element[0], {
          zoom: 7,
          center: scope.center || { lat: 51.521610, lng: -0.059307 },
          scaleControl: false,
          scrollwheel: false
        });
      }

      function addMarkers(foodBanks) {
        removeMarkers();

        foodBanks.forEach((foodBank) => {
          addMarker(foodBank);
        });
      }

      function addMarker(foodBank) {
        const marker = new google.maps.Marker({
          position: foodBank.location,
          map
        });

        markers.push(marker);

        marker.addListener('click', () => {
          markerClick(marker, foodBank);
        });
      }

      function markerClick(marker, foodBank) {
        if(infowindow) infowindow.close();

        const name = foodBank.name;

        infowindow = new google.maps.InfoWindow({
          content: `
          Hello I am ${name}. CHEESE.
          `
        });

        infowindow.open(map, marker);
      }

      function initSmallMap(){
        map = new google.maps.Map(element[0], {
          zoom: 14,
          center: scope.center || { lat: 51.521610, lng: -0.059307 },
          scaleControl: false,
          scrollwheel: false
        });
        smallMapMarker = new google.maps.Marker({
          position: scope.center || { lat: 51.521610, lng: -0.059307 },
          map
        });
      }

      function updateCenter(center) {
        if(!center) return false;
        map.setCenter(center);
      }

      function destroyMap(){
        console.log('destroying map...');
        map = null;
        removeMarkers(); // remove multiple markers
        if(smallMapMarker) {
          smallMapMarker.setMap(null);
          smallMapMarker = null;
        }
      }

      function removeMarkers() {
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];
      }
    }
  };
}
