// angular/controllers/todo.js

angular.module('MyApp') // Note: no dependencies
  .controller('GameCtrl', function($scope, $interval, $state) {
    $scope.points = 0;
    $scope.time = 0;

    var boxInterval;
    var timeInterval;
    var hasStarted = false;
    var speedFactor = 1.0;
    var sizeFactor = 1.0;
    var MAX_WIDTH = 100;
    var MAX_HEIGHT = 100;

    var positionBoxRandomly = function() {
      var x = Math.floor(Math.random() * (($(window).width() - 200) - 200 + 1) + 200);
      var y = Math.floor(Math.random() * (($(window).height() - 200) - 200 + 1) + 200);
      $('#target-box').css('left', x);
      $('#target-box').css('top', y);
      console.log('(' + x + ', ' + y + ')');
    };

    var resizeBox = function(width, height) {
      $('#target-box').css('width', width);
      $('#target-box').css('height', height);
    };

    $scope.start = function() {
      hasStarted = true;
      $scope.time = 0;
      speedFactor = 1.0;
      resizeBox(MAX_WIDTH, MAX_HEIGHT);

      boxInterval = $interval(function() {
        positionBoxRandomly();
      }, 1000);

      timeInterval = $interval(function() {
        $scope.time++;
      }, 1000);
    };

    $scope.stop = function() {
      $interval.cancel(boxInterval);
      $interval.cancel(timeInterval);
      hasStarted = false;
    };

    $scope.addPoint = function() {
      if (hasStarted === true) {
        $scope.points++;
        if ($scope.points === 10)
        {
          $interval.cancel(boxInterval);
          $interval.cancel(timeInterval);
          hasStarted = false;
          var params = {'points': $scope.points, 'time': $scope.time};
          $state.go('winner', params);
        }
        else
        {
          speedFactor += 0.05;
          sizeFactor += 0.05;
          resizeBox(MAX_WIDTH / sizeFactor, MAX_HEIGHT / sizeFactor);
          positionBoxRandomly();
          $interval.cancel(boxInterval);
          boxInterval = $interval(function() {
            positionBoxRandomly();
          }, 1000 / speedFactor);
        }
      }
    };
  })
  .controller('WinCtrl', function($scope, $stateParams) {
    console.log($stateParams);
    $scope.points = $stateParams.points;
    $scope.time = $stateParams.time;
  });
