<script lang="ts">
    // This is the direct link to your specific JotForm
    const formUrl = "https://form.jotform.com/260015376420043"; 
</script>

<div class="min-h-screen bg-slate-50 pt-32 pb-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-brand-navy mb-4 tracking-tight">
                Rental Application
            </h1>
            <p class="text-slate-500 text-lg max-w-2xl mx-auto">
                Ready to apply? Please fill out the form below completely. 
            </p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <iframe
                id="JotFormIFrame"
                title="Rental Application"
                src={formUrl}
                class="w-full min-h-[1200px] border-none"
                allow="geolocation; microphone; camera"
                scrolling="yes"
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