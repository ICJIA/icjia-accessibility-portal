/**
 * @fileoverview What's New entries for the ICJIA Accessibility Portal
 * @description The single source for the "What's New" banner at the top of the
 * countdown card and for the /whats-new archive page. Each release that changes
 * what a reader sees gets an entry here, written for readers (not developers):
 * what changed and why it matters. The banner shows the newest entry; the
 * archive shows every entry, newest first.
 *
 * Add new entries at the TOP of `WHATS_NEW_ENTRIES`. Dates are plain
 * `YYYY-MM-DD` strings (Chicago calendar dates), never `Date` objects, so the
 * server and the browser always render the same text (no hydration mismatch).
 * @module whatsNew
 */

/** A link shown with a What's New entry. */
export interface WhatsNewLink {
  /** Visible link text. It is also the accessible name, so make it descriptive on its own. */
  text: string;
  /** Internal path (e.g. `/faqs#…`) or a full external URL. */
  href: string;
}

/** One What's New entry. */
export interface WhatsNewEntry {
  /** Stable, unique id (used as the list key and as the entry's anchor on /whats-new). */
  id: string;
  /** Calendar date of the change, `YYYY-MM-DD`. */
  date: string;
  /** Short badge label, e.g. "Updated", "New", "Extended". Rendered uppercase with the date. */
  badge: string;
  /** One-line headline. */
  title: string;
  /** One or two plain-language sentences. The banner shows this; keep it short. */
  summary: string;
  /** Optional bullet points with the details, shown on /whats-new. */
  details?: string[];
  /** Optional links (sources, the FAQ question that changed). */
  links?: WhatsNewLink[];
}

/**
 * Every What's New entry, newest first. Add new entries at the top.
 * @type {WhatsNewEntry[]}
 */
export const WHATS_NEW_ENTRIES: WhatsNewEntry[] = [
  {
    id: "2026-11-25-why-trust-these-faqs",
    date: "2026-11-25",
    badge: "New",
    title: "A new page on why these FAQs can be trusted",
    summary:
      "A new page shows what every answer rests on (ADA Title II, the Illinois IITAA, and WCAG 2.1), how many links go straight to them, and every full review of the FAQ, dated. It's linked from the top of every page.",
    details: [
      "The numbers on the page are counted from the FAQ itself each time the site is built: 120 questions, and more than 400 links straight to the federal regulation, the Federal Register, ADA.gov, Illinois DoIT, the IITAA statute, and W3C.",
      "Every full review since May 2026 is listed with its date and what it found.",
      "It answers the question head on: one person compiles this FAQ, and its weight comes from what it cites, not anyone's title.",
      "Also new: the top bar matches ICJIA's document checker, and \"Audit PDF\" now sits at the end of it, marked as a link to that other site.",
    ],
    links: [{ text: "Why trust these FAQs?", href: "/trust" }],
  },
  {
    id: "2026-11-25-new-look-and-review",
    date: "2026-11-25",
    badge: "Redesigned",
    title: "A new look, and a late-November accuracy review",
    summary:
      "The portal has a new design that matches ICJIA's document checker at audit.icjia.app. Every answer was also checked again against the official sources: Illinois state agencies still have until April 26, 2027, and about 50 small corrections make the FAQ more precise.",
    details: [
      "New design on every page: larger type, a dark background, the countdown at the top of the home page, and questions that open as simple rows. Nothing about how the site works has changed.",
      "Re-checked against the official sources: the federal deadline (April 26, 2027 for Illinois state agencies), no new DOJ or HHS web rule, and no change to Illinois's IITAA standards.",
      "The lawsuit over the deadline extension (NFB v. DOJ) has moved forward: the National Federation of the Blind asked the court for summary judgment on September 28, 2026, and on November 13 the court gave the government more time to respond. There is no ruling yet.",
      "About 50 small corrections from a line-by-line review, mostly wording made more exact: what counts as archived web content, how each law is enforced, and which claims rest on the rules themselves.",
      "ICJIA's document checker at audit.icjia.app now takes up to 25 files at a time, and voicecap's published results now cover seven ICJIA websites.",
    ],
    links: [{ text: "Read the FAQs", href: "/faqs" }],
  },
  {
    id: "2026-11-06-november-review",
    date: "2026-11-06",
    badge: "Reviewed",
    title: "FAQ reviewed and corrected for November; voicecap in more answers",
    summary:
      "Every answer was checked again against the official sources. Illinois state agencies still have until April 26, 2027, and about 30 small corrections make the FAQ more precise.",
    details: [
      "Re-checked against the official sources: the federal deadline (April 26, 2027 for Illinois state agencies), no new DOJ or HHS web rule, no ruling yet in the NFB v. DOJ lawsuit, and no change to Illinois's IITAA standards.",
      "About 30 small corrections from a line-by-line accuracy review: mostly legal wording made more exact, plus details of ICJIA's ADA grievance procedure, a few tool instructions, and claims that lacked a source.",
      "ICJIA's free screen reader testing tool, voicecap, is now mentioned in eight more answers, including the ones on the accessibility coordinator, executive staff, and third-party tools. Its section was updated to match voicecap 0.24.1.",
      "The Canva accessibility report link now goes to Canva's accessibility statement, which points to its current report.",
      "This What's New page is new, so you can see what changed at a glance.",
    ],
    links: [{ text: "Read the FAQs", href: "/faqs" }],
  },
  {
    id: "2026-10-26-voicecap-section",
    date: "2026-10-26",
    badge: "New",
    title: "New section: Screen Reader Testing (voicecap)",
    summary:
      "Eight new questions explain voicecap, ICJIA's free tool that has the NVDA screen reader read every page of a site and keeps a record of everything it says. Every answer was also reviewed against primary sources.",
    details: [
      "New FAQ section: what voicecap is and why ICJIA built it, how it differs from automated checkers, how it works, how much time it saves, how a manager or auditor can check its results, what it doesn't do, and how to get started.",
      "An accuracy review of every answer against official sources: the eCFR, the Federal Register, Illinois law, Illinois DoIT, and W3C.",
      "The complaints answer now describes ICJIA's formal ADA grievance procedure (4 Ill. Adm. Code Part 150).",
      "Confirmed: ICJIA hasn't designated an accessibility coordinator yet. In the meantime, contact ICJIA's IT department.",
    ],
    links: [
      {
        text: "What is voicecap, and why did ICJIA build it?",
        href: "/faqs#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it",
      },
      { text: "voicecap on GitHub", href: "https://github.com/ICJIA/voicecap" },
    ],
  },
  {
    id: "2026-09-02-september-review",
    date: "2026-09-02",
    badge: "Reviewed",
    title: "September accuracy review and link check",
    summary:
      "The deadline's legal status was re-checked, and every citation link in the FAQ was tested and repaired where pages had moved.",
    details: [
      "Status updates on the NFB v. DOJ lawsuit, DOJ's interim rule, HHS's Section 504 rule, and the IITAA's 2026 review.",
      "Every citation link was tested. Links to pages that had moved were repaired, and WCAG quick-reference links now use W3C's current addresses.",
      "The question about per-site audit reports was withdrawn on September 3 while the reports move to new locations.",
    ],
  },
  {
    id: "2026-08-13-new-questions-and-chips",
    date: "2026-08-13",
    badge: "New",
    title: "Eight new questions, plus New and Updated labels",
    summary:
      "Eight new questions cover the deadline extension, WCAG 2.2, and vendor VPATs. Questions now show a New or Updated label so you can spot recent changes.",
    details: [
      "New questions include: Is the April 26, 2027 deadline final, or could a court move it back? Did the federal deadline extension give Illinois agencies an extra year? Should we test against WCAG 2.2 or WCAG 2.1? What if a vendor has no VPAT or refuses to provide one?",
      "Each question now shows \"New\" or \"Updated on mm/dd/yyyy\" for 21 days after it changes.",
      "A \"Last reviewed\" date now shows how recently the FAQ was checked.",
      "Quotes from the regulations now match the official text word for word.",
      "A plain-language pass across the site: less legal jargon, fewer absolutes.",
    ],
  },
  {
    id: "2026-05-14-official-sources",
    date: "2026-05-14",
    badge: "Updated",
    title: "Official sources for every citation, and two new questions",
    summary:
      "Every regulation citation now links to an official government source. New questions cover IAAP certification and whether hiring a remediator shields an agency.",
    details: [
      "Citations now link to official sources (eCFR, ADA.gov, and govinfo.gov) instead of third-party copies of the law.",
      "New question: Does hiring a remediator shield our agency from compliance liability?",
      "New question: Does IAAP certification help, and can it build agency confidence in our accessibility work?",
      "Accuracy fixes found in an adversarial review of the FAQ.",
    ],
  },
  {
    id: "2026-05-06-vendors-and-scanners",
    date: "2026-05-06",
    badge: "New",
    title: "New questions on vendors, remediation, and scanner scores",
    summary:
      "New questions answer common manager questions about remediation vendors, fixing source documents, and why different scanners give different scores.",
    details: [
      "New question: Why does SiteImprove (or another scanner) show 98% when axe-core shows 100%?",
      "New question: We hired a third-party remediation firm. Does that mean authors don't need to learn accessibility anymore?",
      "New question: Why fix the source document (Word) instead of fixing the PDF after it's published?",
      "Direct quotes from the regulations, with links, added across the FAQ.",
      "Tableau now appears alongside ArcGIS and Canva in the third-party tools guidance.",
    ],
  },
  {
    id: "2026-04-20-deadline-extended",
    date: "2026-04-20",
    badge: "Extended",
    title: "Deadline extended one year by DOJ Interim Final Rule",
    summary:
      "Illinois state agencies now have until April 26, 2027 (previously April 24, 2026). The countdown, the FAQ, and the downloads were all updated.",
    links: [
      {
        text: "Federal Register notice",
        href: "https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web",
      },
      {
        text: "Government Technology coverage",
        href: "https://www.govtech.com/policy/federal-accessibility-deadline-will-be-delayed-one-year",
      },
    ],
  },
  {
    id: "2026-03-26-pdf-checker",
    date: "2026-03-26",
    badge: "New",
    title: "New question about ICJIA's free file checker",
    summary:
      "A new question covers ICJIA's free file accessibility checker at audit.icjia.app. The portal also got stronger security settings.",
    links: [
      {
        text: "Is there a quick way to test PDF files for accessibility?",
        href: "/faqs#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility",
      },
    ],
  },
  {
    id: "2025-12-15-launch",
    date: "2025-12-15",
    badge: "Launched",
    title: "The ICJIA Accessibility Portal launched",
    summary:
      "The portal launched with the FAQ, a countdown to the compliance deadline, and curated accessibility links.",
    details: [
      "Search, a printer-friendly version of the FAQ, and Word, Markdown, and plain-text downloads followed in early 2026.",
    ],
  },
];

/**
 * Every entry, sorted newest first (by date, then by position in the source list).
 * Sorting here means a mis-ordered addition can never put an old entry in the banner.
 * @returns {WhatsNewEntry[]} A new array, newest first
 * @example
 * ```ts
 * const [latest] = getWhatsNewEntries()
 * ```
 */
export function getWhatsNewEntries(): WhatsNewEntry[] {
  return WHATS_NEW_ENTRIES.map((entry, index) => ({ entry, index }))
    .sort((a, b) =>
      a.entry.date === b.entry.date
        ? a.index - b.index
        : a.entry.date < b.entry.date
          ? 1
          : -1,
    )
    .map(({ entry }) => entry);
}

/**
 * The newest entry, for the banner.
 * @returns {WhatsNewEntry | undefined} The newest entry, or undefined if there are none
 */
export function getLatestWhatsNew(): WhatsNewEntry | undefined {
  return getWhatsNewEntries()[0];
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Formats a `YYYY-MM-DD` date as "November 6, 2026". String-based, so it never
 * shifts a day across time zones.
 * @param {string} isoDate - Date as `YYYY-MM-DD`
 * @returns {string} Long date, or the input unchanged if it isn't `YYYY-MM-DD`
 * @example
 * ```ts
 * formatWhatsNewDate('2026-11-06') // "November 6, 2026"
 * ```
 */
export function formatWhatsNewDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const [, year, month, day] = match;
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName) return isoDate;
  return `${monthName} ${Number(day)}, ${year}`;
}

/**
 * Formats a `YYYY-MM-DD` date as "11/6/2026", for the badge.
 * @param {string} isoDate - Date as `YYYY-MM-DD`
 * @returns {string} Short date, or the input unchanged if it isn't `YYYY-MM-DD`
 * @example
 * ```ts
 * formatWhatsNewShortDate('2026-11-06') // "11/6/2026"
 * ```
 */
export function formatWhatsNewShortDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const [, year, month, day] = match;
  return `${Number(month)}/${Number(day)}/${year}`;
}

/**
 * Whether a link points off-site (opens in a new tab).
 * @param {string} href - Link target
 * @returns {boolean} True for http(s) URLs
 */
export function isExternalWhatsNewLink(href: string): boolean {
  return /^https?:\/\//.test(href);
}
