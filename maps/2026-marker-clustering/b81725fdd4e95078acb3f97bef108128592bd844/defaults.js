import { _ as __rest, S as Supercluster, d as deepEqual, L as Loader } from './vendor.js';

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
class Cluster {
    constructor({ markers, position }) {
        this.markers = [];
        if (markers)
            this.markers = markers;
        if (position) {
            if (position instanceof google.maps.LatLng) {
                this._position = position;
            }
            else {
                this._position = new google.maps.LatLng(position);
            }
        }
    }
    get bounds() {
        if (this.markers.length === 0 && !this._position) {
            return;
        }
        const bounds = new google.maps.LatLngBounds(this._position, this._position);
        for (const marker of this.markers) {
            bounds.extend(MarkerUtils.getPosition(marker));
        }
        return bounds;
    }
    get position() {
        // @ts-ignore
        return this._position || this.bounds.getCenter();
    }
    /**
     * Get the count of **visible** markers.
     */
    get count() {
        return this.markers.filter((m) => MarkerUtils.getVisible(m)).length;
    }
    /**
     * Add a marker to the cluster.
     */
    push(marker) {
        this.markers.push(marker);
    }
    /**
     * Cleanup references and remove marker from map.
     */
    delete() {
        if (this.marker) {
            MarkerUtils.setMap(this.marker, null);
            this.marker = undefined;
        }
        this.markers.length = 0;
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
/**
 * A typescript assertion function used in cases where typescript has to be
 * convinced that the object in question can not be null.
 *
 * @param value
 * @param message
 */
function assertNotNull(value, message = "assertion failed") {
    if (value === null || value === undefined) {
        throw Error(message);
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
/**
 * @hidden
 */
class AbstractAlgorithm {
    constructor({ maxZoom = 16 }) {
        this.maxZoom = maxZoom;
    }
    /**
     * Helper function to bypass clustering based upon some map state such as
     * zoom, number of markers, etc.
     *
     * ```typescript
     *  cluster({markers, map}: AlgorithmInput): Cluster[] {
     *    if (shouldBypassClustering(map)) {
     *      return this.noop({markers})
     *    }
     * }
     * ```
     */
    noop({ markers, }) {
        return noop(markers);
    }
}
/**
 * @hidden
 */
const noop = (markers) => {
    const clusters = markers.map((marker) => new Cluster({
        position: MarkerUtils.getPosition(marker),
        markers: [marker],
    }));
    return clusters;
};

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
/**
 * A very fast JavaScript algorithm for geospatial point clustering using KD trees.
 *
 * @see https://www.npmjs.com/package/supercluster for more information on options.
 */
class SuperClusterAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { maxZoom, radius = 60 } = _a, options = __rest(_a, ["maxZoom", "radius"]);
        super({ maxZoom });
        this.markers = [];
        this.clusters = [];
        this.state = { zoom: -1 };
        this.superCluster = new Supercluster(Object.assign({ maxZoom: this.maxZoom, radius }, options));
    }
    calculate(input) {
        let changed = false;
        let zoom = input.map.getZoom();
        assertNotNull(zoom);
        zoom = Math.round(zoom);
        const state = { zoom: zoom };
        if (!deepEqual(input.markers, this.markers)) {
            changed = true;
            // TODO use proxy to avoid copy?
            this.markers = [...input.markers];
            const points = this.markers.map((marker) => {
                const position = MarkerUtils.getPosition(marker);
                const coordinates = [position.lng(), position.lat()];
                return {
                    type: "Feature",
                    geometry: { type: "Point", coordinates },
                    properties: { marker },
                };
            });
            this.superCluster.load(points);
        }
        if (!changed) {
            if (this.state.zoom <= this.maxZoom || state.zoom <= this.maxZoom) {
                changed = !deepEqual(this.state, state);
            }
        }
        this.state = state;
        // when input is empty, return right away
        if (input.markers.length === 0) {
            this.clusters = [];
            return { clusters: this.clusters, changed };
        }
        if (changed) {
            this.clusters = this.cluster(input);
        }
        return { clusters: this.clusters, changed };
    }
    cluster({ map }) {
        const zoom = map.getZoom();
        assertNotNull(zoom);
        return this.superCluster
            .getClusters([-180, -90, 180, 90], Math.round(zoom))
            .map((feature) => this.transformCluster(feature));
    }
    transformCluster({ geometry: { coordinates: [lng, lat], }, properties, }) {
        if (properties.cluster) {
            return new Cluster({
                markers: this.superCluster
                    .getLeaves(properties.cluster_id, Infinity)
                    .map((leaf) => leaf.properties.marker),
                position: { lat, lng },
            });
        }
        const marker = properties.marker;
        return new Cluster({
            markers: [marker],
            position: MarkerUtils.getPosition(marker),
        });
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
/**
 * Provides statistics on all clusters in the current render cycle for use in {@link Renderer.render}.
 */
class ClusterStats {
    constructor(markers, clusters) {
        this.markers = { sum: markers.length };
        const clusterMarkerCounts = clusters.map((a) => a.count);
        const clusterMarkerSum = clusterMarkerCounts.reduce((a, b) => a + b, 0);
        this.clusters = {
            count: clusters.length,
            markers: {
                mean: clusterMarkerSum / clusters.length,
                sum: clusterMarkerSum,
                min: Math.min(...clusterMarkerCounts),
                max: Math.max(...clusterMarkerCounts),
            },
        };
    }
}
class DefaultRenderer {
    /**
     * The default render function for the library used by {@link MarkerClusterer}.
     *
     * Currently set to use the following:
     *
     * ```typescript
     * // change color if this cluster has more markers than the mean cluster
     * const color =
     *   count > Math.max(10, stats.clusters.markers.mean)
     *     ? "#ff0000"
     *     : "#0000ff";
     *
     * // create svg url with fill color
     * const svg = window.btoa(`
     * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
     *   <circle cx="120" cy="120" opacity=".6" r="70" />
     *   <circle cx="120" cy="120" opacity=".3" r="90" />
     *   <circle cx="120" cy="120" opacity=".2" r="110" />
     *   <circle cx="120" cy="120" opacity=".1" r="130" />
     * </svg>`);
     *
     * // create marker using svg icon
     * return new google.maps.Marker({
     *   position,
     *   icon: {
     *     url: `data:image/svg+xml;base64,${svg}`,
     *     scaledSize: new google.maps.Size(45, 45),
     *   },
     *   label: {
     *     text: String(count),
     *     color: "rgba(255,255,255,0.9)",
     *     fontSize: "12px",
     *   },
     *   // adjust zIndex to be above other markers
     *   zIndex: 1000 + count,
     * });
     * ```
     */
    render({ count, position }, stats, map) {
        // change color if this cluster has more markers than the mean cluster
        const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
        // create svg literal with fill color
        const svg = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${count}</text>
</svg>`;
        const title = `Cluster of ${count} markers`, 
        // adjust zIndex to be above other markers
        zIndex = Number(google.maps.Marker.MAX_ZINDEX) + count;
        if (MarkerUtils.isAdvancedMarkerAvailable(map)) {
            // create cluster SVG element
            const parser = new DOMParser();
            const svgEl = parser.parseFromString(svg, "image/svg+xml").documentElement;
            svgEl.setAttribute("transform", "translate(0 25)");
            const clusterOptions = {
                map,
                position,
                zIndex,
                title,
                content: svgEl,
            };
            return new google.maps.marker.AdvancedMarkerElement(clusterOptions);
        }
        const clusterOptions = {
            position,
            zIndex,
            title,
            icon: {
                url: `data:image/svg+xml;base64,${btoa(svg)}`,
                anchor: new google.maps.Point(25, 25),
            },
        };
        return new google.maps.Marker(clusterOptions);
    }
}

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * Extends an object's prototype by another's.
 *
 * @param type1 The Type to be extended.
 * @param type2 The Type to extend with.
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extend(type1, type2) {
    /* istanbul ignore next */
    // eslint-disable-next-line prefer-const
    for (let property in type2.prototype) {
        type1.prototype[property] = type2.prototype[property];
    }
}
/**
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class OverlayViewSafe {
    constructor() {
        // MarkerClusterer implements google.maps.OverlayView interface. We use the
        // extend function to extend MarkerClusterer with google.maps.OverlayView
        // because it might not always be available when the code is defined so we
        // look for it at the last possible moment. If it doesn't exist now then
        // there is no point going ahead :)
        extend(OverlayViewSafe, google.maps.OverlayView);
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
var MarkerClustererEvents;
(function (MarkerClustererEvents) {
    MarkerClustererEvents["CLUSTERING_BEGIN"] = "clusteringbegin";
    MarkerClustererEvents["CLUSTERING_END"] = "clusteringend";
    MarkerClustererEvents["CLUSTER_CLICK"] = "click";
    MarkerClustererEvents["GMP_CLICK"] = "gmp-click";
})(MarkerClustererEvents || (MarkerClustererEvents = {}));
const defaultOnClusterClickHandler = (_, cluster, map) => {
    if (cluster.bounds)
        map.fitBounds(cluster.bounds);
};
/**
 * MarkerClusterer creates and manages per-zoom-level clusters for large amounts
 * of markers. See {@link MarkerClustererOptions} for more details.
 *
 */
class MarkerClusterer extends OverlayViewSafe {
    constructor({ map, markers = [], algorithmOptions = {}, algorithm = new SuperClusterAlgorithm(algorithmOptions), renderer = new DefaultRenderer(), onClusterClick = defaultOnClusterClickHandler, }) {
        super();
        /** @see {@link MarkerClustererOptions.map} */
        this.map = null;
        this.idleListener = null;
        this.markers = [...markers];
        this.clusters = [];
        this.algorithm = algorithm;
        this.renderer = renderer;
        this.onClusterClick = onClusterClick;
        if (map) {
            this.setMap(map);
        }
    }
    addMarker(marker, noDraw) {
        if (this.markers.includes(marker)) {
            return;
        }
        this.markers.push(marker);
        if (!noDraw) {
            this.render();
        }
    }
    addMarkers(markers, noDraw) {
        markers.forEach((marker) => {
            this.addMarker(marker, true);
        });
        if (!noDraw) {
            this.render();
        }
    }
    removeMarker(marker, noDraw) {
        const index = this.markers.indexOf(marker);
        if (index === -1) {
            // Marker is not in our list of markers, so do nothing:
            return false;
        }
        MarkerUtils.setMap(marker, null);
        this.markers.splice(index, 1); // Remove the marker from the list of managed markers
        if (!noDraw) {
            this.render();
        }
        return true;
    }
    removeMarkers(markers, noDraw) {
        let removed = false;
        markers.forEach((marker) => {
            removed = this.removeMarker(marker, true) || removed;
        });
        if (removed && !noDraw) {
            this.render();
        }
        return removed;
    }
    clearMarkers(noDraw) {
        this.markers.length = 0;
        if (!noDraw) {
            this.render();
        }
    }
    /**
     * Recalculates and draws all the marker clusters.
     */
    render() {
        const map = this.getMap();
        if (map instanceof google.maps.Map && map.getProjection()) {
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
            const { clusters, changed } = this.algorithm.calculate({
                markers: this.markers,
                map,
                mapCanvasProjection: this.getProjection(),
            });
            // Allow algorithms to return flag on whether the clusters/markers have changed.
            if (changed || changed == undefined) {
                // Accumulate the markers of the clusters composed of a single marker.
                // Those clusters directly use the marker.
                // Clusters with more than one markers use a group marker generated by a renderer.
                const singleMarker = new Set();
                for (const cluster of clusters) {
                    if (cluster.markers.length == 1) {
                        singleMarker.add(cluster.markers[0]);
                    }
                }
                const groupMarkers = [];
                // Iterate the clusters that are currently rendered.
                for (const cluster of this.clusters) {
                    if (cluster.marker == null) {
                        continue;
                    }
                    if (cluster.markers.length == 1) {
                        if (!singleMarker.has(cluster.marker)) {
                            // The marker:
                            // - was previously rendered because it is from a cluster with 1 marker,
                            // - should no more be rendered as it is not in singleMarker.
                            MarkerUtils.setMap(cluster.marker, null);
                        }
                    }
                    else {
                        // Delay the removal of old group markers to avoid flickering.
                        groupMarkers.push(cluster.marker);
                    }
                }
                this.clusters = clusters;
                this.renderClusters();
                // Delayed removal of the markers of the former groups.
                requestAnimationFrame(() => groupMarkers.forEach((marker) => MarkerUtils.setMap(marker, null)));
            }
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
        }
    }
    onAdd() {
        const map = this.getMap();
        assertNotNull(map);
        this.idleListener = map.addListener("idle", this.render.bind(this));
        this.render();
    }
    onRemove() {
        if (this.idleListener)
            google.maps.event.removeListener(this.idleListener);
        this.reset();
    }
    reset() {
        this.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
        this.clusters.forEach((cluster) => cluster.delete());
        this.clusters = [];
    }
    renderClusters() {
        // Generate stats to pass to renderers.
        const stats = new ClusterStats(this.markers, this.clusters);
        const map = this.getMap();
        this.clusters.forEach((cluster) => {
            if (cluster.markers.length === 1) {
                cluster.marker = cluster.markers[0];
            }
            else {
                // Generate the marker to represent the group.
                cluster.marker = this.renderer.render(cluster, stats, map);
                // Make sure all individual markers are removed from the map.
                cluster.markers.forEach((marker) => MarkerUtils.setMap(marker, null));
                if (this.onClusterClick) {
                    // legacy Marker uses 'click' events, whereas AdvancedMarkerElement uses 'gmp-click'
                    const markerClickEventName = MarkerUtils.isAdvancedMarker(cluster.marker)
                        ? MarkerClustererEvents.GMP_CLICK
                        : MarkerClustererEvents.CLUSTER_CLICK;
                    cluster.marker.addListener(markerClickEventName, 
                    /* istanbul ignore next */
                    (event) => {
                        google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
                        this.onClusterClick(event, cluster, map);
                    });
                }
            }
            MarkerUtils.setMap(cluster.marker, map);
        });
    }
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
console.log(typeof trees);
new Loader(getLoaderOptions()).load().then(() => {
    const element = document.getElementById("map");
    const map = new google.maps.Map(element, mapOptions);
    const myWindow = new google.maps.InfoWindow();
    const markers = trees.map(({ geometry }) => createMarker(map, geometry.coordinates[1], geometry.coordinates[0]));
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
    const markerCluster = new MarkerClusterer({
        markers,
    });
    markerCluster.setMap(map);
});
