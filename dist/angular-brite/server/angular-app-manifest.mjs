
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  assets: {
    'index.csr.html': {size: 787, hash: '98bfdfceaedb21f41774d1eb0af0d938751aa2759519d0c781d12b7bb2f2993e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1073, hash: 'fd51c10221dccd8e43fad3b9bc9a4c6664c21282f2ca411135b8ee6b29a02a80', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-R3GAUHQX.css': {size: 106, hash: '6exx2gUpV9s', text: () => import('./assets-chunks/styles-R3GAUHQX_css.mjs').then(m => m.default)}
  },
};
