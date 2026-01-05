<script lang="ts">
	import PropertyCard from '$lib/components/PropertyCard.svelte';
	let { data } = $props();

    // Helper to get color classes based on alert type
    const getAlertColor = (type: string) => {
        switch(type) {
            case 'critical': return 'bg-red-600 text-white';
            case 'warning': return 'bg-amber-400 text-brand-navy';
            default: return 'bg-brand-sky text-brand-navy';
        }
    };
</script>

{#if data.notice}
    <div class="{getAlertColor(data.notice.type)} px-4 py-3 relative z-50 text-center font-bold text-sm tracking-wide shadow-md">
        <div class="max-w-7xl mx-auto flex justify-center items-center gap-4">
            <span>{data.notice.message}</span>
            {#if data.notice.link}
                <a href={data.notice.link} class="underline opacity-80 hover:opacity-100">Learn More &rarr;</a>
            {/if}
        </div>
    </div>
{/if}

<div class="relative h-screen w-full bg-brand-black overflow-hidden">
    
    <img 
        src="iu-stadium.jpg" 
        alt="Luxury Home" 
        class="absolute inset-0 w-full h-full object-cover opacity-50"
    />

    <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
    
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-2xl">
            Find Your Place.
        </h1>
        
        <p class="text-lg md:text-xl text-slate-100 max-w-2xl font-light mb-10 tracking-wide drop-shadow-md">
            Discover residential rentals in the heart of Bloomington, Indiana.
        </p>
        
        <a href="/listings" class="px-8 py-3 bg-white text-brand-navy font-bold rounded hover:bg-brand-navy hover:text-white transition-colors shadow-xl tracking-wide uppercase text-sm">
            Explore Listings
        </a>
    </div>
</div>

<div class="bg-brand-navy py-12 border-b border-white/5 relative z-10 -mt-2">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            <a href="/tenants#maintenance" class="group flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                <div class="w-12 h-12 bg-brand-sky rounded-full flex items-center justify-center text-brand-navy shrink-0 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>
                </div>
                <div>
                    <h3 class="text-white font-bold text-lg">Maintenance</h3>
                    <p class="text-slate-400 text-sm">Submit a request</p>
                </div>
            </a>

            <a href="https://example.com/portal" target="_blank" class="group flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                <div class="w-12 h-12 bg-brand-sky rounded-full flex items-center justify-center text-brand-navy shrink-0 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
                </div>
                <div>
                    <h3 class="text-white font-bold text-lg">Pay Rent Online</h3>
                    <p class="text-slate-400 text-sm">Secure tenant portal</p>
                </div>
            </a>

            <a href="/tenants" class="group flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                <div class="w-12 h-12 bg-brand-sky rounded-full flex items-center justify-center text-brand-navy shrink-0 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                </div>
                <div>
                    <h3 class="text-white font-bold text-lg">Tenant Handbook</h3>
                    <p class="text-slate-400 text-sm">Rules & resources</p>
                </div>
            </a>

        </div>
    </div>
</div>

<div class="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
    <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-xs font-bold text-brand-sky uppercase tracking-widest mb-3">About Bryan Rental</h2>
        <h3 class="text-3xl md:text-4xl font-bold text-brand-navy mb-6 tracking-tight">Quality Living in Bloomington.</h3>
        <p class="text-lg text-slate-600 font-light leading-relaxed mb-8">
            We are dedicated to providing sophisticated, well-maintained residential properties. Whether you are a student looking for your next school year home or a professional seeking a quiet retreat, we have a space for you.
        </p>
        <a href="/about" class="inline-block border-b-2 border-brand-navy pb-1 text-brand-navy font-bold hover:text-brand-sky hover:border-brand-sky transition-colors">
            Read Our Story
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
        
        <div class="mt-12 text-center md:hidden">
            <a href="/listings" class="inline-block px-6 py-3 bg-white border border-slate-300 rounded text-brand-navy font-bold shadow-sm">
                View All Listings
            </a>
        </div>
	</div>
</div>

