import { Link } from "react-router-dom";

function Navbar({ basePath = "/" }) {
  const navItems = [
    { label: "Home", href: "/home#home" },
    { label: "About Us", href: "/home#about" },
    { label: "Team", href: "/home#team" },
    { label: "Contact Us", href: "/home#contact" }
  ];

  return (
    <header className="sticky top-4 z-40 mx-auto mb-8 flex w-full max-w-7xl flex-wrap items-center justify-between gap-5 rounded-[2rem] border border-white/50 bg-white/70 px-5 py-4 shadow-[0_24px_80px_rgba(84,42,24,0.14)] backdrop-blur-xl">
      <div className="relative flex items-center gap-3">
        <div className="soundwave-container">
          <span className="soundwave-ring ring-1" />
          <span className="soundwave-ring ring-2" />
          <span className="soundwave-ring ring-3" />
          <img
            className="relative z-10 h-14 w-14 rounded-full border border-stone-200 bg-white object-cover shadow-lg"
            src="/legacy/tal_logo1.png"
            alt="Talent Hunt logo"
          />
        </div>
        <div>
          <p className="font-serif text-xl font-bold text-stone-900">DMS Aarohi</p>
          <p className="text-sm text-stone-600">Music society & NGO platform</p>
        </div>
      </div>

      <nav className="flex flex-wrap items-center gap-5 text-sm font-semibold text-stone-700">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} className="transition hover:text-stone-950">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          className="music-pulse rounded-full bg-gradient-to-r from-emerald-800 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
          to="/music-society"
        >
          Music Society
        </Link>
        <Link
          className="music-pulse rounded-full bg-gradient-to-r from-orange-700 to-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
          to="/ngo"
        >
          NGO
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
