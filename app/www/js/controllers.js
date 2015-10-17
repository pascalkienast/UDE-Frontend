angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

  .controller('MapCtrl', function($scope, $ionicLoading, $http) {
      function initialize() {
        //Position wo App startet
        var myLatlng = new google.maps.LatLng(52.5068441,13.4247317);

  
     
        var mapOptions = {
          center: myLatlng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
     
      heatmap = new HeatmapOverlay(map, 
  {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    "radius": 2,
    "maxOpacity": 1, 
    // scales the radius based on map zoom
    "scaleRadius": true, 
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries 
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": true,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'count'
  }
);


$http.get('http://kibl.diphda.uberspace.de/jugendhackt/UDE/get/1/2015/10').then(function(resp) {
    $scope.conditions = resp.data.conditions;
  
var testData = {
  max: 8,
  data: [{lat: resp.data.lat, lng:resp.data.lat, count: 3}]
};

}, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })

heatmap.setData(testData);

  /*   $http.get('http://kibl.diphda.uberspace.de/jugendhackt/UDE/get/1/2015/10').then(function(resp) {
    console.log('Success', resp);
     //$scope.conditions = resp.data.conditions;
     var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h2 id="firstHeading" class="firstHeading">'+
      resp.data.city +'</h2>'+
      '<div id="bodyContent">'+
      '<p>blablablabla</p>'+
      '</div>'+  
      '</div>';
      var newLatlng = new google.maps.LatLng(resp.data.long,resp.data.lat);

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: newLatlng,
    map: map,
    title: 'test'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });


  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })*/



   $scope.map = map;

      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('more infos')
      };
      
    });


 




