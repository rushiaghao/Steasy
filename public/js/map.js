mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 12,
    minZoom: 4,
    maxZoom: 20,
    projection: 'mercator'
});

//map marker
const marker = new mapboxgl.Marker({color: "red"})
   .setLngLat(listing.geometry.coordinates)
   .setPopup(
    new mapboxgl.Popup({offset: 25}).setHTML(
        `<h4> ${listing.title} </h4><p>Exact Location will be provided after booking</p>`
    )
   )
   .addTo(map);

// Add the zoom in/out and compass controls
map.addControl(new mapboxgl.NavigationControl(), 'top-right'); 
