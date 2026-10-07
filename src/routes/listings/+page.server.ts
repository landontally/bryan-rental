import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'q47zx42v', 
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false
});

export const load = async () => {
  const query = `*[_type == "property" && isActive != false] {
    _id,
    title,
    "slug": slug.current,
    bedrooms,
    bathrooms,
    price,
    sqft,
    availableYear,
    dateAvailable,
    _updatedAt, // Added to fetch the last modified time
    "imageUrl": mainImage.asset->url,
    "hoverImageUrl": hoverImage.asset->url
  }`;
  const listings = await client.fetch(query);
  return {
    listings
  };
};