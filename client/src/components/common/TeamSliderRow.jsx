function TeamSliderRow({ members, reverse = false }) {
  const repeatedMembers = [...members, ...members];

  return (
    <div className="overflow-hidden">
      <div className={`flex w-max gap-5 ${reverse ? "animate-team-slide-reverse" : "animate-team-slide"}`}>
        {repeatedMembers.map((member, index) => (
          <article
            key={`${member.name}-${index}`}
            className="group w-[280px] shrink-0 overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-[0_18px_60px_rgba(84,42,24,0.10)]"
          >
            <div className="relative overflow-hidden">
              <img
                className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                src={member.image}
                alt={member.name}
              />
              <div className="absolute inset-x-4 bottom-4 rounded-full bg-stone-950/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                DMS Aarohi
              </div>
            </div>
            <div className="space-y-2 p-5">
              <h3 className="font-serif text-2xl text-stone-900">{member.name}</h3>
              <p className="text-sm font-medium text-stone-600">{member.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default TeamSliderRow;
