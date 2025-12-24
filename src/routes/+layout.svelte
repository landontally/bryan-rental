<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import ContactPanel from '$lib/components/ContactPanel.svelte';
	import { uiState } from '$lib/state.svelte';
	
	let { data, children } = $props(); 
	
	let y = $state(0);
	let isMenuOpen = $state(false);

    const getAlertColor = (type: string) => {
        switch(type) {
            case 'critical': return 'bg-red-600 text-white';
            case 'warning': return 'bg-amber-400 text-brand-navy';
            default: return 'bg-brand-sky text-brand-navy';
        }
    };

	let isHomePage = $derived($page.url.pathname === '/');
	let isListingsPage = $derived($page.url.pathname.startsWith('/listings'));
	let hasNotice = $derived(!!data.notice && !isListingsPage);
	let isTransparent = $derived(isHomePage && y < 50); 
</script>

<svelte:window bind:scrollY={y} />

<ContactPanel isOpen={uiState.isContactOpen} onClose={() => uiState.isContactOpen = false} />

<div class="min-h-screen flex flex-col font-sans text-brand-black selection:bg-brand-navy selection:text-white">
	
	<header class="fixed top-0 w-full z-50 flex flex-col transition-all duration-300">
		
		{#if hasNotice}
			<div class="{getAlertColor(data.notice.type)} px-4 py-2 text-center font-bold text-sm tracking-wide shadow-md relative z-50">
				<div class="max-w-7xl mx-auto flex justify-center items-center gap-4">
					<span>{data.notice.message}</span>
					{#if data.notice.link}
						<a href={data.notice.link} class="underline opacity-80 hover:opacity-100 whitespace-nowrap">Learn More &rarr;</a>
					{/if}
				</div>
			</div>
		{/if}

		<nav 
			class="w-full transition-all duration-300 border-b border-white/5
			{isTransparent ? 'bg-transparent py-6' : 'bg-brand-black py-4 shadow-xl'}"
		>
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center">
					
					<a href="/" class="text-2xl tracking-tight hover:opacity-80 transition-opacity text-white flex items-center gap-1">
						<span class="font-light tracking-widest uppercase text-sm">Bryan</span>
						<span class="font-bold text-xl tracking-tighter">RENTAL</span>
					</a>

					<div class="hidden md:flex items-center space-x-10 text-xs font-bold tracking-[0.15em] text-white">
						<a href="/" class="group relative py-2">HOME<span class="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span></a>
						<a href="/listings" class="group relative py-2">LISTINGS<span class="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span></a>

						<div class="relative group h-full flex items-center">
							<a href="/tenants" class="py-2 hover:opacity-80 transition-opacity">TENANTS</a>
							<div class="absolute left-1/2 -translate-x-1/2 top-full pt-6 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
								<div class="bg-brand-black border border-white/10 rounded-md shadow-2xl p-4 flex flex-col space-y-3 text-sm">
									<a href="/tenants#move-in-information" class="block text-white/70 hover:text-brand-sky hover:translate-x-1 transition-all">Move-In Information</a>
									<a href="/tenants#utility-setup-contacts" class="block text-white/70 hover:text-brand-sky hover:translate-x-1 transition-all">Utility Setup & Contacts</a>
									<a href="/tenants#rent-payment-options" class="block text-white/70 hover:text-brand-sky hover:translate-x-1 transition-all">Rent & Payment Options</a>
									<a href="/tenants#trash-recycling" class="block text-white/70 hover:text-brand-sky hover:translate-x-1 transition-all">Trash & Recycling</a>
									<a href="/tenants#maintenance-requests" class="block text-white/70 hover:text-brand-sky hover:translate-x-1 transition-all">Maintenance Requests</a>
									<a href="/tenants#move-out-checklist" class="block text-white/70 hover:text-brand-sky hover:translate-x-1 transition-all">Move-Out Checklist</a>
									
									<a href="/tenants" class="block text-white font-bold border-t border-white/10 pt-3 mt-1 hover:text-brand-sky transition-colors">View Handbook &rarr;</a>
								</div>
							</div>
						</div>

						<a href="/about" class="group relative py-2">ABOUT<span class="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span></a>
						
						<button 
							onclick={() => uiState.isContactOpen = true}
							class="px-6 py-2 border border-white/20 rounded hover:bg-white hover:text-brand-black transition-all duration-300 cursor-pointer"
						>
							CONTACT US
						</button>
					</div>

					<button class="md:hidden p-2 text-white" onclick={() => isMenuOpen = !isMenuOpen} aria-label="Toggle menu">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" /></svg>
					</button>
				</div>
			</div>

			{#if isMenuOpen}
				<div class="md:hidden bg-brand-black border-t border-white/10 p-6 flex flex-col space-y-6 shadow-xl text-white">
					<a href="/" class="text-lg font-light tracking-widest" onclick={() => isMenuOpen = false}>HOME</a>
					<a href="/listings" class="text-lg font-light tracking-widest" onclick={() => isMenuOpen = false}>LISTINGS</a>
					<a href="/tenants" class="text-lg font-light tracking-widest" onclick={() => isMenuOpen = false}>TENANTS</a>
					<a href="/about" class="text-lg font-light tracking-widest" onclick={() => isMenuOpen = false}>ABOUT</a>
					<button 
						class="text-left font-bold text-brand-sky text-lg tracking-widest"
						onclick={() => { isMenuOpen = false; uiState.isContactOpen = true; }}
					>
						CONTACT
					</button>
				</div>
			{/if}
		</nav>
	</header>

	<main class="grow">
		{@render children()}
	</main>

	<footer class="bg-brand-navy border-t border-white/5 pt-20 pb-12 text-white relative overflow-hidden">
        
        <div class="absolute top-0 right-0 w-96 h-96 bg-brand-sky/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
				
				<div class="lg:col-span-4">
					<a href="/" class="block mb-6 hover:opacity-80 transition-opacity">
						<h3 class="text-2xl tracking-tight">
							<span class="font-light tracking-widest uppercase text-sm block mb-1 opacity-70">Bryan</span>
							<span class="font-bold text-3xl tracking-tighter">RENTAL</span>
						</h3>
					</a>
					<p class="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
						Elevating the residential leasing experience in Bloomington, Indiana.
					</p>
				</div>

                <div class="lg:col-span-3 lg:pl-10">
                    <h4 class="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Explore</h4>
                    <ul class="space-y-4 text-sm font-medium tracking-wide">
                        <li><a href="/" class="text-slate-300 hover:text-brand-sky transition-colors flex items-center gap-2 group"><span class="w-0 group-hover:w-2 h-px bg-brand-sky transition-all duration-300"></span>Home</a></li>
                        <li><a href="/listings" class="text-slate-300 hover:text-brand-sky transition-colors flex items-center gap-2 group"><span class="w-0 group-hover:w-2 h-px bg-brand-sky transition-all duration-300"></span>All Listings</a></li>
                        <li><a href="/tenants" class="text-slate-300 hover:text-brand-sky transition-colors flex items-center gap-2 group"><span class="w-0 group-hover:w-2 h-px bg-brand-sky transition-all duration-300"></span>Tenant Handbook</a></li>
                        <li><a href="/about" class="text-slate-300 hover:text-brand-sky transition-colors flex items-center gap-2 group"><span class="w-0 group-hover:w-2 h-px bg-brand-sky transition-all duration-300"></span>About Us</a></li>
                    </ul>
                </div>

                <div class="lg:col-span-5">
                    <h4 class="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Leasing & Inquiries</h4>
                    
                    <div class="bg-white/5 rounded-xl p-6 border border-white/5">
                        <div class="flex items-start gap-4 mb-6">
                            <div class="w-10 h-10 bg-brand-sky/20 rounded-full flex items-center justify-center text-brand-sky shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                            </div>
                            <div>
                                <h5 class="text-white font-bold text-lg">Lisa Kamen</h5>
                                <p class="text-slate-400 text-xs uppercase tracking-wider font-semibold">Leasing Manager</p>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <a href="tel:812-345-1005" class="flex items-center gap-4 text-slate-300 hover:text-white group transition-colors">
                                <span class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-sky group-hover:text-brand-navy transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                                </span>
                                (812) 345-1005
                            </a>
                            
                            <a href="mailto:ljkamen@gmail.com" class="flex items-center gap-4 text-slate-300 hover:text-white group transition-colors">
                                <span class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-sky group-hover:text-brand-navy transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                                </span>
                                
                            </a>

                             <div class="flex items-start gap-4 text-slate-300 group">
                                <span class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mt-0.5 shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                                </span>
                                <span class="text-sm leading-relaxed">
                                    1440 South Liberty Drive<br>Bloomington, Indiana 47403
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

			</div>
			
			<div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-wider text-slate-500">
				<p>&copy; 2025 Bryan Rental. All rights reserved.</p>
				<div class="flex gap-6">
                    <a href="/tenants" class="hover:text-white transition-colors">Tenants</a>
                    <a href="/contact" class="hover:text-white transition-colors">Contact</a>
                </div>
			</div>
		</div>
	</footer>
</div>