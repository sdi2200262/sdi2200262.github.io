import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publishedWriting } from '../data/writing';
import { profile, href, pageIntros } from '../config';
import { feedContent } from '../lib/feed';

export async function GET(context: APIContext) {
  return rss({
    title: `${profile.name} — Writing`,
    description: `Writing ${pageIntros.writing}`,
    site: new URL(href('writing/'), context.site),
    items: (await publishedWriting()).map(post => {
      const articleUrl = new URL(href(`writing/${post.id}/`), context.site);
      if (!post.rendered) throw new Error(`Missing rendered HTML for RSS entry: ${post.id}`);
      const discussion = post.data.comments && profile.commentsRepo
        ? `<p><a href="${articleUrl.href}#comments">Join the discussion on the website</a>.</p>`
        : '';
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: articleUrl.href,
        content: feedContent(post.rendered.html + discussion, articleUrl),
      };
    }),
  });
}
