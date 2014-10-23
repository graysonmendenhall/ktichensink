
   
   
   
        var map;
        var directionsDisplay;
        var directionsService;
        var stepDisplay;
        var markerArray = [];
      
        
        

function initialize() {
        
          // Color styles for PathMinder map
  var styles = [
    {
      stylers: [
        { hue: "#56A0D3" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];


  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});
        
        
  // Instantiate a directions service.
  directionsService = new google.maps.DirectionsService();

   
  
  // Create a map and center it on Manhattan.
  var mapCenter = new google.maps.LatLng(35.906707, -79.047362);
  var mapOptions = {
    zoom: 14,
    center: mapCenter,
    disableDefaultUI: true,
     mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  }
  

  
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  // Create a renderer for directions and bind it to the map.
  var rendererOptions = {
    map: map
  }
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)

  // Instantiate an info window to hold step text.
  stepDisplay = new google.maps.InfoWindow();
}

function calcRoute() {

  // First, remove any existing markers from the map.
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Now, clear the array itself.
  markerArray = [];

  // Retrieve the start and end locations and create
  // a DirectionsRequest using WALKING directions.
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.WALKING
  };

  // Route the directions and pass the response to a
  // function to create markers for each step.
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // var warnings = document.getElementById('warnings_panel');
      // warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
      directionsDisplay.setDirections(response);
      showSteps(response);
    }
  });
}

function showSteps(directionResult) {
  // For each step, place a marker, and add the text to the marker's
  // info window. Also attach the marker to an array so we
  // can keep track of it and remove it when calculating new
  // routes.
  var myRoute = directionResult.routes[0].legs[0];

  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = new google.maps.Marker({
      position: myRoute.steps[i].start_location,
      map: map
    });
    attachInstructionText(marker, myRoute.steps[i].instructions);
    markerArray[i] = marker;
  }
}

function attachInstructionText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on,
    // containing the text of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}



google.maps.event.addDomListener(window, 'load', initialize);