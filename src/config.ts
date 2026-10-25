export const profile = {
  name: 'Konstantinos Chaidemenos',
  github: 'https://github.com/sdi2200262',
  email: 'haidemenoss@gmail.com',
  discord: 'cobuter_man',
  description: 'A place for my projects, research, and writing.',
  // Add a PDF under public/ and set this to its path, e.g. 'cv.pdf'.
  cvFile: '',
  // Install https://github.com/apps/utterances on your public site repo first.
  commentsRepo: '', // e.g. 'sdi2200262/sdi2200262.github.io'
};
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const formatDate = (date: Date) => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(date);

// Shared by the homepage and header so their order stays in sync.
export const homeSections = [
  { id: 'projects', label: 'Projects', path: 'projects/', more: 'All projects' },
  { id: 'research', label: 'Research', path: 'research/', more: 'All research' },
  { id: 'writing', label: 'Writing', path: 'writing/', more: 'All writing' },
] as const;

// Page copy is shared with RSS and llms.txt.
export const pageIntros = {
  projects: 'I’m proud to share.',
  research: 'I’ve authored or contributed to.',
  writing: 'on software, AI, and whatever else holds my attention.',
};
export const emptyWriting = 'No posts yet.';
export const cvPending = 'My CV will be available here soon.';
