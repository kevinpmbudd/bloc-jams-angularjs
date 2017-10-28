(function() {
  function ratingStars() {
    return {
      templateUrl: '/templates/directives/rating_stars.html',
      replace: true,
      restrict: 'E',
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attributes) {
        scope.stars = attributes.stars;

        scope.onClickStars = event => {
          scope.stars = angular.element(event.target).attr('value');
          notifyOnChange(scope.stars);
        };

        let notifyOnChange = (newValue) => {
          if (typeof scope.onChange === 'function') {
            scope.onChange( {value: newValue} );
          }
        };

        scope.$watch('stars', function() {
          let length = element.children().length;
          let rating = scope.stars;

          for (var i = 0; i < length; i++) {
            let elem = angular.element( element.children()[i] );
            elem.removeClass('ion-star');
            elem.removeClass('ion-ios-star-outline');
            if (rating > 0) {
              elem.addClass('ion-star');
            } else {
              elem.addClass('ion-ios-star-outline');
            }
            rating --;
          }
        });
      }
    };
  }

  angular
    .module('blocJams')
    .directive('ratingStars', ratingStars);
})();
