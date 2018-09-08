function Place(googlePlace) {
  this.name = googlePlace.name
  this.icon = googlePlace.icon
  this.lat = googlePlace.geometry.location.lat()
  this.lng = googlePlace.geometry.location.lng()
}
