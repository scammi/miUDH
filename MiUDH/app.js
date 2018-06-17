var map;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.603722, lng: -58.381592},
          zoom: 13,
          styles: estilo
        });
//markers para hospitales         
	   var infowindow = new google.maps.InfoWindow();
	   for (var i =0; i < data.length; i++)
       {  
		 var marker = new google.maps.Marker({
          position: data[i].cords,
          map: map,
          title: data[i].nombre
		 });
//infowindow para hospitales    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(data[i].nombre);
          infowindow.open(map, marker);
        }
      })(marker, i));   
    } 
	
  var input = ( document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
 
  //serach box
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
            var hopiCord = new google.maps.LatLng({lat: data[p].cords.lat, lng: data[p].cords.lng});
            data[p].dis=(google.maps.geometry.spherical.computeDistanceBetween (place.geometry.location, hopiCord)); 
               }
        //ordenar de menor a mat             
            data.sort(function(a, b) {
            return a.dis - b.dis;});
          });            
        });  
            //dropown list con hospitales
       var select =  document.getElementById('drop');
    for (var l=0; l<data.length;l++){
       var opt = document.createElement('option');
       opt.text = data[l].nombre;
       select.appendChild(opt);
       }
    
     }

                                



 


		  
	