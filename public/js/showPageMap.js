mapboxgl.accessToken = mapToken;
console.log(campground.geometry);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v11',
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 12, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h4>${campground.title}</h4><p>${campground.location}</p>`
            )
    )
    .addTo(map)