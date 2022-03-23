// get location
const locateMe = document.getElementById('locateMe'),
        locationInfo = document.getElementById('locationInfo')

locateMe.addEventListener('click', ()=>{
    locationInfo.classList.add('show');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

        function showPosition(position) {
            setTimeout(()=>{
                locationInfo.firstElementChild.innerHTML = `Latitude: ${position.coords.latitude}°`;
            locationInfo.lastElementChild.innerHTML = `Longitude: ${position.coords.longitude}°`;
            }, 300)

            // $("#Latitude").val(position.coords.latitude);
            // $("#Longitude").val(position.coords.longitude);
            // $("#Latitude, #Longitude").css("background-color", "#c4f9e7");
          }

      }
})