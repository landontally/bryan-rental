<script lang="ts">
	let { data } = $props();

	const currentYear = new Date().getFullYear();
	
	const yearOptions = [
		{ label: 'Immediate / Now', value: 'Now' },
		{ label: `${currentYear + 1} - ${currentYear + 2}`, value: `${currentYear + 1}-${currentYear + 2}` },
		{ label: `${currentYear + 2} - ${currentYear + 3}`, value: `${currentYear + 2}-${currentYear + 3}` },
	];

	let selectedYear = $state('Any');
	let selectedBeds = $state('Any');
	let selectedBaths = $state('Any');

	// --- HELPER: FORMAT DATE ---
	// Turns "2025-08-01" into "Aug 1, 2025"
	function formatDate(dateString: string) {
		if (!dateString) return '';
		const date = new Date(dateString);
		// Note: We use UTC to prevent timezone shifts showing the wrong day
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			timeZone: 'UTC' 
		}).format(date);
	}

	let baseList = $derived(
		data.listings.filter((item) => {
			const bedMatch = selectedBeds === 'Any' || item.bedrooms === parseInt(selectedBeds);
			const bathMatch = selectedBaths === 'Any' || item.bathrooms === parseInt(selectedBaths);
			return bedMatch && bathMatch;
		})
	);

	let primaryList = $derived.by(() => {
		if (selectedYear === 'Any') {
			return baseList;
		} 
		else if (selectedYear === 'Now') {
			return baseList.filter((item) => {
				if (item.availableYear === 'Now') return true;
				
				// Check Specific Date
				if (item.dateAvailable) {
					const specificDateYear = new Date(item.dateAvailable).getFullYear();
					if (specificDateYear <= currentYear) return true;
				}

				// Check Range Dropdown
				if (item.availableYear) {
					const startYear = parseInt(item.availableYear.split('-')[0]);
					if (!isNaN(startYear) && startYear <= currentYear) return true;
				}
				return false;
			});
		} 
		else {
			return baseList.filter((item) => item.availableYear === selectedYear);
		}
	});

	let secondaryList = $derived.by(() => {
		if (selectedYear === 'Any') {
			return [];
		} 
		const primaryIds = new Set(primaryList.map((p) => p._id));
		return baseList.filter((item) => !primaryIds.has(item._id));
	});

	const resetFilters = () => {
		selectedYear = 'Any';
		selectedBeds = 'Any';
		selectedBaths = 'Any';
	};
</script>

<div class="min-h-screen bg-white pb-20 pt-32">
	
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
		<h1 class="text-4xl font-bold text-brand-navy mb-4 tracking-tight">Our Properties</h1>
		<div class="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
			<p class="text-slate-500 max-w-xl font-light">
				Browse our residential locations. Filter by school year to find your perfect match for the upcoming semester.
			</p>
			
			<div class="flex flex-wrap gap-4 items-center">
				<select bind:value={selectedYear} class="bg-white border border-slate-300 text-brand-navy text-sm font-bold rounded px-4 py-2 focus:outline-none focus:border-brand-sky hover:border-slate-400 transition-colors">
					<option value="Any">Move-in Year: Any</option>
					{#each yearOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>

				<select bind:value={selectedBeds} class="bg-white border border-slate-300 text-brand-navy text-sm font-bold rounded px-4 py-2 focus:outline-none focus:border-brand-sky hover:border-slate-400 transition-colors">
					<option value="Any">Beds: Any</option>
					<option value="1">1 Bedroom</option>
					<option value="2">2 Bedrooms</option>
					<option value="3">3 Bedrooms</option>
					<option value="4">4 Bedrooms</option>
					<option value="5">5+ Bedrooms</option>
				</select>

				<select bind:value={selectedBaths} class="bg-white border border-slate-300 text-brand-navy text-sm font-bold rounded px-4 py-2 focus:outline-none focus:border-brand-sky hover:border-slate-400 transition-colors">
					<option value="Any">Baths: Any</option>
					<option value="1">1 Bathroom</option>
					<option value="2">2 Bathrooms</option>
					<option value="3">3 Bathrooms</option>
				</select>

				{#if selectedYear !== 'Any' || selectedBeds !== 'Any' || selectedBaths !== 'Any'}
					<button onclick={resetFilters} class="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-widest ml-2">Clear</button>
				{/if}
			</div>
		</div>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if primaryList.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each primaryList as property}
					<a href={`/listings/${property.slug}`} class="group block">
						<div class="relative overflow-hidden rounded-lg aspect-[4/3] bg-slate-100 mb-4">
							{#if property.imageUrl}
								<img src={property.imageUrl} alt={property.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
							{/if}
							
							<div class="absolute top-4 left-4">
								<span class="bg-brand-navy text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider shadow-lg">
									{property.availableYear || 'Leased'}
								</span>
							</div>
						</div>
						
						<h3 class="text-xl font-bold text-brand-navy mb-1 group-hover:text-brand-sky transition-colors">{property.title}</h3>
						
						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-4 text-slate-500 text-sm">
								<span>{property.bedrooms} Beds</span>
								<span class="w-1 h-1 bg-slate-300 rounded-full"></span>
								<span>{property.bathrooms} Baths</span>
								<span class="w-1 h-1 bg-slate-300 rounded-full"></span>
								<span>${property.price}/mo</span>
							</div>

							{#if property.dateAvailable}
								<p class="text-xs font-bold text-brand-sky uppercase tracking-wide">
									Available: {formatDate(property.dateAvailable)}
								</p>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="py-20 text-center border-2 border-dashed border-slate-200 rounded-lg">
				<p class="text-slate-400 text-lg">No properties match your specific criteria.</p>
				<button onclick={resetFilters} class="text-brand-sky font-bold mt-2 hover:underline">Clear filters</button>
			</div>
		{/if}
	</div>

	{#if secondaryList.length > 0}
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-slate-200">
            <h2 class="text-2xl font-bold text-slate-400 mb-8 flex items-center gap-4">
                Other Locations
                <span class="text-sm font-normal text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    Not available for {selectedYear}
                </span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
                {#each secondaryList as property}
                    <a href={`/listings/${property.slug}`} class="group block">
                        <div class="relative overflow-hidden rounded-lg aspect-[4/3] bg-slate-100 mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                            {#if property.imageUrl}
                                <img src={property.imageUrl} alt={property.title} class="w-full h-full object-cover" />
                            {/if}
                            <div class="absolute top-4 left-4">
                                <span class="bg-slate-500 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider shadow-lg">
                                    {property.availableYear || 'Leased'}
                                </span>
                            </div>
                        </div>
                        <h3 class="text-xl font-bold text-slate-500 mb-1 group-hover:text-brand-navy transition-colors">{property.title}</h3>
                        <div class="flex flex-col gap-2">
                             <div class="flex items-center gap-4 text-slate-400 text-sm">
                                <span>{property.bedrooms} Beds</span>
                                <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span>{property.bathrooms} Baths</span>
                            </div>
                             {#if property.dateAvailable}
                                <p class="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                    Available: {formatDate(property.dateAvailable)}
                                </p>
                            {/if}
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</div>