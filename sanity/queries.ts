import { groq } from "next-sanity";

export const POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    titleSk,
    titleEn,
    slug,
    publishedAt,
    category,
    excerptSk,
    excerptEn,
    mainImage { asset, alt, hotspot, crop }
  }
`;

export const POST_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    titleSk,
    titleEn,
    slug,
    publishedAt,
    category,
    excerptSk,
    excerptEn,
    mainImage { asset, alt, hotspot, crop },
    contentSk,
    contentEn
  }
`;

export const POST_SLUGS_QUERY = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`;
