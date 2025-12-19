<script lang="ts">
	let { data } = $props();

	const currentYear = new Date().getFullYear();

	// 1. TYPESCRIPT INTERFACE
	interface Property {
		_id: string;
		title: string;
		slug: string;
		price: number;
		bedrooms: number;
		bathrooms: number;
		sqft?: number;
		dateAvailable?: string;
		availableYear?: string;
		imageUrl?: string;
	}

	// 2. CONFIGURATION
	const yearOptions = [
		// Removed 'Now' option as requested
		{ label: `${currentYear} - ${currentYear + 1}`, value: `${currentYear}-${currentYear + 1}` },
		{ label: `${currentYear + 1} - ${currentYear + 2}`, value: `${currentYear + 1}-${currentYear + 2}` },
		{ label: `${currentYear + 2} - ${currentYear + 3}`, value: `${currentYear + 2}-${currentYear + 3}` },
	];

	const sortOptions = [
		{ label: 'Date: Earliest First', value: 'date-asc' },
		{ label: 'Date: Furthest First', value: 'date-desc' },
		{ label: 'Price: Low to High', value: 'price-asc' },
		{ label: 'Price: High to Low', value: 'price-desc' },
	];

	// 3. STATE
	let selectedYear = $state('Any');
	let selectedBeds = $state('Any');
	let selectedBaths = $state('Any');
	let sortBy = $state('date-asc');

	// 4. HELPER: FORMAT DATE
	function formatDate(dateString: string) {
		if (!dateString) return '';
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			timeZone: 'UTC' 
		}).format(date);
	}

	// 5. HELPER: SORTING VALUE
	function getSortableDate(property: Property): number {
		if (property.dateAvailable) {
			return new Date(property.dateAvailable).getTime();
		}
		if (property.availableYear === 'Now') {
			return new Date().getTime(); 
		}
		if (property.availableYear) {
			const year = parseInt(property.availableYear.split('-')[0]);
			return new Date(`${year}-08-01`).getTime();
		}
		return new Date('3000-01-01').getTime();
	}

	// 6. HELPER: SORT FUNCTION
	function sortProperties(list: Property[]) {
		return [...list].sort((a, b) => {
			if (sortBy === 'price-asc') return a.price - b.price;
			if (sortBy === 'price-desc') return b.price - a.price;
			
			const dateA = getSortableDate(a);
			const dateB = getSortableDate(b);

			if (sortBy === 'date-asc') return dateA - dateB;
			if (sortBy === 'date-desc') return dateB - dateA;
			
			return 0;
		});
	}

	// 7. MATCHING LOGIC
	function isMatch(item: Property) {
		// 1. Bed Match
		const bedsNum = selectedBeds === 'Any' ? 'Any' : parseInt(selectedBeds);
		const isBedMatch = bedsNum === 'Any' || item.bedrooms === bedsNum;

		// 2. Bath Match
		const bathsNum = selectedBaths === 'Any' ? 'Any' : parseInt(selectedBaths);
		const isBathMatch = bathsNum === 'Any' || item.bathrooms === bathsNum;

		// 3. Year Match
		const isYearMatch = selectedYear === 'Any' || item.availableYear === selectedYear;

		return isBedMatch && isBathMatch && isYearMatch;
	}

	// 8. DERIVED LISTS
	let allListings = $derived(data.listings as Property[]);

	// Primary: Matches ALL filters
	let primaryList = $derived.by(() => {
		const filtered = allListings.filter(isMatch);
		return sortProperties(filtered);
	});

	// Secondary: Everything NOT in Primary
	// This ensures nothing ever "disappears". If it's not top, it's bottom.
	let secondaryList = $derived.by(() => {
		// If showing everything in primary (no filters), hide secondary to avoid duplication
		if (selectedYear === 'Any' && selectedBeds === 'Any' && selectedBaths === 'Any') {
			return [];
		}

		// Get IDs of primary items to exclude them
		const primaryIds = new Set(primaryList.map((p) => p._id));
		
		// Filter out primary items
		const others = allListings.filter((item) => !primaryIds.has(item._id));
		
		return sortProperties(others);
	});

	const resetFilters = () => {
		selectedYear = 'Any';
		selectedBeds = 'Any';
		selectedBaths = 'Any';
		sortBy = 'date-asc';
	};
</script>

<div class="min-h-screen bg-white pb-20 pt-32">
	
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
		<h1 class="text-4xl font-bold text-brand-navy mb-4 tracking-tight">Our Properties</h1>
		<p class="text-slate-500 max-w-xl font-light mb-8">
			Browse our residential locations. Filter by school year to find your perfect match for the upcoming semester.
		</p>
	</div>

	<div class="sticky top-16 md:top-16 z-40 bg-white/95 backdrop-blur-md border-y border-slate-200 shadow-sm mb-8 py-4">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
				
				<div class="flex flex-wrap gap-3 items-center w-full xl:w-auto">
					<div class="relative group">
						<select bind:value={selectedYear} class="appearance-none bg-white border border-slate-300 text-brand-navy text-sm font-bold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-brand-sky focus:ring-1 focus:ring-brand-sky hover:border-slate-400 transition-colors cursor-pointer w-full md:w-auto">
							<option value="Any">Move-in: Any</option>
							{#each yearOptions as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
						<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
						</div>
					</div>

					<div class="relative">
						<select bind:value={selectedBeds} class="appearance-none bg-white border border-slate-300 text-brand-navy text-sm font-bold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-brand-sky hover:border-slate-400 transition-colors cursor-pointer">
							<option value="Any">Beds: Any</option>
							<option value="1">1 Bedroom</option>
							<option value="2">2 Bedrooms</option>
							<option value="3">3 Bedrooms</option>
							<option value="4">4 Bedrooms</option>
							<option value="5">5+ Bedrooms</option>
						</select>
						<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
						</div>
					</div>

					<div class="relative">
						<select bind:value={selectedBaths} class="appearance-none bg-white border border-slate-300 text-brand-navy text-sm font-bold rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:border-brand-sky hover:border-slate-400 transition-colors cursor-pointer">
							<option value="Any">Baths: Any</option>
							<option value="1">1 Bath</option>
							<option value="2">2 Baths</option>
							<option value="3">3 Baths</option>
						</select>
						<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
						</div>
					</div>

					{#if selectedYear !== 'Any' || selectedBeds !== 'Any' || selectedBaths !== 'Any'}
						<button onclick={resetFilters} class="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-widest ml-2 border-b border-red-200 pb-0.5">
							Clear All
						</button>
					{/if}
				</div>

				<div class="flex items-center gap-3 w-full xl:w-auto border-t xl:border-t-0 border-slate-100 pt-3 xl:pt-0">
					<span class="text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Sort By:</span>
					<div class="relative grow xl:grow-0">
						<select bind:value={sortBy} class="appearance-none w-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-brand-sky transition-colors cursor-pointer">
							{#each sortOptions as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
						<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[500px]">
		{#if primaryList.length > 0}
			<p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
				Showing {primaryList.length} {primaryList.length === 1 ? 'Property' : 'Properties'}
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each primaryList as property (property._id)}
					<a href={`/listings/${property.slug}`} class="group flex flex-col h-full bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
						
						<div class="relative overflow-hidden aspect-4/3 bg-slate-100">
							{#if property.imageUrl}
								<img src={property.imageUrl} alt={property.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
							{/if}
							
							<div class="absolute top-4 left-4">
								<span class="
									text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-sm
									{property.availableYear === 'Now' || (property.dateAvailable && new Date(property.dateAvailable).getFullYear() <= currentYear) 
										? 'bg-brand-sky text-brand-navy' 
										: 'bg-brand-navy text-white'}
								">
									{property.dateAvailable ? formatDate(property.dateAvailable) : (property.availableYear || 'Leased')}
								</span>
							</div>

							<div class="absolute inset-0 bg-brand-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
								<span class="border border-white/30 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wide uppercase hover:bg-white hover:text-brand-navy transition-colors">
									View Details
								</span>
							</div>
						</div>
						
						<div class="p-6 flex flex-col grow">
							<div class="flex flex-col gap-1 mb-4">
								<h3 class="text-xl font-bold text-brand-navy group-hover:text-brand-sky transition-colors">{property.title}</h3>
								<p class="text-lg font-bold text-slate-600">${property.price}<span class="text-xs font-normal text-slate-400"> / month</span></p>
							</div>
							
							<div class="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-slate-500 text-sm">
								<div class="flex items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-brand-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
									<span>{property.bedrooms} Beds</span>
								</div>
								<div class="flex items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-brand-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
									<span>{property.bathrooms} Baths</span>
								</div>
								{#if property.sqft}
								<div class="flex items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-brand-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
									<span>{property.sqft} sqft</span>
								</div>
								{/if}
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="py-20 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
				<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
				</div>
				<h3 class="text-lg font-bold text-brand-navy mb-1">No exact matches found</h3>
				<p class="text-slate-400 text-sm mb-6">Check the "Other Locations" section below.</p>
				<button onclick={resetFilters} class="bg-white border border-slate-300 text-brand-navy font-bold py-2 px-6 rounded-lg hover:border-brand-sky hover:text-brand-sky transition-all shadow-sm">
					Clear Filters
				</button>
			</div>
		{/if}
	</div>

	{#if secondaryList.length > 0}
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-slate-200">
            <h2 class="text-2xl font-bold text-slate-400 mb-8 flex items-center gap-4">
                Other Locations
                <span class="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    Partial Matches / Other Years
                </span>
            </h2>
			
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
                {#each secondaryList as property}
                    <a href={`/listings/${property.slug}`} class="group flex flex-col h-full bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                        
                        <div class="relative overflow-hidden aspect-4/3 bg-slate-200 grayscale group-hover:grayscale-0 transition-all duration-500">
                            {#if property.imageUrl}
                                <img src={property.imageUrl} alt={property.title} class="w-full h-full object-cover" />
                            {/if}
                            
                            <div class="absolute top-4 left-4">
                                <span class="bg-slate-500 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider shadow-lg">
                                    {property.availableYear || 'Leased'}
                                </span>
                            </div>
                        </div>
                
                        <div class="p-6 flex flex-col grow">
							<div class="flex flex-col gap-1 mb-4">
								<h3 class="text-xl font-bold text-slate-500 group-hover:text-brand-navy transition-colors">{property.title}</h3>
								<p class="text-lg font-bold text-slate-400">${property.price}<span class="text-xs font-normal"> / month</span></p>
							</div>

                            <div class="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between text-slate-400 text-sm">
                                <div class="flex items-center gap-2">
									<span>{property.bedrooms} Beds</span>
                                </div>
								<div class="flex items-center gap-2">
									<span>{property.bathrooms} Baths</span>
								</div>
								{#if property.sqft}
								<div class="flex items-center gap-2">
									<span>{property.sqft} sqft</span>
								</div>
								{/if}
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</div>