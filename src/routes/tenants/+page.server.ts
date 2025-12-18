import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Fetch all resources, sorted by the 'order' number we set in Sanity
	const query = `*[_type == "resource"] | order(order asc) {
		_id,
		title,
		slug,
		content,
		// ADD THIS SECTION FOR THE IMAGES:
		imageTop {
			"url": asset->url,
			alt
		},
		imageBottom {
			"url": asset->url,
			alt
		},
		attachments[] {
			"url": asset->url,
			description,
			"filename": asset->originalFilename
		}
	}`;

	const resources = await client.fetch(query);

	return {
		resources
	};
};