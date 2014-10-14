// angular/controllers/todo.js

angular.module('MyApp') // Note: no dependencies
  .controller('GameCtrl', function($scope, $interval, $state) {
    $scope.points = 0;
    $scope.time = 0;

    var boxInterval;
    var timeInterval;

    $scope.start = function() {
      $scope.time = 0;
      boxInterval = $interval(function() {
        var x = Math.floor(Math.random() * (($(window).width() - 200) - 200 + 1) + 200);
        var y = Math.floor(Math.random() * (($(window).height() - 200) - 200 + 1) + 200);
        $('#target-box').css('left', x);
        $('#target-box').css('top', y);
        console.log(x + ' ' + y);
      }, 1000);

      timeInterval = $interval(function() {
        $scope.time++;
      }, 1000);
    };

    $scope.stop = function() {
      $interval.cancel(boxInterval);
      $interval.cancel(timeInterval);
    };

    $scope.addPoint = function() {
      $scope.points++;
      if ($scope.points == 10)
      {
        $interval.cancel(boxInterval);
        $interval.cancel(timeInterval);
        var params = {'points': $scope.points, 'time': $scope.time};
        $state.go('winner', params);
      }
    };
  })
  .controller('WinCtrl', function($scope, $stateParams) {
    console.log($stateParams);
    $scope.points = $stateParams.points;
    $scope.time = $stateParams.time;
  });
