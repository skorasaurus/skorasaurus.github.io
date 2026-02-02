import { L as Loader } from './vendor.js';

/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * util class that creates a common set of convenience functions to wrap
 * shared behavior of Advanced Markers and Markers.
 */
class MarkerUtils {
    static isAdvancedMarkerAvailable(map) {
        return (google.maps.marker &&
            map.getMapCapabilities().isAdvancedMarkersAvailable === true);
    }
    static isAdvancedMarker(marker) {
        return (google.maps.marker &&
            marker instanceof google.maps.marker.AdvancedMarkerElement);
    }
    static setMap(marker, map) {
        if (this.isAdvancedMarker(marker)) {
            marker.map = map;
        }
        else {
            marker.setMap(map);
        }
    }
    static getPosition(marker) {
        // SuperClusterAlgorithm.calculate expects a LatLng instance so we fake it for Adv Markers
        if (this.isAdvancedMarker(marker)) {
            if (marker.position) {
                if (marker.position instanceof google.maps.LatLng) {
                    return marker.position;
                }
                // since we can't cast to LatLngLiteral for reasons =(
                if (Number.isFinite(marker.position.lat) &&
                    Number.isFinite(marker.position.lng)) {
                    return new google.maps.LatLng(marker.position.lat, marker.position.lng);
                }
            }
            // @ts-ignore
            return new google.maps.LatLng(null);
        }
        return marker.getPosition();
    }
    static getVisible(marker) {
        if (this.isAdvancedMarker(marker)) {
            /**
             * Always return true for Advanced Markers because the clusterer
             * uses getVisible as a way to count legacy markers not as an actual
             * indicator of visibility for some reason. Even when markers are hidden
             * Marker.getVisible returns `true` and this is used to set the marker count
             * on the cluster. See the behavior of Cluster.count
             */
            return true;
        }
        return marker.getVisible();
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const MAP_ID = "DEMO_MAP_ID";
const DEFAULT_KEY = "AIzaSyA6KA9XTESZKsNCMkVnSeYU4zO3TM5gGhk";
const getLoaderOptions = () => {
    var _a;
    return ({
        apiKey: (_a = localStorage.getItem("gmaps-key")) !== null && _a !== void 0 ? _a : DEFAULT_KEY,
        version: "weekly",
        libraries: ["marker"],
    });
};
// Creates a marker.
//
// Prefers advanced markers when they are available.
function createMarker(map, lat, lng) {
    if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
        return new google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat, lng },
            gmpClickable: true,
            title: "hi world",
        });
    }
    return new google.maps.Marker({
        position: { lat, lng },
        map,
    });
}

var trees = [
	{
		type: "Feature",
		properties: {
			name: "Akron"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.5191,
				41.0814
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Alliance"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.1059,
				40.9159
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Ashland"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.3179,
				40.8687
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Ashtabula"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.7898,
				41.8651
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Athens"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.1013,
				39.3292
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Beachwood"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.5085,
				41.4645
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bedford"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.5357,
				41.392
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Belden"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.0232,
				41.2292
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bellaire"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.7423,
				40.0123
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bellbrook"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.0724,
				39.6367
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bellefontaine"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.7597,
				40.3612
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bennetts Corners"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.761,
				41.2651
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Berea"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.8543,
				41.3662
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bexley"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.9377,
				39.969
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bluffton"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.8919,
				40.8939
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bowersville"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.7224,
				39.5817
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bowling Green"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.6502,
				41.3748
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bradford"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.4344,
				40.1317
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bryan"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.5516,
				41.4673
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Bucyrus"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.9755,
				40.8084
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Cadiz"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.9823,
				40.2723
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Camden"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.6469,
				39.6309
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Canton"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.3784,
				40.7989
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Castine"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.6225,
				39.9275
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Celina"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.5702,
				40.5489
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Chagrin Falls"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.3918,
				41.4337
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Chillicothe"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.9832,
				39.3331
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Cincinnati"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.512,
				39.1031
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Cleveland"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.6944,
				41.4993
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Cleveland Heights"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.5554,
				41.5201
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Columbus"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.9988,
				39.9612
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Dayton"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.1916,
				39.7589
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Defiance"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.3608,
				41.2842
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Delaware"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.0677,
				40.2987
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Delphos"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.3411,
				40.8442
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Dover"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.4754,
				40.5209
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "East Liverpool"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.5795,
				40.6187
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Elyria"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.1032,
				41.3684
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Euclid"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.5268,
				41.5931
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Findlay"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.6499,
				41.0442
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Fostoria"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.4174,
				41.1573
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Frankfort"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.1818,
				39.4017
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Gallipolis"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.1907,
				38.8137
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Gambier"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.3963,
				40.3756
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Garrettsville"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.094,
				41.2842
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Georgetown"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.9033,
				38.8637
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Granville"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.5177,
				40.0681
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Greenville"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.633,
				40.1028
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Hamilton"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.5613,
				39.3995
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Hicksville"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.7619,
				41.2931
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Hillsboro"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.6116,
				39.2023
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Homer"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.6841,
				40.252
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Horse Cave Creek, Meigs County"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.9337,
				39.0667
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Hudson"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.4407,
				41.2401
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Huntsburg"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.0773,
				41.5173
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Ironton"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.6715,
				38.5365
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Kent"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.3579,
				41.1537
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Kenwood"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.3752,
				39.1989
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Kilbourne"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.9555,
				40.3342
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Kinsman"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.5898,
				41.4489
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Lakewood"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.7985,
				41.4817
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Lancaster"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.6066,
				39.7137
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Lorain"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.1824,
				41.4528
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Luray"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.5446,
				39.9576
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Mansfield"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.5154,
				40.7584
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Maple Heights"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.554,
				41.4037
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Marietta"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.4507,
				39.4154
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Marion"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.1288,
				40.5887
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Massillon"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.5193,
				40.7967
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Medina"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.8632,
				41.1384
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Mentor"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.3398,
				41.6662
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Minerva"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.1034,
				40.7303
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Mingo Junction"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.609,
				40.3184
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Morrow County"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.7987,
				40.5255
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Mount Gilead"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.6841,
				40.5476
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Mount Healthy"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.5458,
				39.2334
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Mount Vernon"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.4857,
				40.3934
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "New Lexington"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.2096,
				39.7126
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Newark"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.4013,
				40.0581
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Niles"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.7651,
				41.1828
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "North Olmsted"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.9235,
				41.4156
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Novelty"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.3323,
				41.4728
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Oberlin"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.2177,
				41.2939
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Oxford"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.7452,
				39.507
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Painesville"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.2432,
				41.7245
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Parma"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.7232,
				41.4048
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Perrysburg"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.6297,
				41.5545
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Poland"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.6131,
				41.0228
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Portsmouth"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.0029,
				38.7317
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Richfield"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.6368,
				41.2442
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Ross"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.6533,
				39.3117
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Seaman"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.7388,
				38.9381
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Shaker Heights"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.5465,
				41.4751
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Silver Lake"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.4554,
				41.1448
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "South Euclid"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.5307,
				41.5201
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Springfield"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.8088,
				39.9242
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "St. Mary's"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.3883,
				40.5484
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Stark County"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.3653,
				40.8126
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Steubenville"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.6137,
				40.3623
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Stow"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.4404,
				41.1595
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Terrence Park"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.3013,
				39.1462
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Toledo"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.5379,
				41.6528
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Union City"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.8119,
				40.1998
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Vermillion"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.3532,
				41.4173
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Wapakoneta"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.1936,
				40.5678
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Warren"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.8181,
				41.2376
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Washington Court House"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.4394,
				39.5359
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "West Chester"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.4072,
				39.3323
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "West Salem"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.1102,
				40.9709
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Westerville"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.9307,
				40.1242
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Williamsfield"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.5512,
				41.5034
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Willoughby"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.4054,
				41.6398
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Wilmington"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.8291,
				39.4453
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Woodington"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-84.6738,
				40.1742
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Wooster"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-81.9351,
				40.8051
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Xenia"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.9297,
				39.6848
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Yellow Springs"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-83.8824,
				39.8064
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Youngstown"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-80.6495,
				41.0998
			]
		}
	},
	{
		type: "Feature",
		properties: {
			name: "Zanesville"
		},
		geometry: {
			type: "Point",
			coordinates: [
				-82.0032,
				39.9404
			]
		}
	}
];

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const mapOptions = {
    center: { lat: 41.45, lng: -81.85 },
    zoom: 7,
    mapId: MAP_ID,
};
// console.log(typeof trees);
new Loader(getLoaderOptions()).load().then(() => {
    const element = document.getElementById("map");
    const map = new google.maps.Map(element, mapOptions);
    const myWindow = new google.maps.InfoWindow();
    const markers = trees.map(({ geometry }) => createMarker(map, geometry.coordinates[1], geometry.coordinates[0]));
    console.log(markers);
    // markers.forEach((marker) => console.log(marker));
    // now, iterate through that list of markers and make an event listener for each of them
    markers.forEach((marker) => {
        marker.addListener("click", ({ domEvent, latLng }) => {
            const { target } = domEvent;
            myWindow.close();
            myWindow.setContent(marker.title);
            myWindow.open(marker.map, marker);
        });
    });
});
