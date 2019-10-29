/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiZ3VkbXVuZHVyYiIsImEiOiJjazJiMGtjdjYzdmV4M21tdjYzcGZ0amxrIn0.Fg5aGLYyryfv9fhJNM6y-A';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/gudmundurb/ck2b0zqoi00ly1cpi7tznf4pg',
  scrollZoom: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  //create marker
  const el = document.createElement('div');
  el.className = 'marker';

  //add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //add a popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  //extend mapbound to include all markers
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    right: 100,
    left: 100
  }
});
