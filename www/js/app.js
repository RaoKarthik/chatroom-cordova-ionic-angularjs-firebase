angular.module('chatRoom', ['ionic', 'chatRoom.services', 'chatRoom.filters', 'chatRoom.controllers', 'firebase'])

.config(function ($compileProvider){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'MainCtrl'
  });

  $stateProvider.state('roomsid', {
    url: '/rooms/:roomId',
    templateUrl: 'templates/room.html',
    controller: 'RoomCtrl'
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});

