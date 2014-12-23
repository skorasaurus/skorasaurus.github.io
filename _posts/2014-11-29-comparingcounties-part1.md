---
layout: post
title: "Visualizing Improvements in OpenStreetMap in Carroll County"
date: 2014-11-29 16:25:06 -0700
comments: true
---

Before I went to visit Carroll County in North Central Ohio for a weekend in July, its state in OSM was really poor. It consisted mostly of TIGER-imported ways that hadn't been whose geometry hadn't been changed since the original TIGER Import in 2008. In many cases, the roads' geometry didn't make up with reality. Some roads were 30 meters off of where they really are; small townships of 10-20 streets on the map were like jigsaw puzzle pieces that needed to be rotated; random roads were in the middle of grassy fields. One exception to it was Carrollton, the largest city in the county, which was improved very well OSM user Evan Edwards. 

After that weekend, I corrected some road geometries and added a dozen or so POIs. and wondered how long it will take me to fix all of the roads in the county and what would it reveal about editing TIGER data. 

Answer: a lot longer than I thought! (~30 hours over a couple months). Near the end, it honestly became a chore. But I want to see how it would like visually, I didn't want to do that work for nothing... 

How I did it (very briefly): 
I was able to more quickly improve the ways by using where I'd copy the geometry from a TIGER2013 file; verify that the TIGER13 matches the aerial imagery better than the existing way. 

This a great strategy and I'd advise anyone who is interested in improving TIGER-imported ways in the future.

Watch a quick example of this workflow in the GIF. 

![GIF - editing osm with tiger2014 and josm](http://media.giphy.com/media/yoJC2xRysrWnNO389a/giphy.gif
 "gif")


If you're interested in a detailed workflow, skip to the end... 

## Visualization: 

Here's a first draft of the map; 
- http://skorasaurus.github.io/carroll.html

Now, I'm trying to visualize the improvements that I made by displaying 
the distance between 2 linestrings (before I edited with OSM data from spring 2014 - which a postgis table named old_line, and OSM data from Nov. 2014 which is a postgis table named new_line))

How I'm planning to do this. 

A] select each point in the every linestring from old_line as oldpointdump

SELECT ST_DumpPoints(way) FROM old_line as oldpointdump

B] FOR each point in oldpointdump, find the closet linestring in new_line; measure this distance
C] create a new column for this distance (as distfromtiger)

F] then in every line string in old_table between 2 points (let's call these points J and K), add a column and assign that column a value that is (.5 * (distfromtiger for J) + (distfromtiger of K)) 

G] style the linestring in mapbox/cartodb using the value that I derived in F



==============================
## A much more thorough workflow follows: 

I used ogr2osm to convert 2013 TIGER Shapefile (then tiger2014 once they became available) into an OSM file and then loaded that file in josm and deleted all of the unnecessary tags that were created in it, except the fullname field; to ensure that the name was matching up with the correct road, and saved on my computer for my workflow.  

Then, I went to editing. I downloaded some OSM data from JOSM, opened the TIGER osm file, and checked out a particular area with bing imagery. 
For a particular street, go over the entire street to see if the 2013 road is in fact closer to matching the aerial bing imagery than the existing road is. I'd also load up the history for the road to see if any nodes were changed. (Cntrl+H). Many roads were changed to proper highway type (tertiary) but didn't have any of the geometry modified since the original tiger import. 

If the 2013 is more closely aligned than the existing road, delete the name tag in the TIGER 2013 way you're about to select; copy (cntrl+c the highway as it is in a separate layer with the separate layer selected in josm); switch to your osm data layer, and then paste into your data layer of OSM data. Then select the two ways, the new way and the way you're replacing; and hit cntrl+shift+g. CNTRL+shift+g is the 'replace geometry' shortcut that keeps the history of the original way and relations that the way belongs to. 

I looked over each way that I imported. In some cases the imported way was about 5-10 meters from the center of the road in the bing imagery but still better than before and within the general margin of error that we have in OSM. 

After you finish all of the ways in your area; hit the JOSM validation, first fix all of the errors marked highway duplicate nodes; then hit the josm validation button again; and go to the ways ended near other nodes, right click on each one in the list which brings me to the location of the node, hit 'N' for each. At this point, I'd go back to the ways I modified, and simplify them (cntrl+y) because TIGER with deletes any excess nodes without deleting the nature of the geometry. I set my Simplify way settings (done in advanced preferences in josm, and finding the ) to 0.8 . JOSM's simplification uses the Ramer–Douglas–Peucker algorithm.