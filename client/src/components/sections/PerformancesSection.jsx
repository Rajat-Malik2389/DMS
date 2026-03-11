import { performances } from "../../data/siteContent";

function PerformancesSection() {
  return (
    <section id="performances" className="grid gap-5 md:grid-cols-3">
      {performances.map((item) => (
        <article
          key={item.title}
          className="rounded-[1.75rem] border border-stone-200 bg-[#fff8ef]/90 p-7 shadow-[0_18px_60px_rgba(84,42,24,0.10)]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-700">Program</p>
          <h3 className="mt-3 font-serif text-3xl text-stone-900">{item.title}</h3>
          <p className="mt-4 text-base leading-7 text-stone-600">{item.text}</p>
        </article>
      ))}
    </section>
  );
}

export default PerformancesSection;
