(function() {
  function seekBar($document) {
    let calculatePercent = (seekBar, event) => {
      let offsetX = event.pageX - seekBar.offset().left;
      let seekBarWidth = seekBar.width();
      let offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;

        let seekBar = $(element);

        attributes.$observe('value', (newValue) => {
          scope.value = newValue;
        });

        attributes.$observe('max', (newValue) => {
          scope.max = newValue;
        });

        let percentString = () => {
          let value = scope.value;
          let max = scope.max;
          let percent = value / max * 100;
          return `${percent}%`;
        };

        scope.fillStyle = () => ({ width: percentString() });

        scope.thumbStyle = () => ({ left: percentString() });

        scope.onClickSeekBar = event => {
          let percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };

        scope.trackThumb = () => {
          $document.bind('mousemove.thumb', event => {
            let percent = calculatePercent(seekBar, event);
            scope.$apply( () => {
              scope.value = percent * scope.max;
              notifyOnChange(scope.value);
            });
          });

          $document.bind('mouseup.thumb', () => {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };

        let notifyOnChange = (newValue) => {
          if (typeof scope.onChange === 'function') {
            scope.onChange( {value: newValue });
          }
        };
      }
    };
  }

    angular
      .module('blocJams')
      .directive('seekBar', ['$document', seekBar]);
})();
