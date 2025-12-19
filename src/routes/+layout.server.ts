import { client } from '$lib/sanity';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    // Fetch the active notice for the entire site
    const query = `*[_type == "notice" && active == true][0] {
        _id,
        type,
        message,
        link
    }`;

    const notice = await client.fetch(query);

    return {
        notice
    };
};