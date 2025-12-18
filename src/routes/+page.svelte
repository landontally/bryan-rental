<script lang="ts">
	import PropertyCard from '$lib/components/PropertyCard.svelte';
	let { data } = $props();
	
</script>

<div class="relative h-screen w-full bg-brand-black overflow-hidden">
	<img 
		src="hero-house.jpg" 
		alt="Luxury Home" 
		class="absolute inset-0 w-full h-full object-cover opacity-60"
	/>
	
	<div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
		<h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
			Find Your Place.
		</h1>
		<p class="text-lg md:text-xl text-slate-200 max-w-2xl font-light mb-10 tracking-wide">
			Discover residential rentals in the heart of Bloomington.
		</p>
		<a href="/listings" class="px-8 py-3 bg-white text-brand-navy font-bold rounded hover:bg-brand-navy hover:text-white transition-colors shadow-xl tracking-wide uppercase text-sm">
			Explore Listings
		</a>
	</div>
</div>

<div class="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-end mb-12">
			<div>
				<h2 class="text-3xl font-bold text-brand-navy tracking-tight">Featured Properties</h2>
				<p class="text-slate-500 mt-2 font-light">Curated selection of our finest homes.</p>
			</div>
			<a href="/listings" class="hidden md:block text-sm font-bold text-brand-navy hover:text-brand-sky transition-colors tracking-wide uppercase border-b border-slate-300 pb-1">
				View All
			</a>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each data.properties as property}
				<PropertyCard {property} />
			{:else}
				<p class="text-slate-500 col-span-full text-center py-20 font-light">
					No featured properties found.
				</p>
			{/each}
		</div>
	</div>
</div>