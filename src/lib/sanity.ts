import { createClient } from '@sanity/client';
// Fix: Use the named export 'createImageUrlBuilder' instead of the default
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
	projectId: 'q47zx42v',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2025-02-17',
});

// Fix: Update the function call here
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
	return builder.image(source);
}