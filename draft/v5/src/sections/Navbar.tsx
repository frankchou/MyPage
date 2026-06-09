import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = ['Services', 'About', 'Locations', 'Careers', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.05);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-[1.5rem] flex items-center justify-between"
      animate={{
        height: scrolled ? '3.5rem' : '5rem',
        backgroundColor: scrolled ? '#ffffff' : 'transparent',
      }}
      transition={{ duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
      style={{ borderBottom: scrolled ? '1px solid #f3f3f3' : '1px solid transparent' }}
    >
      <a href="#" className="font-clash font-medium text-h5">
        <motion.span
          animate={{ color: scrolled ? '#030000' : '#030000' }}
          transition={{ duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
        >
          emons
        </motion.span>
      </a>

      <ul className="hidden md:flex items-center gap-gap-lg">
        {navItems.map(item => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="text-body-reg font-clash font-normal transition-hover hover:text-coral"
              style={{ color: '#030000' }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="group inline-flex items-center gap-2 bg-coral text-peach-light rounded-pill px-6 py-2.5 font-normal text-body-reg transition-hover hover:bg-brand-red"
      >
        Get in touch
        <span className="arrow-nudge inline-block transition-transform">→</span>
      </a>
    </motion.nav>
  );
}
