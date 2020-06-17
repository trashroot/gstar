/* eslint-disable no-undef */
var selectedUser;
var selectedUserName = '';
var marker = {};
var linePath = [];

// eslint-disable-next-line no-undef
$(document).ready(function(){
    // eslint-disable-next-line no-undef
    $.ajax({
        type: "GET",
        url: "http://18.222.132.210:2017/api/user/list",
        cache: false,
        // dataType: 'json',
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o'},

        success: function(res){
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
            if (marker && marker.setMap) {
                marker.setMap(null);
            }                        
            // eslint-disable-next-line no-undef
            marker = new google.maps.Marker({
                position: ltlng,
                map: map,
                title: selectedUserName
            });            
        }
        

        function setLinePath(linePath) {
            flightPath.setPath(linePath);
        }

        function getLatLng(str){
            var latiLong = str.replace('(', '').replace(')', '').trim().split(',');
            return {
                latitude: parseFloat(latiLong[0]),
                longitude: parseFloat(latiLong[1])
            }
            // console.log(str);
            // console.log(parseFloat(latiLong[0]));
            

        }
        
        // eslint-disable-next-line no-undef
        var geocoder = new google.maps.Geocoder();
        // eslint-disable-next-line no-undef
        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });

        function geocodeAddress(geocoder, resultsMap) {
          // eslint-disable-next-line no-undef
          var address = document.getElementById('address').value;
          geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') { 
              linePath= [];               
              linePath.push(results[0].geometry.location);
              updateMarker(results[0].geometry.location)
              setLinePath(linePath);
              resultsMap.setCenter(results[0].geometry.location);               
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }
        
        // Configure the click listener.
        map.addListener('click', function(mapsMouseEvent) {
            if(selectedUser && selectedUser != ''){
                var selectedUserData = getLatLng(mapsMouseEvent.latLng.toString())
                selectedUserData.user = selectedUser;
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