function Place(googlePlace) {
  this.id = googlePlace.place_id
  this.name = googlePlace.name
  this.icon = googlePlace.icon
  this.lat = googlePlace.geometry.location.lat()
  this.lng = googlePlace.geometry.location.lng()
  this.info = {
    description: null,
    image: null
  }
}
