<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    export let lat: number;
    export let lng: number;
    export let zoom: number = 15;

    let mapElement: HTMLElement;
    let map: any;

    onMount(async () => {
        if (browser) {
            const L = await import('leaflet');
            
            // @ts-ignore
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            });

            // Ensure coordinates are read as strict numbers
            const numLat = Number(lat);
            const numLng = Number(lng);

            map = L.map(mapElement).setView([numLat, numLng], zoom);

			L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
				attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
				maxZoom: 20
			}).addTo(map);

            L.marker([numLat, numLng]).addTo(map);

            // Force Leaflet to recalculate the canvas size
            setTimeout(() => {
                if (map) map.invalidateSize();
            }, 250);
        }
    });

    onDestroy(() => {
        if (map) map.remove();
    });
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
</svelte:head>

<div bind:this={mapElement} class="w-full h-full rounded-xl z-0"></div>