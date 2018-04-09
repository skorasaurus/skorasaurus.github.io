---
layout: post
title: "Tools on map-making at Data Days CLE"
date: 2018-04-08
comments: false
---

I gave a workshop/presentation on tools for map-making at [Data Days CLE](http://datadayscle.org)
on Friday. One of my favorite moments was the city employee who asked me about alternatives to 
ARCGIS/ESRI and specifically being able to offer read access to geodatabases to other departments of data without using ESRI (hope I remember that correctly).

My slides are at [http://skorasaur.us/ddc18](http://skorasaur.us/ddc18) and below is a long list of resources, most of which I mentioned in my talk. This list is also available in my github repository for this - [https://github.com/skorasaurus/ddc18](https://github.com/skorasaurus/ddc18)

This list is by no means, comprehensive, but a starting point for tools for map-making, primarily 
focusing on web maps (maps that are viewable online) outside of the ESRI ecosystem. 

[mapschool](http://mapschool.io/) - As brief as it is, it's an extremely useful overview of modern maps and some theory. I don't know of any other document on maps that is as short yet as informative. 

**mapmaking suites (SAAS, software as a service):**

[carto](https://carto.com)

[mapbox](https://mapbox.com)

[shinyapps](www.shinyapps.io) - R-based

**Quicker and simpler web map templates:**

All of these simpler web map templates require a relatively minimal amount of data (not a very rigid rule, but I'd say less than a couple hundred points/features and that you don't have a lot of properties on them). If you have more than this, you'll need to upload them to one of the above services.

[mapzap](https://github.com/mapzap/mapzap.github.io) - less styling options but easier to use

[mapstarter](http://mapstarter.com/) - also has print options

[leaflet + and google sheets](https://github.com/JackDougherty/leaflet-maps-with-google-sheets) 

[umap](http://umap.openstreetmap.fr/en/) - If you want a map to share with others with some custom icons quickly and aren't picky about the basemap; can embed as well.

**data manipulation/gis in browser:** 

As above, these may not work (or will work very slowly) if you're using files that have hundreds of features or are above, say 10mb, in size.

[geojson.io](http://geojson.io) - quickly edit and save to numerous formats; works on files < 10mb 

[mapshaper](http://mapshaper.org) - relatively simple yet powerful, also has command-line based tool

[dropchop](http://dropchop.io/) - do some common GIS operations within the browser 

[turf.js](http://turfjs.org) - do some common GIS operations within the browser (javascript)

**utilities for printing web maps:**

[portmap](https://github.com/portofportlandgis/portmap) -

[staticmapmaker.com](staticmapmaker.com) - limited options; but usable

[LA Times' Web Map Maker](http://datadesk.github.io/web-map-maker/)

[Petroff's Print Maps](https://printmaps.mpetroff.net/)

[https://www.mapbox.com/help/static-api-playground/]([https://www.mapbox.com/help/static-api-playground/])

**geocoding:** 

[smartstreets](https://smartystreet.com) Not free; but does a relatively great job and has relatively easy to use interface; good if you're on a timecrunch and/or limited skills.

**Meta (a list of other lists):**  

[robin's list](https://github.com/tolomaps/resources)

[awesome-spatial](https://github.com/RoboDonut/awesome-spatial) - great list of all types of spatial tools, many of these require knowledge in a particular programming language, comfortability with command line. 

[awesome-geojson](https://github.com/tmcw/awesome-geojson) - great utilities for working with geoJSON. 

[color-tools](https://github.com/TheMapSmith/color-tools) - all resources on colors

[dataviz-tools' list](http://dataviz.tools/category/mapping/) - thorough list, somewhat out of date

**theory:**

[maptime](http://maptime.io) - An informal association of meetup groups that teach geospatial concepts and maps. They have accessible tutorials. I co-organized Cleveland's maptime from 2012-2014ish. 

[mapmakers-cheatsheet](https://github.com/tmcw/mapmakers-cheatsheet) 

**Advanced:**

[csvkit](https://github.com/wireservice/csvkit) - python library and command line to 
manipulate CSV files

[qgis](http://qgis.org) - geospatial analysis, map-making, and so much more; comparable to ArcGIS. 

[cheat-sheet for fiona and rasterio](https://github.com/sgillies/frs-cheat-sheet) -
Cheatsheet for using python libraries of fiona, rasterio, manipulating geospatial data. 

[miller](https://github.com/johnkerl/miller) - command-line based; very powerful and advanced; specifically for parsing CSV files.

[GDAL cheatsheet](https://github.com/dwtkns/gdal-cheat-sheet) - GDAL is a geospatial library at the core of many geospatial applications; data conversion; reprojection; 
analysis, and more. 
Cheatsheet for using some of its command-line based tools. 

[d3](http://d3js.org) - extremely powerful javascript library for dataviz and maps

[observable HQ](https://beta.observablehq.com/) - a sandbox for experimenting with javascript and D3

**Sites/Articles mentioned in talk:** 

[Most famous set in every US state](http://www.businessinsider.com/most-famous-book-set-in-every-state-map-2013-10)

[when it shouldn't be a map](http://www.ericson.net/content/2011/10/when-maps-shouldnt-be-maps/)

**data sources:**
[Guide to Cleveland Data sources](http://www.opencleveland.org/blog/guide-to-cleveland-data/) - A list of places to get available open civic data for the Cleveland area


If you want to start with the command line: 
https://github.com/jlevy/the-art-of-command-line


**Highly recommended Books:** 
Interactive Data Visualization for the Web: An Introduction to Designing with D3 (2nd Edition) - Scott Murray - clearly written with examples; good not just for D3 as a refresher or extremely concise overview of html, css, and javascript. 

GIS Cartography - Gretchen Peterson
Great design influence for making print and web-maps. 

cat photo by [Walid Mahfoudh](https://www.flickr.com/photos/mahfoudh/37519121762/)