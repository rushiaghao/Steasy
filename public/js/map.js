mapboxgl.accessToken = mapToken;

const coordinates = listing.geometry.coordinates;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates, // starting position [lng, lat]
    zoom: 12,
    minZoom: 4,
    maxZoom: 20,
    projection: 'mercator'
});

// Map marker
const marker = new mapboxgl.Marker({color: "red"})
   .setLngLat(coordinates)
   .setPopup(
    new mapboxgl.Popup({offset: 25}).setHTML(
        `<h4> ${listing.title} </h4><p>Exact Location will be provided after booking</p>`
    )
   )
   .addTo(map);

// Add the zoom in/out and compass controls
map.addControl(new mapboxgl.NavigationControl(), 'top-right'); 

// Force map to resize and re-center properly when layout changes
window.addEventListener('resize', () => {
    map.resize();
    map.setCenter(coordinates);
});

// Also trigger a quick resize/re-center on load to fix initial mobile rendering
setTimeout(() => {
    map.resize();
    map.setCenter(coordinates);
}, 250);