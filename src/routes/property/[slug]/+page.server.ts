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
	// If the current property is Leased (false), we only want to cycle through other Leased properties.
	// If it's Available (true), we only cycle through Available ones.
	const isAvailable = property.available !== false; // Treat null/undefined as true just in case

	// 3. FETCH NEIGHBORS (Context Aware)
	// We inject the $isAvailable variable into the query
	const neighborsQuery = `{
		"directPrev": *[_type == "property" && available == $isAvailable && _createdAt < $createdAt] | order(_createdAt desc)[0] { "slug": slug.current },
		"directNext": *[_type == "property" && available == $isAvailable && _createdAt > $createdAt] | order(_createdAt asc)[0] { "slug": slug.current },
		"first": *[_type == "property" && available == $isAvailable] | order(_createdAt asc)[0] { "slug": slug.current },
		"last": *[_type == "property" && available == $isAvailable] | order(_createdAt desc)[0] { "slug": slug.current }
	}`;

	const neighbors = await client.fetch(neighborsQuery, { 
		createdAt: property._createdAt,
		isAvailable: isAvailable
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