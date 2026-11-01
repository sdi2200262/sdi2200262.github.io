// One random seed per page load, kept in module scope: client-side navigation (landing <-> docs)
// reuses it, a refresh draws a new one. Call only in effects or after hydration, never during SSR.
let seed = null;
export const pageSeed = () => (seed ??= Math.floor(Math.random() * 4294967295) + 1);
