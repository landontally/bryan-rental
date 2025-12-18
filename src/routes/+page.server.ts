// src/routes/+page.server.ts
import { client } from '$lib/sanity'; // <--- This was missing!
import type { PageServerLoad } from './$types'; // <--- This was missing!

export const load: PageServerLoad = async () => {
    // Fetch properties that are 'featured'
    const query = `*[_type == "property" && featured == true] | order(_createdAt desc)[0...6] {
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