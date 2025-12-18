import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'q47zx42v', 
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false
});

export const load = async () => {
  const query = `*[_type == "property"] | order(orderRank asc) {
    _id,
    title,
    "slug": slug.current,
    bedrooms,
    bathrooms,
    price,
    sqft,
    availableYear,
    
    // --- ADD THIS LINE ---
    dateAvailable,
    // ---------------------

    "imageUrl": mainImage.asset->url,
    "hoverImageUrl": hoverImage.asset->url
  }`;

  const listings = await client.fetch(query);

  return {
    listings
  };
};