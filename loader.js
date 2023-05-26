// Docs: https://developers.cloudflare.com/images/url-format
export default function cloudflareLoader({ src, width, quality }) {
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto'];

  return `https://example.com/cdn-cgi/image/${params.join(',')}/${src}`;
}
