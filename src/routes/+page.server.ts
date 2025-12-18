export const load: PageServerLoad = async () => {
    // Keep 'mainImage' here (Do NOT use "imageUrl": mainImage.asset->url)
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