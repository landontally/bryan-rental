<script lang="ts">
    import { onMount } from 'svelte';
    
    const formUrl = "https://form.jotform.com/260015376420043"; 
    let iframeElement: HTMLIFrameElement;

    onMount(() => {
        const handleIFrameMessage = (e: MessageEvent) => {
            if (typeof e.data === 'string') {
                const args = e.data.split(':');
                if (iframeElement && args[0] === 'JotFormIFrame-' + '260015376420043') {
                    // Only handle the height resize
                    if (args[1] === 'setHeight') {
                        iframeElement.style.height = args[2] + 'px';
                    }
                    // REMOVED the scrollIntoView block here
                }
            }
        };

        window.addEventListener('message', handleIFrameMessage);

        return () => {
            window.removeEventListener('message', handleIFrameMessage);
        };
    });
</script>

<div class="min-h-screen bg-slate-50 pt-32 pb-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-6 mt-3">
            <h1 class="text-4xl font-bold text-brand-navy mb-4 tracking-tight">
                Rental Application
            </h1>
            <p class="text-slate-500 text-lg max-w-2xl mx-auto">
                Ready to apply? Please fill out the form below completely. 
            </p>
        </div>

        <!-- REMOVED overflow-hidden from this container -->
        <div class="bg-white rounded-2xl shadow-xl border border-slate-100 relative">
            
            <div class="absolute inset-0 flex items-center justify-center bg-white z-0 h-40 rounded-2xl">
                <p class="text-slate-400 text-sm animate-pulse">Loading Application...</p>
            </div>

        <iframe
            bind:this={iframeElement}
            id="JotFormIFrame-260015376420043"
            title="Rental Application"
            src={formUrl}
            class="w-full relative z-10 border-none rounded-2xl"
            style="min-height: 800px;" 
            allow="geolocation; microphone; camera"
            scrolling="auto"
        >
        </iframe>
        </div>
        
        <div class="mt-8 text-center">
            <p class="text-sm text-slate-400">
                Having trouble with the form? You can <a href={formUrl} target="_blank" class="text-brand-sky hover:underline font-bold">open it in a new window here</a>.
            </p>
        </div>

    </div>
</div>