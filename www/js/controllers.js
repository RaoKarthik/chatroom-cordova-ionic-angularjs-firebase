angular.module('chatRoom.controllers', [])

.controller('AppCtrl', function($scope, $state) {
  $scope.goToNewRoom = function() {
    $state.transitionTo('newroom');
  };
  
  $scope.goToAbout = function() {
    $state.transitionTo('about');
    $scope.toggleSideMenu();
  };
  
  $scope.goToHome = function() {
    $state.transitionTo('home');
  };  
    
  $scope.toggleSideMenu = function() {
    $scope.sideMenuController.toggleLeft();
  };
})

.controller('MainCtrl', function($scope, $timeout, angularFire) {
  $scope.rooms = [];
  var ref = new Firebase('https://chatroom-io.firebaseio.com/opened_rooms');  
  var promise = angularFire(ref, $scope, "rooms");

  $scope.leftButtons = [
    {
      type: 'button-icon',
      content: '<i class="icon ion-navicon"></i>',
      tap: function(e) {
        $scope.toggleSideMenu();
      }
    }
  ];
  $scope.rightButtons = [
    {
      type: 'button-icon',
      content: '<i class="icon ion-plus"></i>',
      tap: function(e) {
      }
    }
  ];
  /*
  <!-- where the content of each page will be rendered -->
  <header class="bar bar-header bar-calm">
    <button class="button button-icon" ng-click="toggleSideMenu()"><i class="icon ion-navicon"></i></button>
    <h1 class="title">Lobby</h1>
    <button class="button button-icon" ng-click="goToNewRoom()"><i class="icon ion-plus"></i></button>
  </header>
  */
})

.controller('NewRoomCtrl', function($scope, $location, angularFire) {      
  $scope.rooms = [];
  var ref = new Firebase('https://chatroom-io.firebaseio.com/opened_rooms');  
  var promise = angularFire(ref, $scope, "rooms");
  
  $scope.newRoomName = "";
  $scope.newRoomNameId = "";
  $scope.newRoomDescription = "";

  $scope.setNewRoomNameId = function() {
    this.newRoomNameId = this.newRoomName.toLowerCase().replace(/\s/g,"-").replace(/[^a-z0-9\-]/g, '');
  };
  
  $scope.createRoom = function() {
    $scope.rooms.push({
      id: Math.floor(Math.random() * 5000001),
      title: $scope.newRoomName,
      slug: $scope.newRoomNameId, 
      description: $scope.newRoomDescription
    });
    
    $location.path('/home');
  };
})

.controller('RoomCtrl', function($scope, $stateParams, $timeout, angularFire, $ionicScrollDelegate) {
  $scope.newMessage = "";
  $scope.messages = [];
  
  var ref = new Firebase('https://chatroom-io.firebaseio.com/rooms/' + $stateParams.roomId);
  var roomPromise = angularFire(ref, $scope, 'room');
  var promise = angularFire(ref, $scope, "messages");

  var scrollBottom = function() {
    // Resize and then scroll to the bottom
    $ionicScrollDelegate.resize();
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom();
    });
  };

  roomPromise.then(function() {
    console.log('Value came back', $scope.room);
    scrollBottom();
  });

  $scope.username = 'User' + Math.floor(Math.random() * 501);
  $scope.submitAddMessage = function() {
    $scope.messages.push({
      created_by: this.username,
      content: this.newMessage,
      created_at: new Date()
    });
    this.newMessage = "";

    scrollBottom();
  };
})

.controller('AboutCtrl', function($scope) {
});
