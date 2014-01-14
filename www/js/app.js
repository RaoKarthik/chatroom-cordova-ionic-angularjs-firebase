angular.module('chatRoom', ['ionic', 'chatRoom.services', 'chatRoom.controllers', 'firebase'])

.config(function ($compileProvider){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'MainCtrl'
  });

  $stateProvider.state('rooms.new', {
    url: '/rooms/new',
    views: {
      'rooms-new': {
        templateUrl: 'templates/new_room.html',
        controller: 'NewRoomCtrl'
      }
    }
  });

  $stateProvider.state('rooms.id', {
    url: '/rooms/:roomId',
    views: {
      'rooms-id': {
        templateUrl: 'templates/room.html',
        controller: 'RoomCtrl'
      }
    }
  });
  
  $stateProvider.state('about', {
    url: '/about',
    views: {
      'about': {
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});

