
     var map;
     var BA = {lat: -34.603722, lng: -58.381592};
     var BS = {lat: -34.703722, lng: -58.581592};
     function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: BA,
          zoom: 13,
          styles: estilos
        });
           
  
	   var infowindow = new google.maps.InfoWindow();
	   for (var i =0; i < data.length; i++)
       {  
		 var marker = new google.maps.Marker({
          position: data[i].cords,
          map: map,
          title: 'Hello World!'
		 });
           
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(data[i].nombre);
          infowindow.open(map, marker);
        }
      })(marker, i));   
    } 
   	
         
  var input = ( document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox((input));
  var markerz = [];
  
  searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
       
      
          if (places.length == 0) {
            return;
          }
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markerz.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));
          });
        });
         
    console.log (google.maps.geometry.spherical.computeDistanceBetween (BA, BS));
}   
      

                                



 


		  
	