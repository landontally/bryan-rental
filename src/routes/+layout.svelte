<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	
	let y = 0;
	let isMenuOpen = false;

	// Logic: Transparent at top of homepage, otherwise Brand Black
	$: isHomePage = $page.url.pathname === '/';
	$: isTransparent = isHomePage && y < 50;
</script>

<svelte:window bind:scrollY={y} />

<div class="min-h-screen flex flex-col font-sans text-brand-black selection:bg-brand-navy selection:text-white">
	
	<nav 
		class="fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/5
		{isTransparent ? 'bg-transparent py-6' : 'bg-brand-black py-4 shadow-xl'}"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center">
				
				<a href="/" class="text-2xl tracking-tight hover:opacity-80 transition-opacity text-white flex items-center gap-1">
					<span class="font-light tracking-widest uppercase text-sm">Bryan</span>
					<span class="font-bold text-xl tracking-tighter">RENTAL</span>
				</a>

				<div class="hidden md:flex items-center space-x-10 text-xs font-bold tracking-[0.15em] text-white">
					
					<a href="/" class="group relative py-2">
						HOME
						<span class="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
					</a>
					
					<a href="/listings" class="group relative py-2">
						LISTINGS
						<span class="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
					</a>

					<div class="relative group h-full flex items-center">
						<a href="/tenants" class="py-2 hover:opacity-80 transition-opacity">
							TENANTS
						</a>

						<div class="absolute left-1/2 -translate-x-1/2 top-full pt-6 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
							
							<div class="bg-brand-black border border-white/10 rounded-md shadow-2xl p-4 flex flex-col space-y-3">
								<a href="/tenants#welcome-home" class="block text-white/70 hover:text-brand-sky hover:translate-x-1 transition-all">
									Welcome Home
								</a>
								<a href="/tenants#trash-schedule" class="block text-white/70 hover:text-brand-sky hover:translate-x-1 transition-all">
									Trash Schedule
								</a>
								<a href="/tenants#move-out-checklist" class="block text-white/70 hover:text-brand-sky hover:translate-x-1 transition-all">
									Move-Out Checklist
								</a>
								<a href="/tenants" class="block text-white font-bold border-t border-white/10 pt-3 mt-1 hover:text-brand-sky transition-colors">
									View All &rarr;
								</a>
							</div>
						</div>
					</div>

					<a href="/about" class="group relative py-2">
						ABOUT
						<span class="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
					</a>
					
					<a href="/contact" class="px-6 py-2 border border-white/20 rounded hover:bg-white hover:text-brand-black transition-all duration-300">
						CONTACT US
					</a>
				</div>

				<button class="md:hidden p-2 text-white" onclick={() => isMenuOpen = !isMenuOpen}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
					</svg>
				</button>
			</div>
		</div>

		{#if isMenuOpen}
			<div class="md:hidden bg-brand-black border-t border-white/10 p-6 flex flex-col space-y-6 shadow-xl text-white">
				<a href="/" class="text-lg font-light tracking-widest" onclick={() => isMenuOpen = false}>HOME</a>
				<a href="/listings" class="text-lg font-light tracking-widest" onclick={() => isMenuOpen = false}>LISTINGS</a>
				<a href="/tenants" class="text-lg font-light tracking-widest" onclick={() => isMenuOpen = false}>TENANTS</a>
				<a href="/about" class="text-lg font-light tracking-widest" onclick={() => isMenuOpen = false}>ABOUT</a>
				<a href="/contact" class="font-bold text-brand-sky" onclick={() => isMenuOpen = false}>CONTACT</a>
			</div>
		{/if}
	</nav>

	<main class="flex-grow">
		<slot />
	</main>

	<footer class="bg-brand-black border-t border-white/10 pt-20 pb-10 text-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
				<div class="col-span-1 md:col-span-2">
					<h3 class="text-xl tracking-tight mb-6">
						<span class="font-light tracking-widest uppercase text-sm">Bryan</span>
						<span class="font-bold text-xl">RENTAL</span>
					</h3>
					<p class="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
						Elevating the residential leasing experience in Bloomington. 
					</p>
				</div>
			</div>
			<div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-wider text-slate-600">
				<p>&copy; 2025 Bryan Rental. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>