A quick update to let people know that I made an online map of <a href=
"http://skorasaurus.github.io/maps/clebuildings.html"> Cleveland's Building ages </a>

I've wanted to make one for a couple years now but didn't have access to the data. I finally do now and uploaded the <a href="https://github.com/skorasaurus/clebuildings/blob/master/all.csv"> raw data on github </a>. Once you click on that link, click raw, and save the file as a CSV. 


The Case for Open Data: 

I've wanted to make this map for years... Cleveland and Cuyahoga County's data access is less than stellar and falling behind other cities.
<a href="http://www.codeforamerica.org/governments/principles/open-data/"> Open Data policies </a> foster the culture  where information like building construction dates is shared and readily accessible and updated on the internet for government employees, non-profits, private businesses, and anyone else. 

In Cleveland, there's growing awareness open data's value to communities <a href="http://www.opencleveland.org"> Open Cleveland </a>, <a href="http://www.codeforamerica.org/"> Code For America Brigade</a>, is among several groups and individuals including <a href="http://cpl.org"> Cleveland Public Library </a>, <a href="http://povertycenter.case.edu/">Center on Urban Poverty and Community Development at Case Western Reserve University </a>
and <a href="http://www.onecommunity.org/">One Community </a> to promote open data policies and demonstrate its value. 

If you're interested to participate in this, you're welcome to become a part of <a href="http://www.opencleveland.org"> Open Cleveland, and attend one of our meetups and events. 

Some technical/cartography details:  

It's only the 2nd choropleth map (I usually make base maps or transportation maps) that I've ever made and learned more about that area of cartography. 
I tried out a couple different data classification methods (jenks, Equal Interval, and others) that are built-in to cartodb, the mapping software library that I used. None of them really felt 'right' to me so I made my own breaks after examining the source data and looking for trends. 

I only used 6 breaks. Is it too many or too few? I am not experienced in this area of cartography and found advice for sticking with 5-7 (on the belief too many would confuse the reader). I would have liked to see how a scheme where each increase in year change the color ever so slightly, perhaps increasing the Hue value by 1 or 2 points for each year. I couldn't figure how to do this (and I don't know the proper cartographical term either) in cartodb, so I opted to 
look at cartodb's data classifications...

Why cartodb:

I actually originally tried mapbox's mapbox-studio as I was more experienced with their softwares and thought it would be a good tool for the job (and I was really itching to use mapbox-studio again - Yes, I know the latter point is not a good reason to base your decision on what tool(s) to use to make a map).. But, mapbox-studio was unable to create the vector layer for me; it give me an error that I couldn't have X (I think it was 50k) amount of points at a particular zoom level. So, I went to cartodb. It handled the 40mb geojson file that I uploaded without a problem.  

Why points: 

There's been a few building age maps similar to this one (web maps, detailed to the block level) for NYC, Austin, PDX, Chicago. 
All of them had used the actual building footprint. Unfortunately, the source data only gives point centroid of the land parcel for the geography (lat/lon). 
I briefly thought about trying to match them up with the publicly available building footprints were last updated in 2007 (!) provided by the County (they're currently updating them now) but they are woefully incomplete in coverage. I also thought about matching them up with the building footprints that the Cleveland Metroparks made (they are the forefront of open source GIS in Northeast Ohio) from ~2012. That data set is relatively complete in terms of coverage. However, I'm doing this in my limited free time and didn't want to go down that rabbit hole, so I decided to just go with the points. 

Notice errors or omissions in the source data? I have too and I need to figure out who to contact and send them the corrections. This data was missing buildings built in 2013 and 2014. 

