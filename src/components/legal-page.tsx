import { PageHeader } from "./sections";
import { container } from "./ui";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHeader kicker="Legal" title={title} text={intro} />
      <section className="py-16">
        <div className={container}>
          <div className="max-w-[680px] space-y-12">
            {sections.map((s) => (
              <article key={s.heading}>
                <h2 className="text-2xl font-semibold tracking-tight text-ink">{s.heading}</h2>
                <p className="mt-4 text-base text-muted">{s.body}</p>
              </article>
            ))}
            <p className="rounded-xl bg-surface p-4 text-sm text-muted">
              This page is a starting draft. Have it reviewed before the site goes live.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
