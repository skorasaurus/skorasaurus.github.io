---
layout: post
title: "An Abbreviated review of Accessible Markers and Marker Clusters in Web Map Libraries"
date: 2026-01-31 10:25:06 -0100
comments: false
---
<i>This article mostly assumes that you have some basic familarity with web maps and concepts like zoom level, </i>
<i> This article is also not complete and can use a little bit more editing, screenshots, </i>

At my workplace, we're redesigning a landing page of our <a href="https://cpl.org/ohio-authors">Ohio Authors Initiative</a> that highlights the lives of over 300 Ohio authors, each with individual biographies (like this one of <a href="https://cpl.org/ohio-author/amy-braunschweiger/">Amy Braunschweiger</a>). 

<a href="https://experience.arcgis.com/experience/5699507c722c4e3682df2e6cf1123da0"> The Literary Heritage Map by the Pennsylvania Center for the Book</a> 
is loved by our Literature librarians and I was asked could I do something like that? <i>(well, in the back of my mind, not exactly like that since we don't have an ESRI license  ;)</i>

And yes, I thought a map would be appropriate for this (the first question to ask even before making a map), so we could: 

- effectively communicate that Ohio Authors are generally spread geographically all over Ohio; with the 3Cs dominating as you'd expect; with college towns like Athens, Yellow Springs, Kent, and Oberlin punching up. The southeastern portion of the state had fewer authors.

- <strong> allow readers to browse authors geographically: without knowing of names of cities/towns in Ohio, browse by region, instead of thinking of and searching by each city</strong> 
(what is currently available)

<h2> How should I represent the points on the map? </h2>

My initial thought, given the contraints in the existing data set:

- There are over 120 unique towns/cities; over 350 authors, all within the State of Ohio

- <strong> Each Author has 1 town/city associated with it (determined by our librarians, based on where they lived or grew up) </strong>.

For context, each author has their own dedicated 'page' and we can assign a city/town with it
(In WordPress talk, we have a custom post type, ohio_author, and there is a custom taxonomy named ohio_author_city. 
Then in the back end, I would geocode that that city and then permanently store the lat/lon for each page, as custom fields, then fetch those custom fields

ow to display the markers in a map that is accessible for all of our patrons so they could geographically browse the locations of Ohio Authors? 

<h2> The Marker Cluster </h2>

My initial approach, now that we have over 350 was with creating a ; even though we thought - a crucial mistake for later on. 

was that we could build a map and that marker cluster; having build maps in the past, I knew that markers were keyboard accessible (or I thought!).

<strong> Markers</strong> are the common name for individual points on a web map and are often interactive for the user, often with a openable pop-up window to display further information. 

<strong>Marker Clusters </strong> are points to aggregate more points when you want to want to represent all points at lower zoom levels to the user without overwhelming the user. 
Marker Clusters are used in the popular web map libaries like <a href="Leaflet (https://github.com/Leaflet/Leaflet.markercluster">Leaflet</a>, <a href="https://mapsplatform.google.com/resources/blog/how-cluster-map-markers/">google maps</a>, mapbox GL, maplibre, and ESRI although ESRI calls them <a href="https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/8-ways-to-style-point-clusters-on-the-web">point clusters</a>.

https://www.sebastianmeier.eu/publications/the-marker-cluster/

Rethinking the Usage and Experience of
Clustering Markers in Web Mapping (https://dl.acm.org/doi/abs/10.1007/978-3-030-50020-7_1)https://sonar.ch/global/documents/87038

Admittedly, I instantly thought of marker clustering as the way to represent all of those markers on the map; the places to designate 

the goal with marker clustering, with adding one marker on the map for each author whose city would be geocoded (to the same, arbitrary point within that city's boundaries; 
(I didn't want to assign a random point within a city's boundaries for every author, because with that placement, people would think that a particular geographic location (where the singular marker is located) in the city would have meaning to the author (for example, 3 markers within a small town; one is randomly placed within a field, another may be randomly placed in on a street, the map viewer would think maybe the author (of that marker) was associated with); and a randomly placed marker that is on eastern edge of one city Y and then a randomly placed marker that is on the western maybe very geographically close 

Screenshot from 2025-12-02 13-50-11.png
- is the hundreds of markers on the map; although these are randomly placed and one for every 

My initial approach was to use Google Maps library because our branch <a href="https://cpl.org/locations">location map</a> uses Google maps and we have a lot of existing code behind the scenes, including geocoding, and I'd like to reuse as much as possible. 


Before, I fully build out the map, I began to get some proof of concepts down and simpler examples and I wanted to make sure the marker clusters are accessible by keyboard. 

<h2> Web Accessibility </h2>
When we think of web accessibility, we want all content and functionality on a website can be accessed by all users regardless whether they are .
<a href="https://www.w3.org/WAI/perspective-videos/keyboard/">Keyboard accessibility</a> - ensuring that all functionality and access on a web page can be done through only the keyboard <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard-accessible.html">(more details)</a> functionality is a 'key' (pun intended) aspect of making a web product accessible. 

For the unaware and those following and wish to test out the keyboard accessibility of a map, 
<strong> Tab is the keyboard shortcut to move between interactive elements* </strong> (links, buttons, form fields like search text boxes, dropdown selections, etc); then within those interactive elements, arrow keys are used to further navigate. Tab + shift is used to access the previous interactive element. 
For accessing the markers within the map, when the keyboard focus is on the larger map, that is when you press the arrow keys, as shown below: 
(There are many, many exceptions to these keyboard shortcuts). 




(sidebar: The map community has some ways to go along on that (this isn't to chastize the mapping community: )
Robert Linder <a href="https://github.com/Malvoz/web-maps-wcag-evaluation">thoroughly reviewed several map libraries' basic functionality for accessibility</a> although that didn't include markers and marker clusters or any markers. I hope this blog post 

<strong>While most users will use a mouse or their hand to tap and open a marker cluster; we should not assume that all users place the cursor or I cannot assume (no should you as a web developer) that a person will use a mouse to access information.</strong>


The Goal with our map, is: 
to have markers to show (which places/towns have more authors than others ) on the map, and 

Have on each marker, allow the user to open the marker (or markercluster) (through a marker pop-up) to view the list of authors associated with that city. 

The thought was to do this was with marker clusters and make 1 marker for each author but on the marker cluster, combine markers and list all of the authors at the lat/lon. 

I was imagining something pretty close to: 

{% responsive_image path: images/2026-01-pop-up-contents.png alt: "a content window listing a heading Youngstown authors with links to 5 author's names and their biographies %}

<h2> Map Library Marker Cluster Performance </h2>

<h3> Google Maps: </h3>

tl;dr: Frustrating and inconistent for accessing markers and marker clusters by the keyboard

Marker clustering is not included into the default Google Maps JS library so I forked the <a href="https://googlemaps.github.io/js-markerclusterer/"> google maps' markercluster library</a> and wanted to get some smaller examples. I modified the examples in the <a href="https://github.com/googlemaps/js-markerclusterer/tree/main/examples">examples directory on google maps' github</a> 

(Most of my examples do not include every marker that would be in my map; I only added 20-35 markers as a test) 


So, let's get an accessible (at least for keyboard accessibility) marker cluster example up and running! Follow along in my <a href="https://github.com/skora-cpl/js-markerclusterer/commits/2025/12-ecp/">github fork</a>.

My first initial examples (<a href="https://github.com/skora-cpl/js-markerclusterer/commit/37b6655b5a4b48c2e817e7076a0dfb54e7fbfebd">code</a>) that highlights based off of the core defaults/index.html 
<a href="maps/2026-marker-clustering/37b6655b5a4b48c2e817e7076a0dfb54e7fbfebd/index.html">with this as an example </a>

GET 37 ON THE USB DRIVE

Here, I couldn't even access a single marker by keyboard. We have dozens of towns that only have one author associated with that town; so just accessing a single marker is necessary. (ADD IF THE MARKERS )

BUT <strong> markers in google maps do not recieve any keyboard focus by default (cannot be accessed by tab) and that is intentional</strong>.

Markers are not tabbable by default according to a <a href="https://mapsplatform.google.com/resources/blog/improved-accessibility-maps-javascript-api">June 2021 blog post by google employee Chris Shull</a>. According to Chris, markers that do not have a click event (any action that would happen like a pop-up window) that attached to them are assigned an “img” accessibility role," meaning that they are skipped over in the and cannot be accessed by a keyboard (and most other assistive technology). 

I understand but disagree with google's perspective: perhaps their rationale was that if there's no additional information like a pop-up on a marker, why have the focus on the marker? 
But <strong> the markers (or marker clusters) themselves are informational - stating where the particular marker or point is located - and you should want to communicate that information to all of your readers</strong>. 

(On the other hand, perhaps the map author could state how many markers appear on the map or outside of the map itself. If someone is visually impaired, may they want to know 'how many markers are appear on the map in the first place, or where is that marker even placed ?) 

I realize OK, I needed to add <strong> the property <a href="https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.gmpClickable">"gmpClickable: true"</a> to the AdvancedMarkerElement so individual markers can accessed by the keyboard. </strong>
I found it odd that markerclusters can be accessed by the keyboard by default, but individual markers are not., for the reasons mentioned above 

In my next code commit from <a href="https://github.com/googlemaps/js-markerclusterer/commit/e5a2eada03215454ffb4a7bb49ee251f66a1401f">12/25</a>, the individual markers and marker clusters markers were now focusable by keyboard.  (E5, GET A )


`export function createMarker(map: google.maps.Map, lat: number, lng: number) {
  if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
    return new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat, lng },
      gmpClickable: true,
      title: `i'm a chump and ${name}`,
    });
` 

I then needed to figure out how to create the event listener pop-up for each marker so when the marker was opened (By keyboard, tapping on it, or clicking); the information from the pop-up  would eventually display there. I found an example in the <a href="https://developers.google.com/maps/documentation/javascript/advanced-markers/accessible-markers">google maps' accessible markers doc</a>. I added the pop-up infoWindow for each marker in <a href="https://github.com/skora-cpl/js-markerclusterer/commit/83cc7e1b404b9386d5f36d7fe4e9c6a4a4fb64d5">this commit</a>. In my eventual map, the pop-up window will contain the list of authors associated with that town/place (more on that later)


<i> (Note to anyone who comes across in search: 
If you're using the <a href="https://github.com/googlemaps/js-markerclusterer">google's js-markercluster library</a> and want to share their examples after cloning the repository: 

run `npm run docs` in js-markerclusterer directory that will compile/build your changes that made in the `examples` folder into the `public` folder , which you can then upload anywhere on the web * (of course, you have to provide your own google maps API key). This info is missing from the readme and was not obvious to me in the documentation (although I figured out it by deciphering the package.json)

At my next commit, 
As of <a href="https://github.com/skora-cpl/js-markerclusterer/commit/c25558b740d36903d930af8afe187debeb7c7198"> Jan 17th commit, </a> but with the markerclustering library, I haven't figured out.  <a href="maps/2026-marker-clustering/c25558b740d36903d930af8afe187debeb7c7198/"> With my working example</a>. 

(I'm aware in this commit, even under all conditions, you cannot open the pop-up for the marker clusters, that is because there are multiple markers at the same lat/lon and I restricted the zoom level, leading to <a href="#my-plan">my plan</a>)

Some times, I could access (by keyboard) all of the markers; some times, I could only access the marker clusters by keyboard, and the individual markers were not accessible. This was across multiple computers and operating systems (Windows 11, Chrome and firefox) and  (Firefox 147 and Chrome on Ubuntu 22.04); 

When there's a marker cluster, You cannot open it; the marker cluster navigation. I came back to it again; sometimes I cannot open it. It's inconsistent. On Windows, I have more consistency with being able to always access the markers by keyboard. 

The constant observations were: 

Even if I couldn't access all of the marker or marker clusters by keyboard, all markers and marker clusters were listed through NVDA (a screen reader) through as shown in the screenshot below. Through this although clumisly, someone could move the keyboard focus to the marker cluster BUT they (if I had properly, the names of the towns, instead of a generic hello world). Again, though, someone should be able to access all markers without having to use a screen reader. 

(NEED SCREENSHOT)

For marker clusters, assistive technology will say "cluster of X markers" (replace X with the number of markers) - <strong>. As I mention earlier, adding the geographic context (even a rough location) of the marker cluster would be invaluable;</strong>; stating something like "33 markers around Cleveland, Ohio)" like in <a href="maps/2026-marker-clustering/c25558b740d36903d930af8afe187debeb7c7198/">this example</a>. For someone , they could know which of the marker clusters to browse to; otherwise, they just see as shown in the screenshot. 

something like it could inform someone using NVDA or another screenreader (or anyone who has vision have the vision broadly, knowing,
This behavior of stating of providing 'X clusters of markers" is also common to Leaflet as well. (On the other hand, adding the functionality of the marker detecting that extra bit of geographic knowledge, is not simple, although it's a worthy challenge). 


ok, in commit  - https://github.com/skora-cpl/js-markerclusterer/commit/e5a2eada03215454ffb4a7bb49ee251f66a1401f - from 2025-12-25; 
the individual markers are now tabbable BUT you cannot tab to the markerclusters! 

I had the same inconsistent behavior with <a href="https://developers.google.com/maps/documentation/javascript/marker-clustering"> marker clustering example from Google</a> as shown in the following (Very sped-up) image: 

{% responsive_image path: images/2026-01-29-google_maps_keyboard-on-ubuntu-accessing_the_points.gif alt: "keyboard focus Cycling through 4 of 5 possible markers on a google map" %}
<a href="images/2026-01-29-google_maps_keyboard-on-ubuntu-accessing_the_points.webm"> View this as a slower webm </a>. 
Try yourself with the keyboard (Remember, tab to move across each element, tab + shift to go back, )

At least, it's perhaps cold comfort that consistently, 

Note, when you focus "cluster of X markers" without any connotation to its location geographically. Having 

<h2> So, where I'm at right now for my project </h2>

As of <a href="https://github.com/skora-cpl/js-markerclusterer/commit/c25558b740d36903d930af8afe187debeb7c7198"> Jan 17th commit, </a> but with the markerclustering library, I haven't figured out.  <a href="maps/2026-marker-clustering/c25558b740d36903d930af8afe187debeb7c7198/"> With my working example</a>. 

(I know in this commit, even under all conditions, I cannot open the pop-up for the marker clusters, that is because there are multiple markers at the same lat/lon and restricted the zoom level, leading to <a href="#my-plan">my plan</a>)


As I drafted this blog post and encountered that above issue for the I wondered - <strong> do i really need to actually cluster the markers </strong>? 

My initial proof of concept, I rendered over 300 individual markers, at instead of a - a crucial mistake. 

I almost regret that I did spend so much time on the blog post and investigating marker clusters. 


I realized: my initial approach, I had thought of another approach: 

how would it look without the marker clustering ?  

Instead, do I not need 1 marker per author? just create one marker per city? then somehow load the author names into there. 

I'm now trying out in my javascript code, I think I would do the following (please correct and roast if i'm wrong! )
In <a href="https://github.com/skora-cpl/js-markerclusterer/commit/b81725fdd4e95078acb3f97bef108128592bd844">my January 27th commit</a>, I created 1 just marker for each city <a href="maps/2026-marker-clustering/b81725fdd4e95078acb3f97bef108128592bd844/index.html">this example</a> to see how the map would look again
and I'm questioning my assumption that (although in this example, I've been typically able to access all of the )

As an alternative: 
I removed the marker cluster, and have one marker for each city (<a href="https://github.com/skora-cpl/js-markerclusterer/commit/eb568111919bb497834bb43ce7f30080071271de"> commit </a>) and here's the <a href="maps/2026-marker-clustering/eb568111919bb497834bb43ce7f30080071271de/index.html">this example</a>  visual example 

Again, this is just my mockup, and hey, i can access each marker at this point by keyboard, I need to access every markers' contents 

- But, I need to visually represent how many authors are at each city (that would be helpful, i think on the map)

<h3 id="my-plan"> <strong> My current idea/approach will be the following: </strong></h3>

Ditch the marker clustering, instead: 

create a foreach loop, For each author that comes through (which has properties like, the author's name, the associated city (as a text field) and the lat/lon pair: 

- see if there already a marker created for that lat/lng pair: 
  - If no marker for that lat/lng pair, 
    - create a marker at tha lat/lng, create a <a href="https://developers.google.com/maps/documentation/javascript/infowindows">pop-up window </a> with the city/place name, and create a list and insert a link to the author's biography <code><li> <a href="https://url-to-authors-biograpy"> author name</a>associated with that lat/lon pair</li></code>

  - If a marker already exists at lat/lng pair, 
    - find that marker, modify the pop-up-windows contents, and add the <code><li> <a href="https://url-to-authors-biograpy"> author name</a>associated with that lat/lon pair</li></code>
    - increase the numerical value of a variable (authorCount) that I had made within the foreach loop  
    - increase the marker's width based on the AuthorCount 
    and then increase the marker's width/and or changes the marker's color based on that AuthorCount)

This would then end up with something like (of course with the marker modified): 


<a href="https://rateyourmusic.com">rateyourmusic</a>, a cataloging service of music (like letterboxed for music), displays a map of artists whose albums you've reviewed (a live link to the map requires you to be registered and logged into their website) and this is pretty darn closer to what I'm imagining although there'll be (credit to Luke Everhart for suggesting to me rateyourmusic as inspiration)

{% responsive_image path: images/2026-01-map-rateyourmusic.png alt: "map of several circles in various sizes over new york city, with osm base map, and pop up window listing musical artists" %}


<h3> Other libraries:</h3>

<h4> Mapbox GL's approach is two fold: </h4>
They encourage to render the marker clusters separately, 

Mapbox and Maplibre.GL's marker clusters are not keyboard accessible, violating one of the most basic tenets of accessibility and ; providing access to a user who only has access to a keyboard cannot zoom or browse, none of the elements within the map can be accessed by a keyboard! 

not as markers which are exposed to the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model#what_is_a_dom_tree">DOM Tree</a>. The DOM Tree is what's read by assistive technology. 

The map is within canvas element 
Although canvas is a part of the DOM Tree; there is no standard for (please me if I'm wrong!) https://medium.com/@i.am.kanaru.sato/painting-the-future-canvas-based-rendering-a11y-today-and-tomorrow-6888ec2a3e5f

MDN <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas#alternative_content_2">recommends to not use canvas for accessible elements</a> ; 

As an example, visit <a href="https://docs.mapbox.com/mapbox-gl-js/example/cluster/"> Mapbox's cluster example rendering earthquakes (data from a 3 week period in 2015-16)</a>. On that page, press TAB to move the keyboard. Using the keyboard, you cannot access any marker clusters or individual markers. You can open the marker clusters with the mouse. 

Another example is this full page react tutorial https://docs.mapbox.com/help/demos/dynamic-markers-react/final.html ; markers are not e

There is a 2nd approach: https://docs.mapbox.com/mapbox-gl-js/example/cluster-html/
which does render the clusters in the DOM however, mapbox marks them as role=img, so they cannot be accessed by the keyboard. As a short-term fix, If they had assigned an aria-role as a button, then maybe keyboard only user could open the element, and , just as a user with a mouse can click on the 


Single markers can be exposed to the DOM; if you follow this <a href="https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/">Mapbox Tutorial </a>
(More information <a href="https://github.com/mapbox/mapbox-gl-js/issues/8072">this github ticket</a>). The clusters are there for 

<h4> MapLibre </h4>
MapLibre, a fork of Mapbox-GL, unsurprisingly suffers the same issue as Mapbox-GL. This great example of is an example of being unable 

If you add the geographic data as a map layer, it will be rendered in the canvas and not accessible by the keyboard as shown in <a href="https://maplibre.org/maplibre-gl-js/docs/examples/create-and-style-clusters/"> Marker Clusters example </a>

But if you add your data as a marker AND offer additional interaction (like a pop-up), the marker will be added (assigned a `role=button` )

as shown in this example. 
https://maplibre.org/maplibre-gl-js/docs/examples/attach-a-popup-to-a-marker-instance/
 
the lack of marker accessibility is mentioned in https://github.com/mapbox/mapbox-gl-js/issues/11763 and it was recently resolved in Maplibre 
(there is the other library, )

Accessing by keyboard was very recently implemented (in January 2026) in MapLibre, v. 5.9.x, in this PR request by https://github.com/maplibre/maplibre-gl-js/pull/6517
by Corado Burcus. 

 https://github.com/maplibre/maplibre-gl-js/issues/356

But, <a href="https://github.com/malwoodsantoro/a11y-map-gl">Mal Wood-Santoro's a11y-map-gl</a> plugin for MapLibre for is really promising and . 

<h4> Leaflet: </h4>

Leaflet was likely my next option that I would have thoroughly tried if Google Maps doesn't work out. This <a href="https://littlefreelibrary.org/about/book-bans/book-ban-map/">Leaflet Map from the little free library </a> utilizes marker clusters, can be toggled through the keyboard but they cannot be opened by the keyboard. 

However, Leaflet's 2.0 release, a complete re-write and there has been extensive Work by https://kristjanesperanto.github.io/Leaflet.markercluster/example/marker-clustering-accessibility.html
where the marker cluster is 

<h4> Spidering, an alternative to Marker Clustering: </h4>

Spidering is another method that i had thought of as well and tested very early in map-making process but the <a href="https://github.com/jawj/OverlappingMarkerSpiderfier">google maps' spidering library is no longer maintained</a> and fails basic keyboard accessibility - lead to keyboard traps (being unable to exit the spider marker using only the keyboard). 
I could fork it (and <a href="https://github.com/jawj/OverlappingMarkerSpiderfier/pull/181">some updates have been proposed </a> ) and rewriting but my time is limited.  
I'd probably rather use Leaflet than spend the time updating a google maps library. 

Secondly, I don't think spidering would be as aesthetically clear for the user either. 

<h3> Summary </h3> 

Maps traditionally have been a visual medium and implemented as such. <strong> (hot take) But we have to turn that assumption on its head and remember what are maps' purpose: communicating spatial information </strong> to its users. Most online web maps still focus on the visual aspect of it and . 


Therere's a lot of improvement to be done with the accessibility of maps; and I think in some ways  

I hope that this post moved the ball a little forward and I found <a href="https://www.audiom.net/"> Audiom 

is promising although it is closed source and requires you to contact . 

