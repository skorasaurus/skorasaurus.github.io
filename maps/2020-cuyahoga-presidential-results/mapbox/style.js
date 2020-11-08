
var styleJSON = {
    "version": 8,
    "name": "qgis2web export",
    "pitch": 0,
    "light": {
        "intensity": 0.2
    },
    "sources": {
        "mapboxmonochrome_0": {
            "type": "raster",
            "tiles": ["https://api.mapbox.com/styles/v1/skorasaurus/ckh8200se12m219qipxo7t96c/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2tvcmFzYXVydXMiLCJhIjoiaEdGTUZWTSJ9.osOC8tWU3bMaNprVNoEu7g"],
            "tileSize": 256
        },
        "2020output_1": {
            "type": "geojson",
            "data": json_2020output_1
        }
                    },
    "sprite": "",
    "glyphs": "https://glfonts.lukasmartinelli.ch/fonts/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "layout": {},
            "paint": {
                "background-color": "#ffffff"
            }
        },
        {
            "id": "lyr_mapboxmonochrome_0_0",
            "type": "raster",
            "source": "mapboxmonochrome_0"
        },
        {
            "id": "lyr_2020output_1_0",
            "type": "fill",
            "source": "2020output_1",
            "layout": {},
            "paint": {'fill-opacity': ['case', ['all', ['>=', ['get', 'biden_percentage'], 33.333333], ['<=', ['get', 'biden_percentage'], 49.859551]], 0.507, ['all', ['>', ['get', 'biden_percentage'], 49.859551], ['<=', ['get', 'biden_percentage'], 61.518325]], 0.507, ['all', ['>', ['get', 'biden_percentage'], 61.518325], ['<=', ['get', 'biden_percentage'], 73.664122]], 0.507, ['all', ['>', ['get', 'biden_percentage'], 73.664122], ['<=', ['get', 'biden_percentage'], 86.549708]], 0.507, ['all', ['>', ['get', 'biden_percentage'], 86.549708], ['<=', ['get', 'biden_percentage'], 98.44358]], 0.507, 0], 'fill-color': ['case', ['all', ['>=', ['get', 'biden_percentage'], 33.333333], ['<=', ['get', 'biden_percentage'], 49.859551]], '#ff1a01', ['all', ['>', ['get', 'biden_percentage'], 49.859551], ['<=', ['get', 'biden_percentage'], 61.518325]], '#bf1340', ['all', ['>', ['get', 'biden_percentage'], 61.518325], ['<=', ['get', 'biden_percentage'], 73.664122]], '#800d80', ['all', ['>', ['get', 'biden_percentage'], 73.664122], ['<=', ['get', 'biden_percentage'], 86.549708]], '#4006c0', ['all', ['>', ['get', 'biden_percentage'], 86.549708], ['<=', ['get', 'biden_percentage'], 98.44358]], '#0000ff', '#ffffff']}
        }
],
}