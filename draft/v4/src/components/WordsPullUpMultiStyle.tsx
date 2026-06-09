import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  containerClassName?: string;
  delay?: number;
}

export default function WordsPullUpMultiStyle({ segments, containerClassName = '', delay = 0 }: WordsPullUpMultiStyleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const allWords: { word: string; className: string; index: number }[] = [];
  let wordIndex = 0;
  segments.forEach(seg => {
    seg.text.split(' ').forEach(word => {
      if (word) {
        allWords.push({ word, className: seg.className || '', index: wordIndex });
        wordIndex++;
      }
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName}`}>
      {allWords.map(({ word, className, index }) => (
        <span key={index} className="overflow-hidden inline-block mr-[0.25em] mb-[0.1em]">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
