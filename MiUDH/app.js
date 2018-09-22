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
          position: new google.maps.LatLng(data[i].lat, data[i].long),
          map: map,
          title: data[i].Nombre
		 });
//infowindow para hospitales    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(data[i].Nombre);
          infowindow.open(map, marker);
        }
      })(marker, i));   
    } 
	
  //serach box
  var input = ( document.getElementById('pac-input')); 
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
            var hospiCord = new google.maps.LatLng({lat: data[p].lat, lng: data[p].long});
            data[p].dis=(google.maps.geometry.spherical.computeDistanceBetween (place.geometry.location, hospiCord)); 
               }
        //ordenar de menor a mat             
            data.sort(function(a, b) {
            return a.dis - b.dis;});
             });            
        });  
    
   
    //dropown list con hospitales
    /*
       var select =  document.getElementById('drop');
    for (var l=0; l<data.length;l++){
       var opt = document.createElement('option');
       opt.text = data[l].nombre;
       select.appendChild(opt);
       }
    */
     }
    // prints to list 
        function myFunction() {  
            for (var u=0; u<data.length;u++){
                 var node = document.createElement("LI");
                 var textnode = document.createTextNode(data[u].Nombre);
                 node.appendChild(textnode);
                 document.getElementById("list").appendChild(node);
                }
            }
