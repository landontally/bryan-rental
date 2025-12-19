import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	// 1. FETCH MAIN PROPERTY
	const propertyQuery = `*[_type == "property" && slug.current == $slug][0]{
		...,
		"mainImage": mainImage,
		"gallery": gallery
	}`;

	const property = await client.fetch(propertyQuery, { slug });

	if (!property) {
		throw error(404, 'Property not found');
	}

	// 2. DETERMINE STATUS (Available vs Leased)
	// We check if 'availableYear' is populated. 
	// If it has text (e.g. "2025-2026"), it's available. If null, it's leased.
	const isAvailable = !!property.availableYear; 

	// 3. FETCH NEIGHBORS (Context Aware)
	// We use `defined(availableYear)` to filter for Available properties
	// We use `!defined(availableYear)` to filter for Leased properties
	const condition = isAvailable ? 'defined(availableYear)' : '!defined(availableYear)';

	const neighborsQuery = `{
		"directPrev": *[_type == "property" && ${condition} && _createdAt < $createdAt] | order(_createdAt desc)[0] { "slug": slug.current },
		"directNext": *[_type == "property" && ${condition} && _createdAt > $createdAt] | order(_createdAt asc)[0] { "slug": slug.current },
		"first": *[_type == "property" && ${condition}] | order(_createdAt asc)[0] { "slug": slug.current },
		"last": *[_type == "property" && ${condition}] | order(_createdAt desc)[0] { "slug": slug.current }
	}`;

	const neighbors = await client.fetch(neighborsQuery, { 
		createdAt: property._createdAt
	});

	// 4. LOOPING LOGIC
	const isSingleProperty = neighbors.first?.slug === neighbors.last?.slug && neighbors.first?.slug === property.slug.current;

	let prev = null;
	let next = null;

	if (!isSingleProperty) {
		prev = neighbors.directPrev || neighbors.last;
		next = neighbors.directNext || neighbors.first;
	}

	return {
		property,
		prev,
		next
	};
};