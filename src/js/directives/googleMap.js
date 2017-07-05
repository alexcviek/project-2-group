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
      foodBanks: '=',
      posts: '='
    },
    link(scope, element) {

      let map = null;
      let smallMapMarker = null;
      let foodBanksMarkers = [];
      let postsMarkers = [];
      let infowindow = null;

      scope.$watch('center', updateCenter, true);
      scope.$watch('foodBanks', addFoodBanksMarkers, true);
      scope.$watch('posts', addPostsMarkers, true);
      scope.$on('$destroy', destroyMap);

      if(element.hasClass('large')) initLargeMap();
      if(element.hasClass('small')) initSmallMap();

      function initLargeMap(){ //Large dashboard map
        map = new google.maps.Map(element[0], {
          zoom: 7,
          center: scope.center || { lat: 51.515704, lng: -0.072829 },
          scaleControl: false,
          scrollwheel: false
        });
      }

      //MARKERS FOR posts

      function addPostsMarkers(posts) {
        if(!posts) return false;
        removePostMarkers();

        posts.forEach((post) => {
          addPostMarker(post);
        });
      }

      function addPostMarker(post) {
        const marker = new google.maps.Marker({
          position: post.location,
          map
        });

        postsMarkers.push(marker);

        marker.addListener('click', () => {
          markerPostClick(marker, post);
        });
      }

      function markerPostClick(marker, post) {
        if(infowindow) infowindow.close();

        const title = post.title;

        infowindow = new google.maps.InfoWindow({
          content: `Hello there ${title}`

        });
        infowindow.open(map, marker);
      }

      //MARKERS FOR FOODBANKS

      function addFoodBanksMarkers(foodBanks) {
        if(!foodBanks) return false;
        removeFoodBankMarkers();

        foodBanks.forEach((foodBank) => {
          addFoodBankMarker(foodBank);
        });
      }

      function addFoodBankMarker(foodBank) {
        const marker = new google.maps.Marker({
          position: foodBank.location,
          map
        });

        foodBanksMarkers.push(marker);

        marker.addListener('click', () => {
          markerFoodBankClick(marker, foodBank);
        });
      }

      function markerFoodBankClick(marker, foodBank) {
        if(infowindow) infowindow.close();

        const name = foodBank.name;
        const image = foodBank.image;
        const id = foodBank.id;

        infowindow = new google.maps.InfoWindow({
          content: `<a href="/foodbanks/${id}">Hello I am ${name}. CHEESE.
          <img src="${image}"></a>`

        });
        infowindow.open(map, marker);
      }

      function initSmallMap(){
        map = new google.maps.Map(element[0], {
          zoom: 14,
          center: scope.center || { lat: 51.515704, lng: -0.072829 },
          scaleControl: false,
          scrollwheel: false
        });
        smallMapMarker = new google.maps.Marker({
          position: scope.center || { lat: 51.515704, lng: -0.072829 },
          map
        });
      }

      function updateCenter(center) {
        if(!center) return false;
        map.setCenter(center);
        if(smallMapMarker) smallMapMarker.setPosition(center);
      }

      function destroyMap(){
        console.log('destroying map...');
        map = null;
        removeFoodBankMarkers();
        removePostMarkers();
        if(smallMapMarker) {
          smallMapMarker.setMap(null);
          smallMapMarker = null;
        }
      }
      function removePostMarkers(){
        postsMarkers.forEach((marker) => {
          marker.setMap(null);
        });
        postsMarkers = [];
      }
      function removeFoodBankMarkers() {
        foodBanksMarkers.forEach((marker) => {
          marker.setMap(null);
        });
        foodBanksMarkers = [];
      }
    }
  };
}
