function Footer() {
  return (
    <footer className="mx-auto mt-8 w-full max-w-7xl rounded-[2rem] border border-white/20 bg-stone-950 px-6 py-8 text-white shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:px-8">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              className="h-14 w-14 rounded-full border border-white/10 bg-white object-cover"
              src="/legacy/tal_logo1.png"
              alt="Talent Hunt logo"
            />
            <div>
              <p className="font-serif text-2xl">DMS Aarohi Musical Society</p>
              <p className="text-sm text-stone-300">Music, culture, talent, and NGO community support.</p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-7 text-stone-300">
            Registered musical society from New Delhi focused on concerts, talent hunt programming, community
            outreach, and meaningful public participation through music and service.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-200">Contact</p>
          <p className="text-sm text-stone-300">Email: dmsaarohi@gmail.com</p>
          <p className="text-sm text-stone-300">Phone: +91-9810225442</p>
          <p className="text-sm text-stone-300">A5, 272, Paschim Vihar, New Delhi</p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-200">Quick Links</p>
          <a className="block text-sm text-stone-300 transition hover:text-white" href="/#performances">
            Performances
          </a>
          <a className="block text-sm text-stone-300 transition hover:text-white" href="/#upcoming-event">
            Upcoming Event
          </a>
          <a className="block text-sm text-stone-300 transition hover:text-white" href="/ngo">
            NGO Page
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-4 text-sm text-stone-400">
        Copyright {new Date().getFullYear()} DMS Aarohi Musical Society. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
