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
			// Dynamically import Leaflet only on the client side
			const L = await import('leaflet');

			// Fix for missing marker icons in Webpack/Vite environments
			// This effectively "resets" the icon paths to default
			// @ts-ignore
			delete L.Icon.Default.prototype._getIconUrl;
			L.Icon.Default.mergeOptions({
				iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
				iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
				shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
			});

			// Create Map
			map = L.map(mapElement).setView([lat, lng], zoom);

			// Add Tile Layer (OpenStreetMap - Free)
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			// Add Marker
			L.marker([lat, lng]).addTo(map);
		}
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
</svelte:head>

<div bind:this={mapElement} class="w-full h-full rounded-xl z-0"></div>