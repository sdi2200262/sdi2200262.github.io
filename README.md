# Konstantinos Chaidemenos

Personal website for my projects, research, and writing, hosted at
[cobuterman.is-a.dev](https://cobuterman.is-a.dev/).

Built with Astro. Posts are Markdown files; the build produces static HTML for
GitHub Pages. The book styling, drawn rules, and floating controls follow the
[APM website](https://github.com/sdi2200262/apm-website). Fonts are served locally.

## Development

Requires Node.js 24 (see `.nvmrc`).

```bash
npm ci             # install from the lockfile
npm run dev        # local development server
npm run check      # type and content checks
npm run build      # production build in dist/
npm run preview    # preview the production build
```

Use `npm run dev -- --host 0.0.0.0` to test from another device on the same network.

## Structure

```text
src/
├── components/       # header, footer, lists, comments, and drawn elements
├── content/writing/  # Markdown posts, essays, and notes
├── data/             # project and research entries; published-writing filter
├── layouts/          # shared page layout and metadata
├── lib/              # full-text RSS HTML preparation
├── pages/            # pages, rss.xml, and llms.txt
├── scripts/          # theme switch and scroll controls
├── styles/           # palette, fonts, typography, and layout
└── config.ts         # profile, page copy, navigation order, CV, and comments
public/               # favicon and images
.github/workflows/    # GitHub Pages build and deployment
```

## Content

Edit `src/config.ts` for profile details, page introductions, and navigation order.
Projects and research links live in `src/data/`. To add a CV, place the PDF at
`public/cv.pdf` and set `cvFile: 'cv.pdf'` in `src/config.ts`.

### Writing

Add a Markdown file under `src/content/writing/`:

```markdown
---
title: "The title of the piece"
description: "A short description for the index and feed."
date: 2026-10-25
kind: Essay
draft: false
comments: true
---

The article goes here.
```

`kind` accepts `Essay`, `Note`, or `Post`. The filename becomes the URL:
`my-piece.md` appears at `/writing/my-piece/`. Drafts and future-dated pieces
are excluded from pages, RSS, and `llms.txt`. Dates use UTC; a future-dated piece
becomes public on the first build after its publication date.

The included `first-note.md` is an unpublished example.

### RSS and LLM access

`/rss.xml` contains the full rendered text of published writing, with titles,
dates, summaries, and article links. Scripts and widgets are removed; links and
image URLs become absolute. Use images from `public/` or absolute image URLs.

`/llms.txt` lists the pages, projects, research, published writing, and contact
details. Both files are generated from the same data and copy as the pages.

### Comments

The site supports [Utterances](https://utteranc.es/), which stores article
comments in GitHub issues. Comments are disabled until the app is installed.

To enable them, install the [Utterances app](https://github.com/apps/utterances)
on this public repository, keep Issues enabled, and set this in `src/config.ts`:

```ts
commentsRepo: 'sdi2200262/sdi2200262.github.io',
```

Articles with `comments: true` show a “Load comments” button. Readers sign in
with GitHub to comment. Issue matching uses `writing/<post-id>`, so a domain
change preserves discussions. Renaming a post changes its ID; update its issue
title to include the new term to retain that discussion.

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`: install from the lockfile,
check the source, build, and deploy `dist/` to GitHub Pages. The workflow can also
be run manually. Pages uses **GitHub Actions** as its publishing source.

The site is hosted at [cobuterman.is-a.dev](https://cobuterman.is-a.dev/).
The original GitHub Pages address redirects to this domain. The profile README
remains in the separate `sdi2200262/sdi2200262` repository.

### Custom domain

The Pages custom domain is `cobuterman.is-a.dev`. Its registry entry points to
`sdi2200262.github.io` through a CNAME record. GitHub Pages manages the HTTPS
certificate.

The repository Actions variable `SITE_URL` is `https://cobuterman.is-a.dev`;
`BASE_PATH` remains unset. The same URL is the default in `astro.config.mjs`.
Changing `SITE_URL` and deploying updates canonical links, RSS, and `llms.txt`.
