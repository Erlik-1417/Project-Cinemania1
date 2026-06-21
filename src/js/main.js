import { initHeader } from './header.js'; // Başındaki /js/ kaldırıldı çünkü artık aynı klasördeler
import { initHero } from './hero.js';
import { initUpcoming } from './upcoming.js';
import { initWeeklyTrends } from './weekly-trends.js';
import './footer.js';

// UI.JS'DEN GELEN YENİ VE ORTAK İMPORTLAR:
import { 
  hideGlobalLoader, 
  initGlobalUi, 
  showGlobalLoader, 
  initTheme, 
  initNavigation 
} from './ui.js'; // Başındaki /js/ kaldırıldı

// Ana sayfadaki ortak bölümleri tek noktadan başlatıyoruz.
async function bootstrapPage() {
  initGlobalUi();
  initTheme();      
  initNavigation(); 
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

// HTML henüz hazır değilse init zincirini DOM yüklendikten sonra çalıştırıyoruz.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapPage, { once: true });
} else {
  bootstrapPage();
}