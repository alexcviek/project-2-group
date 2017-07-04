/* global google */
angular
.module('sausageApp')
.directive('autocomplete', autocomplete);

autocomplete.$inject = [];

function autocomplete() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      city: '='
    },
    link: function(scope, element, attrs, model) {
      const options = {
        types: []
      };
      const autocomplete = new google.maps.places.Autocomplete(element[0], options);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        scope.city = place.geometry.location.toJSON();
        console.log(scope.city);

        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
        model.$setViewValue(element.val());
        scope.$apply();
      });
    }
  };
}
