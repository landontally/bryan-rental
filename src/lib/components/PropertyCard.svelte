<script lang="ts">
    import { urlFor } from '$lib/sanity';

    export let property: any;

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // FIX: Updated logic to force UTC timezone
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Now';
        const date = new Date(dateString);
        
        // "timeZone: 'UTC'" prevents the "Day Behind" bug
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC' 
        }).format(date);
    };
</script>

<a
    href={`/listings/${property.slug.current}`} 
    class="group relative block h-96 w-full overflow-hidden shadow-lg bg-gray-100"
>
    {#if property.mainImage}
        <img
            src={urlFor(property.mainImage).width(600).height(800).url()}
            alt={property.title}
            class="h-[calc(100%+4rem)] w-full object-cover transition-transform duration-500 ease-in-out group-hover:-translate-y-16"
        />
    {/if}

    <div
        class="absolute bottom-0 w-full bg-white/95 backdrop-blur-sm pt-3 transition-transform duration-500 ease-in-out translate-y-16 group-hover:translate-y-0 will-change-transform"
    >
        <div class="mb-1 h-12 flex flex-col justify-center px-5">
            <h3 class="text-lg font-sans font-bold text-gray-900 truncate leading-tight">
                {property.title}
            </h3>
            <p class="text-gray-600 font-light text-lg leading-tight">
                {formatMoney(property.price)} / month
            </p>
        </div>

        <div class="flex h-16 text-gray-600 border-t border-gray-200 mt-2">
            <div
                class="flex-1 flex flex-col justify-center items-center border-r border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
                <span class="font-bold text-gray-900 text-lg">{property.bedrooms}</span>
                <span class="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Beds</span>
            </div>

            <div
                class="flex-1 flex flex-col justify-center items-center border-r border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
                <span class="font-bold text-gray-900 text-lg">{property.bathrooms}</span>
                <span class="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Baths</span>
            </div>

            <div
                class="flex-1 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
                <span class="font-bold text-gray-900 text-lg">{formatDate(property.dateAvailable)}</span>
                <span class="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Avail</span>
            </div>
        </div>
    </div>
</a>