
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
        "2020precinctjoinedoutputTAKE3_1": {
            "type": "geojson",
            "data": json_2020precinctjoinedoutputTAKE3_1
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
            "id": "lyr_2020precinctjoinedoutputTAKE3_1_0",
            "type": "fill",
            "source": "2020precinctjoinedoutputTAKE3_1",
            "layout": {},
            "paint": {'fill-opacity': ['case', ['all', ['>=', ['get', 'trump_percentage'], 0.205502], ['<=', ['get', 'trump_percentage'], 0.307122]], 0.53, ['all', ['>', ['get', 'trump_percentage'], 0.307122], ['<=', ['get', 'trump_percentage'], 0.408742]], 0.53, ['all', ['>', ['get', 'trump_percentage'], 0.408742], ['<=', ['get', 'trump_percentage'], 0.510362]], 0.53, ['all', ['>', ['get', 'trump_percentage'], 0.510362], ['<=', ['get', 'trump_percentage'], 0.611982]], 0.53, ['all', ['>', ['get', 'trump_percentage'], 0.611982], ['<=', ['get', 'trump_percentage'], 0.713602]], 0.53, 0], 'fill-color': ['case', ['all', ['>=', ['get', 'trump_percentage'], 0.205502], ['<=', ['get', 'trump_percentage'], 0.307122]], '#4437ff', ['all', ['>', ['get', 'trump_percentage'], 0.307122], ['<=', ['get', 'trump_percentage'], 0.408742]], '#6644da', ['all', ['>', ['get', 'trump_percentage'], 0.408742], ['<=', ['get', 'trump_percentage'], 0.510362]], '#8851b5', ['all', ['>', ['get', 'trump_percentage'], 0.510362], ['<=', ['get', 'trump_percentage'], 0.611982]], '#aa5e90', ['all', ['>', ['get', 'trump_percentage'], 0.611982], ['<=', ['get', 'trump_percentage'], 0.713602]], '#e21d2a', '#ffffff']}
        }
],
}