import { teamMembers } from "../../data/siteContent";
import SectionHeading from "../common/SectionHeading";
import TeamSliderRow from "../common/TeamSliderRow";

function TeamSection() {
  const teamTopRow = teamMembers.slice(0, 5);
  // const teamBottomRow = teamMembers.slice(5);

  return (
    <section className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Our Team"
          title="Leadership and core members behind the society."
          text="Expanded with the real member data carried over from the legacy DMS Aarohi site."
        />
        <div className="rounded-full border border-stone-200 bg-white/80 px-5 py-2 text-sm font-semibold text-stone-600">
          {teamMembers.length} Team Members
        </div>
      </div>
      <div className="mt-8 space-y-5">
        <TeamSliderRow members={teamTopRow} />
        {/* <TeamSliderRow members={teamBottomRow} reverse /> */}
      </div>
    </section>
  );
}

export default TeamSection;
