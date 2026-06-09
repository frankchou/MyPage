# Implementation Spec: Resume Context (Context A)
**Source:** Prisma landing page template, adapted for Frank Chou personal site
**Context:** Resume / B2B
**Language:** English
**Date:** 2026-06-09

---

Create a React + Vite + TypeScript + Tailwind CSS landing page for Frank Chou's personal site (Resume context). The page has 3 sections: Hero, About, and Features. Use framer-motion for animations and lucide-react for icons. The design is dark, moody, and cinematic with a warm cream color palette.

FONTS

Load two Google Fonts in index.html:

Almarai (weights: 300, 400, 700, 800) -- used as the global default font
Instrument Serif (italic only) -- used for italic accent text in the About section
In index.css, set the global font family:


* { font-family: 'Almarai', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; }
In tailwind.config.js, extend:

colors.primary: #DEDBC8 (warm cream, used for all primary text and accents)
fontFamily.serif: ['"Instrument Serif"', 'serif']
COLOR SYSTEM

Background: black (#000000) globally, #101010 for the About card, #212121 for Features cards
Primary text color: #E1E0CC (applied via inline style, slightly different from Tailwind primary)
Tailwind primary: #DEDBC8 (used for utility classes like text-primary, text-primary/70)
Gray text: text-gray-400, text-gray-500
Navbar link color: rgba(225, 224, 204, 0.8) with hover: #E1E0CC
CUSTOM CSS UTILITIES (index.css)

Two SVG noise texture utilities:

.noise-overlay: fractal noise (baseFrequency: 0.85, numOctaves: 3) used as overlay on hero video
.bg-noise: fractal noise (baseFrequency: 0.9, numOctaves: 4) used as subtle background in Features section
Both use inline SVG data URIs with feTurbulence filter.

SECTION 1: HERO

Full viewport height (h-screen). The entire section has p-4 md:p-6 padding creating an inset effect. Inside is a container with rounded-2xl md:rounded-[2rem] and overflow-hidden.

Background video:

URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4
autoPlay loop muted playsInline, object-cover, fills entire container
Noise overlay on top: .noise-overlay with opacity-[0.7] mix-blend-overlay pointer-events-none
Gradient overlay: bg-gradient-to-b from-black/30 via-transparent to-black/60
Navbar:

Absolutely positioned at top center
Black background pill that hangs from top edge: bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8
5 nav items: "Experience", "Skills", "Achievements", "About", "Contact"
Text size: text-[10px] sm:text-xs md:text-sm
Gap between items: gap-3 sm:gap-6 md:gap-12 lg:gap-14
Link color: rgba(225, 224, 204, 0.8), hover: #E1E0CC (inline styles)
Hero Content (bottom-aligned):

Absolutely positioned at bottom: absolute bottom-0 left-0 right-0
12-column grid: left 8 columns for heading, right 4 columns for text + button
Giant heading "Frank Chou" using WordsPullUp component:
Responsive sizes: text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]
font-medium leading-[0.85] tracking-[-0.07em]
Color: #E1E0CC
No superscript asterisk (showAsterisk: false or omitted)
Pull-up animation: each word slides up from y:20 with staggered delay of 0.08s, triggered by useInView
Subtitle line below the giant heading:
Text: "PM / Engineer"
Style: text-primary/50 text-sm
Framer motion: fade up from y:20, delay 0.3s, same custom ease [0.16, 1, 0.3, 1]
Description paragraph (right column):
"7 years of product management and software engineering. Specialized in 0-to-1 product design, cross-border project management, and digital transformation. PMP, PMI-ACP, and PMI-PBA certified."
text-primary/70 text-xs sm:text-sm md:text-base, line-height: 1.2
Framer motion: fade up from y:20, delay 0.5s, custom ease [0.16, 1, 0.3, 1]
CTA Button "Explore My Ventures":
Pill shape: bg-primary rounded-full
Black text, font-medium, text-sm sm:text-base
Right side has a black circle (bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10) containing a white/cream ArrowRight icon
Hover: gap increases (hover:gap-3), circle scales up (group-hover:scale-110)
Framer motion: fade up from y:20, delay 0.7s, same custom ease
On click: triggers context switch to Context B (Ventures)

SECTION 2: ABOUT

bg-black, padded section with centered content
Inner card: bg-[#101010], centered text, max-w-6xl
Top: small label "Career highlights" in text-primary, text-[10px] sm:text-xs
Main heading uses WordsPullUpMultiStyle component with 3 segments:
"I am Frank Chou," -- font-normal (Almarai)
"a PM who codes." -- italic font-serif (Instrument Serif italic)
"I build enterprise systems that teams actually want to use." -- font-normal
Container: text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]
Each word animates in with pull-up effect (y:20 to y:0), staggered at 0.08s delay
Body paragraph below with scroll-linked character opacity animation:
Text: "Over the past seven years, I have led cross-border teams across two countries and five departments, delivering over a hundred projects at Wistron, Sushi Express, and Atos. From building an AI-powered financial prediction system for the CEO's dashboard, to convincing reluctant teams across four countries to adopt a new project management platform, my work sits at the intersection of business strategy and hands-on engineering."
text-[#DEDBC8], text-xs sm:text-sm md:text-base
Each character is individually wrapped in an AnimatedLetter component
Uses useScroll with target offset ['start 0.8', 'end 0.2']
Each character's opacity transitions from 0.2 to 1 based on scroll position, creating a progressive text reveal effect
Character staggering: charProgress = index / totalChars, range [charProgress - 0.1, charProgress + 0.05]

SECTION 3: FEATURES

min-h-screen bg-black, with subtle .bg-noise overlay at opacity-[0.15]
Header text uses WordsPullUpMultiStyle:
Line 1: "Enterprise systems that move the needle." in cream
Line 2: "Built with code. Delivered with clarity." in text-gray-500
Both: text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal
6-card grid: lg:grid-cols-3, two rows (lg:h-[480px] per row, gap-3 sm:gap-2 md:gap-1):

Each card has staggered entrance animation: scale from 0.95 + fade in, triggered by useInView (once, margin "-100px"), staggered at 0.15s intervals with ease [0.22, 1, 0.36, 1].

ROW 1:

Card 1 - Video card: Full video background (URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4), autoPlay loop muted playsInline, object-cover. Bottom text: "Where it all began." in #E1E0CC.

Card 2 - "Government EIP Platform." (01): bg-[#212121], small image icon at top (https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85, 10x10 sm:12x12 rounded), title "Government EIP Platform." with number "01", 4 checklist items with green Check icons:
- "0-to-1 system architecture for SMESA"
- "AI-accelerated requirements documentation"
- "Encrypted auth under strict gov security policy"
- "Client immediately commissioned follow-up projects"
"Learn more" link with rotated arrow (-45deg).

Card 3 - "SAP Data Integration." (02): Same layout as Card 2. Icon: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85. Title "SAP Data Integration." with number "02", 4 checklist items with green Check icons:
- "Standardized SAP data exchange protocols"
- "20% reduction in system maintenance risk"
- "60% improvement in cross-team integration efficiency"
- "50% shorter development cycle for new system rollouts"
"Learn more" link with rotated arrow (-45deg).

ROW 2:

Card 4 - "AI Financial Prediction." (03): Same layout as Card 2. Icon: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85. Title "AI Financial Prediction." with number "03", 3 checklist items with green Check icons:
- "FP&A system became the CEO's primary decision-making source"
- "Predicting 3-month production costs, ROI, and IRR"
- "Reduced factory financial modeling time by 80%"
"Learn more" link with rotated arrow (-45deg).

Card 5 - "Global Project Management Hub." (04): Same layout as Card 2. Uses same icon URL as Card 4 (placeholder until dedicated icon is provided). Title "Global Project Management Hub." with number "04", 4 checklist items with green Check icons:
- "Integrated multi-country project data with Skype messaging"
- "Convinced 50% of core teams to adopt through targeted rollout"
- "Became the company's core PM system within one year"
- "23 teams, 100+ projects, 15% efficiency improvement"
"Learn more" link with rotated arrow (-45deg).

Card 6 - "Smart Space Booking." (05): Same layout as Card 2. Uses same icon URL as Card 4 (placeholder until dedicated icon is provided). Title "Smart Space Booking." with number "05", 4 checklist items with green Check icons:
- "Hackathon 3rd place, endorsed by CEO, rolled out company-wide"
- "800 meeting rooms across 4 buildings, booking in under 1 minute"
- "97% time savings vs. manual inspection process"
- "Power BI analytics raised space utilization to 85%"
"Learn more" link with rotated arrow (-45deg).

All feature card checklist items use Check icon from lucide-react in text-primary color, with text-gray-400 description text. "Learn more" buttons use ArrowRight rotated -45deg.

SHARED ANIMATION COMPONENTS

WordsPullUp: Splits text by spaces, each word is a motion.span that slides up (y:20 to 0) with staggered delay. Uses useInView (once: true). showAsterisk not used in this context.

WordsPullUpMultiStyle: Takes an array of {text, className} segments, splits all into individual words preserving per-word className. Same pull-up animation. Words are wrapped in inline-flex flex-wrap justify-center.

RESPONSIVE BREAKPOINTS

The page is fully responsive across mobile, tablet, and desktop. Cards in Features switch from 1-col (mobile) to 2-col (md) to 3-col (lg). Hero text scales from 26vw down to 19vw. Navbar items compress with smaller gaps on mobile. All padding, font sizes, and spacing use Tailwind responsive prefixes (sm/md/lg/xl/2xl).

TECH STACK

Vite + React 18 + TypeScript
Tailwind CSS 3
framer-motion (for all animations: pull-up text, fade-in, scroll-linked opacity, card entrances)
lucide-react (ArrowRight, Check icons)

---

## Changes from Prisma Template

| Item | Prisma Original | This Spec (Resume Context) |
|------|----------------|---------------------------|
| Navbar items | "Our story", "Collective", "Workshops", "Programs", "Inquiries" | "Experience", "Skills", "Achievements", "About", "Contact" |
| Giant heading | "Prisma" with superscript * on final "a" | "Frank Chou", no superscript |
| Subtitle | (none) | "PM / Engineer" in text-primary/50 text-sm |
| Hero description | Prisma network description | 7-year career summary with certifications |
| CTA button | "Join the lab" | "Explore My Ventures" (triggers context switch) |
| About label | "Visual arts" | "Career highlights" |
| About heading | Marcus Chen, self-taught director | Frank Chou, PM who codes, enterprise systems |
| About body | Berlin production house, Paris studio | Cross-border teams, Wistron/Sushi Express/Atos |
| Features header L1 | "Studio-grade workflows for visionary creators." | "Enterprise systems that move the needle." |
| Features header L2 | "Built for pure vision. Powered by art." | "Built with code. Delivered with clarity." |
| Features grid | 4-col, 1 row, 4 cards | 3-col, 2 rows, 6 cards |
| Card 1 video text | "Your creative canvas." | "Where it all began." |
| Card 2 | "Government EIP Platform." (01) | 0-to-1 EIP and admin system for SMESA. AI-accelerated requirements under tight RFP deadlines. Designed encrypted auth mechanism under strict gov security policy. Client immediately commissioned follow-up projects. |
| Card 3 | "SAP Data Integration." (02) | Established SAP data exchange standards and integrated external system customization. 20% less maintenance risk, 60% faster cross-team integration, 50% shorter dev cycles, 100% data accuracy. |
| Card 4 | "AI Financial Prediction." (03) | Built group-level FP&A and AI strategy system that became the CEO's primary decision-making source. Predicted 3-month production costs, ROI, and IRR. Reduced factory financial modeling time by 80%. |
| Card 5 | "Global Project Management Hub." (04) | Led cross-country PM and workforce system integrating multi-nation project data with Skype. Convinced 50% of core teams through targeted rollout strategy. Became the company's core PM system within one year: 23 teams, 100+ projects, 15% efficiency gain. |
| Card 6 | "Smart Space Booking." (05) | Hackathon 3rd place, endorsed by CEO, rolled out company-wide. Transformed manual inspection of 800 meeting rooms across 4 buildings into a 1-minute online booking flow. 97% time savings. Power BI analytics raised space utilization to 85%. |
| Card responsive | 1-col > 2-col > 4-col | 1-col > 2-col > 3-col |
