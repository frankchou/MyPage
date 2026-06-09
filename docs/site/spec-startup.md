# Implementation Spec: Context B (Startup / B2C + B2B Consulting)
**Source:** Prisma landing page template, adapted for Frank Chou personal site
**Context:** This is the "Startup" context of a dual-context personal site
**Language:** English
**Date:** 2026-06-09

---

Create a React + Vite + TypeScript + Tailwind CSS landing page for Frank Chou's startup context. The page has 3 sections: Hero, About, and Features. Use framer-motion for animations and lucide-react for icons. The design is dark, moody, and cinematic with a warm cream color palette.

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
5 nav items: "Products", "Consulting", "About", "Story", "Contact"
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
No superscript asterisk (showAsterisk removed)
Pull-up animation: each word slides up from y:20 with staggered delay of 0.08s, triggered by useInView

Subtitle line below the giant heading:
Text: "Founder / Builder"
Classes: text-primary/50 text-sm
Framer motion: fade up from y:20, delay 0.3s, custom ease [0.16, 1, 0.3, 1]

Description paragraph (right column):
"Explore a better everyday. Start here. Five AI-powered services plus custom enterprise consulting. From daily life to business operations, making everything simpler."
text-primary/70 text-xs sm:text-sm md:text-base, line-height: 1.2
Framer motion: fade up from y:20, delay 0.5s, custom ease [0.16, 1, 0.3, 1]

CTA Button "View My Experience":
Pill shape: bg-primary rounded-full
Black text, font-medium, text-sm sm:text-base
Right side has a black circle (bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10) containing a white/cream ArrowRight icon
Hover: gap increases (hover:gap-3), circle scales up (group-hover:scale-110)
Framer motion: fade up from y:20, delay 0.7s, same custom ease
On click: triggers context switch to Context A (Resume)

SECTION 2: ABOUT

bg-black, padded section with centered content
Inner card: bg-[#101010], centered text, max-w-6xl
Top: small label "Why I build" in text-primary, text-[10px] sm:text-xs

Main heading uses WordsPullUpMultiStyle component with 3 segments:
"Every need" -- font-normal (Almarai)
"deserves a better way." -- italic font-serif (Instrument Serif italic)
"That is why I started building." -- font-normal

Container: text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]
Each word animates in with pull-up effect (y:20 to y:0), staggered at 0.08s delay

Body paragraph below with scroll-linked character opacity animation:
Text: "It started when former clients called me seven times, asking if I would start my own company to serve them. During that time, I had already been building products on the side, tools born from real frustrations in daily life. A job search coach, a home inventory tracker, a pet food safety scanner. Each one began as a problem I personally wanted solved. When people started using them and coming back for more, even bringing their own business challenges, I knew this was the path."
text-[#DEDBC8], text-xs sm:text-sm md:text-base
Each character is individually wrapped in an AnimatedLetter component
Uses useScroll with target offset ['start 0.8', 'end 0.2']
Each character's opacity transitions from 0.2 to 1 based on scroll position, creating a progressive text reveal effect
Character staggering: charProgress = index / totalChars, range [charProgress - 0.1, charProgress + 0.05]

SECTION 3: FEATURES

min-h-screen bg-black, with subtle .bg-noise overlay at opacity-[0.15]
Header text uses WordsPullUpMultiStyle:
Line 1: "Start here. Make everything simpler." in cream
Line 2: "AI services for life. Custom solutions for work." in text-gray-500
Both: text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal

8-card grid: lg:grid-cols-4, two rows (lg:h-[480px] per row, gap-3 sm:gap-2 md:gap-1):

Each card has staggered entrance animation: scale from 0.95 + fade in, triggered by useInView (once, margin "-100px"), staggered at 0.15s intervals with ease [0.22, 1, 0.36, 1].

ROW 1 (B2C Products):

Card 1 - Video card: Full video background (URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4), autoPlay loop muted playsInline, object-cover. Bottom text: "Your daily life, upgraded." in #E1E0CC.

Card 2 - "AI Hunter." (01): bg-[#212121], small image icon at top (https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85, 10x10 sm:12x12 rounded), title "AI Hunter." with number "01", 4 checklist items with green Check icons:
- "Resume building with industry-best templates"
- "Job matching by culture fit, not just keywords"
- "Mock interviews and career path planning"
- "One-stop career coaching from CV to offer"
"Learn more" link with rotated arrow (-45deg).

Card 3 - "FindIt Sprite." (02): Same layout as Card 2. Icon: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85. Title "FindIt Sprite." with number "02", 3 checklist items:
- "Snap a photo, know where everything is"
- "Expiry reminders before things go to waste"
- "Family sharing for household inventory"
"Learn more" link with rotated arrow (-45deg).

Card 4 - "DailyLumos." (03): Same layout as Card 2. Icon: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85. Title "DailyLumos." with number "03", 3 checklist items:
- "Daily scripture cards with AI-powered reflections"
- "Original text and historical context included"
- "A quiet moment of peace, one card at a time"
"Learn more" link with rotated arrow (-45deg).

ROW 2 (B2C + B2B):

Card 5 - "VocalCanvas." (04): Same layout as Card 2. Uses same icon URL as Card 4 (placeholder until dedicated icon is provided). Title "VocalCanvas." with number "04", 3 checklist items:
- "Text to speech with background music, an industry first"
- "Adjustable speed control, an industry first"
- "Meditation, bedtime stories, podcasts, any length"
"Learn more" link with rotated arrow (-45deg).

Card 6 - "PawSafe." (05): Same layout as Card 2. Uses same icon URL as Card 4 (placeholder until dedicated icon is provided). Title "PawSafe." with number "05", 3 checklist items:
- "Snap a photo, instantly know if it is safe for your pet"
- "One-tap pet store search for the best products"
- "Pet owner community to share and learn together"
"Learn more" link with rotated arrow (-45deg).

Card 7 - "Smart Procurement & Container Optimizer." (06): Same layout as Card 2. Uses same icon URL as Card 4 (placeholder until dedicated icon is provided). Title "Smart Procurement & Container Optimizer." with number "06", 3 checklist items:
- "AI-predicted demand for the next 3 months"
- "Auto-generated purchase orders, one click to approve"
- "Weight-balanced container packing, minimized freight cost"
"Learn more" link with rotated arrow (-45deg).

Card 8 - "Your Problem, Solved." (07): Same layout as Card 2. Uses same icon URL as Card 4 (placeholder until dedicated icon is provided). Title "Your Problem, Solved." with number "07", 3 checklist items:
- "Custom system design for your business"
- "From pain point to working solution"
- "Have a challenge? Let's build it together."
"Get in touch" link with rotated arrow (-45deg). Note: This card uses "Get in touch" instead of "Learn more".

All feature card checklist items use Check icon from lucide-react in text-primary color, with text-gray-400 description text. "Learn more" / "Get in touch" buttons use ArrowRight rotated -45deg.

SHARED ANIMATION COMPONENTS

WordsPullUp: Splits text by spaces, each word is a motion.span that slides up (y:20 to 0) with staggered delay. Uses useInView (once: true). showAsterisk NOT used in this context.

WordsPullUpMultiStyle: Takes an array of {text, className} segments, splits all into individual words preserving per-word className. Same pull-up animation. Words are wrapped in inline-flex flex-wrap justify-center.

RESPONSIVE BREAKPOINTS

The page is fully responsive across mobile, tablet, and desktop. Cards in Features switch from 1-col (mobile) to 2-col (md) to 4-col (lg). Hero text scales from 26vw down to 19vw. Navbar items compress with smaller gaps on mobile. All padding, font sizes, and spacing use Tailwind responsive prefixes (sm/md/lg/xl/2xl).

TECH STACK

Vite + React 18 + TypeScript
Tailwind CSS 3
framer-motion (for all animations: pull-up text, fade-in, scroll-linked opacity, card entrances)
lucide-react (ArrowRight, Check icons)

---

## Summary of Changes from Prisma Template

| Element | Prisma Original | Context B (Startup) |
|---------|----------------|---------------------|
| Navbar items | "Our story", "Collective", "Workshops", "Programs", "Inquiries" | "Products", "Consulting", "About", "Story", "Contact" |
| Giant heading | "Prisma" (with asterisk) | "Frank Chou" (no asterisk) |
| Subtitle | (none) | "Founder / Builder" in text-primary/50 text-sm |
| Hero description | Prisma network description | "Explore a better everyday..." |
| CTA button | "Join the lab" | "View My Experience" (triggers context switch to Resume) |
| About label | "Visual arts" | "Why I build" |
| About heading | "I am Marcus Chen, a self-taught director..." | "Every need deserves a better way. That is why I started building." |
| About body | Marcus Chen bio | Frank Chou startup origin story |
| Features header L1 | "Studio-grade workflows for visionary creators." | "Start here. Make everything simpler." |
| Features header L2 | "Built for pure vision. Powered by art." | "AI services for life. Custom solutions for work." |
| Features grid | 4 columns, 1 row, 4 cards | 4 columns, 2 rows, 8 cards |
| Card 1 video text | "Your creative canvas." | "Your daily life, upgraded." |
| Card 2 | "AI Hunter." (01) | One-stop AI career coach. Resume building with industry-best templates, job matching by culture fit, mock interviews, career path planning with personality analysis. From CV to offer, all in one system. |
| Card 3 | "FindIt Sprite." (02) | Home inventory tracker for people who forget what they bought. Snap a photo to locate items, expiry reminders, duplicate purchase alerts. Family sharing so everyone helps maintain the household. |
| Card 4 | "DailyLumos." (03) | Daily scripture card app for those seeking spiritual comfort. Ask a question, draw a card, receive AI-powered reflection with original text and historical context. One card a day, one moment of peace. |
| Card 5 | "VocalCanvas." (04) | Text-to-speech audio creator. Industry-first narration + background music combo. Industry-first speed control. Meditation, bedtime stories, podcasts, any length, at a more affordable price than competitors. |
| Card 6 | "PurePet." (05) | Pet health analyzer and personal nutritionist for pet owners. Snap a photo of any product to instantly check if it is safe. One-tap pet store search. Pet owner community to share and learn together. |
| Card 7 | "Smart Procurement & Container Optimizer." (06) | AI-powered purchasing and container packing advisor. Predicts 3-month demand, auto-generates purchase orders, auto-balances container weight and volume. Integrates with SAP/NetSuite. Turns veteran buyer instinct into an explainable system. |
| Card 8 | "Your Problem, Solved." (07) | Custom B2B consulting. Clients discover our B2C products, realize we can solve their business challenges too, and come to us for tailored system design. From pain point to working solution. CTA: "Get in touch" |

## Unchanged from Template

- All fonts, color system, CSS utilities
- All animation parameters (easing curves, delays, stagger values)
- Video URLs (placeholder, same as Prisma)
- Icon URLs (placeholder, reused from Prisma cards)
- Noise overlay, gradient overlay
- Navbar positioning and styling
- Hero layout (12-col grid, bottom-aligned)
- About card styling (bg-[#101010], scroll-linked opacity)
- Feature card styling (bg-[#212121], Check icons, arrow links)
- All responsive breakpoints and Tailwind prefixes
- Tech stack
