---
layout: post
title: "Georeferencing the past"
date: 2018-04-11 19:25:06 -0700
comments: false
---


I've been [georeferencing](https://imageryspeaks.wordpress.com/2012/01/24/georeferencing-vs-georectification-vs-geocoding/) [(what is georeferencing)](https://support.esri.com/en/other-resources/gis-dictionary/term/georeferencing) some maps at CPL for an upcoming project to display a print map (24 x 36 inch) where the library provided services circa 1912.
 
My secondary goal for georefencing these maps was to provide a web map layer for users to browse historic Cleveland at a high resolution detail (i.e. at zoom level 19-20).

Besides that, I knew very little how I was going to do this and what I could use as the original source map. 

The sources of paper maps:

CPL has [Sanborn maps](https://en.wikipedia.org/wiki/Sanborn_Maps). Produced every few years in the early 20th century, these maps richly detail addresses, landuse, streets, rivers, buildings, and often times the owners of these properties, of the entire city. Sometimes the buildings usage was also noted.  
In addition to their utility, they are relatively asthetically pleasing. They're also available 
at an extremely fine scale, a scale of 200 feet per inch. 

We also have "Hopkins Maps", made by a different company but same physical layout and map design. 

These maps were published as a book of 'plats' - that an edition consisted of a bounded book of many 'plates' - pages - each roughly 15 by 10 inches of an arbitrary geographic area. 

For the city of Cleveland's 1881 Hopkins maps, there are 40 pages ; each image with borders containing extraneous information (page number, map key) and on several pages, area that is displayed on another plat. 

Fortunately, [CPL has already unbounded a few editions and had them digital scanned in our digital map collection]((https://cplorg.contentdm.oclc.org/digital/collection/p4014coll24))

If I wanted to create a contigous map, I had a fair amount of work ahead of me:


As shown in the above image, 

there were border 

(resolution was reduced for file size);

insert image like https://cdm16014.contentdm.oclc.org/digital/collection/p4014coll24/id/1819/rec/11 [display inline image]

2018-04-hopkins-1912-plate_19


I first planned wanted to stitch them together as one congruious map. 

Although the [LOC will eventually be uploading the Sanborn map for the entire country](https://www.loc.gov/collections/sanborn-maps/about-this-collection/), they have barely started the state of
Ohio, [(save for good ole' Monroeville)](https://www.loc.gov/collections/sanborn-maps/?fa=location:ohio).
...

So, how do I do this?! 
I had multiple questions when I first started: 

Do I stitch them together first and then georeference them? 

What tools should I use to stitch them together so the map appears to be continuous when you zoom in and out? 



I started out using the public [mapwarper](mapwarper.net) which is really neat. 


I spent a couple hours making sure that we had digitized maps that covered all of the city items for enough of the city of Cleveland - the metadata and descriptions in 
our digital collections doesn't tell us that; 

I experimented by: 
uploading each one sheet to mapwarper.net 
georeferencing them 
then applying a mask (so areas, like the borders) wouldn't appear on the map

In retrospect and for anyone looking for advice, it doesn't matter whether you georeference or apply the mask before the other task. 

I then downloaded the geotiffs from into qgis and they matched up pretty well although not perfect (ADD screenshot) and printed them out. 

A week later, I learned that these images are 72ppi and don't print well.  

Oops. 

I FOUND 
so, I got 600PPI TIFF for a different map set that we had: [volumes one](https://cdm16014.contentdm.oclc.org/digital/collection/p4014coll24/id/1810/rec/11) and [two of the 1912 Hopkins of Cleveland](https://cdm16014.contentdm.oclc.org/digital/collection/p4014coll24/id/1863/rec/12); 

These are better quality than what's publicly available on CPL's contentdm instance and hese are each and 

Given my limited computing power (nvidia ) on my work and personal computer (each with no more than 16gb of ram); would I be able to work on 1 giant image 
of all of the items stitched together? 

but realistic to uploading to mapwarper.net. 

So, readers: 
I ask a few questions on how to proceed: 

Should i georeference them first in qgis? Or should titcsh them together in ? 

The 600PPI might be overkill but 

What resolution should I use for the web map and for the 

What order should I do the processes of: 
georectification of the images; 
cropping them
stitching them together for a single image? 


What about providing both georeferenced and non-georeferenced images to contentdm ? 
first and 
have people want to 
I can see both sides whether to add the georeferenced ones because georeferencing is never perfect; it's always a work in progress. 


Guides that I found online (http://geo.nls.uk/urbhist/guides_georeferencing.html)
all assume that you're only georeferncing one image at a time and not stitching them together.  


Later goals: 
Eventually do cool shit like a historical building inventor




https://cdm16014.contentdm.oclc.org/digital/collection/p4014coll24/id/1831/rec/11

This means, I couldn't use workflows used when capturing drone imagery which assume the images are continguous manner

(as I was writing this post, I remember [mapknitter](https://github.com/publiclab/mapknitter), so I'll look into that...)



We have a [growing collection of historic maps of Cleveland available online](https://cplorg.contentdm.oclc.org/digital/collection/p4014coll24) but pitifully aren't easy to access (i.e. not able to download an entire collection at once, very limited on some items, poor interface) yet.