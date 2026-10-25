import type { APIContext } from 'astro';
import { profile, href, homeSections, pageIntros, emptyWriting, cvPending } from '../config';
import { projects } from '../data/projects';
import { research } from '../data/research';
import { publishedWriting } from '../data/writing';

export async function GET({ site }: APIContext) {
  const url = (path: string) => new URL(href(path), site).href;
  const posts = await publishedWriting();
  const text = `# ${profile.name}

> ${profile.description}

## Pages

- [Home](${url('')}): Introduction, selected projects, research, writing, and contact details.
${homeSections.map(section => `- [${section.label}](${url(section.path)}): ${pageIntros[section.id]}`).join('\n')}
- [CV](${url('cv/')}): ${profile.cvFile ? `Download the [CV PDF](${url(profile.cvFile)}).` : cvPending}
- [RSS](${url('rss.xml')}): Full-text feed of published writing.

## Projects

${projects.map(project => `- [${project.name}](${project.url}): ${project.description}${'website' in project ? ` [Website](${project.website}).` : ''}`).join('\n')}

## Research

- [${research.title}](${research.url}): ${research.description} Read the thesis on the [APM website](${research.website}).

## Writing

${posts.length ? posts.map(post => `- [${post.data.title}](${url(`writing/${post.id}/`)}): ${post.data.description}`).join('\n') : emptyWriting}

## Contact

- Email: ${profile.email}
- Discord: ${profile.discord}
- GitHub: ${profile.github}
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
