Application.Directives.directive('events', [ 'Event',
  function (Event) {
    return ({
      restrict: 'E',
      templateUrl: '/home/events.html',
      link ($scope, element, attributes) {
        // The closest upcoming events
        $scope.upcomingEvents = null;

        /**
         * Test if the provided event run on a single day or not
         * @param event {Object} single event from the $scope.upcomingEvents array
         * @returns {boolean} false if the event runs on more that 1 day
         */
        $scope.isOneDayEvent = function(event) {
          return moment(event.start_date).isSame(event.end_date, 'day');
        }

        // constructor
        const initialize = function () {
          Event.upcoming({ limit: 3 }, function (data) {
            $scope.upcomingEvents = data;
          })
        };

        // !!! MUST BE CALLED AT THE END of the directive
        return initialize();
      }
    });
  }
]);
