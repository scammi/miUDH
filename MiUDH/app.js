var map;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.603722, lng: -58.381592},
          zoom: 13,
          styles: estilo
        });
         
	   var infowindow = new google.maps.InfoWindow();
	   for (var i =0; i < data.length; i++)
       {  
		 var marker = new google.maps.Marker({
          position: data[i].cords,
          map: map,
          title: data[i].nombre
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
            markerz.push(new google.maps.Marker({
              map: map,
              title: place.name,
              position: place.geometry.location
            }));
              
        //Calcula distancia de usuario a hospital
              for (p = 0 ; p < data.length ; p++){
             
            var disHopi = new google.maps.LatLng({lat: data[p].cords.lat, lng: data[p].cords.lng});
            console.log(google.maps.geometry.spherical.computeDistanceBetween (place.geometry.location, disHopi));
               }
          });
        });         

     }

                                



 


		  
	