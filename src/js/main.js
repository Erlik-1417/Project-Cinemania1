import { initHeader } from './js/header.js';
import { initHero } from './hero.js';
import { initUpcoming } from './upcoming.js';
import { hideGlobalLoader, initGlobalUi, showGlobalLoader } from './ui.js';
import { initWeeklyTrends } from './js/weekly-trends.js';
import './js/footer.js';

async function bootstrapPage() {
  initGlobalUi();
  initHeader();
  showGlobalLoader();

  try {
    await Promise.allSettled([
      initHero(),
      initUpcoming(),
      initWeeklyTrends(),
    ]);
  } finally {
    hideGlobalLoader();
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapPage, { once: true });
} else {
  bootstrapPage();
}
