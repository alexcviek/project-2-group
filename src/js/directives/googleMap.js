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
      center: '='
    },
    link(scope, element) {

      let map = null;
      let marker = null;

      scope.$watch('center', initMap);
      scope.$on('$destroy', destroyMap);

      function initMap(center){
        if(!center) return false;
        map = new google.maps.Map(element[0], {
          zoom: 14,
          center: center
        });
        marker = new google.maps.Marker({
          position: center,
          map
        });
      }
      function destroyMap(){
        console.log('destroying map...');
        marker.setMap(null);
        marker = null;
        map = null;
      }
    }
  };
}
