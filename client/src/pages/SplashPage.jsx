import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate("/home", { replace: true });
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(171,63,45,0.22),transparent_38%),radial-gradient(circle_at_right_center,rgba(204,160,87,0.26),transparent_30%),linear-gradient(180deg,#f8f0e4_0%,#efe1cf_100%)] px-6 text-stone-900">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:68px_68px]" />

      <div className="relative w-full max-w-xl rounded-[2.25rem] border border-white/60 bg-white/75 p-8 shadow-[0_24px_80px_rgba(84,42,24,0.18)] backdrop-blur-xl md:p-10">
        <div className="flex items-center gap-4">
          <img
            className="h-16 w-16 rounded-full border border-stone-200 bg-white object-cover"
            src="/legacy/tal_logo1.png"
            alt="Talent Hunt logo"
          />
          <div>
            <p className="font-serif text-3xl leading-tight">DMS Aarohi Musical Society</p>
            <p className="mt-1 text-sm text-stone-600">Music Society and NGO Community Work</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <p className="text-sm leading-7 text-stone-700">
            Loading the website. You will be redirected to Home automatically.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/home"
              className="rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Enter Website
            </Link>
            <Link
              to="/ngo/activities"
              className="rounded-full border border-stone-300 bg-white/70 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:-translate-y-0.5 hover:bg-white"
            >
              NGO Activities
            </Link>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-stone-500">
          <span>Delhi NCR</span>
          <span className="h-px w-24 bg-stone-200" />
          <span>Since 2013</span>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
