# Proposed FAQ additions — September 2026 review

Seven new questions drafted during the September 2, 2026 accuracy review of `content/faqs.md`. Each is written in the FAQ's house style (Quick answer → verbatim rule text with primary-source links → practical guidance → references), sourced only to the three pillars (IITAA, ADA Title II, WCAG 2.1), and ready to paste under the section named in its "Where" line. Set the `{new:YYYY-MM-DD}` date to the day each is added, and re-run `yarn test:run` afterward (the internal-link test validates anchors).

None of these are in `content/faqs.md` yet — they are suggestions for review.

---

## 1. Can we publish a separate "accessible version" instead of fixing the original?

**Where:** `## Compliance Requirements (IITAA and ADA Title II)`, after "What does the April 2027 deadline cover?"
**Why:** Agencies regularly propose a parallel "accessible" page or PDF as a shortcut. The rule allows this only in a narrow case, and the FAQ doesn't say so anywhere yet.

```markdown
### Can we publish a separate "accessible version" instead of fixing the original?

{new:2026-09-02}

**Quick answer:** Only as a last resort. The ADA Title II web rule lets a public entity rely on a separate "conforming alternate version" **only where it is not possible to make the original content directly accessible because of a technical or legal limitation** — not because fixing the original is inconvenient or expensive. When you do use one, it has to be a true equivalent (same information, same functionality, kept up to date) that people can actually find. Fixing the original is almost always the simpler path.

**Verbatim from the rule (28 CFR § 35.202 "Conforming alternate versions"):**

> "A public entity may use conforming alternate versions of web content, as defined by WCAG 2.1, to comply with § 35.200 only where it is not possible to make web content directly accessible due to technical or legal limitations."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.202" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.202 (eCFR)</a>

**What "conforming alternate version" means (WCAG 2.1 definition):**

> "**conforming alternate version** — version that
>
> 1. conforms at the designated level, and
> 2. provides all of the same information and functionality in the same human language, and
> 3. is as up to date as the non-conforming content, and
> 4. for which at least one of the following is true:
>    - the conforming version can be reached from the non-conforming page via an accessibility-supported mechanism, or
>    - the non-conforming version can only be reached from the conforming version, or
>    - the non-conforming version can only be reached from a conforming page that also provides a mechanism to reach the conforming version"

— <a href="https://www.w3.org/TR/WCAG21/#dfn-conforming-alternate-versions" target="_blank" rel="noopener noreferrer">WCAG 2.1, definition of "conforming alternate version" (W3C)</a> — the definition's notes add that the alternate "does not need to be matched page for page with the original" but must be "as freely available as the non-conforming version."

**Three things the rule text settles:**

1. **The bar is "not possible," not "not convenient."** A legacy dashboard whose vendor can't fix keyboard access this year, or a legally mandated form layout you can't alter, may qualify. A PDF that would take an afternoon to tag does not — the rule expects you to fix it.
2. **The alternate has to be a real equivalent.** Same information, same functions, updated whenever the original changes, and reachable through an accessible link from the original (or from the same place). An "accessible version" that is a summary, or that lags the original, doesn't conform.
3. **Separate can't mean lesser.** The general Title II regulation has said since 1991 that a public entity may not "provide different or separate aids, benefits, or services to individuals with disabilities … unless such action is necessary to provide qualified individuals with disabilities with aids, benefits, or services that are as effective as those provided to others" (<a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-B/section-35.130" target="_blank" rel="noopener noreferrer">28 CFR § 35.130(b)(1)(iv)</a>). The web rule's "only where it is not possible" language is that principle applied to web content.

**A related provision that is often confused with this one — equivalent facilitation (§ 35.203):**

> "Nothing in this subpart prevents the use of designs, methods, or techniques as alternatives to those prescribed, provided that the alternative designs, methods, or techniques result in substantially equivalent or greater accessibility and usability of the web content or mobile app."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.203" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.203 (eCFR)</a>

Equivalent facilitation is about *how* you make the original accessible (a different technique that works as well or better), not about maintaining a second copy. It is not a route to a separate version.

**What to do in practice:**

- **Default to fixing the original.** For documents, that means fixing the Word source (see [Why fix the source document (Word) instead of fixing the PDF after it's published?](#content-accessibility-documents-pdfs-presentations-why-fix-the-source-document-word-instead-of-fixing-the-pdf-after-it-s-published)).
- **If you genuinely can't** (technical or legal limitation), document *why*, build the alternate as a complete equivalent, link it from the original, and put its upkeep on the same change process as the original — alternate versions drift out of date the moment someone edits only one of them.
- **Don't confuse this with the accessible-alternative-on-request duty.** Providing an accessible format when a person asks (28 CFR § 35.160) is always required and is separate from whether your published content conforms.

**See also:** [What if we can't meet the April 26, 2027 deadline?](#state-agency-applicability-what-if-we-can-t-meet-the-april-26-2027-deadline) | [How do we ensure accessibility compliance with third-party tools…](#procurement-and-third-party-tools-how-do-we-ensure-accessibility-compliance-with-third-party-tools-like-lmss-docebo-docusign-tableau-arcgis-and-canva)

**References:**

- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.202" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.202 (eCFR)</a> — Conforming alternate versions
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.203" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.203 (eCFR)</a> — Equivalent facilitation
- <a href="https://www.w3.org/TR/WCAG21/#conformance" target="_blank" rel="noopener noreferrer">WCAG 2.1, Section 5 (Conformance)</a> — Conformance requirements and the conforming-alternate-version definition
```

---

## 2. Can we claim "undue burden" or "fundamental alteration" to skip remediating something?

**Where:** `## Compliance Requirements (IITAA and ADA Title II)`, directly after item 1 above (or after "What if we can't meet the April 26, 2027 deadline?" in State Agency Applicability).
**Why:** The phrase appears in § 35.200(b) and managers ask about it; the FAQ quotes § 35.205 (minimal impact) but never explains the undue-burden defense or the fact that it requires a written decision by the agency head.

```markdown
### Can we claim "undue burden" or "fundamental alteration" to skip remediating something?

{new:2026-09-02}

**Quick answer:** It exists, but it is a narrow, documented, content-by-content defense — not a policy an agency can adopt. The rule puts the burden of proof on the public entity, requires the decision to be made by the **head of the agency (or designee) in a written statement** after weighing *all* of the agency's resources, and even then requires the agency to do everything that *doesn't* cause the burden. For most web content and documents it will not apply. Talk to legal counsel before relying on it.

**Where it comes from — the compliance requirement itself carries the limit (28 CFR § 35.200(b)(1)):**

> "… shall ensure that the web content and mobile apps … comply with Level A and Level AA success criteria and conformance requirements specified in WCAG 2.1, **unless the public entity can demonstrate that compliance with this section would result in a fundamental alteration in the nature of a service, program, or activity or in undue financial and administrative burdens.**"

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.200(b)(1) (eCFR)</a>

**Verbatim from the rule — how the defense has to be made (28 CFR § 35.204 "Duties"):**

> "Where a public entity can demonstrate that compliance with the requirements of § 35.200 would result in a fundamental alteration in the nature of a service, program, or activity or in undue financial and administrative burdens, compliance with § 35.200 is required to the extent that it does not result in a fundamental alteration or undue financial and administrative burdens. In those circumstances where personnel of the public entity believe that the proposed action would fundamentally alter the service, program, or activity or would result in undue financial and administrative burdens, **a public entity has the burden of proving** that compliance with § 35.200 would result in such alteration or burdens. **The decision that compliance would result in such alteration or burdens must be made by the head of a public entity or their designee after considering all resources available for use in the funding and operation of the service, program, or activity, and must be accompanied by a written statement of the reasons for reaching that conclusion.** If an action would result in such an alteration or such burdens, a public entity shall take any other action that would not result in such an alteration or such burdens but would nevertheless ensure that individuals with disabilities receive the benefits or services provided by the public entity to the maximum extent possible."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.204" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.204 (eCFR)</a> _(emphasis added)_

**What that means in plain terms:**

| The rule says | So in practice |
| ------------- | -------------- |
| The agency has "the burden of proving" it | You need evidence, not an assertion — cost estimates, what was tried, why alternatives don't work |
| Decided by "the head of a public entity or their designee" | Not a unit manager, not the web team, not a vendor |
| "after considering all resources available" for the program | Cost is measured against the agency's resources as a whole, not one unit's budget line |
| "accompanied by a written statement of the reasons" | An undocumented decision isn't one the rule recognizes |
| Still must act "to the maximum extent possible" | Even when the defense applies, you provide the closest accessible alternative you can — it is never a full pass |

**How it differs from the other two "escape hatches" in the rule:**

- **The § 35.201 exceptions** (archived content, preexisting documents, third-party content, individualized secured documents, preexisting social media) are categories of content the requirement doesn't reach — see [Are there exceptions to the April 2027 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies)
- **§ 35.205 (minimal impact)** covers noncompliance so slight that it doesn't affect anyone's ability to use the content — see [What if we can't meet the April 26, 2027 deadline?](#state-agency-applicability-what-if-we-can-t-meet-the-april-26-2027-deadline)
- **§ 35.204 (undue burden / fundamental alteration)** is for content the rule *does* reach, where compliance itself would be prohibitively burdensome or would change the nature of the program. It is decided per situation, by the agency head, in writing.

**A note for Illinois agencies:** the IITAA 2.1 Standards apply on their own terms, so a federal undue-burden determination doesn't by itself settle the state-law question. Check with Illinois DoIT and your legal counsel.

**See also:** [Can we publish a separate "accessible version" instead of fixing the original?](#compliance-requirements-iitaa-and-ada-title-ii-can-we-publish-a-separate-accessible-version-instead-of-fixing-the-original) | [How can I track and demonstrate "good-faith progress" toward compliance?](#getting-started-how-can-i-track-and-demonstrate-good-faith-progress-toward-compliance)

**References:**

- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.204" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.204 (eCFR)</a> — Duties (burden of proof, written statement by the agency head)
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.200 (eCFR)</a> — The compliance requirement and its built-in limit
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — State-law standards that apply independently
```

---

## 3. Do live-streamed public meetings, webinars, and trainings need captions?

**Where:** `## Website Accessibility`, directly after "Do I need to caption all videos?"
**Why:** The captions Q&A mentions live captions in one bullet; agencies now stream board meetings and webinars routinely, and the effective-communication duty (CART, interpreters on request) isn't connected to it anywhere.

```markdown
### Do live-streamed public meetings, webinars, and trainings need captions?

{new:2026-09-02}

**Quick answer:** Yes. When you stream live audio or video on your website or a channel you provide (YouTube, Facebook Live, a webinar platform), WCAG 2.1 Level AA requires **live captions** (Success Criterion 1.2.4). Separately — and regardless of the platform — ADA Title II's effective-communication rule means a participant who asks for real-time captioning (CART) or a sign-language interpreter should get it, with "primary consideration" given to what they request. Plan for both: captions on every stream, plus a clear way to request other accommodations before the event.

**Verbatim from WCAG 2.1 (W3C, normative):**

> **SC 1.2.4 Captions (Live) — Level AA:** "Captions are provided for all live audio content in synchronized media."

— <a href="https://www.w3.org/TR/WCAG21/#captions-live" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.2.4 (W3C)</a>

The ADA Title II web rule requires Level A and Level AA conformance (28 CFR § 35.200(b)), and its definition of web content expressly includes "videos" — so a live stream on your site, or on a platform you provide through a contract or license, is covered content.

**Verbatim from the rule — the effective-communication duty (28 CFR § 35.160):**

> "(a)(1) A public entity shall take appropriate steps to ensure that communications with applicants, participants, members of the public, and companions with disabilities are as effective as communications with others."
>
> "(b)(2) … In determining what types of auxiliary aids and services are necessary, a public entity shall give primary consideration to the requests of individuals with disabilities."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-E/section-35.160" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.160 (eCFR)</a>

The rule's list of "auxiliary aids and services" (28 CFR § 35.104) names the tools that matter here: "real-time computer-aided transcription services," "open and closed captioning, including real-time captioning," and "qualified interpreters on-site or through video remote interpreting (VRI) services." This duty has applied since 1991 and does not wait for the web rule's 2027 date.

**What this looks like in practice:**

| Situation | What to provide |
| --------- | --------------- |
| Live stream of a board meeting, webinar, or training on your site or channel | Live captions on the stream (SC 1.2.4). Platform auto-captions are a starting point; for public meetings, budget for a human captioner (CART) or at least a moderator correcting auto-captions in real time. |
| Someone requests CART or an ASL interpreter for the event | Provide it (§ 35.160), giving primary consideration to what they asked for. Put the request path — contact and a reasonable lead time — in every event notice. |
| Recording posted afterward | Now it's prerecorded video: accurate, corrected captions (SC 1.2.2, Level A) and audio description where the visuals carry information the audio doesn't (SC 1.2.5, Level AA) — see [Do I need to caption all videos?](#website-accessibility-do-i-need-to-caption-all-videos) |
| Slides shown during the stream | Post an accessible version of the deck (and any handouts) alongside the recording — people using screen readers can't read slides off a video. |

**Practical tips:**

- **Pick platforms that support live captions and let you add a captioner.** Ask the vendor how third-party CART feeds are displayed; test it before the first public event.
- **Announce accommodations in the notice.** "Live captioning will be provided. To request ASL interpretation or other accommodations, contact … by …" — and honor requests that arrive late where you reasonably can.
- **Keep the chat and Q&A accessible.** If participation runs through a chat panel, make sure keyboard and screen-reader users can use it, or offer another way to submit questions.

**See also:** [Do I need to caption all videos?](#website-accessibility-do-i-need-to-caption-all-videos) | [How do we ensure accessibility compliance with third-party tools…](#procurement-and-third-party-tools-how-do-we-ensure-accessibility-compliance-with-third-party-tools-like-lmss-docebo-docusign-tableau-arcgis-and-canva)

**References:**

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#captions-live" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.2.4 Captions (Live) — Level AA</a>
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-E/section-35.160" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.160 (eCFR)</a> — Effective communication and "primary consideration"
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.104" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.104 (eCFR)</a> — Definition of "auxiliary aids and services" (real-time captioning, VRI)
- <a href="https://www.ada.gov/resources/effective-communication/" target="_blank" rel="noopener noreferrer">ADA.gov: Effective Communication</a> — DOJ plain-language guidance
```

---

## 4. Which file types count as "conventional electronic documents" under the rule?

**Where:** `## Content Accessibility (Documents, PDFs, Presentations)`, directly after "Do all documents need to be accessible?"
**Why:** Two of the five § 35.201 exceptions apply only to "conventional electronic documents." The FAQ uses the term but never gives the definition, and the definition has real consequences (HTML pages, images, and videos are not "documents").

```markdown
### Which file types count as "conventional electronic documents" under the rule?

{new:2026-09-02}

**Quick answer:** Four families of files: **PDFs, word-processor files, presentation files, and spreadsheet files.** That's the rule's own definition, and it matters because two of the five exceptions — preexisting documents (§ 35.201(b)) and individualized, password-protected documents (§ 35.201(d)) — apply *only* to content in those formats. Web pages, images, audio, and video are not "conventional electronic documents," so those exceptions never cover them.

**Verbatim from the rule (28 CFR § 35.104 Definitions):**

> "_Conventional electronic documents_ means web content or content in mobile apps that is in the following electronic file formats: portable document formats ('PDF'), word processor file formats, presentation file formats, and spreadsheet file formats."

> "_Web content_ means the information and sensory experience to be communicated to the user by means of a user agent, including code or markup that defines the content's structure, presentation, and interactions. Examples of web content include text, images, sounds, videos, controls, animations, and conventional electronic documents."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.104" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.104 (eCFR)</a>

**How to map your files:**

| Your file | Is it a "conventional electronic document"? | Which exceptions could apply |
| --------- | ------------------------------------------- | ---------------------------- |
| PDF (.pdf) | Yes | § 35.201(b) preexisting documents; § 35.201(d) individualized secured documents |
| Word / Google Docs export / other word-processor files (.docx, .doc, .odt, .rtf) | Yes | Same |
| PowerPoint / other presentation files (.pptx, .key, .odp) | Yes | Same |
| Excel / other spreadsheet files (.xlsx, .xls, .ods) | Yes | Same |
| A web page (HTML), including a "document" published as a page | **No** — it's web content, not a document | Only § 35.201(a) archived web content (the strict four-part test) |
| Images, audio, video (.jpg, .png, .mp3, .mp4) | **No** | Only § 35.201(a) archived web content, or § 35.201(e) for pre-deadline social media posts |
| A form filled in online (not a downloadable file) | **No** | None of the document exceptions |

**Why the distinction matters:**

- **A pre-2027 web page is not a "preexisting document."** It doesn't get the § 35.201(b) pass. To be excepted it has to meet the archived-web-content definition — reference-only, never edited, in a clearly labeled archive area — which most live pages don't.
- **A pre-2027 PDF might be excepted, but only if** it isn't currently used to "apply for, gain access to, or participate in" your services. See [Are there exceptions to the April 2027 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies)
- **Formats outside the four families** — plain-text or data files, for example — aren't "conventional electronic documents" on the rule's own text, so don't assume the document exceptions reach them. Treat them as ordinary web content that has to meet WCAG 2.1 AA (for a data file, that usually means providing the data in an accessible table or an accessible spreadsheet alongside it).

**The bottom line:** publish new content as accessible HTML where you can; when a file is the right format, remember the file-type test above before assuming an exception applies — and remember that the IITAA reaches "electronic documents" of every kind regardless of these federal categories.

**See also:** [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible) | [Are there exceptions to the April 2027 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies)

**References:**

- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.104" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.104 (eCFR)</a> — Definitions of "conventional electronic documents," "web content," and "archived web content"
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.201" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.201 (eCFR)</a> — The five exceptions
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — IITAA coverage of "electronic documents & videos"
```

---

## 5. Is PDF/UA required, or is WCAG 2.1 enough for PDFs?

**Where:** `## Content Accessibility (Documents, PDFs, Presentations)`, after "How do I make a PDF accessible?"
**Why:** PAC reports, Canva notes, and vendors all talk about "PDF/UA"; the FAQ mentions it without explaining how it relates to the legal target.

```markdown
### Is PDF/UA required, or is WCAG 2.1 enough for PDFs?

{new:2026-09-02}

**Quick answer:** **WCAG 2.1 Level AA is the legal target for PDFs**, under both the ADA Title II web rule and the IITAA 2.1 Standards. **PDF/UA is not required by either.** PDF/UA (ISO 14289) is a technical standard for how an accessible PDF is built internally — tags, reading order, alt text, metadata — and a PDF/UA-conformant file is usually the most reliable way to satisfy WCAG's PDF requirements. Think of WCAG as *what* the law measures and PDF/UA as *how* a well-built PDF gets there.

**What the rules actually cite:**

- **ADA Title II web rule:** 28 CFR § 35.200(b) requires "Level A and Level AA success criteria and conformance requirements specified in WCAG 2.1" for web content — and the rule's definition of web content expressly includes conventional electronic documents such as PDFs (<a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200 (eCFR)</a>; <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.104" target="_blank" rel="noopener noreferrer">28 CFR § 35.104 (eCFR)</a>).
- **IITAA 2.1 Standards:** "require conformance with WCAG 2.1 AA" (<a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>), and the IITAA covers "electronic documents" by name.

Neither mentions PDF/UA.

**How the two relate in practice:**

| | WCAG 2.1 Level AA | PDF/UA (ISO 14289) |
| --- | --- | --- |
| What it is | The accessibility standard the law points to; format-neutral | A technical specification for accessible PDF files |
| Who requires it | ADA Title II web rule, IITAA 2.1 | No U.S. law or Illinois standard — voluntary |
| What it checks | Outcomes for users: text alternatives, structure, contrast, keyboard use, language, links, and so on | Internal PDF structure: tag tree, reading order, alt text presence, language, metadata, fonts |
| Relationship | Success criteria such as 1.1.1, 1.3.1, 1.3.2, 2.4.2, 3.1.1 are satisfied through the same tagging PDF/UA specifies | A PDF/UA-conformant file will normally pass most of WCAG's structural criteria, but PDF/UA does not judge things like contrast or whether alt text is meaningful |

**What to do:**

1. **Aim for a tagged, PDF/UA-clean file** — that's what checkers like PAC and Acrobat's checker test, and it covers the structural WCAG criteria in one pass.
2. **Then check the WCAG-only items a PDF/UA pass doesn't cover:** color contrast (SC 1.4.3), meaningful (not just present) alt text (SC 1.1.1), descriptive link text (SC 2.4.4), and whether the document is usable in a logical reading order with a screen reader.
3. **Report conformance against WCAG 2.1 Level AA**, since that is what IITAA and the federal rule measure. "PDF/UA compliant" on a vendor deliverable is good evidence, not the finish line.
4. **Better still, avoid the PDF** when the content can be a web page — see [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible)

**See also:** [How do I make a PDF accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-a-pdf-accessible) | [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility)

**References:**

- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.200 (eCFR)</a> — WCAG 2.1 Level A/AA as the standard
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — IITAA 2.1 Standards (WCAG 2.1 AA)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference (Level AA)</a> — The criteria PDFs are measured against
- <a href="https://pac.pdf-accessibility.org/" target="_blank" rel="noopener noreferrer">PAC (PDF Accessibility Checker)</a> — Free checker for PDF/UA and WCAG structure
```

---

## 6. If the federal web rule were delayed again or withdrawn, would we still have to meet WCAG 2.1 AA?

**Where:** `## Compliance Requirements (IITAA and ADA Title II)`, after "Did the federal deadline extension give Illinois agencies an extra year?"
**Why:** With the deadline already extended once by interim rule and under litigation, staff ask this directly. The answer is a clean "yes" grounded in state law and the pre-existing Title II regulation.

```markdown
### If the federal web rule were delayed again or withdrawn, would we still have to meet WCAG 2.1 AA?

{new:2026-09-02}

**Quick answer:** Yes. For an Illinois state agency, the WCAG 2.1 Level AA requirement does not depend on the federal web rule. The **IITAA 2.1 Standards have required WCAG 2.1 Level AA since June 24, 2024** under state law, and the general ADA Title II regulation — equal access and effective communication — has bound state agencies since 1991 and would remain in force whatever happens to the 2024 web rule's dates. The federal rule changes *when DOJ can enforce a specific technical standard*; it is not the only source of the obligation.

**The two things that stay put no matter what DOJ does:**

**1. Illinois law (IITAA) — in effect now.**

> "The IITAA 2.1 Standards, which require conformance with WCAG 2.1 AA, went into effect on June 24, 2024."

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

Illinois DoIT said the same thing when the federal extension was announced:

> "The same requirement already applies under the Illinois Information Technology Accessibility Act (IITAA) and the Americans with Disabilities Act (ADA), so the extension only changes when the DOJ may begin taking additional enforcement actions."

— <a href="https://doit.illinois.gov/doit-news/accessibility-news/doj-extends-deadline-for-rule-on-web-accessibility.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: DOJ Extends Deadline for Rule on Web Accessibility</a>

**2. The general ADA Title II regulation — in force since 1991.**

> "A public entity, in providing any aid, benefit, or service, may not, directly or through contractual, licensing, or other arrangements, on the basis of disability— (i) Deny a qualified individual with a disability the opportunity to participate in or benefit from the aid, benefit, or service; …"

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-B/section-35.130" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.130(b)(1) (eCFR)</a>

> "A public entity shall take appropriate steps to ensure that communications with applicants, participants, members of the public, and companions with disabilities are as effective as communications with others."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-E/section-35.160" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.160(a)(1) (eCFR)</a>

Those provisions live in subparts B and E of the regulation, not in the 2024 web rule (subpart H). Inaccessible web content could violate them before the web rule existed, and it still could if the web rule's dates moved again.

**What would change and what wouldn't:**

| | Today | If the federal date moved again or the web rule were withdrawn |
| --- | --- | --- |
| IITAA 2.1 (WCAG 2.1 AA) | Applies now | Still applies — state law |
| General Title II duties (§ 35.130, § 35.160) | Apply now | Still apply |
| Federal WCAG 2.1 AA deadline (§ 35.200) | April 26, 2027 | Whatever the new date is, or none |
| Your remediation plan | Keep going | Keep going |

**Key takeaway:** Plan to the IITAA, which is already in effect, and the federal date takes care of itself. Nothing built to WCAG 2.1 Level AA is wasted under any scenario.

**See also:** [Is the April 26, 2027 deadline final, or could a court move it back?](#compliance-requirements-iitaa-and-ada-title-ii-is-the-april-26-2027-deadline-final-or-could-a-court-move-it-back) | [Did the federal deadline extension give Illinois agencies an extra year?](#compliance-requirements-iitaa-and-ada-title-ii-did-the-federal-deadline-extension-give-illinois-agencies-an-extra-year) | [Can we face complaints or lawsuits before April 2027?](#compliance-requirements-iitaa-and-ada-title-ii-can-we-face-complaints-or-lawsuits-before-april-2027)

**References:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — IITAA 2.1 Standards, effective June 24, 2024
- <a href="https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2918&ChapterID=7" target="_blank" rel="noopener noreferrer">30 ILCS 587 (ILGA)</a> — The IITAA statute
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-B/section-35.130" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.130 (eCFR)</a> — General prohibitions against discrimination (1991)
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-E/section-35.160" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.160 (eCFR)</a> — Effective communication (1991)
```

---

## 7. Do we need an accessibility statement on our website?

**Where:** `## Website Accessibility`, after "Do we need an independent (external) accessibility audit…?" (or in `## ICJIA-Specific Information` before "How do we handle accessibility complaints?")
**Why:** Frequently asked, and the honest answer connects to a real requirement the FAQ already flags — § 35.107's coordinator contact and published grievance procedure.

```markdown
### Do we need an accessibility statement on our website?

{new:2026-09-02}

**Quick answer:** None of the three authorities — the IITAA, the ADA Title II web rule, or WCAG 2.1 — requires a page called "Accessibility Statement." But ADA Title II *does* require an agency with 50 or more employees to make its ADA coordinator's contact information available and to publish its grievance procedure, and an accessibility page is the natural place to do both. So: not required by name, but the right home for two things that are.

**Verbatim from the rule (28 CFR § 35.107):**

> "(a) _Designation of responsible employee._ A public entity that employs 50 or more persons shall designate at least one employee to coordinate its efforts to comply with and carry out its responsibilities under this part … **The public entity shall make available to all interested individuals the name, office address, and telephone number of the employee or employees designated pursuant to this paragraph.**
>
> (b) _Complaint procedure._ A public entity that employs 50 or more persons shall **adopt and publish grievance procedures** providing for prompt and equitable resolution of complaints alleging any action that would be prohibited by this part."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.107" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.107 (eCFR)</a> _(emphasis added)_

**What a useful accessibility page contains:**

1. **The standard you work to** — WCAG 2.1 Level AA, under the IITAA and ADA Title II.
2. **How to report a barrier or request an accessible format** — an email and phone number that someone actually monitors, and how quickly they can expect a reply. This is the practical side of the effective-communication duty (28 CFR § 35.160).
3. **ADA coordinator contact information** — name, office address, telephone number (the § 35.107(a) requirement).
4. **The grievance procedure** — or a link to it (the § 35.107(b) requirement).
5. **Known limitations** — content or tools you're still remediating, and the accessible alternative in the meantime. Honesty here is better than a blanket "fully compliant" claim you can't back up.
6. **The date it was last reviewed.**

**What to avoid:**

- **Claiming a "certification."** No agency or vendor certifies WCAG conformance — see [Who signs off that we're compliant?](#getting-started-who-signs-off-that-we-re-compliant-can-we-certify-wcag-2-1-level-aa-compliance)
- **A statement that is a legal disclaimer rather than a service page.** Its main job is to help a person who hit a barrier get what they need.
- **Letting it go stale.** Review it when you review the site.

W3C's <a href="https://www.w3.org/WAI/planning/statements/" target="_blank" rel="noopener noreferrer">Developing an Accessibility Statement</a> guide (with a generator) is a good starting template.

**For ICJIA specifically:** ICJIA has not yet designated an accessibility coordinator or finalized a complaint procedure (see [How do we handle accessibility complaints?](#icjia-specific-information-how-do-we-handle-accessibility-complaints)). Standing up an accessibility page with the § 35.107 items is one of the concrete steps that would close that gap.

**See also:** [Do we need an agency accessibility coordinator?](#state-agency-applicability-do-we-need-an-agency-accessibility-coordinator) | [How do we handle accessibility complaints?](#icjia-specific-information-how-do-we-handle-accessibility-complaints)

**References:**

- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.107" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.107 (eCFR)</a> — Coordinator contact information and published grievance procedures
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-E/section-35.160" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.160 (eCFR)</a> — Effective communication
- <a href="https://www.w3.org/WAI/planning/statements/" target="_blank" rel="noopener noreferrer">W3C WAI: Developing an Accessibility Statement</a> — Best-practice guidance and generator
```

---

## Also worth considering (not drafted)

- **Keyword Index entries** — each added question should also be listed under the matching heading in `## Keyword Index` (Compliance & Legal; Videos & Media; Documents; Website Development).
- **Glossary entries** — "Conforming alternate version," "Undue burden / fundamental alteration," "PDF/UA," and "CART (real-time captioning)" would fit the Legal/Technical glossary sections.
