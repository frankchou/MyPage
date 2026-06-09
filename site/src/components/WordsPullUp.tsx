import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delay?: number;
}

export default function WordsPullUp({ text, className = '', showAsterisk = false, delay = 0 }: WordsPullUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
            <motion.span
              className="inline-block relative"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {isLast && showAsterisk && (
                <sup className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</sup>
              )}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
