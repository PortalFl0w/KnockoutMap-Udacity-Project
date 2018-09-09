//
//  PLEASE INPUT YOUR API KEY AND
//  RENAME THIS FILE TO 'key.js'
//

const KEY = "YOUR_API_KEY" // UPDATE THIS WITH YOUR API KEY.

function createGoogleScript() {
  let script = document.createElement("script");
  let base = "https://maps.googleapis.com/maps/api/js";
  let key = "?key=" + KEY;
  let callback = "&callback=initMap"
  let libs = "&libraries=places"
  script.setAttribute('src', base + key + callback + libs);
  script.setAttribute('async', '');
  script.setAttribute('defer', '');
  document.body.appendChild(script);
}
createGoogleScript();
