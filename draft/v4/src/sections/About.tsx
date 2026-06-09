import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle';
import AnimatedLetter from '../components/AnimatedLetter';

const bodyText = "Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = bodyText.split('');

  return (
    <section ref={sectionRef} className="bg-black py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#101010] rounded-2xl md:rounded-3xl p-8 md:p-16 text-center">
          {/* Label */}
          <p className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-8">Visual arts</p>

          {/* Main heading */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-12" style={{ color: '#E1E0CC' }}>
            <WordsPullUpMultiStyle
              segments={[
                { text: 'I am Marcus Chen,', className: 'font-normal' },
                { text: 'a self-taught director.', className: 'italic font-serif' },
                { text: 'I have skills in color grading, visual effects, and narrative design.', className: 'font-normal' },
              ]}
              containerClassName="text-center"
            />
          </div>

          {/* Scroll-animated body text */}
          <p className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto" style={{ color: '#DEDBC8', lineHeight: 1.7 }}>
            {chars.map((char, i) => (
              <AnimatedLetter
                key={i}
                char={char}
                scrollYProgress={scrollYProgress}
                index={i}
                total={chars.length}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
