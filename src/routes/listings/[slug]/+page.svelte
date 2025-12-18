<script lang="ts">
	import { urlFor } from '$lib/sanity';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Map from '$lib/components/Map.svelte';
	import { PortableText } from '@portabletext/svelte';

	let { data } = $props();

	// Use Derived variables for reactivity
	let property = $derived(data.property);
	let prev = $derived(data.prev);
	let next = $derived(data.next);

	// Safely create the image list
	let allImages = $derived([property?.mainImage, ...(property?.gallery || [])].filter(Boolean));

	let showLightbox = $state(false);
	let lightboxIndex = $state(0);
	let isSaved = $state(false);
	let y = $state(0);
	let showSticky = $derived(y > 600);

	const openLightbox = (index: number) => {
		lightboxIndex = index;
		showLightbox = true;
	};

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: property.title,
					text: `Check out this property: ${property.title}`,
					url: window.location.href
				});
			} catch (err) {
				console.log('Error sharing:', err);
			}
		} else {
			navigator.clipboard.writeText(window.location.href);
			alert('Link copied to clipboard!');
		}
	};

	const handleBookmark = () => {
		isSaved = !isSaved;
		const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
		if (isSaved) {
			alert(`Press ${isMac ? 'Cmd' : 'Ctrl'} + D to bookmark this property.`);
		}
	};

	let contactLink = $derived(
		property 
		? `mailto:ljkamen@gmail.com?subject=Inquiry about ${property.title}`
		: '#'
	);

	const formatMoney = (amount: number) => {
		if (!amount) return 'Contact for Price';
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		if (!dateString) return 'Now';
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	};
</script>

<svelte:window bind:scrollY={y} />

{#if showLightbox}
	<Lightbox
		images={allImages}
		index={lightboxIndex}
		on:close={() => (showLightbox = false)}
	/>
{/if}

<div 
	class="fixed top-0 left-0 w-full bg-brand-navy text-white shadow-2xl z-50 transition-transform duration-300 ease-in-out border-b border-white/10"
	class:translate-y-0={showSticky}
	class:-translate-y-full={!showSticky}
>
	<div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
		<div class="flex items-center gap-6">
			<div class="hidden md:flex items-center gap-2 pr-6 border-r border-white/10">
				<a href="/" class="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all" title="Back to Home">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
				</a>
				<a href="/listings" class="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all" title="All Listings">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
				</a>
			</div>
			{#if prev}
				<a href={`/property/${prev.slug}`} class="hidden md:flex items-center gap-1 text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-colors border-r border-white/10 pr-6 h-10">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
					PREV
				</a>
			{/if}
			<div>
				<p class="text-2xl font-bold leading-none">{formatMoney(property.price)}</p>
				<p class="text-xs text-slate-400 font-light tracking-wide truncate max-w-[200px]">{property.title}</p>
			</div>
		</div>

		<div class="flex items-center gap-4 md:gap-6">
			<div class="hidden md:flex items-center gap-4 text-slate-400">
				<button 
					class="flex flex-col items-center transition-colors group" 
					class:text-brand-sky={isSaved} 
					class:text-slate-400={!isSaved}
					on:click={handleBookmark}
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:text-brand-sky"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
					<span class="text-[10px] uppercase font-bold tracking-wider mt-1">{isSaved ? 'Saved' : 'Save'}</span>
				</button>
				<button 
					class="flex flex-col items-center hover:text-white transition-colors"
					on:click={handleShare}
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
					<span class="text-[10px] uppercase font-bold tracking-wider mt-1">Share</span>
				</button>
			</div>
			<a 
				href={contactLink}
				class="bg-brand-sky text-brand-navy hover:bg-white transition-colors font-bold px-6 py-2 rounded text-sm uppercase tracking-wide shadow-lg"
			>
				Request Info
			</a>
			{#if next}
				<a href={`/property/${next.slug}`} class="hidden md:flex items-center gap-1 text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-colors border-l border-white/10 pl-6 h-10 ml-2">
					NEXT
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
				</a>
			{/if}
		</div>
	</div>
</div>

<div class="min-h-screen bg-white pb-20">
	<div class="w-full bg-brand-navy pb-10 pt-15">
		<div class="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer">
				
				<button
					class="md:col-span-2 h-full relative group w-full text-left bg-black/20"
					on:click={() => openLightbox(0)}
				>
					{#if property.mainImage}
						<img
							src={urlFor(property.mainImage).width(1200).url()}
							alt={property.title}
							class="w-full h-full object-contain transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02]"
						/>
					{/if}
					<div class="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-brand-navy shadow-sm">
						For Lease
					</div>
					<div class="absolute bottom-4 right-4 md:hidden bg-brand-black/80 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
						{allImages.length} Photos
					</div>
				</button>

				<div class="hidden md:flex flex-col gap-2 h-full">
					<button class="h-1/2 bg-gray-100 relative w-full overflow-hidden group" on:click={() => openLightbox(1)}>
						{#if property.gallery && property.gallery[0]}
							<img src={urlFor(property.gallery[0].asset).width(600).height(400).url()} alt="Gallery 1" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
						{:else}
							<div class="w-full h-full flex items-center justify-center text-gray-400 text-sm">No extra photo</div>
						{/if}
					</button>
					<button class="h-1/2 bg-gray-100 relative w-full overflow-hidden group" on:click={() => openLightbox(2)}>
						{#if property.gallery && property.gallery[1]}
							<img src={urlFor(property.gallery[1].asset).width(600).height(400).url()} alt="Gallery 2" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
							<div class="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/40 transition-colors flex items-center justify-center">
								<span class="bg-white/90 text-brand-navy px-4 py-2 rounded shadow-sm text-sm font-bold">
									View All {allImages.length} Photos
								</span>
							</div>
						{:else}
							<div class="w-full h-full flex items-center justify-center text-gray-400 text-sm">No extra photo</div>
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
		<div class="lg:col-span-2">
			<div class="border-b border-gray-200 pb-8 mb-8">
				<h1 class="text-3xl font-bold text-brand-navy mb-2">{property.title}</h1>
				<p class="text-slate-500 flex items-center gap-2 text-lg">
					<span class="inline-block w-2 h-2 rounded-full bg-brand-sky"></span>
					Available: <span class="font-semibold text-brand-navy">{formatDate(property.dateAvailable)}</span>
				</p>
				<div class="flex gap-8 mt-6">
					<div class="flex items-center gap-3">
						<div class="p-2 bg-slate-100 rounded-full text-brand-navy">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
						</div>
						<div>
							<p class="font-bold text-brand-navy text-lg">{property.bedrooms}</p>
							<p class="text-xs uppercase tracking-wider text-slate-500">Bedrooms</p>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<div class="p-2 bg-slate-100 rounded-full text-brand-navy">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.124-.504 1.125-1.125V20.25m-17.25 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25-4.5v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V9.75M8.25 21h8.25" /></svg>
						</div>
						<div>
							<p class="font-bold text-brand-navy text-lg">{property.bathrooms}</p>
							<p class="text-xs uppercase tracking-wider text-slate-500">Bathrooms</p>
						</div>
					</div>
				</div>
			</div>

			<div class="prose prose-lg prose-slate max-w-none text-slate-600 mb-12">
				{#if property.description}
					<PortableText value={property.description} />
				{:else}
					<p>No description available for this property.</p>
				{/if}
			</div>

			<div class="mb-12">
				<h3 class="text-xl font-bold text-brand-navy mb-6">Property Amenities</h3>
				{#if property.amenities && property.amenities.length > 0}
					<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
						{#each property.amenities as amenity}
							<div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
								<div class="text-brand-sky">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
								</div>
								<span class="text-slate-700 font-medium capitalize">
									{amenity.replace('_', ' ')}
								</span>
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-slate-500 italic">No specific amenities listed.</p>
				{/if}
			</div>

            <div class="mt-12">
				<h3 class="text-xl font-bold text-brand-navy mb-6">Location & Highlights</h3>
				
				<div class="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 mb-8 relative z-0">
					{#if property.location}
						<Map lat={property.location.lat} lng={property.location.lng} />
					{:else}
						<div class="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
							No map location set for this property.
						</div>
					{/if}
				</div>

				{#if property.communityHighlights && property.communityHighlights.length > 0}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each property.communityHighlights as highlight}
							<div class="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border-l-4 border-brand-sky shadow-sm">
								<div class="flex-1">
									<p class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">
										{highlight.label}
									</p>
									<p class="text-brand-navy font-semibold">
										{highlight.value}
									</p>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div class="relative hidden lg:block">
			<div class="sticky top-28 bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
				<div class="mb-6">
					<p class="text-slate-500 text-sm font-medium mb-1">Monthly Rent</p>
					<p class="text-4xl font-bold text-brand-navy">{formatMoney(property.price)}</p>
				</div>
				<a 
					href={contactLink}
					class="w-full block bg-brand-navy text-white font-bold py-4 rounded-lg hover:bg-brand-black transition-colors mb-4 shadow-lg text-center"
				>
					Request Info
				</a>
				<div class="mt-6 pt-6 border-t border-gray-100 text-center">
					<p class="text-sm text-slate-500 mb-2">Have questions? Call us:</p>
					<a href="tel:812-345-1005" class="text-xl font-bold text-brand-navy hover:text-brand-sky transition-colors">
						(812) 345-1005
					</a>
				</div>
			</div>
		</div>
	</div>
</div>