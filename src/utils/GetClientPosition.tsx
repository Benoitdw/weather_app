import { Localisation } from "../common/type";

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos: any) {
    console.log(typeof(pos))
      var crd = pos.coords;
      return {latitude:crd.latitude, longitude: crd.longitude} as Localisation
  
  }
  
  function errors(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    return {latitude:50.51, longitude: 4.20} as Localisation
  }
  

const getClientPosition = () => {
    if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
                return navigator.geolocation.getCurrentPosition(success);
            } else if (result.state === "prompt") {
                return navigator.geolocation.getCurrentPosition(success, errors, options);
            } else if (result.state === "denied") {
                return {latitude:50.51, longitude: 4.20}
            }
            result.onchange = function () {
              console.log(result.state);
            };
          });
      } else {
        alert("Sorry Not available!");
      }
      return {latitude:50.51, longitude: 4.20} as Localisation
    }

export default getClientPosition