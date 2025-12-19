<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Map from '$lib/components/Map.svelte';

	// Props
	let { isOpen, onClose } = $props();

	// Office Coordinates
	const officeLocation = {
		lat: 39.15565, 
		lng: -86.57777
	};
</script>

{#if isOpen}
	<div 
		class="fixed inset-0 bg-brand-black/60 backdrop-blur-sm z-[100] transition-all"
		transition:fade={{ duration: 300 }}
		onclick={onClose}
	></div>

	<div 
		class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] overflow-y-auto"
		transition:fly={{ x: 400, duration: 400, opacity: 1, easing: cubicOut }}
	>
		
		<div class="sticky top-0 bg-white/95 backdrop-blur z-10 px-8 py-6 flex justify-between items-center border-b border-slate-100">
			<button 
				onclick={onClose}
				class="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-brand-navy transition-colors"
				aria-label="Close menu"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
			</button>
		</div>

		<div class="p-8 space-y-10">
			
			<div>
				<h3 class="text-3xl font-bold text-brand-navy font-serif mb-2">Get in Touch</h3>
				<p class="text-slate-500 font-light leading-relaxed">
					Whether you're a current tenant or looking for your next home, we're here to help.
				</p>
			</div>

			<div class="space-y-6">
				
				<div class="flex items-start gap-4">
					<div class="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center shrink-0 text-brand-navy">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 9.75V4.5z" clip-rule="evenodd" /></svg>
					</div>
					<div>
						<p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Call Us</p>
						<a href="tel:812-345-1005" class="text-xl font-bold text-brand-navy hover:text-brand-sky transition-colors block">
							(812) 345-1005
						</a>
						<p class="text-sm text-slate-500 mt-1 font-light">Mon-Fri, 9am - 5pm</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div class="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center shrink-0 text-brand-navy">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
					</div>
					<div>
						<p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Us</p>
						<a href="mailto:ljkamen@gmail.com" class="text-lg font-bold text-brand-navy hover:text-brand-sky transition-colors block break-all">
							ljkamen@gmail.com
						</a>
						<p class="text-sm text-slate-500 mt-1 font-light">We reply within 24 hours</p>
					</div>
				</div>

			</div>

			<hr class="border-slate-100" />

			<div>
				<p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Visit Our Office</p>
				
				<div class="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-100">
					<p class="font-bold text-brand-navy text-sm">1440 South Liberty Drive</p>
					<p class="text-slate-500 text-sm">Bloomington, Indiana 47403</p>
				</div>

				<div class="h-48 w-full rounded-xl overflow-hidden relative z-0 border border-slate-200">
					<Map lat={officeLocation.lat} lng={officeLocation.lng} zoom={15} />
				</div>

				<a 
					href="https://maps.google.com/?q=1440+South+Liberty+Drive,+Bloomington,+IN+47403" 
					target="_blank" 
					class="mt-4 flex items-center justify-center w-full py-3 border border-slate-200 text-brand-navy font-bold text-sm rounded-lg hover:bg-slate-50 transition-colors gap-2"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-brand-sky"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
					Open in Google Maps
				</a>
			</div>

		</div>
	</div>
{/if}