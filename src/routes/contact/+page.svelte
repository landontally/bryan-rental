<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	
	const officeLocation = {
		lat: 39.15565, 
		lng: -86.57777
	};
</script>

<div class="min-h-screen bg-slate-50 pb-20 pt-32">
	
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-bold text-brand-navy mb-4 tracking-tight">
				Get in Touch
			</h1>
			<p class="text-slate-500 font-light text-lg">
				We'd love to hear from you.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
			
			<div class="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-center">
				
				<h2 class="text-3xl font-bold text-brand-navy mb-8 text-center">Ready to Lease?</h2>

				<div>
					<h3 class="text-2xl font-semibold text-brand-navy mb-4">By Phone</h3>
					<div class="space-y-4 text-slate-600">
						<p class="text-xl font-medium leading-relaxed">
							Call us at <a href="tel:812-345-1005" class="text-brand-sky hover:text-brand-navy hover:underline font-bold whitespace-nowrap transition-colors">(812) 345-1005</a> and ask for:
						</p>
						<ul class="list-disc list-inside space-y-3 text-lg pl-2">
							<li><strong class="text-brand-navy">Lisa</strong> to inquire about available properties.</li>
							<li><strong class="text-brand-navy">Maintenance</strong> for urgent repair requests.</li>
						</ul>
					</div>
				</div>

				<div class="mt-8 pt-8 border-t border-slate-200">
					<h3 class="text-2xl font-semibold text-brand-navy mb-4">By Email</h3>
					
					<div class="flex items-center">
						<svg class="w-7 h-7 mr-4 text-brand-sky flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						<a href="mailto:ljkamen@gmail.com" class="text-xl font-medium text-brand-navy hover:text-brand-sky hover:underline transition-colors break-all">
							ljkamen@gmail.com
						</a>
					</div>
					
					<p class="text-lg text-slate-500 mt-4">
						Send us your questions, and we'll get back to you as soon as possible.
					</p>
				</div>

			</div>

			<div class="space-y-8">
				
				<div class="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
					<div class="h-[350px] w-full relative z-0">
						<Map lat={officeLocation.lat} lng={officeLocation.lng} zoom={15} />
					</div>
				</div>

				<div class="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
					<h3 class="text-2xl font-bold text-brand-navy mb-4">Our Office</h3>
					
					<div class="space-y-4 text-lg text-slate-600">
						<div class="flex items-start">
							<svg class="w-6 h-6 mr-3 text-brand-sky flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
							<span>
								<strong class="block text-brand-navy">Bryan Rental</strong>
								1440 South Liberty Drive<br>
								Bloomington, Indiana 47403
							</span>
						</div>
						
						<div class="flex items-center">
							<svg class="w-6 h-6 mr-3 text-brand-sky flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
							</svg>
							<span>(812) 345-1005</span>
						</div>
						
						<a href="https://maps.google.com/?q=1440+South+Liberty+Drive,+Bloomington,+IN+47403" target="_blank" class="flex items-center text-brand-sky hover:text-brand-navy hover:underline transition-colors mt-2">
							<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
							<span>Get Directions</span>
						</a> 
					</div>
				</div>

			</div>
		</div>
	</div>
</div>