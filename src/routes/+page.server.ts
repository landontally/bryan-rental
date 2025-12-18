import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // FIX: Changed "available == true" to "featured == true"
    // Also added "availableYear" and "dateAvailable" so we can show status on the homepage too
    const query = `*[_type == "property" && featured == true] | order(_createdAt desc)[0...3] {
        _id,
        title,
        slug,
        price,
        bedrooms,
        bathrooms,
        dateAvailable,
        availableYear, 
        mainImage
    }`;

    const properties = await client.fetch(query);

    return {
        properties
    };
};