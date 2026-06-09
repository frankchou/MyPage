import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { number: '1928', label: 'Founded' },
  { number: '4,100+', label: 'Employees' },
  { number: '70+', label: 'Locations' },
  { number: '€1.2B', label: 'Revenue' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-section-lg px-[1.5rem]">
      <div ref={ref} className="max-w-10col mx-auto">
        <div className="mb-gap-xxl">
          <p className="text-body-sm text-text-muted mb-gap-xs uppercase tracking-wide">About Emons</p>
          <h2 className="text-h2-mobile md:text-h2 font-normal text-ink max-w-8col">
            A family-owned company with almost 100 years of experience in transport and logistics.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-gap-md mb-gap-xxl">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-gray-surface rounded-card p-gap-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.165, 0.84, 0.44, 1],
              }}
            >
              <p className="text-h3-mobile md:text-h3 font-medium text-ink">{stat.number}</p>
              <p className="text-body-reg text-text-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-8col"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
        >
          <p className="text-body-lg text-text-muted mb-gap-md">
            Emons Spedition GmbH is a family-owned German logistics company headquartered in Bonn.
            With a network spanning over 70 locations across Europe, we provide comprehensive transport
            and logistics solutions — from road haulage and warehouse management to air, sea, and rail freight.
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 bg-coral text-peach-light rounded-pill px-6 py-3 font-normal text-body-reg transition-hover hover:bg-brand-red"
          >
            Our story
            <span className="arrow-nudge inline-block">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
