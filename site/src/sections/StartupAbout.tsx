import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle';
import AnimatedLetter from '../components/AnimatedLetter';

export default function StartupAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  });
  const { t } = useTranslation();
  const bodyText = t('startup.aboutBody');
  const chars = bodyText.split('');

  return (
    <section ref={sectionRef} className="bg-black py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#101010] rounded-2xl md:rounded-3xl p-8 md:p-16 text-center">
          <p className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-8">{t('startup.aboutLabel')}</p>

          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-12" style={{ color: '#E1E0CC' }}>
            <WordsPullUpMultiStyle
              segments={[
                { text: t('startup.aboutHeading.seg1'), className: 'font-normal' },
                { text: t('startup.aboutHeading.seg2'), className: 'italic font-serif' },
                { text: t('startup.aboutHeading.seg3'), className: 'font-normal' },
              ]}
              containerClassName="text-center"
            />
          </div>

          <p className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto" style={{ color: '#DEDBC8', lineHeight: 1.7 }}>
            {chars.map((char, i) => (
              <AnimatedLetter key={i} char={char} scrollYProgress={scrollYProgress} index={i} total={chars.length} />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
