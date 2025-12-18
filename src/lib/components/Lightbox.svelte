<script lang="ts">
	import { urlFor } from '$lib/sanity';
	import { fade, scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	// PROPS
	export let images: any[] = [];
	export let index: number = 0;

	const dispatch = createEventDispatcher();

	// NAVIGATION
	const next = () => index = (index + 1) % images.length;
	const prev = () => index = (index - 1 + images.length) % images.length;
	const close = () => dispatch('close');
	const jumpTo = (i: number) => index = i;

	// KEYBOARD SUPPORT
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') next();
		if (e.key === 'ArrowLeft') prev();
	};
</script>

<svelte:window on:keydown={handleKeydown} />

<div
	class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-black/95 backdrop-blur-sm"
	transition:fade={{ duration: 300 }}
>
	<button
		on:click={close}
		class="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full z-50 hover:bg-white/10 transition-colors"
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
	</button>

	<div class="flex-1 w-full flex items-center justify-center relative p-4">
		<button on:click|stopPropagation={prev} class="absolute left-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50 hidden md:block">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
		</button>

		{#key index}
			<img
				src={urlFor(images[index]).width(1600).fit('max').url()}
				alt="Gallery view"
				class="max-h-[75vh] max-w-full object-contain shadow-2xl"
				in:scale={{ start: 0.95, duration: 300 }}
			/>
		{/key}

		<button on:click|stopPropagation={next} class="absolute right-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50 hidden md:block">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
		</button>
	</div>

	<div class="h-24 w-full bg-black/50 backdrop-blur-md flex items-center justify-center border-t border-white/10">
		<div class="flex gap-2 overflow-x-auto px-4 py-2 w-full max-w-7xl justify-start md:justify-center">
			{#each images as img, i}
				<button 
					on:click|stopPropagation={() => jumpTo(i)}
					class="relative flex-shrink-0 h-16 w-24 rounded overflow-hidden transition-all duration-200 border-2 {i === index ? 'border-brand-sky opacity-100 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}"
				>
					<img 
						src={urlFor(img).width(200).height(150).url()} 
						alt="Thumbnail" 
						class="w-full h-full object-cover"
					/>
				</button>
			{/each}
		</div>
	</div>

	<div class="absolute top-6 left-6 text-white/80 font-sans text-sm tracking-widest">
		{index + 1} / {images.length}
	</div>
</div>