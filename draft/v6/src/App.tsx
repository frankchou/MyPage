function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fullscreen Background Video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="#"
          className="text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Velorah<sup className="text-xs">®</sup>
        </a>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', active: true },
            { label: 'Studio', active: false },
            { label: 'About', active: false },
            { label: 'Journal', active: false },
            { label: 'Reach Us', active: false },
          ].map(item => (
            <li key={item.label}>
              <a
                href="#"
                className={`text-sm transition-colors hover:text-foreground ${
                  item.active ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Nav CTA */}
        <button className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer">
          Begin Journey
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 py-[90px]">
        <h1
          className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where <em className="not-italic text-muted-foreground">dreams</em> rise{' '}
          <em className="not-italic text-muted-foreground">through the silence.</em>
        </h1>

        <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
          We're designing tools for deep thinkers, bold creators, and quiet rebels.
          Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        <button className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] transition-transform cursor-pointer">
          Begin Journey
        </button>
      </section>
    </div>
  );
}

export default App;
