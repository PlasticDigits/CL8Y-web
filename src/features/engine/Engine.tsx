/**
 * RETIRED from `/` (GitLab #1). Do not remount on the homepage or as a
 * current-product route. See `src/content/invariants.ts` and
 * `skills/cl8y-site-positioning/SKILL.md`.
 */
import SectionHeading from "../../components/ui/SectionHeading";

export default function Engine() {
  return (
    <section className="py-6">
      <SectionHeading title="DeFi Engine" subtitle="UST1 burn economics powering the ecosystem" />
    </section>
  );
}
