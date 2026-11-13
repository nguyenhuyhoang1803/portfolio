// Allow a local preview without changing the browser's accessibility preference.
export const previewMotion = import.meta.env.DEV &&
  new URLSearchParams(window.location.search).get('motion') === 'preview'
