import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import WordsPullUp from '../components/WordsPullUp';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="h-screen p-4 md:p-6 bg-black">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Noise Overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Navbar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
              {['Our story', 'Collective', 'Workshops', 'Programs', 'Inquiries'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[10px] sm:text-xs md:text-sm transition-colors"
                    style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E1E0CC')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Hero Content — bottom aligned */}
        <div ref={ref} className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-12 items-end p-4 md:p-8 pb-8 md:pb-12">
          {/* Left: Giant heading */}
          <div className="col-span-12 lg:col-span-8">
            <h1
              className="font-medium leading-[0.85] tracking-[-0.07em] text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
              style={{ color: '#E1E0CC' }}
            >
              <WordsPullUp text="Prism" showAsterisk={false} />
              <span className="relative inline-block overflow-hidden">
                <motion.span
                  className="inline-block relative"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  a
                  <sup className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</sup>
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Right: Description + CTA */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 pb-2 lg:pb-4">
            <motion.p
              className="text-primary/70 text-xs sm:text-sm md:text-base"
              style={{ lineHeight: 1.2 }}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
            </motion.p>

            <motion.button
              className="group inline-flex items-center gap-2 bg-primary rounded-full pl-5 pr-1 py-1 font-medium text-sm sm:text-base text-black self-start transition-all hover:gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Join the lab
              <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowRight className="w-4 h-4 text-primary" />
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
