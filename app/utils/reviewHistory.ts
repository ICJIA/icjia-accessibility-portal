/**
 * @fileoverview Dated history of the FAQ's full reviews, for the /trust page
 * @description Every full review of the FAQ against primary sources, newest
 * first. The /trust page lists these, so readers can see that the FAQ is
 * checked again and again rather than written once.
 *
 * Add a new entry at the TOP after every full review, in the same commit that
 * moves `lastReviewed` in `content/faqs.md`. A unit test checks that the list
 * is newest first and that the newest entry's date matches `lastReviewed`.
 * Write for readers, not developers. Dates are `YYYY-MM-DD` strings (Chicago
 * calendar dates), never `Date` objects, so server and browser render the same.
 * @module reviewHistory
 */

/** One full review of the FAQ. */
export interface ReviewEntry {
  /** Calendar date the review finished, `YYYY-MM-DD`. */
  date: string;
  /** What was done and what it found, in one or two plain sentences. */
  summary: string;
}

/** Every full review, newest first. */
export const REVIEW_HISTORY: ReviewEntry[] = [
  {
    date: "2026-11-25",
    summary:
      "Six reviewers read every question, and the links page, at the same time. Each finding was checked against the official source before anything changed. About 50 corrections, mostly wording made more exact.",
  },
  {
    date: "2026-11-06",
    summary:
      "Every answer checked for anything out of date, then checked a second time by reviewers trying to prove it wrong. About 30 small corrections.",
  },
  {
    date: "2026-10-26",
    summary:
      "Every answer re-read against current sources, then split into seven parts and reviewed again, each part by a reviewer trying to prove it wrong.",
  },
  {
    date: "2026-09-02",
    summary:
      "Full re-check against the federal regulation, the Federal Register, Illinois DoIT, and W3C, with every link tested.",
  },
  {
    date: "2026-08-13",
    summary:
      "About 250 claims and 190 links checked against primary sources. Eight new questions added.",
  },
  {
    date: "2026-05-14",
    summary:
      "Every answer read by a reviewer trying to prove it wrong, held to the three authorities that govern an Illinois state agency: the IITAA, ADA Title II, and WCAG 2.1.",
  },
];
