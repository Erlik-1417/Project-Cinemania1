import { initHeader } from './header.js';
import { initHome } from './home.js';
import './footer.js';

import {
  hideGlobalLoader,
  initGlobalUi,
  showGlobalLoader,
} from './ui.js';

async function bootstrapPage() {
  initGlobalUi();
  initHeader();
  showGlobalLoader();

  try {
    await initHome();
  } finally {
    hideGlobalLoader();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapPage, { once: true });
} else {
  bootstrapPage();
}