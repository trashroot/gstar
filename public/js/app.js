/* eslint-disable no-undef */
var selectedUser;
var selectedUserName = '';
var marker = {};
var linePath = [];
var markerCount = 1;
var markerLabel = '';
var selectedUserData = {}
// eslint-disable-next-line no-undef
$(document).ready(function() {
    // eslint-disable-next-line no-undef
    $.ajax({
        type: "GET",
        url: "http://18.222.132.210:2017/api/user/alluser",
        cache: false,
        // dataType: 'json',
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o'},

        success: function(res){console.log(res);
        
            if(res['users'].length == 0){
                // eslint-disable-next-line no-undef
                alert('No user found. Please try again')
            }else{
                var users = '<option value="">Select a user to track</option>';            
                res['users'].forEach(element => {
                    users += '<option value="'+element.id+'">'+element.first_name+' '+element.last_name+ '</option>'
                });
                $('#user').html(users)
            }                
        }
    })
})

// eslint-disable-next-line no-unused-vars
function choosenUser(user){        
    selectedUser = user.options[user.selectedIndex].value;
    selectedUserName = user.options[user.selectedIndex].text
}

function updateLocation(data) {
    $.ajax({
        type: "POST",
        url: "http://18.222.132.210:2017/api/user/update-location",
        cache: false,
        data: data,
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o'},

        success: function(res){
            console.log(res);
        }
    })
}
            
    

    // eslint-disable-next-line no-unused-vars
    function initMap() {
        var myLatlng = {lat: 28.6692, lng: 77.4538};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: myLatlng,
            mapTypeId: 'terrain'
        });
        var flightPath = new google.maps.Polyline({
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);
        
        function updateMarker(ltlng){
            if (marker && marker.setMap && markerCount != 2) {
                marker.setMap(null);
            }                        
            // eslint-disable-next-line no-undef
            marker = new google.maps.Marker({
                position: ltlng,
                map: map,
                title: selectedUserName,
                label: markerLabel
            });

            markerCount++;
            // markerLabel = 'D';
        }

        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'));
        autocomplete.bindTo('bounds', map);
        autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

        marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
        
          if (selectedUser == undefined) {
            document.getElementById('address').value = '';
            window.alert("Please Select the user first");
            return;
          }
        //   infowindow.close();
        //   marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(18);  // Why 17? Because it looks good.
          }
          // marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          /* Set marker after search location START */
          linePath.push(place.geometry.location);
          updateMarker(place.geometry.location)
          setLinePath(linePath);
          var selectedUserRawData = place.geometry.location.toJSON();
              selectedUserData.user = selectedUser;
              selectedUserData.latitude = selectedUserRawData.lat;
              selectedUserData.longitude = selectedUserRawData.lng;
              console.log(selectedUserData);
              updateLocation(selectedUserData)
          /* Set marker after search location END */

          // var address = '';
          // if (place.address_components) {
          //   address = [
          //     (place.address_components[0] && place.address_components[0].short_name || ''),
          //     (place.address_components[1] && place.address_components[1].short_name || ''),
          //     (place.address_components[2] && place.address_components[2].short_name || '')
          //   ].join(' ');
          // }       
        });
        

        function setLinePath(linePath) {
            flightPath.setPath(linePath);
        }
                
        
        
        // Configure the click listener.
        map.addListener('click', function(mapsMouseEvent) {
            if(selectedUser && selectedUser != ''){
            
                var selectedUserRawData = mapsMouseEvent.latLng.toJSON();
                selectedUserData.user = selectedUser;
                selectedUserData.latitude = selectedUserRawData.lat;
                selectedUserData.longitude = selectedUserRawData.lng;
                console.log(selectedUserData);
                
                updateLocation(selectedUserData)
                linePath.push(mapsMouseEvent.latLng);            
                updateMarker(mapsMouseEvent.latLng)            
                setLinePath(linePath);
            }else{
                // eslint-disable-next-line no-undef
                alert('Please select a user')
            }            
        });
    }