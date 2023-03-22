import { City, Localisation } from "../common/type";


var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos: any) {
      var crd = pos.coords;
      return {latitude:crd.latitude, longitude: crd.longitude,  name:"Wavre", country:"Belgium", state:"BW"} as City // TODO remove hard coded value
  }
  
  function errors(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    return {latitude:50.51, longitude: 4.20, name:"Waver", country:"Belgium", state:"BW"} as City
  }
  

const getClientPosition = () => {
    if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
                navigator.geolocation.getCurrentPosition(success);
            } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(success, errors, options);
            } else if (result.state === "denied") {
                return {latitude:50.51, longitude: 4.20, name:"Waver", country:"Belgium", state:"BW"} 
            }
            result.onchange = function () {
              console.log(result.state);
            };
          });
      } else {
        alert("Sorry Not available!");
      }
      return {latitude:50.51, longitude: 4.20, name:"Waver", country:"Belgium", state:"BW"} as City //  TODO IT's HARDCODED ! 
    }

export default getClientPosition