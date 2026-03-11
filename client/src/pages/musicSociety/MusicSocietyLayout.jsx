import { Link, Outlet, useLocation } from "react-router-dom";
import PageShell from "../../components/common/PageShell";

function MusicSocietyLayout() {
  const location = useLocation();
  const tabs = [
    { label: "Overview", to: "/music-society" },
    { label: "Talents", to: "/music-society/talents" },
    { label: "Events", to: "/music-society/events" },
    { label: "Shows", to: "/music-society/shows" },
    { label: "Join Us", to: "/music-society/join-us" }
  ];

  return (
    <PageShell basePath="/home">
      <div className="rounded-[2rem] border border-white/40 bg-white/70 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const active = location.pathname === tab.to;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-stone-950 text-white"
                    : "border border-stone-200 bg-white/80 text-stone-700 hover:bg-white"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      <Outlet />
    </PageShell>
  );
}

export default MusicSocietyLayout;
