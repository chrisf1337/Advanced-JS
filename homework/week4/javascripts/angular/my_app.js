var app = angular.module("MyApp", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "./templates/home.html",
        controller: "GameCtrl"
      })
      .state("winner", {
        url: "/winner/:points/:time",
        templateUrl: "./templates/winner.html",
        // params: ['points', 'time'],
        controller: "WinCtrl"
      });
    // Make the default route "/" instead of nothing
    $urlRouterProvider.otherwise("/");
  });

