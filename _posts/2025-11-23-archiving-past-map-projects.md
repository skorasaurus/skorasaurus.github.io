---
layout: post
title: "Archiving Your Past Web Map Projects"
date: 2025-11-23 10:25:06 -0100
comments: false
---

<i> This post was largely drafted in May 2020 but the practice and point still remains. I'm making more of an effort to share my past work. I have quite a few posts that I've left in draft for whatever reason.</i>

<a href="https://twitter.com/jamesmfee/status/1280948443549069312">James Fee's tweet</a>  (now since deleted in 2025 when I'm publishing this) along with <a href="https://blog.mapbox.com/deprecating-studio-classic-styles-d8892ac38cb4"> Mapbox's recent announcement </a> of deprecating loading maps made in Mapbox Studio classic, reminded me that the 'life span' of online web maps are relatively short, sometimes 2-3 years. How do you view or remember them when software breaks, the hosting bill is no longer paid, your employer decides to just cancel the project, or the company hosting it goes out of business? 

I didn't to lose the work that I've done over the years; I wanted to be able to save and view them later so here's what I've been doing.

1. Decide and prioritize what you want to save
Obvious needs to be said, but you can't save everything. One of my largest misconceptions of public libraries before I started working at one is that they archive and save so much everything: they save and preserve a lot less than you think. Libraries decided what ou. (particularly if it Deciding what to save and document is part of their process. With online maps, you won't be able to save every view, every map interaction , every zoom level. 

1a. For online maps that may be large and you can't capture the entire area: what geographic areas hold personal sentimental value to you? were unique or noteworthy? Any geographic areas on the map or map interactions that really showed off your work and effort ?

2. For Raster Maps (before vector tiles were widely used), <a href="https://github.com/stamen/the-ultimate-tile-stitcher">the-ultimate-tile-stitcher</a>, a python script made by Stamen, that enables you to download each of the png raster tiles and then stitches them together as one very large png image. 

the-ultimate-tile-stitcher worked excellent to fetch several maps I made in Mapbox Studio Classic. These maps didn't have any interaction, markers, pop-ups, on them; 
these were base maps; the-ultimate-tile-stitcher works best on base maps. the-ultimate-tile-stitcher only works on raster tiles (X/Y/PNG) which is what mapbox was getting rid of in 2020 (2025 edit: that long ago ?!).

3. If your map is a vector map (or is web-gl like Mapzen's Tangram maps): 
**Make a screen recording** while viewing the map and map interactions; zooming in and out at multiple zoom levels, and whatever you want to capture. Making the screen recording while you view your map works across any mapping library and software that you use. 

4. don't forget to add a couple sentences about the project; include the project docs and your build setup. you may forget a few years from now ;) 