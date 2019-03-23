---
layout: post
title: "Digitizing Cleveland's Historic Annexations"
date: 2019-03-05 16:25:06 -0700
comments: false
---

I created a digitized dataset of Cleveland's historical land annexations and it didn't exist before. <strong> Thanks to this data set, I was able to make <a href="http://skorasaur.us/maps/annexations.html">this time-lapse map displaying the growth of Cleveland's historic annexations </a><strong> and additional research can more easily be done. 

More below on what I learned, why I did it, what else can be done with this new data set. 

If you just want the data set, download the annexation boundaries at <a href="https://github.com/skorasaurus/cleboundaries">https://github.com/skorasaurus/cleboundaries</a>

<h2> Why I did this: </h2>

As a part of my day job as a web developer at the <a href="https://cpl.org/">local library</a>, I met with Marty, the <a href="http://www.clevelandcitycouncil.org/news-resources/council-archivist">City of Cleveland Archivist</a>, about an unrelated issue with the Cleveland Public Library website. 
He graciously gave me a tour of the City Archives across from the Justice Center in Downtown Cleveland. He had large copy (2 x 3 foot) of an annexation map from 1968 on the wall and often referenced it for city employees. I've been a fan of maps and he mentioned in passing that since that map's publishing, there have been additional annexations but no map has been made since then*** and no one had the time or resources to do it.  

(Just in early 2019, I found <a href="https://en.wikipedia.org/wiki/Cleveland#/media/File:Cleveland_Annexation_Map_4-Color_Final.png"> an annexation map on made in wikipedia made around 2010 by Paul J Meissner</a> but I haven't been able to contact him or obtain it in a higher resolution. Additionally, that map appears to use Google which goes against Google's Terms and Conditions and is not on very firm ground to be legally shared. 

Aloud to Marty, "I could make you a newer print map with those annexations", I offered to make one (I'm still working on it).

To make a new print map, you would need the annexation boundaries data set first. 

That data set didn't exist, until now.

<h3> Answering historical questions that couldn't be answered before:</h3>

Creating this data set by creating the digital boundaries doesn't solve any civic technology problems by itself; but like other open data sets, it can, with additional effort, be used in with other data sets to answer questions like: 

<ul>
<li> How much of Cleveland's population growth in the 19th and 20th century can be attributed by annexating other places? </li>
<li> Did Cleveland's population grow at the same proportion in the 20th century as its size? </li>
<li> Did proposed or implemented annexations had any influence on development patterns or migration patterns for residents in the 19th and 20th century? </li>
</ul>

I'm also casually interested in how past city decisions influence our present day. How would Cleveland and Northeast Ohio would be different if certain areas were never annexed or annexed at a later date (or certain places that were once considered for annexation, like East Cleveland and Lakewood, were annexed).

In the process of creating these boundaries, a scholar had contacted the Cleveland Public Library with a research question seeking the historical Cleveland boundaries (!) (I found out through my day job) and I was able to provide him with some of my data.

These boundaries can also be used as the basis for a new printed map of Cleveland annexations. 

<h3>A look at historic open data</h3>

Through my years in open data advocacy and mapmaking, I hadn't known much about available past, open accessible historic geospatial data. Historic geo data generally wasn't included in municipal open data portals. 

Before this project, I hadn't known of any historical annexation boundaries to exist but Karl Phillips has been doing prolific work on <a href="https://sunlightfoundation.com/2014/09/05/opengov-voices-mapping-city-boundary-change-over-time-with-open-data/">digitizing historic annexation boundaries and had been putting his annexation boundaries up on <a href="https://mapstory.org/">mapstory</a> (a neat site in its own right) although you won't find them there right now; mapstory redesigned their site and deleted some of the existing work. Karl told me he's planning on reuploading them to mapstory. Reach out to him at Phillips AT MapStory dot org. 

In addition, this project may be used to get myself and others more attention to the question of <strong>who should store historic geospatial data (and how).</strong>

I suggest that the overlooked <strong>the public library</strong> may be appropropriate:

I discuss in an earlier post [why public libraries can be great places to host and curate civic data](http://skorasaur.us/2017/10/libraries-and-open-data) (domain expertise of subjects, community understanding/trust as a place to get knowledge in a way that doesn't feel as stuffy or intimidating as an academic library would, and a 3rd party source [generally] outside of direct municipal government control). 

Although Mapstory likely had good reasoning why they deleted previously uploaded data sets and had good intentions in the first place, it's an example of caution to rely on 3rd party sources for historic information. In case where others like entities like mapstory may temporarily data that was behind the map (although I'm sure they had good intentions and reasoning why they had to delete the data sets). (I did contact them about 2 weeks ago asking to learn more but did not receive a response.)

I've talked with some co-workers on how that our data set can be something that we can be the steward at the library; we haven't stored any geospatial data just yet, and to my knowledge, no or very few public libraries do yet (Maybe I'm running in the wrong circles; I'd like to know where). 

That means we have to set up the resources to host it and 
and our current digital system doesn't store geographic data and I'd also have to 
figure out how other binary data sources should be stored. This is not an insignificant question. Something I'm looking forward to figuring out and hear you opinions. 

Many public libraries may not have the infrastructure or technical knowledge to do this; so maybe this is something that occurs in collaboration across multiple libraries, ala DPLA.  

The geographic data set is currently available as Shapefiles and geojson at my github repository of [Cleveland Boundaries, cleboundaries](https://github.com/skorasaurus/cleboundaries) where the metadata and additional notes are also located to understand the data. 

The data set as of this writing is not yet complete. There are several annexations from the 2nd half of the 20th century that need to be added, especially around the Cleveland International Airport. 

I'd like to have a consistent way of determining 
annexations' "start dates". Should it be when the annexation was passed in legislation or when it was effective 'on the street'? When acknowledged/recorded by the state or county? As I far as I know, all of these dates vary. 

<h2> How did I do this? </h2>

The process of georectification isn't easy, so I think there's some value in writing this out. I'll breifly outline how I created these polygons.

Maps that are images (not 'web maps' like google maps) or paper maps scanned into a computer cannot be overlaid a web map with georectification. 

When you first scan a paper map into a computer, there's no information within the image that tells the computer "this portion of the image" is in Cleveland, Ohio (or any another particular place). 

Very broadly, this absence of context is similar to when you scan a paper document, you cannot immediately select the text on it. You can visually see with your eyes what the words say; but  computer software only knows that there are black and white shapes there; computer software does not known those shapes also represent characters of a language. 

(These are completely different processes but very abstractly, the same process. )

Transforming the image of a map (in this case, the annexation map from 1968) and aligning to specific locations by a coordinate system is known as <strong> georectification</strong> (this a term very often interchanged with 'georeferencing'; the terms are confusing (<a href="https://support.esri.com/en/othethis r-resources/gis-dictionary/term/a55d58f3-c4da-4a06-af01-91bb9b9440f4">ESRI's definition of georectification</a>)

Lincoln Mullen does a great job of <a href="https://lincolnmullen.com/projects/spatial-workshop/georectification.html">explaining the overall process of georectification</a>.

When I first started the project, I planned to create the geographic shapes by first georectiying what I dubbed <a href="https://github.com/skorasaurus/cleboundaries#the-1968-map-1968">the 1968 map</a>, a hand-drawn map by the City Engineering and Construction Dept. that is the most recently published version of a map with the boundaries. Then, I would create the shapes by tracing over the georectified map. 

I first tried georeferencing the 1968 map on mapwarper.net; a great free, open-source tool (although he deserves some $ for this, but I digress); and used OpenStreetMap as the reference map. 

After making over <a href="http://mapwarper.net/maps/22173">20 reference points with the 1968 map</a> in mapwarper.net, I found that many places in the <a href="https://github.com/skorasaurus/cleboundaries#the-1968-map-1968">1968 georeferenced map</a> it still didn't match up well with my reference map; In many places, I was getting only about 30-40 meter accuracy. 

As shown in the image below, the black lines representing streets from the 1968 map; 
with aerial imagery from state of Ohio imagery (circa 2015) as the referenced map. 

{% responsive_image path: images/2019-close-up-annexation.png alt: "1912 hopkins image of cleveland" %}

I came to the conclusion that the 1968 map wasn't drawn very consistently. It was hand-drawn somewhat poorly and that I could not merely trace over the georeferenced 1968 map. I couldn't rely primarily rely on that. At this point, I also began relying primarily on <a href="https://github.com/skorasaurus/cleboundaries#reference-maps">TIGER and the state of Ohio's aerial imagery</a>, to eliminate any copyright restrictions (which would have occurred if I would continue using OpenStreetMap) on my data set. 

Instead, I had to use the 1968 map and the Volkmann map as sort of a guide: 
Look at a particular polygon in the 1968 map and volkmann map by identifying them on one of the maps(thinking my mind, "oh, western border of this polygon is a house-worth's east of east 156th", then open up the TIGER/State of Ohio imagery and draw it in the same location. 

So, on and off, over a few months on idle Saturdays, I drew the polygons. At one point, I stopped because I wasn't sure which dates to use in the source data as 'actual date of when annexations were implemented' and that discouraged me for a few months. 

Not until a few months in the process, I realized that I could also use the historic plat maps from Sanborn and Hopkins some which are digitally available (but not georeferenced) from the <a href="https://cplorg.contentdm.oclc.org/digital/collection/p4014coll24">Cleveland Public Library's Digital Map Collection </a> and <a href="https://www.loc.gov/collections/sanborn-maps/?fa=location:ohio%7Clocation:cuyahoga+county">The Library of Congress</a>.

 The Sanborn and Hopkins maps represent property-level maps of historic Cleveland from the early 20th century and late 19th century. They also include the municipal boundaries on the map.

Below is an image 4, from vol 4 of the <a href="https://www.loc.gov/resource/g4084cm.g4084cm_g06648189604/?sp=4&r=0.04,0.837,0.736,0.308,0">1896 Sanborn, courtesy of the Library of Congress</a> 

{% responsive_image path: images/2019-03-sanborn-1896-vol4-image4.png alt: "1896 Sanborn of Cleveland displaying a city boundary line at St. Clair Ave" %}

The Hopkins and Saborns provided a tremendous amount of detail that was not available in the 1968 or Volkmann maps and I began using them as my primary references. 

Going forward as I refine the maps the great detail of the Sanborn and Hopkins maps along with manual verification of the original City Council legislation (the actual true authority) will likely be the best to determine the accuracy and details of the boundaries. 
