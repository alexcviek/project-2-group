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
          zoom: 10,
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
        var iconCat = {
          url: './images/cat-whiskers (1).png',
          size: new google.maps.Size(100, 100),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(40, 40)
        };
        const marker = new google.maps.Marker({
          icon: iconCat,
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
        const id    = post.id;
        const image = post.imageSRC;

        infowindow = new google.maps.InfoWindow({
          content: `<a href="/posts/${id}">${title}, </a>`,
          pixelOffset: new google.maps.Size(-29, 13)

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
        var iconFoodBank = {
          url: './images/001-dog-paw.png',
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 32),
          scaledSize: new google.maps.Size(15, 15)
        };
        const marker = new google.maps.Marker({
          icon: iconFoodBank,
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
        const id = foodBank.id;

        infowindow = new google.maps.InfoWindow({
          content: `<a class="map-foodbank-info" href="/foodbanks/${id}">${name}</a>`,
          pixelOffset: new google.maps.Size(-28, 0)

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
        var iconCat = {
          url: './images/cat-whiskers (1).png',
          size: new google.maps.Size(100, 100),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(40, 40)
        };
        smallMapMarker = new google.maps.Marker({
          position: scope.center || { lat: 51.515704, lng: -0.072829 },
          icon: iconCat,
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
