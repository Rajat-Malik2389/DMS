import { useEffect, useState } from "react";
import { eventDetails as staticEventDetails } from "../../data/siteContent";
import { getJson } from "../../lib/api";
import JoinUsForm from "../forms/JoinUsForm";
import FormNotice from "../common/FormNotice";
import SectionHeading from "../common/SectionHeading";

function UpcomingEventSection() {
  const [joinUsOpen, setJoinUsOpen] = useState(false);
  const [joinUsStatus, setJoinUsStatus] = useState({ type: "", message: "" });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getJson("/api/events");
        setEvents(data || []);
      } catch (error) {
        // fallback to static data; no status needed for public section
      }
    })();
  }, []);

  const cards = events.length
    ? events.map((ev) => ({
      id: ev._id,
      title: ev.title || "Event",
      description: ev.description || "Music event",
      date: ev.eventDate ? ev.eventDate.slice(0, 10) : "Date TBA",
      location: ev.eventLocation || "Location TBA",
        deadline: ev.registrationDeadline ? ev.registrationDeadline.slice(0, 10) : "Deadline TBA",
        type: ev.eventType || "Competition",
        poster: ev.posterImage || "/legacy/current_event.jpg",
        liveLink: ev.liveLink || "",
        rawDate: ev.eventDate,
        rawDeadline: ev.registrationDeadline
      }))
    : staticEventDetails.map(([label, value], idx) => ({
      id: `static-${idx}`,
      title: label,
      description: value,
      date: "Date TBA",
      location: "Location TBA",
        deadline: "Deadline TBA",
        type: "Competition",
        poster: "/legacy/current_event.jpg",
        liveLink: "",
        rawDate: null,
        rawDeadline: null
      }));

  return (
    <section
      id="upcoming-event"
      className="rounded-[2rem] border border-white/40 bg-[linear-gradient(135deg,#101b20_0%,#1d3944_40%,#f4e6cf_40%,#fff8ef_100%)] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10"
    >
      <div className="space-y-7">
        <div className="rounded-[1.75rem] border border-white/10 bg-stone-950/65 p-6 backdrop-blur">
          <SectionHeading
            eyebrow="Upcoming Event"
            title="Live competitions, concerts, and workshops."
            text="Fresh from the admin panel: latest events with dates, venues, types, and registration deadlines."
            light
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => {
              const today = new Date().toISOString().slice(0, 10);
              const isLive = card.rawDate && card.rawDate.slice(0, 10) === today;
              const isOpen = card.rawDeadline ? card.rawDeadline.slice(0, 10) >= today : true;

              return (
                <article
                  key={card.title + card.date + card.location}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-white shadow-sm"
                >
                <img
                  className="h-36 w-full rounded-xl object-cover"
                  src={card.poster}
                  alt={card.title}
                  loading="lazy"
                />
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-emerald-100">
                  <span>{card.type}</span>
                  <span className="flex items-center gap-2">
                    {isLive ? <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">LIVE</span> : null}
                    {card.liveLink && isLive ? (
                      <a
                        href={card.liveLink}
                        className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Watch
                      </a>
                    ) : null}
                    {card.date}
                  </span>
                </div>
                <h3 className="font-serif text-xl leading-tight">{card.title}</h3>
                <p className="text-sm text-stone-200">{card.description}</p>
                <div className="text-xs text-stone-200/80">
                  <div>Location: {card.location}</div>
                  <div>Registration: {card.deadline}</div>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {isOpen ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEvent(card.title);
                        setJoinUsOpen(true);
                      }}
                      className="rounded-full bg-orange-600 px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-500"
                    >
                      Register
                    </button>
                  ) : (
                    <span className="rounded-full border border-white/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                      Closed
                    </span>
                  )}
                </div>
                </article>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setJoinUsOpen((current) => !current)}
              className="rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Join Us
            </button>
            <a
              href="mailto:dmsaarohi@gmail.com"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Event Enquiry
            </a>
          </div>
          <FormNotice status={joinUsStatus} />
        </div>
      </div>

      {joinUsOpen ? (
        <div className="mt-6 rounded-[1.75rem] border border-white/20 bg-white/80 p-4">
          <p className="mb-2 text-sm font-semibold text-stone-700">
            Registering for: {selectedEvent || "Upcoming Event"}
          </p>
          <JoinUsForm onClose={() => setJoinUsOpen(false)} onStatusChange={setJoinUsStatus} />
        </div>
      ) : null}
    </section>
  );
}

export default UpcomingEventSection;
