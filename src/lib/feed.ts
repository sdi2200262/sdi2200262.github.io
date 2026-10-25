import sanitizeHtml from 'sanitize-html';

// Use Astro's rendered article HTML so the feed keeps the same Markdown features.
// Feed readers need absolute URLs and do not run the website's scripts or widgets.
export function feedContent(html: string, articleUrl: URL) {
  const absolute = (value: string) => {
    try { return new URL(value, articleUrl).href; } catch { return value; }
  };
  return sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['id'],
      img: ['src', 'alt', 'title', 'width', 'height'],
    },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: attribs.href ? { ...attribs, href: absolute(attribs.href) } : attribs,
      }),
      img: (tagName, attribs) => ({
        tagName,
        attribs: attribs.src ? { ...attribs, src: absolute(attribs.src) } : attribs,
      }),
    },
  });
}
