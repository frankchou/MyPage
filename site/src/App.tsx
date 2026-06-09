import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import ResumeHero from './sections/ResumeHero';
import ResumeAbout from './sections/ResumeAbout';
import ResumeFeatures from './sections/ResumeFeatures';
import StartupHero from './sections/StartupHero';
import StartupAbout from './sections/StartupAbout';
import StartupFeatures from './sections/StartupFeatures';

type Context = 'resume' | 'startup';

function App() {
  const [context, setContext] = useState<Context>('resume');
  const { i18n } = useTranslation();

  const handleSwitch = () => {
    setContext(prev => prev === 'resume' ? 'startup' : 'resume');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };

  return (
    <main className="bg-black min-h-screen relative">
      {/* Language toggle */}
      <button
        onClick={toggleLang}
        className="fixed top-4 right-4 z-50 bg-black/60 backdrop-blur-sm text-primary/80 hover:text-primary text-xs sm:text-sm px-3 py-1.5 rounded-full border border-primary/20 transition-colors flex items-center gap-1.5"
      >
        <Globe className="w-3.5 h-3.5" />
        {i18n.language === 'en' ? '中文' : 'EN'}
      </button>

      <AnimatePresence mode="wait">
        {context === 'resume' ? (
          <motion.div
            key="resume"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ResumeHero onSwitch={handleSwitch} />
            <ResumeAbout />
            <ResumeFeatures />
          </motion.div>
        ) : (
          <motion.div
            key="startup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <StartupHero onSwitch={handleSwitch} />
            <StartupAbout />
            <StartupFeatures />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
