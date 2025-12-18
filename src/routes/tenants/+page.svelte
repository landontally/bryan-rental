<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { onMount } from 'svelte'; 

	let { data } = $props();

	// 1. STATE
	let activeSection = $state('');
	let isMobileMenuOpen = $state(false);

	// 2. SCROLL WATCHER
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{ rootMargin: '-20% 0px -50% 0px' }
		);

		const sections = document.querySelectorAll('section[id]');
		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	});

	const scrollToSection = (e: MouseEvent, slug: string) => {
		e.preventDefault();
		const element = document.getElementById(slug);
		if (element) {
			const offset = 100; 
			const bodyRect = document.body.getBoundingClientRect().top;
			const elementRect = element.getBoundingClientRect().top;
			const elementPosition = elementRect - bodyRect;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
			
			activeSection = slug;
			isMobileMenuOpen = false;
		}
	};
</script>

<div class="min-h-screen bg-white pb-20 pt-32">
	
	<div class="max-w-4xl mx-auto px-4 mb-16 text-center">
		<h1 class="text-3xl md:text-4xl font-bold text-brand-navy mb-4 tracking-tight">Tenant Handbook</h1>
		<p class="text-slate-500 font-light">
			Everything you need to know about living in our community.
		</p>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		
		<div class="flex flex-col md:flex-row gap-8 items-start w-full"> 
			
			<div 
				class="w-full min-w-0"
				style="flex: 0 0 75%;"
			>
				{#each data.resources as section}
					<section id={section.slug.current} class="scroll-mt-40 border-t border-slate-100 pt-16 mb-12 first:border-0 first:pt-0">
						
						<h2 class="text-2xl md:text-3xl font-bold text-brand-navy mb-6 md:mb-8 flex items-center gap-4">
							<span class="w-8 md:w-10 h-1.5 bg-brand-sky rounded-full flex-shrink-0"></span>
							{section.title}
						</h2>

						{#if section.imageTop}
							<img 
								src={section.imageTop.url} 
								alt={section.imageTop.alt || ''} 
								class="w-full h-auto rounded-xl my-8 shadow-sm"
							/>
						{/if}

						<div class="w-full text-base md:text-lg text-slate-600 leading-relaxed space-y-6 [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6 [&_li]:mb-2">
							{#if section.content}
								<PortableText value={section.content} />
							{/if}
						</div>

						{#if section.imageBottom}
							<img 
								src={section.imageBottom.url} 
								alt={section.imageBottom.alt || ''} 
								class="w-full h-auto rounded-xl my-8 shadow-sm"
							/>
						{/if}

						{#if section.attachments && section.attachments.length > 0}
							<div class="w-full h-24"></div>
							<div class="bg-slate-50 rounded-lg p-6 md:p-8 border border-slate-200 w-full">
								<h4 class="text-sm font-bold text-brand-navy uppercase tracking-wider mb-6 flex items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-brand-sky"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
									Downloads & Forms
								</h4>
								
								<div class="flex flex-col sm:flex-row flex-wrap gap-4">
									{#each section.attachments as file}
										<a 
											href={`${file.url}?dl=`} 
											class="flex items-center gap-4 bg-white border border-slate-300 px-5 py-4 rounded-lg hover:border-brand-sky hover:shadow-lg transition-all group w-full sm:w-auto sm:min-w-[250px]"
											download
										>
											<div class="bg-brand-navy/10 p-3 rounded-md text-brand-navy group-hover:bg-brand-sky group-hover:text-white transition-colors shrink-0">
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3-3m0 0l-3 3m3-3v12" /></svg>
											</div>
											<div class="min-w-0">
												<p class="text-sm md:text-base font-bold text-brand-navy truncate">{file.description || "Download File"}</p>
												<p class="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-semibold truncate">{file.filename || "PDF Document"}</p>
											</div>
										</a>
									{/each}
								</div>
							</div>
						{/if}

					</section>
				{/each}
			</div>

			<div 
				class="w-full sticky top-28 z-10 order-first md:order-last"
				style="flex: 0 0 25%;"
			>
				<div class="bg-slate-50 rounded-xl px-6 py-4 md:p-6 border border-slate-100 shadow-sm transition-all">
					
					<button 
						onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
						class="w-full flex items-center justify-between md:cursor-default group"
					>
						<h3 class="text-xs font-black text-brand-navy uppercase tracking-widest md:mb-6 md:border-b md:border-slate-200 md:pb-4 w-full text-left">
							Table of Contents
						</h3>
						
						<div class="md:hidden text-brand-navy transition-transform duration-200 {isMobileMenuOpen ? 'rotate-180' : ''}">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
						</div>
					</button>

					<nav class="{isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col space-y-3 mt-4 md:mt-0 border-t border-slate-200 pt-4 md:border-0 md:pt-0">
						{#each data.resources as section}
							<a 
								href={`#${section.slug.current}`}
								onclick={(e) => scrollToSection(e, section.slug.current)}
								class="
									transition-all text-sm font-bold block py-1
									{activeSection === section.slug.current 
										? 'text-brand-sky translate-x-2 border-l-2 border-brand-sky pl-3' 
										: 'text-brand-navy/80 hover:text-brand-sky hover:translate-x-1'}
								"
							>
								{section.title}
							</a>
						{/each}
					</nav>
				</div>
			</div>

		</div>
	</div>
</div>