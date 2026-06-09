import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
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
    <motion.div
      ref={ref}
      className={`rounded-2xl overflow-hidden flex flex-col justify-between p-6 ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface FeatureCardProps {
  number: string;
  title: string;
  iconUrl: string;
  items: string[];
  index: number;
}

function FeatureCard({ number, title, iconUrl, items, index }: FeatureCardProps) {
  return (
    <Card index={index} className="bg-[#212121] h-full">
      <div>
        <img src={iconUrl} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-6 object-cover" />
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-primary font-medium text-lg leading-tight">{title}</h3>
          <span className="text-gray-500 text-sm font-mono ml-4 shrink-0">{number}</span>
        </div>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <a href="#" className="inline-flex items-center gap-1 text-primary text-sm hover:opacity-70 transition-opacity">
          Learn more
          <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
        </a>
      </div>
    </Card>
  );
}

export default function Features() {
  return (
    <section className="min-h-screen bg-black py-20 md:py-32 px-4 relative">
      {/* Noise background */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Studio-grade workflows for visionary creators.', className: 'text-primary' },
            ]}
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal mb-2"
          />
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Built for pure vision. Powered by art.', className: 'text-gray-500' },
            ]}
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal"
            delay={0.3}
          />
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          {/* Card 1 — Video */}
          <Card index={0} className="relative min-h-[320px] lg:h-full">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="relative z-10 mt-auto">
              <p className="font-medium" style={{ color: '#E1E0CC' }}>Your creative canvas.</p>
            </div>
          </Card>

          {/* Card 2 — Project Storyboard */}
          <FeatureCard
            index={1}
            number="01"
            title="Project Storyboard."
            iconUrl="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
            items={[
              'Drag-and-drop scene sequencing',
              'Real-time collaboration tools',
              'Version history and rollback',
              'Export to industry formats',
            ]}
          />

          {/* Card 3 — Smart Critiques */}
          <FeatureCard
            index={2}
            number="02"
            title="Smart Critiques."
            iconUrl="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
            items={[
              'AI-powered composition analysis',
              'Contextual creative notes',
              'Multi-tool integrations',
            ]}
          />

          {/* Card 4 — Immersion Capsule */}
          <FeatureCard
            index={3}
            number="03"
            title="Immersion Capsule."
            iconUrl="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
            items={[
              'One-tap notification silencing',
              'Curated ambient soundscapes',
              'Smart schedule syncing',
            ]}
          />
        </div>
      </div>
    </section>
  );
}
