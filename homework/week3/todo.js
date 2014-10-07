angular.module("Todo", []).controller("TodoCtrl", function($scope, $window) {
  $scope.newItem = {};
  $scope.todoList = [
    { text: "Clean room" },
    { text: "Do homework"},
    { text: "Pump iron" }
  ];
  $scope.undoQueue = [];

  $scope.addItem = function() {
    if ($scope.newItem.text) {
      $scope.todoList.push($scope.newItem);
      $scope.newItem = {};
    }
  };

  $scope.toggleDone = function(index) {
    $scope.todoList[index].done = !$scope.todoList[index].done;
    var completedItem = $scope.todoList.splice(index, 1)[0];
    $scope.undoQueue.push(completedItem);
  };

  $scope.undo = function() {
    if ($scope.undoQueue.length > 0)
    {
      console.log('undo!');
      var lastItem = $scope.undoQueue.pop();
      lastItem.done = false;
      $scope.todoList.push(lastItem);
    }
  };

  // Ex. 2 Bonus: Detect all keypresses
  angular.element($window).bind("keypress", function(e) {
    // console.log(e);
    // Do something with the event here
    if (e.ctrlKey && e.which == 26)
    {
      var scope = angular.element('body > div').scope();
      scope.undo();
      scope.$apply();
    }
  });
});

