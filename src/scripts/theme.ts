import { rng } from '../components/drawn/random';
import { pageSeed } from '../components/drawn/seed';

// APM's floating switch and view-transition fade, without the React dependency.
const dock = document.querySelector<HTMLElement>('#theme-dock')!;
const pill = dock.querySelector<HTMLElement>('.pill')!;
const topButton = dock.querySelector<HTMLButtonElement>('.totop')!;
const buttons = [...dock.querySelectorAll<HTMLButtonElement>('[data-mode]')];
const media = matchMedia('(prefers-color-scheme: dark)');
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let manual = false;
let inCorner = false;
let busy = false;
try { manual = ['light', 'dark'].includes(localStorage.getItem('theme') || ''); } catch {}

// The dock and drawn rules share APM's page-load seed.
const random = rng(pageSeed() ^ 0x85ebca6b);
const markers = [0, 1, 2].map(() => ({
  l: 1.2 + random() * 2.4, t: 4.5 + random() * 2.6,
  r: 1.2 + random() * 2.4, b: 4.5 + random() * 2.6,
  a: (random() - .5) * 3.6,
}));
function markerBox(marker: typeof markers[number], left = 0) {
  return {
    left: `${left + marker.l}px`, top: `${marker.t}px`,
    width: `${38 - marker.l - marker.r}px`, height: `${38 - marker.t - marker.b}px`,
    transform: `rotate(${marker.a}deg)`,
  };
}
Object.assign(topButton.querySelector<HTMLElement>('.ind')!.style, markerBox(markers[2]));
function sync() {
  const theme = document.documentElement.dataset.theme;
  buttons.forEach(button => {
    const selected = button.dataset.mode === theme;
    button.setAttribute('aria-pressed', String(selected));
    button.style.left = selected ? '38px' : '0px';
  });
  Object.assign(dock.querySelector<HTMLElement>('.selection')!.style,
    markerBox(markers[theme === 'dark' ? 1 : 0], 38));
}
function updateScroll() {
  const scrolled = window.scrollY > 400;
  topButton.classList.toggle('on', scrolled);
  topButton.tabIndex = scrolled ? 0 : -1;
  topButton.setAttribute('aria-hidden', String(!scrolled));
  dock.classList.toggle('away', scrolled && !inCorner);
}
async function setTheme(theme: string) {
  if (busy) return;
  const old = document.documentElement.dataset.theme;
  if (old === theme) {
    if (matchMedia('(any-hover: none)').matches) pill.classList.toggle('open');
    return;
  }
  busy = true;
  const chosen = buttons.find(b => b.dataset.mode === theme)!;
  const previous = buttons.find(b => b.dataset.mode === old)!;
  chosen.style.left = '38px';
  previous.style.left = '0px';
  buttons.forEach(b => b.setAttribute('aria-pressed', String(b === chosen)));
  if (!reduced()) {
    chosen.animate([{ transform: 'translateX(-38px)' }, { transform: 'none' }],
      { duration: 500, easing: 'cubic-bezier(.34, 1.45, .55, 1)' });
    previous.animate([
      { transform: 'translateX(38px)', opacity: 1 },
      { transform: 'translateX(38px)', opacity: 0, offset: .4 },
      { transform: 'none', opacity: 0, offset: .4 }, { opacity: .45 },
    ], { duration: 500 });
    await new Promise(resolve => setTimeout(resolve, 60));
  }
  const apply = () => {
    document.documentElement.dataset.theme = theme;
    sync();
    window.dispatchEvent(new Event('themechange'));
  };
  try {
    if (!reduced() && document.startViewTransition) {
      document.documentElement.dataset.themeTransition = 'true';
      await document.startViewTransition(apply).finished;
    } else apply();
  } finally {
    delete document.documentElement.dataset.themeTransition;
    pill.classList.remove('open');
    busy = false;
  }
}
buttons.forEach(button => button.addEventListener('click', () => {
  manual = true;
  try { localStorage.setItem('theme', button.dataset.mode!); } catch {}
  void setTheme(button.dataset.mode!);
}));
topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' }));
window.addEventListener('scroll', updateScroll, { passive: true });
window.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse') return;
  inCorner = event.clientX > innerWidth - 160 && event.clientY > innerHeight - 180;
  updateScroll();
}, { passive: true });
media.addEventListener('change', ({ matches }) => {
  if (!manual) void setTheme(matches ? 'dark' : 'light');
});
window.addEventListener('storage', event => {
  if (event.key !== 'theme') return;
  manual = event.newValue === 'light' || event.newValue === 'dark';
  void setTheme(manual ? event.newValue! : media.matches ? 'dark' : 'light');
});
document.addEventListener('astro:before-swap', event => {
  // Carry the current palette into the incoming document before its first paint.
  event.newDocument.documentElement.dataset.theme = document.documentElement.dataset.theme;
  event.newDocument.documentElement.dataset.navigated = 'true';
});
document.addEventListener('astro:page-load', () => { sync(); updateScroll(); });
sync(); updateScroll(); dock.hidden = false;
