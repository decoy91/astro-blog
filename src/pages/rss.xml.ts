import rss from '@astrojs/rss';
import type { APIRoute } from "astro";
import { getCollection } from 'astro:content';



export const GET: APIRoute = async ({ params, request, site}) =>{

    const blogPosts = await getCollection('blog');

return rss({
    //stylesheet: '/styles/rss.xsl', este es un estilo para que se vea mejor el rss
    // `<title>` field in output xml
    title: 'Aleks Blog',
    // `<description>` field in output xml
    description: 'Mis blogs de Alex',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: site ?? '',
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogPosts.map( ({ data, slug }) =>({
        title: data.title,
        pubDate: data.date,
        description: data.description,
        link: `/posts/${slug}`,
        // (optional) author
    })),
    // (optional) inject custom xml
    customData: `<language>es-mx</language>`
  });
}