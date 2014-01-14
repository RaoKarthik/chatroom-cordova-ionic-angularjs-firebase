angular.module('chatRoom.controllers', [])

.controller('AppCtrl', function($scope, $state) {
})

.controller('MainCtrl', function($scope, $timeout, angularFire) {
  $scope.rooms = [];
  var ref = new Firebase('https://chatroom-io.firebaseio.com/opened_rooms');  
  var promise = angularFire(ref, $scope, "rooms");

  $scope.createRoom = function(roomName) {
    $scope.rooms.push({
      id: Math.floor(Math.random() * 5000001),
      title: roomName,
      slug: roomName.split(/\s+/g).join('-')
    });
  };

  $scope.rightButtons = [
    {
      type: 'button-icon',
      content: '<i class="icon ion-plus"></i>',
      tap: function(e) {
        var roomName = prompt('New room name');
        $scope.createRoom(roomName);
      }
    }
  ];
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
