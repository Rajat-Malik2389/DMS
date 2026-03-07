import { useState } from "react";
import { eventDetails } from "../../data/siteContent";
import JoinUsForm from "../forms/JoinUsForm";
import FormNotice from "../common/FormNotice";
import SectionHeading from "../common/SectionHeading";

function UpcomingEventSection() {
  const [joinUsOpen, setJoinUsOpen] = useState(false);
  const [joinUsStatus, setJoinUsStatus] = useState({ type: "", message: "" });

  return (
    <section
      id="upcoming-event"
      className="rounded-[2rem] border border-white/40 bg-[linear-gradient(135deg,#101b20_0%,#1d3944_40%,#f4e6cf_40%,#fff8ef_100%)] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10"
    >
      <div className="grid items-center gap-7 md:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5 rounded-[1.75rem] border border-white/10 bg-stone-950/65 p-6 backdrop-blur">
          <SectionHeading
            eyebrow="Upcoming Event"
            title="Voice of Delhi-NCR talent-driven stage showcase."
            text="DMS Aarohi continues its event tradition through talent hunt programming and music showcases that give singers a real stage, visibility, and audience connection."
            light
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {eventDetails.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-100">{label}</p>
                <p className="mt-2 text-sm leading-6 text-stone-200">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
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

        <div className="overflow-hidden rounded-[1.75rem] border border-white/30 bg-white/50 p-3 shadow-2xl">
          <img className="w-full rounded-[1.25rem] object-cover" src="/legacy/Joinus.jpg" alt="Upcoming DMS Aarohi event" />
        </div>
      </div>

      {joinUsOpen ? <JoinUsForm onClose={() => setJoinUsOpen(false)} onStatusChange={setJoinUsStatus} /> : null}
    </section>
  );
}

export default UpcomingEventSection;
