angular.module('chatRoom.controllers', [])

.controller('AppCtrl', function($scope, $location) {
  $scope.goToNewRoom = function() {
    $location.path('/rooms/new');
    $scope.toggleSideMenu();
  };
  
  $scope.goToAbout = function() {
    $location.path('/about');
    $scope.toggleSideMenu();
  };
  
  $scope.goToHome = function() {
    $location.path('/home');
  };  
    
  $scope.toggleSideMenu = function() {
    $scope.sideMenuController.toggleLeft();
  };
})

.controller('MainCtrl', function($scope, $timeout, angularFire) {
  $scope.rooms = [];
  var ref = new Firebase('https://chatroom-io.firebaseio.com/opened_rooms');  
  var promise = angularFire(ref, $scope, "rooms");
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

  roomPromise.then(function() {
    console.log('Value came back', $scope.room);
  });

  $scope.username = 'User' + Math.floor(Math.random() * 501);
  $scope.submitAddMessage = function() {
    $scope.messages.push({
      created_by: this.username,
      content: this.newMessage,
      created_at: new Date()
    });
    this.newMessage = "";

    // Resize and then scroll to the bottom
    $ionicScrollDelegate.resize();
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom();
    });
  };
})

.controller('AboutCtrl', function($scope) {
});
