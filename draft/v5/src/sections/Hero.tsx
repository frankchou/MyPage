import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const words = 'Transport & Logistics since 1928'.split(' ');

  return (
    <section className="h-screen flex items-end bg-white px-[1.5rem] pb-section-lg">
      <div ref={ref} className="max-w-10col mx-auto w-full">
        <h1 className="font-clash font-normal text-h1-mobile md:text-h1 text-ink">
          {words.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
              <motion.span
                className="inline-block"
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.165, 0.84, 0.44, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-gap-lg text-body-lg text-text-muted max-w-6col"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
        >
          Emons Spedition is one of the leading transport and logistics companies in Europe.
          Road, rail, air & sea — we deliver reliable solutions worldwide.
        </motion.p>

        <motion.a
          href="#services"
          className="group inline-flex items-center gap-2 bg-coral text-peach-light rounded-pill px-6 py-3 font-normal text-body-reg mt-gap-default transition-hover hover:bg-brand-red"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
        >
          Explore our services
          <span className="arrow-nudge inline-block">→</span>
        </motion.a>
      </div>
    </section>
  );
}
