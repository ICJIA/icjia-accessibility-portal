<template>
  <v-container>
    <div class="pk-page trust-page">
      <!-- Head -->
      <div class="pk-page-head">
        <p class="pk-label">Why trust these FAQs?</p>
        <h1 class="pk-page-title">
          Don't trust the author.
          <span class="trust-accent">Check the sources.</span>
        </h1>
        <p class="pk-page-intro">
          Every answer in this FAQ is checked, line by line, against the
          official sources it links to: the federal ADA rule, Illinois's IITAA,
          and the WCAG standard. Those checks happen again and again, not once.
          You can follow any answer to its source in a couple of clicks,
          without taking anyone's word for it, including the author's.
        </p>
      </div>

      <!-- The numbers, worked out from the FAQ itself when the site is built -->
      <section aria-labelledby="trust-numbers" class="trust-section">
        <h2 id="trust-numbers" class="sr-only">The FAQ in numbers</h2>
        <dl class="trust-stats">
          <div class="trust-stat">
            <dt class="trust-stat-label">questions answered</dt>
            <dd class="trust-stat-value">{{ stats.questions }}</dd>
          </div>
          <div class="trust-stat">
            <dt class="trust-stat-label">
              links straight to the official sources (the federal
              regulation, the Federal Register, ADA.gov, Illinois DoIT, the
              IITAA statute, and W3C)
            </dt>
            <dd class="trust-stat-value">{{ stats.primaryLinks }}</dd>
          </div>
          <div class="trust-stat">
            <dt class="trust-stat-label">
              full reviews against those sources since May 2026,
              {{ recentReviewCount }} of them in the last three months
            </dt>
            <dd class="trust-stat-value">{{ reviews.length }}</dd>
          </div>
          <div class="trust-stat">
            <dt class="trust-stat-label">last full review</dt>
            <dd class="trust-stat-value trust-stat-date">
              {{ lastReviewedLabel }}
            </dd>
          </div>
        </dl>
        <p class="trust-note">
          These numbers are counted from the FAQ itself each time the site is
          built, so they are never typed in by hand.
        </p>
      </section>

      <!-- The three authorities -->
      <section aria-labelledby="trust-law" class="trust-section">
        <p class="pk-label">The rules · three sources, nothing else</p>
        <h2 id="trust-law" class="trust-h2">Title II. IITAA. WCAG.</h2>
        <p class="trust-lead">
          Every sourced answer rests on one of the three authorities that
          actually govern an Illinois state agency. Court cases, other
          agencies' rules, and vendor advice can appear as background, but
          never as the basis for an answer.
        </p>
        <div class="trust-cards">
          <div class="trust-card">
            <p class="trust-tag">Federal law</p>
            <h3 class="trust-h3">
              <a
                href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H"
                target="_blank"
                rel="noopener noreferrer"
                >ADA Title II<span class="sr-only">
                  (the federal regulation, opens in a new tab)</span
                ></a
              >
            </h3>
            <p>
              The U.S. Department of Justice rule for state and local
              government (28 CFR Part 35). It requires WCAG 2.1 Level AA, and
              Illinois state agencies must comply by April 26, 2027.
            </p>
          </div>
          <div class="trust-card">
            <p class="trust-tag">Illinois law</p>
            <h3 class="trust-h3">
              <a
                href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html"
                target="_blank"
                rel="noopener noreferrer"
                >IITAA<span class="sr-only">
                  (Illinois DoIT, opens in a new tab)</span
                ></a
              >
            </h3>
            <p>
              The Illinois Information Technology Accessibility Act, in force
              since 2008 and older than the federal rule. Its current
              standards, IITAA 2.1, also require WCAG 2.1 Level AA.
            </p>
          </div>
          <div class="trust-card">
            <p class="trust-tag">The standard</p>
            <h3 class="trust-h3">
              <a
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                rel="noopener noreferrer"
                >WCAG 2.1<span class="sr-only">
                  (W3C, opens in a new tab)</span
                ></a
              >
            </h3>
            <p>
              The Web Content Accessibility Guidelines, published by the W3C.
              Both laws point to it, so it defines what "accessible" means in
              practice.
            </p>
          </div>
        </div>

        <h3 class="trust-h3 trust-sources-title">Where the FAQ's links go</h3>
        <ul class="trust-sources">
          <li v-for="group in stats.sourceGroups" :key="group.label">
            <span class="trust-source-count">{{ group.count }}</span>
            <span class="trust-source-label">{{ group.label }}</span>
          </li>
        </ul>
        <p class="trust-note">
          Plus {{ stats.otherGovLinks }} links to other government sources
          (Section508.gov, CDC, and others) and {{ stats.otherLinks }} to tools,
          vendors' own documentation, and research.
        </p>
      </section>

      <!-- How it's checked -->
      <section aria-labelledby="trust-checked" class="trust-section">
        <p class="pk-label">How it's checked</p>
        <h2 id="trust-checked" class="trust-h2">Reviewed again and again, not written once.</h2>
        <ol class="trust-steps">
          <li>
            <strong>Every answer is read against its source.</strong> The
            regulation, the statute, or the standard itself, in its current
            official version.
          </li>
          <li>
            <strong>Then reviewers try to prove it wrong.</strong> Each review
            splits the FAQ into parts and looks for errors, outdated status,
            and claims that go further than the source does.
          </li>
          <li>
            <strong>Nothing changes on a hunch.</strong> A finding is applied
            only after it is confirmed in the official source. Suggestions that
            don't hold up are dropped.
          </li>
          <li>
            <strong>Every change is dated and public.</strong> Each page shows
            when the FAQ was last reviewed and updated; changed answers carry
            an "Updated" label for three weeks; and every update is listed on
            <NuxtLink to="/whats-new">What's New</NuxtLink>.
          </li>
        </ol>

        <h3 class="trust-h3 trust-sources-title">Every full review</h3>
        <ol class="trust-reviews">
          <li v-for="review in reviews" :key="review.date" class="trust-review">
            <time :datetime="review.date" class="trust-review-date">{{
              formatWhatsNewDate(review.date)
            }}</time>
            <p class="trust-review-text">{{ review.summary }}</p>
          </li>
        </ol>
        <p class="trust-note">
          Between full reviews, answers are corrected as soon as a problem is
          found or the law changes. Every edit to every answer is on the public
          record:
          <a
            href="https://github.com/ICJIA/icjia-accessibility-portal/commits/main/content/faqs.md"
            target="_blank"
            rel="noopener noreferrer"
            >the full history of the FAQ<span class="sr-only">
              (GitHub, opens in a new tab)</span
            ></a
          >.
        </p>
      </section>

      <!-- The objection -->
      <section aria-labelledby="trust-objection" class="trust-section">
        <p class="pk-label">The objection</p>
        <h2 id="trust-objection" class="trust-h2">
          "But one person wrote this. And they're not ICJIA's Executive
          Leadership. Or a lawyer. <span class="trust-accent">It's just some IT guy!"</span>
        </h2>
        <p class="trust-lead">
          <strong>True, and it matters less than it sounds.</strong> This FAQ
          is compiled and maintained by Christopher Schweda in ICJIA's IDS
          Unit. Its weight doesn't come from anyone's title. It comes from
          what it cites.
        </p>
        <div class="trust-cards">
          <div class="trust-card">
            <h3 class="trust-h3">The rules are written down</h3>
            <p>
              <a
                href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200"
                target="_blank"
                rel="noopener noreferrer"
                >28 CFR § 35.200<span class="sr-only">
                  (opens in a new tab)</span
                ></a
              >
              says the same thing whoever reads it aloud. A summary that cites
              nothing deserves less trust than one that cites everything,
              whoever signs it.
            </p>
          </div>
          <div class="trust-card">
            <h3 class="trust-h3">It knows its limits</h3>
            <p>
              Where a question needs a legal opinion or an agency decision,
              the answer says so and points to Illinois DoIT or legal counsel.
              It is practical guidance, not legal advice.
            </p>
          </div>
          <div class="trust-card">
            <h3 class="trust-h3">It comes from the work</h3>
            <p>
              ICJIA's web team has built accessibility into its sites for
              years. The people who make pages work with screen readers and
              keyboards are the ones writing this down.
            </p>
          </div>
          <div class="trust-card">
            <h3 class="trust-h3">Mistakes are fixed in public</h3>
            <p>
              Corrections are dated, listed, and kept. A FAQ that shows you
              where it was wrong is easier to trust than one that never says.
            </p>
          </div>
        </div>
        <p class="trust-note">
          The FAQ answers this question too:
          <NuxtLink :to="trustQuestionLink"
            >Why should I trust this FAQ if it wasn't created by agency
            leadership or official accessibility experts?</NuxtLink
          >
        </p>
      </section>

      <!-- Check it yourself -->
      <section aria-labelledby="trust-check" class="trust-section">
        <p class="pk-label">Check it yourself</p>
        <h2 id="trust-check" class="trust-h2">Two clicks to the source.</h2>
        <ol class="trust-steps">
          <li>Open any answer.</li>
          <li>Follow its link to the regulation, the statute, or WCAG.</li>
          <li>
            Compare. <strong>If they disagree, the source wins</strong>, and
            please tell us so the answer can be fixed.
          </li>
        </ol>
        <p class="trust-lead">
          Found a mistake, or think an answer goes further than its source?
          Email
          <a href="mailto:christopher.schweda@illinois.gov"
            >christopher.schweda@illinois.gov</a
          >. For an official interpretation, ask Illinois DoIT at
          <a href="mailto:DoIT.Accessibility@Illinois.gov"
            >DoIT.Accessibility@Illinois.gov</a
          >.
        </p>
        <p class="trust-closing">
          Rank doesn't make an answer right.<br />
          <span class="trust-closing-2">Sources do.</span>
        </p>
      </section>
    </div>
  </v-container>
</template>

<script setup lang="ts">
/**
 * @fileoverview "Why trust these FAQs?" page (/trust)
 * @description Explains why the FAQ can be trusted: it rests on three official
 * authorities (ADA Title II, the IITAA, WCAG 2.1), links to them, and is
 * reviewed again and again against them. The numbers on the page (questions,
 * links by source) are counted from `content/faqs.md` when the site is built;
 * the review list comes from `app/utils/reviewHistory.ts`.
 */

import { computed } from "vue";
import { REVIEW_HISTORY } from "~/utils/reviewHistory";
import { formatWhatsNewDate } from "~/utils/whatsNew";
import { getQuestionId } from "../composables/useSlugify";
import { useSeo } from "../composables/useSeo";
import { useBreadcrumbStructuredData } from "../composables/useStructuredData";

/** Every full review, newest first. */
const reviews = REVIEW_HISTORY;

/** Hosts grouped into the official sources the FAQ rests on. */
const PRIMARY_GROUPS: Array<{ label: string; hosts: string[] }> = [
  { label: "W3C — WCAG and its official explanations", hosts: ["w3.org"] },
  { label: "Illinois DoIT — IITAA standards and guidance", hosts: ["doit.illinois.gov"] },
  { label: "eCFR — the federal regulation, 28 CFR Part 35", hosts: ["ecfr.gov"] },
  { label: "ADA.gov — U.S. Department of Justice", hosts: ["ada.gov", "archive.ada.gov"] },
  { label: "Federal Register — the rule as published", hosts: ["federalregister.gov", "govinfo.gov"] },
  { label: "Illinois General Assembly — the IITAA statute", hosts: ["ilga.gov"] },
];

/** Other government hosts: official, but not one of the three authorities. */
const OTHER_GOV = /(\.gov|\.gov\.uk)$/;

/** A minimal walk of Nuxt Content's minimark tree. */
type MiniNode = string | [string, Record<string, unknown>, ...MiniNode[]];

/**
 * Counts questions and external links in the FAQ, grouping links by source.
 * @param {unknown} faq - The FAQ document from Nuxt Content
 * @returns Counts for the page, and the FAQ's `lastReviewed` date
 */
function countFaq(faq: any) {
  const nodes: MiniNode[] =
    faq?.body && Array.isArray(faq.body.value) ? faq.body.value : [];
  let questions = 0;
  const hosts: string[] = [];

  const walk = (node: MiniNode) => {
    if (!Array.isArray(node)) return;
    const [tag, attrs, ...children] = node;
    if (tag === "h3") questions++;
    if (tag === "a" && attrs && typeof attrs.href === "string") {
      const match = /^https?:\/\/([^/?#]+)/i.exec(attrs.href);
      if (match) hosts.push(match[1]!.toLowerCase().replace(/^www\./, ""));
    }
    children.forEach(walk);
  };
  nodes.forEach(walk);

  const used = new Set<number>();
  const sourceGroups = PRIMARY_GROUPS.map((group) => {
    let count = 0;
    hosts.forEach((host, i) => {
      if (group.hosts.includes(host)) {
        count++;
        used.add(i);
      }
    });
    return { label: group.label, count };
  }).sort((a, b) => b.count - a.count);

  const primaryLinks = sourceGroups.reduce((sum, g) => sum + g.count, 0);
  let otherGovLinks = 0;
  hosts.forEach((host, i) => {
    if (!used.has(i) && OTHER_GOV.test(host)) otherGovLinks++;
  });

  return {
    questions,
    primaryLinks,
    sourceGroups,
    otherGovLinks,
    otherLinks: hosts.length - primaryLinks - otherGovLinks,
    lastReviewed: (faq?.lastReviewed as string | undefined) ?? "",
  };
}

/**
 * The counts, worked out when the page is built. Only these few numbers go
 * into the page's data, not the whole FAQ (about 590 kB).
 */
const { data: faqStats } = await useAsyncData("trust-stats", async () =>
  countFaq(await queryCollection("faqs").first())
);

const stats = computed(
  () =>
    faqStats.value ?? {
      questions: 0,
      primaryLinks: 0,
      sourceGroups: [],
      otherGovLinks: 0,
      otherLinks: 0,
      lastReviewed: "",
    }
);

/** "November 25, 2026", from the FAQ's own `lastReviewed` front matter. */
const lastReviewedLabel = computed(() => {
  const raw = stats.value.lastReviewed;
  return raw ? formatWhatsNewDate(raw) : formatWhatsNewDate(reviews[0]!.date);
});

/** Reviews in the three months before the newest one. */
const recentReviewCount = computed(() => {
  const newest = Date.parse(reviews[0]!.date);
  const window = 92 * 24 * 60 * 60 * 1000;
  return reviews.filter((r) => newest - Date.parse(r.date) <= window).length;
});

/** Link to the FAQ's own "Why should I trust this FAQ…?" question. */
const trustQuestionLink = `/faqs#${getQuestionId(
  "Understanding Accessibility",
  "Why should I trust this FAQ if it wasn't created by agency leadership or official accessibility experts?"
)}`;

useSeo({
  title: "Why trust these FAQs?",
  description:
    "Why the ICJIA accessibility FAQ can be trusted: every answer rests on ADA Title II, the Illinois IITAA, and WCAG 2.1, links to them, and is reviewed against them again and again.",
  url: "/trust",
  keywords: [
    "trust",
    "sources",
    "ADA Title II",
    "IITAA",
    "WCAG 2.1",
    "accessibility FAQ review",
  ],
});

useBreadcrumbStructuredData([
  { name: "Home", url: "/" },
  { name: "Why trust these FAQs?", url: "/trust" },
]);
</script>

<style scoped>
/* Plakat reading page, wider than the others for the cards and stats. */
.trust-page {
  max-width: 64rem;
}

/* "Check the sources." in the site's purple (the text shade, 5:1). */
.trust-accent {
  color: var(--pk-brand-text);
}

.trust-section {
  margin-top: 4.5rem;
  padding-top: 1.25rem;
  border-top: 4px solid var(--pk-heading);
}

/* The numbers sit right under the page head's rule: no second rule. */
.trust-section:first-of-type {
  margin-top: 2.5rem;
  padding-top: 0;
  border-top: 0;
}

.trust-section > .pk-label {
  margin: 0 0 0.75rem;
  color: var(--pk-text-2);
}

.trust-h2 {
  margin: 0 0 1.25rem;
  font-size: clamp(2rem, 5vw, 3.25rem);
  /* Open enough that a heading running to three lines still reads easily. */
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.045em;
  color: var(--pk-heading);
  text-wrap: balance;
}

.trust-h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--pk-heading);
}

.trust-lead {
  max-width: 46rem;
  margin: 0 0 1.75rem;
  font-size: 1.1875rem;
  line-height: 1.55 !important;
  color: var(--pk-text);
}

.trust-lead strong,
.trust-steps strong {
  color: var(--pk-heading);
  font-weight: 700;
}

.trust-note {
  max-width: 46rem;
  margin: 1.25rem 0 0;
  font-size: 1rem;
  line-height: 1.55 !important;
  color: var(--pk-text-2);
}

/* Links on this page: link blue, underlined (7.6:1). */
.trust-page a {
  color: var(--pk-link);
  text-decoration: underline;
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}

.trust-page a:hover {
  color: var(--pk-link-hover);
  text-decoration-thickness: 2px;
}

/* The numbers: big figures over short labels, under white rules. */
.trust-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: 2rem;
  margin: 0;
}

.trust-stat {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  border-top: 3px solid var(--pk-heading);
  padding-top: 0.75rem;
}

.trust-stat-value {
  margin: 0;
  font-size: clamp(3rem, 7vw, 4.5rem);
  line-height: 0.95;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--pk-heading);
  font-variant-numeric: tabular-nums;
}

.trust-stat-date {
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.trust-stat-label {
  margin-top: 0.75rem;
  font-size: 1rem;
  line-height: 1.45;
  color: var(--pk-text-2);
}

/* The three authorities, and the objection's four answers. */
.trust-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

.trust-card {
  background: var(--pk-card);
  border: 1px solid var(--pk-border-alt);
  padding: 1.25rem 1.375rem;
}

.trust-card p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.55 !important;
  color: var(--pk-text);
}

.trust-card .trust-tag {
  display: inline-block;
  margin-bottom: 0.75rem;
  padding: 1px 8px;
  border: 1px solid var(--pk-border-input);
  font-size: 0.75rem;
  line-height: 1.25rem !important;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pk-text-2);
}

.trust-card .trust-h3 a {
  color: var(--pk-heading);
}

/* Where the links go: a ruled list with the counts lined up. */
.trust-sources-title {
  margin-top: 2.5rem;
}

.trust-sources {
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 2px solid var(--pk-border-alt);
}

.trust-sources li {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  padding: 0.75rem 0;
  border-top: 2px solid var(--pk-border-alt);
}

.trust-source-count {
  min-width: 3.5rem;
  font-size: 1.75rem;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--pk-heading);
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.trust-source-label {
  font-size: 1.0625rem;
  line-height: 1.4;
  color: var(--pk-text);
}

/* Numbered steps. */
.trust-steps {
  max-width: 46rem;
  margin: 0;
  padding-left: 1.5rem;
  font-size: 1.1875rem;
  line-height: 1.55;
  color: var(--pk-text);
}

.trust-steps li {
  margin: 0 0 0.75rem;
  padding-left: 0.25rem;
}

/* Review history: date on the left, what was done on the right. */
.trust-reviews {
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 2px solid var(--pk-border-alt);
}

.trust-review {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  padding: 1rem 0;
  border-top: 2px solid var(--pk-border-alt);
}

.trust-review-date {
  flex: 0 0 11rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--pk-heading);
}

.trust-review-text {
  flex: 1 1 24rem;
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.55 !important;
  color: var(--pk-text);
}

/* Closing line. */
.trust-closing {
  margin: 3rem 0 0;
  font-size: clamp(2rem, 5vw, 3rem);
  /* Same open spacing as the section headings */
  line-height: 1.2 !important;
  font-weight: 800;
  letter-spacing: -0.045em;
  color: var(--pk-heading);
}

.trust-closing-2 {
  color: var(--pk-brand-text);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
