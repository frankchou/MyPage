import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle';

interface CardProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

function Card({ children, index, className = '' }: CardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div ref={ref} className={`rounded-2xl overflow-hidden flex flex-col justify-between p-6 ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}

const icon1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85';
const icon2 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85';
const icon3 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85';
const icons = [icon1, icon2, icon3, icon3, icon3, icon3, icon3];

export default function StartupFeatures() {
  const { t } = useTranslation();
  const cards = t('startup.cards', { returnObjects: true }) as { number: string; title: string; items: string[]; ctaText?: string }[];
  const learnMore = t('startup.learnMore');

  return (
    <section className="min-h-screen bg-black py-20 md:py-32 px-4 relative">
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12 md:mb-16">
          <WordsPullUpMultiStyle
            segments={[{ text: t('startup.featuresH1'), className: 'text-primary' }]}
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal mb-2"
          />
          <WordsPullUpMultiStyle
            segments={[{ text: t('startup.featuresH2'), className: 'text-gray-500' }]}
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal"
            delay={0.3}
          />
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px] mb-1">
          <Card index={0} className="relative min-h-[320px] lg:h-full">
            <video src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="relative z-10 mt-auto">
              <p className="font-medium" style={{ color: '#E1E0CC' }}>{t('startup.videoText')}</p>
            </div>
          </Card>
          {cards.slice(0, 3).map((card, i) => (
            <Card key={card.number} index={i + 1} className="bg-[#212121] h-full">
              <div>
                <img src={icons[i]} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-6 object-cover" />
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-primary font-medium text-lg leading-tight">{card.title}</h3>
                  <span className="text-gray-500 text-sm font-mono ml-4 shrink-0">{card.number}</span>
                </div>
                <ul className="space-y-3">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-400 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <a href="#" className="inline-flex items-center gap-1 text-primary text-sm hover:opacity-70 transition-opacity">
                  {learnMore} <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          {cards.slice(3).map((card, i) => (
            <Card key={card.number} index={i + 4} className="bg-[#212121] h-full">
              <div>
                <img src={icons[i + 3]} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-6 object-cover" />
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-primary font-medium text-lg leading-tight">{card.title}</h3>
                  <span className="text-gray-500 text-sm font-mono ml-4 shrink-0">{card.number}</span>
                </div>
                <ul className="space-y-3">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-400 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <a href="#" className="inline-flex items-center gap-1 text-primary text-sm hover:opacity-70 transition-opacity">
                  {card.ctaText || learnMore} <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
