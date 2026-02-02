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
            title: `i'm a chump and`,
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
		geometry: {
			coordinates: [
				-81.67284130463958,
				41.43268680800932
			],
			type: "Point"
		},
		id: 0,
		properties: {
			name: "p1"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.67284130463958,
				41.43268680800932
			],
			type: "Point"
		},
		id: 1,
		properties: {
			name: "p2"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.67284130463958,
				41.43268680800932
			],
			type: "Point"
		},
		id: 1,
		properties: {
			name: "p2"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.67284130463958,
				41.43268680800932
			],
			type: "Point"
		},
		id: 1,
		properties: {
			name: "luke"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.67284130463958,
				41.43268680800932
			],
			type: "Point"
		},
		id: 1,
		properties: {
			name: "ty jeromes"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.67284130463958,
				41.43268680800932
			],
			type: "Point"
		},
		id: 1,
		properties: {
			name: "p2"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.67284130463958,
				41.43268680800932
			],
			type: "Point"
		},
		id: 1,
		properties: {
			name: "p2"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.67284130463958,
				41.43268680800932
			],
			type: "Point"
		},
		id: 1,
		properties: {
			name: "scott farkass"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.67284130463958,
				41.43268680800932
			],
			type: "Point"
		},
		id: 1,
		properties: {
			name: "alanis"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.67284130463958,
				41.43268680800932
			],
			type: "Point"
		},
		id: 1,
		properties: {
			name: "twaub"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.63499831401275,
				41.4953857816285
			],
			type: "Point"
		},
		properties: {
			name: ""
		},
		type: "Feature",
		id: 11
	},
	{
		geometry: {
			coordinates: [
				-81.53183811392933,
				41.4147535108099
			],
			type: "Point"
		},
		properties: {
			author: " George Bibel",
			name: "Bedford"
		},
		type: "Feature",
		id: 12
	},
	{
		geometry: {
			coordinates: [
				-81.79263798158189,
				41.449977996718104
			],
			type: "Point"
		},
		properties: {
			name: ""
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.79263798158189,
				41.449977996718104
			],
			type: "Point"
		},
		properties: {
			name: ""
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.79263798158189,
				41.449977996718104
			],
			type: "Point"
		},
		properties: {
			name: ""
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.79263798158189,
				41.449977996718104
			],
			type: "Point"
		},
		properties: {
			name: "Lakewood",
			author: "Mary Dowling Daley"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.79263798158189,
				41.449977996718104
			],
			type: "Point"
		},
		properties: {
			name: "Lakewood",
			author: "Herbert Gold"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.79263798158189,
				41.449977996718104
			],
			type: "Point"
		},
		properties: {
			name: "Lakewood",
			author: "Clare Winger Harris"
		},
		type: "Feature"
	},
	{
		geometry: {
			coordinates: [
				-81.79263798158189,
				41.449977996718104
			],
			type: "Point"
		},
		properties: {
			name: ""
		},
		type: "Feature",
		id: 18
	},
	{
		geometry: {
			coordinates: [
				-81.7476704297532,
				41.356343734855756
			],
			type: "Point"
		},
		id: 14,
		properties: {
		},
		type: "Feature"
	},
	{
		type: "Feature",
		properties: {
			name: "akron",
			author: "Cynthia Rylant"
		},
		geometry: {
			coordinates: [
				-81.51710829311352,
				41.081853253758084
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "akron",
			author: "David Giffels"
		},
		geometry: {
			coordinates: [
				-81.51710829311352,
				41.081853253758084
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "akron",
			author: "Elton Glaser"
		},
		geometry: {
			coordinates: [
				-81.51710829311352,
				41.081853253758084
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "akron",
			author: "James Renner"
		},
		geometry: {
			coordinates: [
				-81.51710829311352,
				41.081853253758084
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "akron",
			author: "John W. Dean"
		},
		geometry: {
			coordinates: [
				-81.51710829311352,
				41.081853253758084
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "akron",
			author: "Michael Buckley"
		},
		geometry: {
			coordinates: [
				-81.51710829311352,
				41.081853253758084
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "akron",
			author: "Rita Dove"
		},
		geometry: {
			coordinates: [
				-81.51710829311352,
				41.081853253758084
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "akron",
			author: "Tom Batiuk"
		},
		geometry: {
			coordinates: [
				-81.51710829311352,
				41.081853253758084
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "akron",
			author: "Ruth McKenney"
		},
		geometry: {
			coordinates: [
				-81.51710829311352,
				41.081853253758084
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "akron",
			author: "Amanda Flower"
		},
		geometry: {
			coordinates: [
				-81.51710829311352,
				41.081853253758084
			],
			type: "Point"
		},
		id: 31
	},
	{
		type: "Feature",
		properties: {
		},
		geometry: {
			coordinates: [
				-83.64287736252265,
				41.052874668943474
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "youngstown"
		},
		geometry: {
			coordinates: [
				-80.66443316916688,
				41.123467854682076
			],
			type: "Point"
		},
		id: 33
	},
	{
		type: "Feature",
		properties: {
		},
		geometry: {
			coordinates: [
				-80.59055860572853,
				40.35384516214694
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "wooster"
		},
		geometry: {
			coordinates: [
				-81.97100701464873,
				40.80742432500648
			],
			type: "Point"
		},
		id: 36
	},
	{
		type: "Feature",
		properties: {
			name: "berea"
		},
		geometry: {
			coordinates: [
				-81.86094455025055,
				41.362667600664594
			],
			type: "Point"
		},
		id: 37
	},
	{
		type: "Feature",
		properties: {
			name: "Cleveland Heights",
			author: "Alix Kates Shulman"
		},
		geometry: {
			coordinates: [
				-81.56564450180568,
				41.52772706235095
			],
			type: "Point"
		},
		id: 37
	},
	{
		type: "Feature",
		properties: {
			name: "Cleveland Heights",
			author: "Bill Watterson"
		},
		geometry: {
			coordinates: [
				-81.56564450180568,
				41.52772706235095
			],
			type: "Point"
		},
		id: 37
	},
	{
		type: "Feature",
		properties: {
			name: "Cleveland Heights",
			author: "Dan Chaon"
		},
		geometry: {
			coordinates: [
				-81.56564450180568,
				41.52772706235095
			],
			type: "Point"
		},
		id: 37
	},
	{
		type: "Feature",
		properties: {
			name: "Cleveland Heights",
			author: "Harvey Pekar"
		},
		geometry: {
			coordinates: [
				-81.56564450180568,
				41.52772706235095
			],
			type: "Point"
		},
		id: 37
	},
	{
		type: "Feature",
		properties: {
			name: "Cleveland Heights",
			author: "Sarah Willis"
		},
		geometry: {
			coordinates: [
				-81.56564450180568,
				41.52772706235095
			],
			type: "Point"
		},
		id: 37
	},
	{
		type: "Feature",
		properties: {
			name: "Cleveland Heights",
			author: "Sheila Schwartz"
		},
		geometry: {
			coordinates: [
				-81.56564450180568,
				41.52772706235095
			],
			type: "Point"
		},
		id: 37
	},
	{
		type: "Feature",
		properties: {
			name: "Cleveland Heights",
			author: "Tricia Springstubb"
		},
		geometry: {
			coordinates: [
				-81.56564450180568,
				41.52772706235095
			],
			type: "Point"
		},
		id: 37
	},
	{
		type: "Feature",
		properties: {
			name: "Cleveland Heights"
		},
		geometry: {
			coordinates: [
				-81.56564450180568,
				41.52772706235095
			],
			type: "Point"
		},
		id: 37
	},
	{
		type: "Feature",
		properties: {
			name: "Cleveland Heights"
		},
		geometry: {
			coordinates: [
				-81.56564450180568,
				41.52772706235095
			],
			type: "Point"
		},
		id: 37
	},
	{
		type: "Feature",
		properties: {
			name: "euclid"
		},
		geometry: {
			coordinates: [
				-81.53012441986517,
				41.593819024076566
			],
			type: "Point"
		},
		id: 38
	},
	{
		type: "Feature",
		properties: {
			name: "euclid"
		},
		geometry: {
			coordinates: [
				-81.53012441986517,
				41.593819024076566
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "euclid"
		},
		geometry: {
			coordinates: [
				-81.53012441986517,
				41.593819024076566
			],
			type: "Point"
		}
	},
	{
		type: "Feature",
		properties: {
			name: "mentor"
		},
		geometry: {
			coordinates: [
				-81.34936054637343,
				41.66653644405707
			],
			type: "Point"
		},
		id: 39
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
    maxZoom: 13,
    mapId: MAP_ID,
};
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
