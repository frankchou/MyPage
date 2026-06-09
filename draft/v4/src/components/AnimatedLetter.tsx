import { motion, useTransform, MotionValue } from 'framer-motion';

interface AnimatedLetterProps {
  char: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}

export default function AnimatedLetter({ char, scrollYProgress, index, total }: AnimatedLetterProps) {
  const charProgress = index / total;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.2, 1]
  );

  if (char === ' ') return <span>&nbsp;</span>;

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  );
}
