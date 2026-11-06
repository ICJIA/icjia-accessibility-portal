---
title: Frequently Asked Questions
description: Common questions about accessibility
lastUpdated: 2026-11-06
lastReviewed: 2026-11-06
disclaimer:
  - label: "Created by"
    text: "These FAQs were created by **ICJIA's IDS Unit** as a best-effort translation of new ADA guidelines into practical guidance."
  - label: "Corrections"
    text: "We make mistakes. We welcome feedback. If you find any incorrect or incomplete information, **please contact ICJIA's IDS Unit** with specific corrections."
  - label: "Not legal advice"
    text: "This FAQ provides general guidance based on public information and common practices. It is not legal advice. For specific legal questions or interpretations, consult with ICJIA's legal counsel or Illinois DoIT's accessibility guidance."
---

# Digital Accessibility FAQ for Illinois State Agency Employees

A practical guide to common accessibility questions for staff at Illinois state agencies.

> **Quick path (for busy readers):**
>
> - **Skeptical about this FAQ?** [Why should I trust this if it wasn't created by leadership?](#understanding-accessibility-why-should-i-trust-this-faq-if-it-wasn-t-created-by-agency-leadership-or-official-accessibility-experts)
> - **Wondering why this matters?** [Why should accessibility be a priority when I have other responsibilities?](#understanding-accessibility-i-m-already-busy-why-should-accessibility-be-a-priority-when-i-have-other-responsibilities)
> - **Start here (role-based checklist):** [Quick Reference: Critical Actions By Role](#quick-reference-critical-actions-by-role)
> - **Jump to your role:** [Content creators](#quick-reference-critical-actions-by-role-for-content-creators) · [Web developers](#quick-reference-critical-actions-by-role-for-web-developers) · [Managers](#quick-reference-critical-actions-by-role-for-managers) · [Executive staff](#getting-started-i-m-on-executive-staff-where-do-i-start)
> - **New to accessibility jargon?** See the [Glossary](#glossary) for plain-language definitions
> - **Need a real person?** For ICJIA questions, contact the IT department. For IITAA + ADA Title II questions, contact Illinois DoIT: `DoIT.Accessibility@Illinois.gov`
>
> **ICJIA Contact Note (November 6, 2026):** No agency accessibility coordinator has been designated yet. This FAQ will be updated with coordinator contact information when available. In the meantime, contact **ICJIA's IT department** with specific accessibility questions or concerns.
>
> **Note (scope):** This FAQ is practical guidance for ICJIA staff and partners. It's not legal advice. For official interpretations and agency-specific direction, consult Illinois DoIT guidance and your agency's legal/compliance leadership.

> **🔧 Work in progress — disagreement is welcome.** This FAQ is built and maintained by **ICJIA's IDS Unit** — by an IT staff member who has cared about and been working on accessibility for years, not by lawyers and not by a designated accessibility officer (ICJIA hasn't named one yet). The legal claims here are backed by **direct quotes from the actual rules** (with links to primary sources), but the framing, examples, and choice of words are one IT person's read on what those rules mean for everyday agency work — passionate but not authoritative. **If something here reads wrong, sounds off, or you just disagree — that's fine, and welcome.** Email **ICJIA's IDS Unit** with the question, the section, and what you think would be more accurate or clearer. Corrections ship promptly. Pretending I had it perfect the first time would be worse than getting feedback now.

## Quick Start (Read this first)

### Executive summary: what you need to know right now

{updated:2026-11-06}

**Feeling overwhelmed? Start here.** You don't need to understand everything to begin making progress.

_Last updated: November 6, 2026 · Last reviewed: November 6, 2026_

> **⚠️ Deadline extended (April 20, 2026):** The U.S. Department of Justice has published an <a href="https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web" target="_blank" rel="noopener noreferrer">Interim Final Rule</a> extending the ADA Title II web accessibility compliance date by one year — from **April 24, 2026** to **April 26, 2027** (for public entities with a total population of 50,000 or more, which includes every Illinois state agency). Smaller jurisdictions (under 50,000) and special district governments have until **April 26, 2028**. The technical standard (WCAG 2.1 Level AA) is unchanged; only the compliance date has moved. **The extra year is for implementation, not delay** — agencies that are already planning or remediating should continue. **Status (November 6, 2026):** the extension is being challenged in federal court (_National Federation of the Blind v. DOJ_, filed May 2026, asking the court to restore the original deadlines), and DOJ has neither finalized nor revised its interim rule. No ruling has been issued and the extended dates remain in effect while the case proceeds — but plan as if the clock could tighten.

**What you need to know right now:**

1. **The deadline is real:** April 26, 2027 (extended one year from April 24, 2026). Illinois state agencies are required to make their digital content accessible to people with disabilities — websites, documents, PDFs, videos, social media, and mobile apps — with a few narrow exceptions (see [Are there exceptions to the April 2027 deadline? What qualifies?](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies)).

2. **Two laws require this:**
   - **Illinois law:** The <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois Information Technology Accessibility Act (IITAA)</a> has required accessible digital content for state agencies since 2008. The current <a href="https://doit.illinois.gov/doit-news/accessibility-news/iitaa-2-1-update.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 standards</a> (effective June 24, 2024) require WCAG 2.1 Level AA compliance.
   - **Federal law:** The <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Accessibility Rule</a> (published April 24, 2024) requires state and local governments to meet WCAG 2.1 Level AA — by April 26, 2027 for Illinois state agencies. See [What is the ADA Title II digital accessibility rule?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-ada-title-ii-digital-accessibility-rule) for details.

3. **This applies to your work:** If you create documents, websites, videos, social media posts, or procure digital tools — accessibility is part of your job now.

4. **The standard is clear:** <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Level AA</a> — think of it as a **compliance checklist for digital content**. In practice: proper headings, alt text on images, captions on videos, keyboard navigation, sufficient color contrast, and accessible forms.

5. **Start small, start now:** You don't have to fix everything today. Focus on new content first, then prioritize high-traffic pages and critical services. Every small improvement counts.

6. **Help is available:** This FAQ, your agency's accessibility coordinator (ICJIA hasn't designated one yet — contact ICJIA's IT department), <a href="https://doit.illinois.gov/initiatives/accessibility/guides.html" target="_blank" rel="noopener noreferrer">Illinois DoIT accessibility guides and training</a>, and free tools like <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">WAVE</a> and <a href="https://www.deque.com/axe/devtools/" target="_blank" rel="noopener noreferrer">axe DevTools</a> can guide you through the process.

**More people need accessible content than you might expect:**

- **In Illinois alone:** Approximately **2.3 million adults** — roughly 1 in 4 (23.7%, age-adjusted, 2022 data — the most recent CDC release) — have a disability that may affect how they access digital content, including mobility, cognitive, hearing, and vision impairments (see CDC’s Disability and Health Data System (DHDS): <a href="https://www.cdc.gov/dhds/about/index.html" target="_blank" rel="noopener noreferrer">About DHDS</a>).
- **Beyond Illinois:** ICJIA's research, publications, and resources reach a **national and global audience** — researchers, policymakers, criminal justice professionals, and the public. Accessibility isn't just a state compliance issue; it determines who can access your work worldwide.
- **Temporary and situational disabilities count too:** A broken arm, recovery from surgery, bright sunlight on a screen, or aging-related vision changes — accessible content helps everyone at some point.

**What to do next:**

- Use the Quick Reference checklists below to start with high-impact actions for your role
- Use this FAQ like a reference — search for what you need when you need it

**Key takeaway:** Accessibility means people with disabilities can use your content. The work is manageable if you start now and focus on practical, high-impact actions.

**References:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA (Illinois Information Technology Accessibility Act)</a> — Illinois state accessibility requirements
- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — Federal accessibility requirements and the April 2027 deadline
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: ADA Title II Final Rule</a> — Official rule text (April 24, 2024)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a> — Filterable checklist of accessibility requirements
- <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Full Specification</a> — Complete technical standard
- <a href="https://doit.illinois.gov/initiatives/accessibility/guides.html" target="_blank" rel="noopener noreferrer">Illinois DoIT Accessibility Guides</a> — Free state-provided guides; State staff can sign up for live training through DoIT's <a href="https://ilgov.sharepoint.com/sites/DoIT-Accessibility/SitePages/Training-Sign-Up.aspx" target="_blank" rel="noopener noreferrer">Accessibility Training Sign-up</a> (Illinois staff only)

---

## Quick Reference: Critical Actions By Role

**Start here.** These are the most impactful actions for each role to begin accessibility compliance:

### For Content Creators

**What accessibility means for you:** Every document, image, and video you create should be usable by people with disabilities. This means adding alt text so screen reader users can understand images, using proper heading styles so documents are navigable, and ensuring videos have captions. You're on the front lines of creating accessible content that serves all Illinois residents.

| Action                                | Impact                      |
| ------------------------------------- | --------------------------- |
| 1. Add alt text to images             | Required for screen readers |
| 2. Use heading styles (not just bold) | Screen reader navigation    |
| 3. Write descriptive links            | Context for assistive tech  |
| 4. Run Accessibility Checker          | Catches common errors       |
| 5. Add captions to videos             | Compliance requirement      |

**Start here:** [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start)

### For Web Developers

{updated:2026-10-26}

**What accessibility means for you:** You build the foundation that makes all digital content accessible or inaccessible. Semantic HTML, keyboard navigation, color contrast, and ARIA labels are core requirements under WCAG 2.1 AA — not optional extras. Your technical expertise directly determines whether people with disabilities can access government information and services.

| Action                             | Impact                                                                                                                                                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Add axe-core to your build      | Catches many common issues automatically (<a href="https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues/" target="_blank" rel="noopener noreferrer">57% of issues by volume in axe-maker Deque's 2021 study</a>; manual testing finds the rest) |
| 2. Test keyboard navigation        | Critical for accessibility                                                                                                                                                                                                   |
| 3. Check color contrast (4.5:1)    | Quick to verify, high impact                                                                                                                                                                                                 |
| 4. Ensure visible focus indicators | Required for keyboard users                                                                                                                                                                                                  |
| 5. Use semantic HTML (not divs)    | Foundation of accessibility                                                                                                                                                                                                  |

**Start here:** [I'm a web developer. Where do I start?](#getting-started-i-m-a-web-developer-where-do-i-start)

### For Managers

**What accessibility means for you:** You control the resources, time, and priorities that determine whether your team can create accessible content. Your decisions about training, tools, deadlines, and accountability directly impact your agency's legal compliance. You're responsible for ensuring your team has what they need to meet accessibility requirements.

| Action                             | Impact                                 |
| ---------------------------------- | -------------------------------------- |
| 1. Inventory your public content   | Know the scope                         |
| 2. Prioritize high-traffic content | Focus limited resources                |
| 3. Allocate time for training      | Enable your team                       |
| 4. Add accessibility to job duties | Set expectations                       |
| 5. Document your remediation plan  | Demonstrate progress toward compliance |

**Start here:** [I'm a manager. Where do I start?](#getting-started-i-m-a-manager-where-do-i-start)

## Understanding Accessibility

### Why should I trust this FAQ if it wasn't created by agency leadership or official accessibility experts?

{updated:2026-11-06}

**Quick answer:** This FAQ is based on official sources — Illinois DoIT guidance, federal ADA regulations, and W3C standards — not personal opinion. The content's authority comes from the sources it cites, not the person who compiled it.

**Full explanation:**

This is a reasonable question. You may be wondering why guidance on an important compliance matter is coming from IT rather than executive leadership, legal counsel, or an official accessibility coordinator.

Here's why this FAQ is worth your time:

1. **The sources are authoritative, not the author:** Every major claim in this FAQ cites official sources — Illinois DoIT policies, the ADA Title II rule from the Federal Register, and W3C's WCAG standards. You can verify any information by checking the linked references.

2. **Accessibility guidance follows established standards:** Unlike areas where professional judgment varies widely, digital accessibility has clear, published standards (WCAG 2.1 Level AA). The requirements are the same whether explained by a web developer, a consultant, or the Department of Justice.

3. **Web development has been doing this for years:** ICJIA's web development team has incorporated accessibility practices into website builds for years — semantic HTML, keyboard navigation, color contrast, alt text, and screen reader compatibility have been part of the work all along. What's changed isn't the practice; it's that accessibility is now a legal mandate rather than a best practice. If anyone in this agency has hands-on experience with accessibility requirements, it's the people who've been implementing them in code.

4. **This fills a gap, not a role:** As of November 6, 2026, ICJIA has not yet designated an official accessibility coordinator. This FAQ exists because staff needed practical guidance now — not because anyone is claiming authority they don't have.

5. **Feedback — and disagreement — is welcome:** If you find errors, outdated information, language that reads wrong, framing you don't agree with, or areas where this FAQ doesn't align with official guidance, please contact **ICJIA's IDS Unit** with specifics. Disagree with how something is phrased? Tell us. Think a section overstates the law? Tell us. The goal is accuracy and clarity, not protecting the author's prose. Corrections ship promptly.

6. **Check with official sources when stakes are high:** For legal interpretations, procurement decisions, or formal complaints, consult Illinois DoIT (`DoIT.Accessibility@Illinois.gov`) or ICJIA's legal counsel — not this FAQ.

**Bottom line:** Use this FAQ as a practical starting point, but verify anything critical against the official sources it cites. The deadline is real regardless of who explains it to you.

---

### I'm already busy. Why should accessibility be a priority when I have other responsibilities?

{updated:2026-08-13}

**Quick answer:** Accessibility helps ensure that the people we serve can actually use the services and information we provide. For agencies committed to diversity, equity, inclusion, and accessibility (DEIA), accessible content is part of how we put those values into practice.

**Full explanation:**

This is a fair question. Everyone has competing demands, and new requirements on top of existing work can feel overwhelming. Here's some perspective on why accessibility matters — not as judgment, but as context for the work we're being asked to do.

**1. Accessibility expands who we can reach.**

When content is accessible, more people can use it. A properly structured PDF works for everyone, including someone using a screen reader. A captioned video serves people who are deaf or hard of hearing, but also people watching in a noisy environment or those who prefer reading along. Accessible design often benefits people beyond those with permanent disabilities.

In Illinois alone, approximately 2.3 million adults — about 1 in 4 — have disabilities that may affect how they access digital content (according to CDC data). Nationally, that's more than 70 million adults. Accessible content simply means our work reaches more of the public we're here to serve.

**2. Accessibility gives meaning to DEIA commitments.**

The "A" in DEIA stands for Accessibility — and it's not separate from equity and inclusion; it informs them. True equity means ensuring people with disabilities have the same access to information and services as everyone else. True inclusion means our content works for people regardless of how they interact with it.

When we build accessibility into our work, we're demonstrating that DEIA is more than a statement — it's reflected in what we produce.

**3. This connects to a broader civil rights framework.**

The ADA was enacted because people with disabilities faced barriers to participating fully in public life. Digital accessibility extends that same principle to websites, documents, and online services. Just as buildings have ramps and elevators, digital content needs to be navigable and usable by people with different abilities.

As digital services have become central to how people interact with government, the same principles naturally extend to online spaces.

**4. Everyone is busy — and we can still make progress.**

No one is suggesting that accessibility should crowd out all other work. The goal is to integrate accessible practices into what we already do. Over time, these practices become routine — adding alt text, using heading styles, checking color contrast. Small, consistent efforts add up.

The learning curve is real, but manageable. Most accessibility improvements don't require specialized expertise — just awareness and a willingness to adjust workflows.

**5. This benefits everyone, including ourselves.**

Accessible content tends to be better-organized, easier to navigate, and more usable for all audiences. The same structure that helps a screen reader user also helps someone skimming a document or searching for specific information. Accessibility improvements often make content better for everyone.

**6. Accessible content has few downsides — and a long list of upsides.**

There's rarely a tradeoff here. Accessible content generally doesn't look worse, perform slower, or cost more to maintain. In fact, the opposite is true:

- **Better SEO (Search Engine Optimization):** Search engines can't "see" images or understand poorly structured pages. The same practices that make content accessible — descriptive headings, alt text, semantic structure, transcripts — also help search engines index and rank your content. More accessible content means more people can *find* it in the first place.
- **Wider reach:** Content that works for people with disabilities also works for people on slow connections, older devices, or non-standard browsers.
- **Future-proofing:** Well-structured, semantic content adapts more easily to new technologies and platforms.
- **Reduced legal risk:** Accessible content is compliant content — fewer complaints, fewer remediation emergencies.

Accessibility is one of the rare cases where doing the right thing also happens to be the practical thing. It's hard to find a case where inaccessible content is the better choice.

**In summary:**

Accessibility work isn't about adding something extra — it's about building content that serves the full range of people who need it. It aligns with the values our agency has already committed to, and it makes our work more effective for the public we serve.

**A note on these FAQs:**

You may be wondering why guidance on this topic is coming from a web developer rather than agency leadership or legal counsel. Fair question — see [Why should I trust this FAQ if it wasn't created by agency leadership?](#understanding-accessibility-why-should-i-trust-this-faq-if-it-wasn-t-created-by-agency-leadership-or-official-accessibility-experts) for a detailed answer. In short: these FAQs aren't personal opinion — they're based on federal regulations (ADA Title II), state law (IITAA), and established standards (WCAG 2.1). The sources are cited throughout.

If something here is wrong or could be said better, feedback is welcome.

**References:**

- <a href="https://www.cdc.gov/disability-and-health/articles-documents/disability-impacts-all-of-us-infographic.html" target="_blank" rel="noopener noreferrer">CDC: Disability Impacts All of Us</a> — Statistics on disability prevalence
- <a href="https://www.ada.gov/resources/disability-rights-guide/" target="_blank" rel="noopener noreferrer">ADA.gov: Guide to Disability Rights Laws</a> — Civil rights framework for accessibility
- <a href="https://www.w3.org/WAI/fundamentals/accessibility-intro/" target="_blank" rel="noopener noreferrer">W3C: Introduction to Web Accessibility</a> — Why accessibility matters

---

### What is digital accessibility?

**Quick answer:** Digital accessibility means everyone can use your digital content — websites, documents, videos, apps — regardless of disability. It encompasses both **websites** (HTML pages, web applications, interactive elements) and **content** (documents, PDFs, videos, images, presentations, social media posts).

**Full explanation:**

Digital accessibility means that websites, applications, documents, and other digital content are designed so that people with disabilities can use them. This includes people with visual, auditory, motor, cognitive, and neurological disabilities who may use assistive technologies like screen readers, screen magnifiers, voice recognition software, or alternative keyboards.

**Two main categories of digital accessibility:**

1. **Website accessibility** — HTML pages, web applications, and interactive web elements:
   - Semantic HTML structure (proper headings, landmarks, form labels)
   - Keyboard navigation (all functionality accessible without a mouse)
   - Color contrast (readable text against backgrounds)
   - Focus indicators (visible outlines for keyboard users)
   - ARIA attributes (when semantic HTML isn't sufficient)
   - Responsive design (works across devices and screen sizes)

2. **Content accessibility** — Documents, media, and files:
   - **Documents** (Word, PDF, Excel, PowerPoint): Proper heading structure, alt text for images, readable tables, descriptive links
   - **Videos**: Captions for audio content, transcripts for audio-only content, audio descriptions when needed
   - **Images**: Alt text describing meaningful content
   - **Social media**: Alt text for images, captions for videos, descriptive link text
   - **Email/Newsletters**: Proper structure, alt text, accessible formatting

**Why both matter:**

- **Websites** provide the structure and navigation — if a website isn't accessible, users can't navigate or interact with it, regardless of how accessible the content is.
- **Content** provides the actual information — if documents, videos, or images aren't accessible, users can't access the information, even if the website structure is perfect.

**The standard:** Both websites and content must meet <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Level AA</a> requirements, which is the compliance standard required by both <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA</a> and <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II</a>.

**References:**

- <a href="https://www.w3.org/WAI/fundamentals/accessibility-intro/" target="_blank" rel="noopener noreferrer">W3C: Introduction to Web Accessibility</a> — Official overview of digital accessibility
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Level AA Quick Reference</a> — The accessibility standard required for compliance
- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — Federal requirements for state and local governments
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — Illinois state accessibility requirements
- <a href="https://www.section508.gov/" target="_blank" rel="noopener noreferrer">Section508.gov</a> — Federal accessibility resources and guidance

**See also:** [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start) | [I'm a web developer. Where do I start?](#getting-started-i-m-a-web-developer-where-do-i-start) | [What is WCAG?](#common-concerns-what-is-wcag)

### How does digital accessibility and compliance fit into an agency's DEIA mission?

{updated:2026-10-26}

**Quick answer:** **Accessibility is the "A" in DEIA** — it's how we deliver **equitable access** to services and information by **removing systemic barriers** in our digital work. It's backed by **accountability** through enforceable law (IITAA + ADA Title II) and a **measurable standard** (**WCAG 2.1 Level AA**) with a compliance deadline.

**In practice:**

- **Publish accessibly by default** — headings, link text, alt text, captions are part of equitable communication
- **Procure responsibly** — require accessibility in contracts to prevent "outsourcing" inequity
- **Fix barriers when found** — treat accessibility issues like service issues

**Why this fits ICJIA's mission specifically:**

For ICJIA, accessibility is not adjacent to the mission — it _is_ the mission, applied to the agency's own digital work.

- **ICJIA exists to serve the criminal- and social-justice community** — crime victims and survivors, justice-involved individuals, researchers, practitioners, and policymakers. That is who ICJIA's websites, research, grant information, and victim resources are _for_.
- **Disability is over-represented in exactly that community.** People with disabilities experience violent crime at almost four times the rate of people without disabilities (<a href="https://bjs.ojp.gov/library/publications/crime-against-persons-disabilities-2009-2019-statistical-tables" target="_blank" rel="noopener noreferrer">BJS, 2009–2019</a>), and an estimated 32% of prisoners and 40% of jail inmates report at least one disability — nearly 3 and more than 4 times the general-population rate (<a href="https://bjs.ojp.gov/library/publications/disabilities-among-prison-and-jail-inmates-2011-12" target="_blank" rel="noopener noreferrer">BJS, 2011–12</a>). An inaccessible ICJIA PDF or website does not exclude people in the abstract; it disproportionately excludes the population ICJIA exists to serve.
- **DEI in criminal and social justice means removing systemic barriers.** An inaccessible website, an untagged PDF, an uncaptioned video — those _are_ systemic barriers, sitting on the agency's own digital front door. Fixing them is the same equity work ICJIA's mission calls for, pointed inward.
- **Equity is concrete here.** A survivor with a cognitive disability trying to find victim services; a researcher who is blind trying to use ICJIA data; a grant applicant with a motor disability trying to complete a form — accessibility determines whether ICJIA's work actually reaches them. Inaccessible content quietly narrows who the agency serves.

So when accessibility is treated as "just compliance," it is being undersold. Compliance (IITAA + ADA Title II) is the floor and the enforcement mechanism — but the _reason_ it matters to ICJIA is that equitable access to justice information is the agency's purpose.

**Key takeaway:** Accessibility is how DEIA commitments show up in real work — **equitable access with accountability**.

**References:** <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA</a> | <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule</a>

---

## Getting Started

### I'm a content creator. Where do I start?

{updated:2026-10-26}

**Your role is crucial — you're the first line of accessibility.** When possible, publish as webpage text (HTML) rather than PDFs — HTML is easier to keep accessible.

**Essential skills:**

1. **Alt text for images** — Describe what's in every image
2. **Use heading styles** — Use Heading 1, 2, 3 styles, not just bold
3. **Write clear link text** — "Download 2025 Annual Report" not "click here"
4. **Check color contrast** — Text must be readable (4.5:1 ratio)

**Visual example: Proper heading hierarchy**

```
Document Title (Heading 1)
├── Section 1 (Heading 2)
│   ├── Subsection 1.1 (Heading 3)
│   └── Subsection 1.2 (Heading 3)
├── Section 2 (Heading 2)
│   ├── Subsection 2.1 (Heading 3)
│   │   └── Detail 2.1.1 (Heading 4)
│   └── Subsection 2.2 (Heading 3)
└── Section 3 (Heading 2)
```

**Why this matters:** Screen readers use headings to navigate. Users can jump from heading to heading, so proper structure is essential for accessibility.

Two of these — low-contrast text and missing alt text — are the two most common failures in the <a href="https://webaim.org/projects/million/" target="_blank" rel="noopener noreferrer">WebAIM Million</a>, WebAIM's 2026 automated scan of the top million home pages, and links with no text at all rank fourth. Headings aren't on that list, but they're how screen reader users find their way around a page or document.

**Document resources:**

- <a href="https://www.section508.gov/create/documents/" target="_blank" rel="noopener noreferrer">Word</a> | <a href="https://www.section508.gov/create/pdfs/" target="_blank" rel="noopener noreferrer">PDFs</a> | <a href="https://www.section508.gov/create/presentations/" target="_blank" rel="noopener noreferrer">PowerPoint</a> | <a href="https://www.section508.gov/create/spreadsheets/" target="_blank" rel="noopener noreferrer">Excel</a>
- <a href="https://www.w3.org/WAI/media/av/captions/" target="_blank" rel="noopener noreferrer">Video captions</a> | <a href="https://www.w3.org/WAI/media/av/transcripts/" target="_blank" rel="noopener noreferrer">Transcripts</a>

**Training:** <a href="https://doit.illinois.gov/initiatives/accessibility/guides.html" target="_blank" rel="noopener noreferrer">Illinois DoIT free guides and training</a> (DoIT.Accessibility@Illinois.gov) | <a href="https://www.edx.org/learn/web-accessibility/the-world-wide-web-consortium-w3c-introduction-to-web-accessibility" target="_blank" rel="noopener noreferrer">W3C free course</a>

**Key mindset:** Can someone using a screen reader or keyboard-only understand and use your content? If not, provide alternatives.

**See also:** [How do I make a Word document accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-a-word-document-accessible) | [How do I make a PDF accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-a-pdf-accessible) | [How long should alt text be?](#content-accessibility-documents-pdfs-presentations-how-long-should-alt-text-be) | [What are the most common accessibility mistakes and issues to avoid?](#common-concerns-what-are-the-most-common-accessibility-mistakes-and-issues-to-avoid)

### How should I track my accessibility fixes as a content creator?

{updated:2026-01-23}

**Quick answer:** Keep it simple — use whatever tool you already use for tracking work. A shared spreadsheet, a note in your existing task system, or even a running document is fine. The goal is consistency, not complexity. Track what you fixed, when, and what's left.

**Full explanation:**

You don't need specialized software to track accessibility fixes. The best system is one you'll actually use. Here are practical options ranked by simplicity:

**Option 1: Simple checklist (for individual documents)**

When you create or update a document, run through a quick mental checklist:

- ☐ Alt text on all images
- ☐ Heading styles used (not just bold)
- ☐ Descriptive link text
- ☐ Ran Accessibility Checker (Word/PowerPoint/PDF)
- ☐ Sufficient color contrast

Keep a sticky note or saved note with this checklist. Once it becomes habit, you won't need to reference it.

**Option 2: Simple spreadsheet (for tracking multiple documents)**

If you have existing content to remediate, a basic spreadsheet works well:

| Document Name | Location | Status | Date Fixed | Notes |
| ------------- | -------- | ------ | ---------- | ----- |
| 2025 Annual Report.pdf | SharePoint/Reports | Fixed | 2026-01-15 | Added alt text, fixed headings |
| Grant Application Form.docx | Shared Drive | Needs work | — | Complex tables, needs review |
| Training Slides.pptx | Teams | Fixed | 2026-01-20 | Added slide titles, alt text |

**Columns to include:**

- **Document name** — What is it?
- **Location** — Where is it stored/published?
- **Status** — Not started / In progress / Fixed / N/A
- **Date fixed** — When was it remediated?
- **Notes** — Any issues or things to remember

**Option 3: Add to your existing task system**

If you use Outlook tasks, Teams Planner, Asana, or any other task manager, simply add accessibility fixes as tasks. Tag them with "accessibility" or create a category so you can filter and report on them.

**Option 4: Unit-level tracking (if your manager requests it)**

Your manager may want to track accessibility progress across the team. In that case, contribute to whatever shared tracker they set up. This is usually a shared spreadsheet or project board.

**What NOT to do:**

- **Don't create an elaborate system you won't maintain** — A simple list you update is better than a complex database you ignore
- **Don't track every tiny fix** — Focus on documents that are published or shared publicly
- **Don't wait for a perfect system** — Start tracking now with whatever you have

**Tips for success:**

1. **Track as you go** — Update your tracker when you fix something, not later
2. **Focus on public content first** — Internal drafts matter less than published documents
3. **Note blockers** — If something requires help (complex tables, legacy PDFs), flag it for your manager
4. **Celebrate progress** — Watching your "fixed" list grow is motivating

**What your manager needs to know:**

If asked to report on your progress, you should be able to say:

- _"I've fixed X documents this month"_
- _"I have Y documents remaining in my backlog"_
- _"These Z items need help or a decision"_

A simple spreadsheet or task list gives you this information.

**Key takeaway:** Don't overthink it. The goal is awareness and progress, not perfect documentation. Pick the simplest method that fits your workflow, and start using it today.

**See also:** [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start) | [How can I track and demonstrate "good-faith progress" toward compliance?](#getting-started-how-can-i-track-and-demonstrate-good-faith-progress-toward-compliance) | [I'm already overloaded — how am I supposed to add accessibility to my workload?](#common-concerns-i-m-already-overloaded-how-am-i-supposed-to-add-accessibility-to-my-workload)

### I'm a web developer. Where do I start?

{updated:2026-10-26}

**You're building the foundation.** Here's your priority roadmap:

**Week 1 (do these first):**

1. **Keyboard navigation** — Everything works without a mouse: <a href="https://webaim.org/techniques/keyboard/" target="_blank" rel="noopener noreferrer">WebAIM: Keyboard</a>
2. **Semantic HTML** — Use `<nav>`, `<main>`, `<button>` not `<div>`: <a href="https://www.w3.org/WAI/tutorials/page-structure/" target="_blank" rel="noopener noreferrer">W3C: Page Structure</a>
3. **Form labels** — Every field needs a proper label: <a href="https://webaim.org/techniques/forms/" target="_blank" rel="noopener noreferrer">WebAIM: Forms</a>
4. **Install testing tools** — axe DevTools or WAVE browser extensions

**Standards:** <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a> | <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noopener noreferrer">ARIA APG</a> (use semantic HTML first)

**Testing:** Automated (axe/WAVE/Lighthouse) + manual (keyboard-only + screen reader). Download <a href="https://www.nvaccess.org/download/" target="_blank" rel="noopener noreferrer">NVDA</a> (free). To hear what NVDA says on every page of a site — and keep a record of it — see [voicecap](#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it).

**ARIA rules:** Use only when semantic HTML isn't sufficient. Prefer `<button>` over `<div role="button">`. Always test with screen readers.

**Code review checklist:**

✓ Semantic HTML · ✓ Keyboard navigation · ✓ Visible focus indicators · ✓ 4.5:1 contrast · ✓ Alt text · ✓ Form labels · ✓ Automated tests pass

**See also:** [How do I test my website?](#website-accessibility-how-do-i-test-my-website-for-accessibility) | [What are the most common accessibility mistakes and issues to avoid?](#common-concerns-what-are-the-most-common-accessibility-mistakes-and-issues-to-avoid) | [What are focus indicators and why do they matter?](#website-accessibility-what-are-focus-indicators-and-why-do-they-matter) | [What color contrast ratio is required?](#website-accessibility-what-color-contrast-ratio-is-required) | [How do I make forms accessible?](#website-accessibility-how-do-i-make-forms-accessible)

### I'm a manager. Where do I start?

{updated:2026-11-06}

**Your role:** Create the organizational conditions for success — set priorities, allocate resources, and establish accountability.

**Quick checklist:**

1. **Name an owner** for accessibility work and reporting
2. **Inventory public content** (sites, PDFs, videos, social, vendor tools)
3. **Prioritize by impact** (high-traffic + critical services first)
4. **Bake accessibility into process** (before publish / purchase / launch)
5. **Track progress** with clear milestones through April 26, 2027

**Key activities:**

| Activity                 | Notes                                                          |
| ------------------------ | -------------------------------------------------------------- |
| **Staff training**       | DoIT offers free courses; one-time learning                    |
| **Content inventory**    | Depends on content volume; do once                             |
| **Document remediation** | Complex PDFs take longer                                       |
| **Ongoing maintenance**  | Built into existing workflows; once trained, adds minimal time |

**Key actions:**

- **Understand requirements:** The federal deadline is April 26, 2027 for WCAG 2.1 Level AA across your agency's web content, documents, and apps, with a few narrow exceptions. See [What is the ADA Title II digital accessibility rule?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-ada-title-ii-digital-accessibility-rule) and [Why are we just hearing about this now?](#state-agency-applicability-why-are-we-just-hearing-about-this-now).
- **Assess current state:** Audit content, identify gaps, estimate remediation effort.
- **Allocate resources:** Training, tools (free: WAVE, axe DevTools, PDF checkers, and ICJIA's voicecap for screen reader testing — see [What is voicecap, and why did ICJIA build it?](#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it)), and staff time.
- **Build into processes:** Require accessibility in procurement, add pre-publish checkpoints.
- **Establish accountability:** Assign responsibilities, set expectations, track progress.

**ICJIA Contact (November 6, 2026):** No accessibility coordinator designated yet. Contact **ICJIA's IT department** for accessibility questions.

**Resources:** <a href="https://doit.illinois.gov/initiatives/accessibility.html" target="_blank" rel="noopener noreferrer">Illinois DoIT Accessibility</a> | <a href="https://www.w3.org/WAI/planning-and-managing/" target="_blank" rel="noopener noreferrer">W3C: Planning Accessibility</a> | <a href="/links" target="_self">Accessibility Links</a>

### I'm on executive staff. Where do I start?

{updated:2026-11-06}

**As executive staff, your role is to make accessibility achievable at scale.** You don't need to be the technical expert; you need to ensure there is clear ownership, adequate resourcing, enforceable process, and consistent reporting through April 2027 and beyond.

**Executive quick checklist (start here):**

1. **Designate an accessibility coordinator** with authority to coordinate across departments and report progress
2. **Adopt an agency accessibility policy** (WCAG 2.1 Level AA, scope, timelines, enforcement)
3. **Fund training and tools** (documents, web, video, procurement) and allocate staff time for remediation
4. **Require accessibility in procurement** (WCAG requirements in contracts; review VPAT/ACR — _Voluntary Product Accessibility Template / Accessibility Conformance Report; the vendor's self-reported accessibility assessment, see [What is a VPAT?](#procurement-and-third-party-tools-what-is-a-vpat-what-is-an-acr)_; remediation commitments)
5. **Establish reporting** (inventory → prioritized backlog → milestones → risks → monthly/quarterly updates)

**What "good" looks like (practical, defensible):**

- **Inventory exists** for public-facing websites, documents/PDFs, forms, videos, social, mobile apps, and third-party tools
- **Priorities are explicit** (high-traffic + high-stakes services first; complete blockers first)
- **A remediation plan exists** with milestones through April 26, 2027 (and owners for each track)
- **Evidence is retained** (audit outputs, remediation logs, training completion, procurement language, vendor correspondence — including screen reader test records such as [voicecap](#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it) reports)
- **Escalation path is clear** for tradeoffs (what gets fixed first when time/budget conflicts arise)

**Key actions you can take this week (high impact):**

- Ask for a **top 10 risks list** (complete blockers, critical services, high-traffic issues)
- Require a **monthly progress dashboard** (what changed since last month + what's next)
- Direct procurement to **standardize accessibility language** and a **review gate** before purchase/renewal

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — Plain language summary
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: ADA Title II Web Rule (April 24, 2024)</a> — Final rule text
- <a href="https://www.w3.org/WAI/planning-and-managing/" target="_blank" rel="noopener noreferrer">W3C: Planning and Managing Web Accessibility</a> — Program guidance

### What exactly am I accountable for as a manager (vs. what my team is accountable for)?

{updated:2025-12-30}

**Quick answer:** You're accountable for **making accessibility possible and expected**: ownership, priorities, time/tools/training, and accountability. Your team is accountable for **creating and maintaining accessible content and systems** in their day-to-day work.

**Manager accountabilities (what you control):**

- **Ownership** — Name a coordinator/owner and make reporting routine.
- **Resourcing** — Allocate time, tools, and training (and remove blockers).
- **Process** — Require accessibility checks before publish/purchase/launch.
- **Accountability** — Define responsibilities clearly and track progress to the deadline.

**Team accountabilities (what they do):**

- **Content creators** — headings, link text, alt text, accessible documents, captions/transcripts.
- **Developers/IT** — accessible code, testing, fixing defects, vendor integration requirements.
- **Procurement/program teams** — require WCAG 2.1 AA and review VPAT/ACRs (_Voluntary Product Accessibility Template / Accessibility Conformance Report — the vendor's self-reported accessibility assessment, see [What is a VPAT?](#procurement-and-third-party-tools-what-is-a-vpat-what-is-an-acr)_) before purchase.

**Helpful framing:** Accessibility is a compliance deliverable like security and privacy — it needs ownership, a plan, and execution across roles.

### How can I track and demonstrate "good-faith progress" toward compliance?

{updated:2026-01-06}

**Quick answer:** Maintain a clear inventory, a prioritized backlog, and evidence of steady progress (what was fixed, when, and what's next). However, based on ADA Title II and IITAA requirements, **documentation of effort is not the same as meeting the compliance standard**.

**What do the regulations say about "good-faith progress"?**

According to the ADA Title II web rule and IITAA, the requirement is to meet WCAG 2.1 Level AA standards — not to demonstrate effort toward meeting them. The regulations establish technical standards, not effort-based standards. However, based on general enforcement patterns:

- **Courts may consider good-faith efforts** when determining appropriate remedies, timelines for compliance, or assessing an organization's responsiveness to accessibility barriers
- **Documentation of systematic efforts** demonstrates organizational commitment and can inform remedial measures
- **Progress toward compliance** helps real users access services now, even if full compliance hasn't been achieved
- **The compliance standard is WCAG 2.1 Level AA** — the regulations specify meeting the technical standard, not demonstrating effort toward it

**What this means for managers:**

Document your progress, but don't mistake documentation for compliance. The goal is actual accessibility, not just evidence of trying. If you face a complaint:

- **Evidence of effort may matter** in determining remedies or timelines, but won't prevent a finding of noncompliance if barriers exist
- **Systematic, documented progress** is better than reactive fixes or no documented plan
- **Communication with affected individuals** about barriers, workarounds, and remediation timelines demonstrates responsiveness

**What to keep on file (simple, easy to stand behind):**

1. **Inventory** of public-facing content/tools (web, PDFs, forms, videos, social, vendor tools)
2. **Prioritized backlog** (top services + top traffic + complete blockers first)
3. **Milestones** (monthly/quarterly targets through April 2027)
4. **Evidence** (audit results, remediation logs, training completion, procurement language)
5. **Escalation path** (who decides tradeoffs when priorities conflict)
6. **Complaint response process** (how you'll address accessibility barriers when reported)

**Why this approach helps:**

- Prevents "we didn't know" as a response to complaints
- Gives leadership concrete data to support resourcing decisions
- Demonstrates systematic approach rather than reactive responses
- Shows commitment to compliance and continuous improvement
- Provides documentation if enforcement actions occur

**Important disclaimer:** This guidance is not legal advice. For questions about your agency's specific legal obligations, risk assessment, or response to complaints, consult your agency's legal counsel and Illinois DoIT accessibility guidance.

**References — what the regulations specify:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — States that public entities must ensure their web content and mobile apps are accessible. The rule specifies WCAG 2.1 Level AA as the technical standard.
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: ADA Title II Final Rule (April 24, 2024)</a> — Establishes WCAG 2.1 Level AA as the compliance standard. The rule defines technical requirements, not effort-based requirements.
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA (Illinois Information Technology Accessibility Act)</a> — Specifies WCAG 2.1 Level AA as the standard for Illinois state agencies.
- <a href="https://www.w3.org/TR/WCAG21/#conformance-reqs" target="_blank" rel="noopener noreferrer">WCAG 2.1 Conformance Requirements</a> — Defines conformance as meeting all Level A and Level AA success criteria for the claimed level. WCAG defines no effort-based conformance; its optional "statement of partial conformance" (for pages with third-party or foreign-language content) is explicitly not a conformance claim.

**What managers should note:**

The regulations specify a **technical standard** (WCAG 2.1 Level AA), not an effort-based standard. According to the sources above:

- The compliance standard is meeting WCAG 2.1 Level AA criteria
- The regulations do not define "good-faith effort" as an alternative to meeting the technical standard
- For questions about enforcement, risk, or remedies, consult your agency's legal counsel

**Analogy:** Building codes work similarly — an organization can document its progress toward fire safety, but occupancy permits require actually meeting the code. Effort matters, but compliance is measured against the standard itself.

**What this means practically:**

Don't let "we're making progress" become a substitute for "we meet the standard." Progress is necessary and valuable, but the compliance standard is actual accessibility as defined by WCAG 2.1 Level AA.

**See also:** [How accurate is voicecap, and how can a manager or auditor check its results?](#screen-reader-testing-voicecap-how-accurate-is-voicecap-and-how-can-a-manager-or-auditor-check-its-results) — dated, fingerprinted records of screen reader testing

---

### Who signs off that we're compliant? Can we "certify" WCAG 2.1 Level AA compliance?

{updated:2026-01-02}

**Quick answer:** There is no single official "WCAG certificate" you can buy that guarantees compliance. **Compliance is demonstrated by meeting WCAG 2.1 Level AA success criteria across the defined scope of your digital content.** If you choose to make a formal statement, WCAG defines how to make a **conformance claim** — and it's **optional**.

**Full explanation:**

- **WCAG is a standard, not a licensing program.** Organizations can evaluate their websites/apps against WCAG and document results, but WCAG itself does not create a "certified by W3C" program.
- **Conformance claims are optional and scoped.** WCAG allows you to publish a conformance claim (for one page, a set of pages, or a set of related pages), but the claim must include required components and clearly define scope and level.
- **In practice, "sign-off" is an internal governance decision.** For agencies, the defensible approach is to require a written scope (what's included), the target level (WCAG 2.1 AA), and evidence (test results + remediation record), then have the right leaders sign off on the plan and accept any remaining risk.

**What to do (manager-friendly, defensible):**

1. **Define scope** (which sites/apps/pages and which time period/content types).
2. **Use a recognized evaluation methodology** and retain the report.
3. **Record known issues + remediation plan** (including vendor/tool dependencies).
4. **Document who approved** the scope and the plan (so "sign-off" is real).

**See also:** [What doesn't voicecap do? Does a clean voicecap report mean our site is compliant?](#screen-reader-testing-voicecap-what-doesn-t-voicecap-do-does-a-clean-voicecap-report-mean-our-site-is-compliant)

**References:**

- <a href="https://www.w3.org/TR/WCAG21/#conformance-claims" target="_blank" rel="noopener noreferrer">W3C WCAG 2.1 — Conformance Claims (Optional)</a> — Defines what a conformance claim is and what it must include
- <a href="https://www.w3.org/TR/WCAG-EM/" target="_blank" rel="noopener noreferrer">W3C WCAG-EM: Website Accessibility Conformance Evaluation Methodology</a> — A recognized methodology for evaluating conformance and producing a report

---

## Common Concerns

### Why does accessibility compliance require everyone's participation?

{updated:2026-10-26}

**Because web developers can only fix technical issues — they can't fix content.**

While web developers handle technical implementation (code structure, keyboard navigation, ARIA attributes that help screen readers understand interactive elements), they **cannot** fix content created by others. Achieving compliance requires:

- **Content creators** — Write alt text for images, use proper heading styles, make documents accessible, add captions to videos.
- **Designers** — Ensure color contrast meets requirements, design with keyboard navigation in mind.
- **Procurement staff** — Include accessibility requirements in contracts for third-party tools.
- **Web developers** — Implement technical accessibility standards, test with assistive technologies.
- **Project managers** — Include accessibility in timelines and ensure it's addressed from project start.
- **Leadership** — Allocate time, budget, and resources.

**Example:** If you create a PDF report, the web team cannot add alt text to your images, fix your heading structure, or make your tables accessible. Those are content decisions only you can make as the document creator.

**The cost of waiting:** Building accessibility in from the start is generally cheaper than fixing it afterward. W3C's business case cites a Forrester study, commissioned by Microsoft, finding that accessibility "could contribute to cost savings when it is integrated into existing and ongoing development cycles" (<a href="https://www.w3.org/WAI/business-case/" target="_blank" rel="noopener noreferrer">W3C: The Business Case for Digital Accessibility</a>).

**References:**

- <a href="https://www.w3.org/WAI/planning-and-managing/" target="_blank" rel="noopener noreferrer">W3C WAI: Planning and Managing Web Accessibility</a> — Describes organization-wide accessibility responsibilities
- <a href="https://www.section508.gov/manage/section-508-program-team-roles-and-responsibilities/" target="_blank" rel="noopener noreferrer">Section508.gov: Roles and Responsibilities</a> — Outlines accessibility roles across different teams

### I'm already overloaded — how am I supposed to add accessibility to my workload?

{updated:2025-12-27}

**Quick answer:** Accessibility isn't additional work on top of your job — it's a change in _how_ you do work you're already doing. Creating an accessible document takes only a few extra minutes once you know the basics.

**Full explanation:**

Everyone is busy, and "one more thing" feels impossible. However, accessibility is not additional work on top of your existing responsibilities — it's a change in _how_ you do work you're already doing. You're already creating documents, adding images, and publishing content. Accessibility is about doing those things _slightly differently_ — not doing more things.

**Common accessibility tasks:**

| Task                                                       | Notes                                                     |
| ---------------------------------------------------------- | --------------------------------------------------------- |
| Adding alt text to an image                                | You know what's in the image — just describe it           |
| Using heading styles instead of bold                       | Same number of clicks, different button                   |
| Writing "Download the 2025 Report" instead of "Click here" | Better for everyone, not just accessibility               |
| Running the Accessibility Checker in Word                  | Built into Microsoft Office — one click                   |
| Adding captions to videos                                  | This one does take time (but is a compliance requirement) |

**What actually takes time:**

- **Remediating old content** — Yes, this is real work. Prioritize by impact and chip away at it.
- **Learning the basics** — Do it once, apply forever.
- **Complex documents** — Tables, forms, and multi-column layouts require more attention.

**What to tell your manager:**

If you genuinely don't have bandwidth, escalate it. Say: _"Accessibility is a compliance requirement under ADA Title II and IITAA. I need either (a) time allocated for training and remediation, or (b) clarity on what gets deprioritized to make room for this."_

**The reality:** Accessibility is a compliance requirement under ADA Title II and IITAA. Managers also need to allocate realistic time and resources for staff to learn and implement accessibility practices. If you're genuinely overloaded, the best next step is to work with your manager to prioritize and allocate time appropriately.

**Start small:**

1. Learn one thing this week (alt text is the easiest)
2. Apply it to everything you create going forward
3. Add another skill next week

**Key takeaway:** You don't have to fix everything at once. But you do have to start — and starting is smaller than you think.

**References:**

- <a href="https://www.section508.gov/create/" target="_blank" rel="noopener noreferrer">Section508.gov: Create Accessible Digital Products</a> — Step-by-step guides for common content types
- <a href="https://www.w3.org/WAI/fundamentals/accessibility-intro/" target="_blank" rel="noopener noreferrer">W3C: Introduction to Web Accessibility</a> — Foundational accessibility concepts

### Who's going to notice if we're not compliant by April 26, 2027?

{updated:2026-11-06}

**Quick answer:** Non-compliance is likely to be discovered through multiple channels: agency audits, automated website scans, content reviews, individual complaints, and enforcement actions. While violations might not be identified immediately, accessibility compliance is actively monitored. Non-compliance can result in legal action, financial costs, and damage to your agency's reputation. From a risk management perspective, it's safer to assume issues will surface eventually than to bet they won't — and proactive compliance reduces both legal risk and organizational disruption.

**Full explanation:**

This is a legitimate question that many agencies are asking. Knowing how issues get noticed helps you decide where to focus first.

**How non-compliance is typically discovered:**

**1. Agency audits and compliance reviews:**

- **Illinois DoIT** — DoIT leads IITAA implementation and offers guidance, training, and technical assistance. The IITAA directs the standards to include "recommendations for planning, reporting, monitoring, and enforcement of the accessibility standards by State entities" (<a href="https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2918&ChapterID=7" target="_blank" rel="noopener noreferrer">30 ILCS 587/15</a>) — so plan on monitoring your own content rather than waiting for DoIT to find problems.
- **Federal funding agencies** — A Title II complaint doesn't have to go to DOJ: under <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-F/section-35.170" target="_blank" rel="noopener noreferrer">28 CFR § 35.170(c)</a>, it can also be filed "with any agency that provides funding to the public entity" — so your grantors can hear about it too.
- **Internal agency audits** — Proactive internal testing and auditing helps identify issues before external parties do, allowing for controlled remediation.

**2. Website compliance monitoring:**

- **Automated scanning tools** — Accessibility scanners can be run by anyone, including advocacy groups, legal firms, and members of the public. These tools can identify technical violations efficiently.
- **Disability rights organizations** — Advocacy groups and people with disabilities can and do report barriers they find on government websites.
- **Legal firms** — Some law firms specialize in accessibility law.
- **Technical audits** — Website compliance is verifiable through automated testing tools (axe-core, WAVE, etc.), making violations objectively measurable.

**3. Content compliance monitoring:**

- **Document accessibility checks** — PDFs, Word documents, and other content can be scanned for accessibility issues using automated tools and manual review.
- **Video captioning verification** — Missing captions are immediately apparent to anyone reviewing video content.
- **Social media monitoring** — Inaccessible social media content is publicly visible and can be identified through review.
- **Content audits** — Both automated tools and manual reviews can identify inaccessible content across all digital formats.

**4. Individual complaints and enforcement:**

- **Public complaints** — Members of the public can file complaints directly with the U.S. Department of Justice (DOJ) when they encounter accessibility barriers.
- **Private lawsuits** — Individuals and organizations can file lawsuits seeking injunctive relief (court orders requiring compliance) and attorney's fees under the ADA.
- **DOJ investigations** — The Department of Justice can initiate investigations based on complaints or its own monitoring activities.
- **Complaint-triggered audits** — A single accessibility complaint can result in a comprehensive agency-wide review, which can be resource-intensive.

**5. Federal enforcement:**

- **DOJ enforcement actions** — The Department of Justice has authority to enforce ADA Title II compliance through investigations and legal action.
- **Department of Education Office for Civil Rights** — Investigates accessibility complaints related to educational institutions and programs.
- **Other federal agencies** — May audit compliance as part of program reviews, grant requirements, or cross-agency initiatives.

**Potential consequences of non-compliance:**

- **Legal action:** Lawsuits can result in court orders requiring immediate compliance, ongoing monitoring, and payment of attorney's fees. Legal-defense costs, settlements, and emergency remediation expenses can be substantial. Questions about monetary-damages exposure depend on the specifics — take those to your agency's legal counsel.
- **Agency audits:** Comprehensive reviews that examine all digital content can be time-consuming and require significant staff resources to address findings.
- **Financial impact:** Enforcement actions, legal fees, remediation costs, and potential grant impacts can create budget pressures.
- **Reputation:** accessibility failures are public, and they erode trust.
- **Service delivery:** Inaccessible content excludes people with disabilities from accessing government services and information, which limits your agency's ability to serve all Illinois residents.

**Why accessibility compliance is different from some other regulations:**

Accessibility violations have characteristics that make them more likely to be discovered:

- **Objectively verifiable** — Automated tools can identify violations, making them measurable rather than subjective
- **Publicly visible** — Websites and digital content are accessible to anyone who wants to review them
- **Actively monitored** — Multiple organizations and agencies actively look for violations
- **Legally actionable** — Anyone who believes they have faced disability discrimination can file a Title II complaint with DOJ or a funding agency (28 CFR § 35.170), or sue directly (42 U.S.C. § 12133)

**Risk management considerations:**

- **Before April 26, 2027:** Agencies have time to achieve compliance proactively, which typically costs less than reactive remediation
- **After April 26, 2027:** Falling short of WCAG 2.1 Level AA becomes a violation of the federal web rule itself (28 CFR § 35.200). That date isn't a grace period, though — Title II's general nondiscrimination and effective-communication duties apply today, and the IITAA standards already apply (see [Can we face complaints or lawsuits before April 2027?](#compliance-requirements-iitaa-and-ada-title-ii-can-we-face-complaints-or-lawsuits-before-april-2027)). An accessibility barrier left in place is an ongoing problem — the obligation does not expire because the deadline passed, and a barrier that still exists can still draw a complaint or an enforcement action.
- **Good faith efforts:** Documenting progress toward compliance, even if not fully achieved by the deadline, can demonstrate good faith efforts, which may be considered in enforcement actions.

**Practical steps for agencies:**

1. **Assess current state** — Conduct an accessibility audit to understand the scope of work needed
2. **Prioritize remediation** — Focus on high-traffic pages, critical services, and new content first
3. **Test regularly** — Run automated accessibility scans regularly to identify and fix issues proactively
4. **Audit content systematically** — Review documents, PDFs, videos, and social media for accessibility
5. **Document progress** — Maintain records of accessibility testing, remediation efforts, and training activities (for screen reader testing, ICJIA's free [voicecap](#screen-reader-testing-voicecap-how-accurate-is-voicecap-and-how-can-a-manager-or-auditor-check-its-results) saves a dated, fingerprinted record of each run)
6. **Plan for ongoing compliance** — Accessibility requires ongoing attention as content is created and updated
7. **Allocate resources** — Ensure adequate staff time and budget for accessibility work

**Key takeaway:** Non-compliance is likely to be discovered through audits, scans, complaints, or enforcement actions — it's safer to assume issues will surface eventually than to bet they won't. Proactive compliance reduces both legal risk and organizational disruption. Agencies that allocate appropriate resources now are better positioned to meet the deadline and demonstrate their commitment to serving all Illinois residents.

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — DOJ's plain-language summary of the rule and its deadlines
- <a href="https://www.ada.gov/resources/web-guidance/" target="_blank" rel="noopener noreferrer">DOJ: Guidance on Web Accessibility and the ADA</a> — DOJ's 2022 web accessibility guidance (it predates the 2024 rule)
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: ADA Title II Final Rule</a> — Official rule text
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-F" target="_blank" rel="noopener noreferrer">28 CFR Part 35, Subpart F (eCFR)</a> — How Title II complaints, investigations, and compliance reviews work
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA Information</a> — State-level accessibility requirements and compliance information

### Given the uncertainty around enforcement, can we tell staff to continue with their current workflows for now?

{updated:2026-10-26}

**Quick answer:** No. While enforcement details may still be evolving, the legal requirements are clear: Illinois's IITAA standards already apply today (WCAG 2.1 Level AA for anything your agency builds, buys, or substantially changes), and the federal ADA Title II rule requires WCAG 2.1 Level AA by April 26, 2027. Putting accessibility on hold exposes the agency to legal risk and creates a larger remediation burden later. A "wait and see" approach is understandable but ultimately more costly than starting now.

**Full explanation:**

It's natural to feel overwhelmed by new compliance requirements, especially when some details about enforcement are still developing. However, several key points are already certain:

**What is NOT uncertain:**

- **The federal deadline is law today:** April 26, 2027 is written into federal regulation (28 CFR § 35.200(b)) — not a proposal or guideline. It has already moved once, a pending lawsuit asks a court to move it *earlier*, and DOJ has said it will consider proposing changes to the rule — so plan around the current date and don't count on another extension. See [Is the April 26, 2027 deadline final, or could a court move it back?](#compliance-requirements-iitaa-and-ada-title-ii-is-the-april-26-2027-deadline-final-or-could-a-court-move-it-back).
- **The standard is defined:** WCAG 2.1 Level AA is the specific, measurable requirement. The standard itself spells out what compliance means.
- **Illinois law already requires this:** IITAA has required accessible digital content since 2008. The federal ADA rule reinforces existing state obligations.
- **The legal framework is established:** ADA Title II has been enforced for decades. The web accessibility rule clarifies how it applies to digital content, but the underlying civil rights protections are long-standing.

**Why "wait and see" creates more problems:**

| Concern | Reality |
| ------- | ------- |
| "Enforcement might not happen" | Multiple pathways exist for identifying non-compliance: DOJ investigations, individual complaints, advocacy organization audits, automated scans, and grant compliance reviews. See [Who's going to notice if we're not compliant?](#common-concerns-who-s-going-to-notice-if-we-re-not-compliant-by-april-26-2027) |
| "We can fix it later if needed" | Fixing content after it's published means doing the work twice, and the backlog keeps growing. W3C's business case notes that accessibility "could contribute to cost savings when it is integrated into existing and ongoing development cycles." |
| "Staff are already busy" | Accessibility isn't additional work — it's a change in how existing work is done. Starting now allows staff to learn gradually rather than scramble at the deadline. |
| "The rules might change" | The federal compliance date has moved once (from April 24, 2026 to April 26, 2027), and DOJ has said it may propose changes to parts of the 2024 rule — see [Is the April 26, 2027 deadline final, or could a court move it back?](#compliance-requirements-iitaa-and-ada-title-ii-is-the-april-26-2027-deadline-final-or-could-a-court-move-it-back). But the technical standard hasn't changed: WCAG 2.1 has been a W3C standard since 2018 and Illinois's IITAA standard since June 24, 2024, and the IITAA applies to state agencies regardless of what happens federally. |
| "This FAQ itself might be wrong or incomplete" | Fair point — this FAQ is internal guidance, not legal advice. But the underlying sources are authoritative: the published federal rule, Illinois DoIT's IITAA guidance, and W3C's WCAG standards. When in doubt, go directly to the source. This FAQ translates those sources into practical guidance, but the legal requirements exist independently of this document. |
| "I just want to keep things simple and move forward" | Understandable. The simplest path forward is to build accessibility into your workflow now rather than maintain two approaches (current workflow + future remediation). Learning alt text, headings, and contrast takes less time than explaining to leadership why your content needs emergency fixes at the deadline. |

**The risk of directing staff not to prioritize accessibility:**

- **Organizational responsibility:** The agency is responsible for compliance decisions. Taking a documented position to deprioritize compliance creates a record that may need to be explained if questions arise later.
- **Accumulating debt:** Every inaccessible document, video, or webpage created between now and the deadline adds to the remediation backlog.
- **Culture and momentum:** Staff who are told "don't worry about it" will need to be re-trained and re-motivated later, which is harder than building habits now.
- **Service impact:** Real people with disabilities are unable to access agency information and services while compliance is delayed.

**A more sustainable approach:**

Rather than all-or-nothing, consider a phased approach:

1. **Start with new content:** Everything created from today forward should follow accessibility basics (alt text, headings, captions, contrast)
2. **Prioritize high-impact items:** Focus remediation on high-traffic pages, critical services, and frequently-used documents
3. **Build capacity gradually:** Provide training in manageable increments rather than overwhelming staff
4. **Document progress:** Track what's been addressed to demonstrate good-faith efforts

**What to say to your team:**

> **A word of caution:** Telling staff "don't worry about accessibility" — especially in writing — creates a record that the unit chose to deprioritize a compliance requirement. If questions arise later, this guidance may need to be explained. It also sets a tone that's difficult to reverse later.

Instead of "don't worry about it," consider: _"Accessibility is a new compliance requirement, and we're building it into our workflows. Start with the basics on new content. We'll prioritize remediation based on impact and provide training to help you build these skills."_

**Key takeaway:** Uncertainty about enforcement specifics doesn't reduce the legal obligation. The requirements are clear, the deadline is set, and the standard is defined. Starting now — even with small steps — is both the legally prudent and practically easier path forward.

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — Official information about the rule and deadline
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: ADA Title II Final Rule</a> — The published regulation with compliance timeline
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — Illinois state accessibility requirements (in effect since 2008)
- <a href="https://www.w3.org/WAI/business-case/" target="_blank" rel="noopener noreferrer">W3C: The Business Case for Digital Accessibility</a> — Why building accessibility in from the start costs less

**See also:** [Who's going to notice if we're not compliant by April 26, 2027?](#common-concerns-who-s-going-to-notice-if-we-re-not-compliant-by-april-26-2027) | [I'm already overloaded — how am I supposed to add accessibility to my workload?](#common-concerns-i-m-already-overloaded-how-am-i-supposed-to-add-accessibility-to-my-workload)

### What is WCAG?

{updated:2026-05-06}

**WCAG (Web Content Accessibility Guidelines)** are international standards that explain how to make digital content accessible to people with disabilities. Think of them as a detailed checklist for making websites, documents, and apps usable by everyone.

WCAG is organized around four principles, known as **POUR**:

- **Perceivable** — People should be able to see or hear content (or have it described by assistive technology). Example: Images need text descriptions for people who can't see them.
- **Operable** — People should be able to use interface components and navigate content. Example: Everything that works with a mouse should also work with a keyboard.
- **Understandable** — Content and how to use it should be clear. Example: Error messages should explain what went wrong and how to fix it.
- **Robust** — Content should work with different technologies, including assistive tools like screen readers. Example: Use standard HTML so assistive technologies can interpret the content.

**Verbatim from WCAG 2.1 (W3C):**

> "In order to meet the varying needs of this audience, several layers of guidance are provided including overall *principles*, general *guidelines*, testable *success criteria* …"

— <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">WCAG 2.1, "Layers of Guidance" (W3C)</a>

**Why WCAG matters for your agency:** WCAG 2.1 Level AA is the technical bar that both ADA Title II's web rule and Illinois IITAA 2.1 Standards point to as their measuring stick (the federal rule incorporates WCAG 2.1 by reference at 28 CFR § 35.200(b)(3); IITAA does the same). WCAG itself is a W3C standard, not law — but because the rules point to it, hitting WCAG 2.1 AA is how Illinois state agencies demonstrate they've met the requirement.

**References:**

- <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">W3C: WCAG Overview</a> — Official overview of WCAG standards
- <a href="https://www.w3.org/WAI/fundamentals/accessibility-principles/" target="_blank" rel="noopener noreferrer">W3C: Accessibility Principles</a> — Detailed explanation of POUR principles
- <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Specification</a> — Full normative text

**See also:** [What does "WCAG 2.1 Level AA" mean?](#common-concerns-what-does-wcag-2-1-level-aa-mean) | [What WCAG requirements are commonly overlooked?](#website-accessibility-what-wcag-requirements-are-commonly-overlooked)

### What does "WCAG 2.1 Level AA" mean?

{updated:2026-10-26}

WCAG has three conformance levels:

- **Level A** — Minimum accessibility (required to meet).
- **Level AA** — Standard accessibility ← _Required for Illinois agencies under both IITAA and ADA Title II_.
- **Level AAA** — Enhanced accessibility (may meet where feasible).

Illinois requires Level AA conformance, which includes all Level A and Level AA success criteria.

**Verbatim from WCAG 2.1, Conformance Requirement 1 — Conformance Level:**

> "One of the following levels of conformance is met in full.
>
> - For Level A conformance (the minimum level of conformance), the web page satisfies all the Level A success criteria, or a conforming alternate version is provided.
> - For **Level AA conformance, the web page satisfies all the Level A and Level AA success criteria**, or a Level AA conforming alternate version is provided.
> - For Level AAA conformance, the web page satisfies all the Level A, Level AA and Level AAA success criteria, or a Level AAA conforming alternate version is provided."

— <a href="https://www.w3.org/TR/WCAG21/#conformance" target="_blank" rel="noopener noreferrer">WCAG 2.1, § 5.2.1 (W3C)</a>

**Verbatim from WCAG 2.1, Conformance Requirement 2 — Full pages:**

> "Conformance (and conformance level) is for **full web page(s) only, and cannot be achieved if part of a web page is excluded**."

— <a href="https://www.w3.org/TR/WCAG21/#conformance" target="_blank" rel="noopener noreferrer">WCAG 2.1, § 5.2.2 (W3C)</a>

This is what defeats the "we'll just exclude the embed or widget from the audit" argument. WCAG conformance is a property of the **whole page** as delivered to the user — the standard doesn't let you carve out an inaccessible piece and still claim the page conforms. (A linked PDF is judged as its own document rather than as part of the page — but it has to conform on its own, too.)

**Note about WCAG versions:** WCAG 2.2 was published in October 2023 and adds additional success criteria. However, the ADA Title II rule specifically requires WCAG 2.1 Level AA. Content that meets WCAG 2.1 Level AA meets the federal web rule's technical standard. WCAG versions are largely backward-compatible, so meeting 2.2 generally means meeting 2.1 and 2.0 — with one wrinkle: WCAG 2.2 removed SC 4.1.1 Parsing as obsolete, so it remains part of 2.1 but is not carried into 2.2. W3C's current edition of WCAG 2.1 adds a note that 4.1.1 "should be considered as always satisfied for any content using HTML or XML." The federal rule cites the original 2018 edition, which predates that note, but in practice 4.1.1 rarely changes a real compliance assessment.

**References:**

- <a href="https://www.w3.org/WAI/WCAG21/Understanding/conformance#levels" target="_blank" rel="noopener noreferrer">W3C: Understanding WCAG Conformance Levels</a> — Official explanation of A, AA, and AAA levels
- <a href="https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/" target="_blank" rel="noopener noreferrer">W3C: What's New in WCAG 2.2</a> — Comparison of WCAG versions

**See also:** [What is WCAG?](#common-concerns-what-is-wcag) | [What WCAG requirements are commonly overlooked?](#website-accessibility-what-wcag-requirements-are-commonly-overlooked)

### Should we test against WCAG 2.2 or WCAG 2.1?

{updated:2026-11-06}

**Quick answer:** Your **legal targets are WCAG 2.1 Level AA** — both the ADA Title II web rule and the IITAA 2.1 Standards cite it specifically. WCAG 2.2 is the newest W3C Recommendation and is worth adopting voluntarily, but its new criteria are not required by either law.

**What each version is:**

- **WCAG 2.1** (2018) — the version both of your legal obligations point at. The federal rule incorporates it by reference — 28 CFR § 35.200(b)(3) pins the June 5, 2018 version — and IITAA 2.1 requires WCAG 2.1 Level AA. (W3C has since republished WCAG 2.1 with errata, most recently on May 6, 2025; the rule still points to the 2018 edition.)
- **WCAG 2.2** (2023, the current W3C Recommendation) — keeps all WCAG 2.1 requirements (it retires only the obsolete parsing criterion, 4.1.1) and adds nine criteria, mostly about focus visibility, dragging alternatives, target size, and accessible authentication. W3C states WCAG 2.2 does not deprecate WCAG 2.1.
- **WCAG 3.0** — still a <a href="https://www.w3.org/TR/wcag-3.0/" target="_blank" rel="noopener noreferrer">Working Draft</a> (latest September 10, 2026) that W3C says "still has several years of work." Don't wait for it, and be skeptical of vendors marketing "WCAG 3.0 readiness."

**The practical answer for Illinois agencies:**

1. **Report compliance against WCAG 2.1 Level AA** — that's what the rule and IITAA measure.
2. **Build and test to WCAG 2.2 Level AA when you can** — meeting 2.2 AA covers your 2.1 AA obligations — except 4.1.1 Parsing, which 2.2 dropped and which W3C says authors bound to 2.1 "may need to continue to test and report" — *and* you're ahead of any future standards move (see [Could the IITAA standards change in 2026?](#compliance-requirements-iitaa-and-ada-title-ii-could-the-iitaa-standards-change-in-2026)). ICJIA's own file checker at <a href="https://audit.icjia.app" target="_blank" rel="noopener noreferrer">audit.icjia.app</a> scores documents against WCAG 2.1 A/AA and lists the criteria WCAG 2.2 added separately, for manual review.
3. **Don't let a 2.2-only finding block a 2.1 conformance claim** — a failure of, say, target size (2.2's 2.5.8) is worth fixing but does not violate WCAG 2.1 Level AA. The same goes for ICJIA's screen reader testing tool, [voicecap](#screen-reader-testing-voicecap-how-is-voicecap-different-from-automated-checkers-like-axe-pa11y-lighthouse-or-siteimprove): its axe check also includes WCAG 2.2 and "best practice" rules, so sort its findings by rule set before reporting.

**See also:** [What does "WCAG 2.1 Level AA" mean?](#common-concerns-what-does-wcag-2-1-level-aa-mean)

**References:**

- <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">WCAG 2.1 (W3C Recommendation)</a> — The legally cited standard
- <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">WCAG 2.2 (W3C Recommendation)</a> — The newest version and what it adds
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200(b)(3) (eCFR)</a> — Incorporation of WCAG 2.1 by reference

### What are the most common accessibility mistakes and issues to avoid?

{updated:2026-10-26}

> **What does "SC" mean?** SC stands for **Success Criterion** — the specific, testable requirements within WCAG. Each SC has a number (like 1.1.1) and a conformance level (A, AA, or AAA). You can look up any SC at the <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a>.

**Quick answer:** Most accessibility issues come from a small set of common mistakes. Avoid these and you'll prevent the majority of accessibility problems. Beyond the basics (alt text, color contrast, headings), there are also specific WCAG requirements that are frequently overlooked.

**Top 10 most common accessibility mistakes (and what to do instead):**

| ❌ Don't do this                                                                            | ✅ Do this instead                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Skip alt text on images** — "The image is self-explanatory"                            | Write alt text for every image. If you took the photo for a reason, that reason needs words. (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">SC 1.1.1 - Level A</a>)            |
| **2. Use "Click here" or "Read more" for links** — Screen readers read links out of context | Write descriptive links: "Download the 2025 Annual Report" or "View training schedule" (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#link-purpose-in-context" target="_blank" rel="noopener noreferrer">SC 2.4.4 - Level A</a>)           |
| **3. Make text bold instead of using heading styles** — Looks like a heading but isn't one  | Use Heading 1, Heading 2, Heading 3 styles. Screen readers use headings to navigate. (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)              |
| **4. Put essential info only in images** — Images may not load or be visible                | Always include the same information as text in the document or caption                                                                                                                                                                                  |
| **5. Use color alone to convey meaning** — "Required fields are in red"                     | Use text labels, icons, or patterns in addition to color (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#use-of-color" target="_blank" rel="noopener noreferrer">SC 1.4.1 - Level A</a>)                                                    |
| **6. Create PDFs by scanning paper** — Results in an image, not readable text               | Create documents digitally with proper structure. If all you have is a scan, run OCR *and* tag the result — OCR alone gives you text, not headings or reading order                                                                                                                                                                                             |
| **7. Skip captions on videos** — "People can figure it out"                                 | Always add captions. It's a compliance requirement and benefits everyone. (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#captions-prerecorded" target="_blank" rel="noopener noreferrer">SC 1.2.2 - Level A</a>)                           |
| **8. Use tiny or low-contrast text** — Light gray on white, small fonts                     | Use at least 4.5:1 contrast ratio for normal text; avoid very small text sizes that reduce readability (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#contrast-minimum" target="_blank" rel="noopener noreferrer">SC 1.4.3 - Level AA</a>) |
| **9. Build complex tables with merged cells** — Screen readers often misread them         | Use simple tables with clear headers; avoid merging cells when possible (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)                           |
| **10. Assume "IT will fix it later"** — Accessibility is everyone's job                     | Make accessibility part of your workflow from the start                                                                                                                                                                                                 |

**Other common website accessibility issues:**

- **Missing form labels** — Form fields without associated labels (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)
- **Keyboard inaccessibility** — Interactive elements that can't be reached or operated with a keyboard (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#keyboard" target="_blank" rel="noopener noreferrer">SC 2.1.1 - Level A</a>)
- **Missing or vague page titles** — every page needs a title that describes its topic or purpose; the same generic title on every page usually fails that test (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#page-titled" target="_blank" rel="noopener noreferrer">SC 2.4.2 - Level A</a>)
- **Auto-playing audio** that plays for more than 3 seconds with no way to pause, stop, or turn it down (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#audio-control" target="_blank" rel="noopener noreferrer">SC 1.4.2 - Level A</a>)
- **Removing focus indicators** — The blue outline helps keyboard users know where they are
- **Using placeholder text as labels** — Placeholder text disappears when you start typing
- **Making clickable areas too small** — For usability, aim for touch targets of at least 44x44 pixels (strongly recommended best practice)
- **Flashing or blinking content** — Can trigger seizures; avoid any flashing content entirely, or ensure nothing flashes more than 3 times in any one-second period

**See also:** [What WCAG requirements are commonly overlooked?](#website-accessibility-what-wcag-requirements-are-commonly-overlooked) for additional requirements beyond these basics. | [How is voicecap different from automated checkers like axe, Pa11y, Lighthouse, or SiteImprove?](#screen-reader-testing-voicecap-how-is-voicecap-different-from-automated-checkers-like-axe-pa11y-lighthouse-or-siteimprove) — hear how mistakes like #1 and #2 sound to a screen reader user.

**Key takeaway:** Most accessibility issues aren't complicated — they're just habits we haven't formed yet. Avoid these common mistakes and you'll address the majority of accessibility barriers.

**Quick self-check:** Before publishing any content, ask yourself:

1. Does every image have alt text?
2. Are my links descriptive?
3. Did I use heading styles (not just bold)?
4. Can I understand the content without seeing colors?
5. Do my videos have captions?

If you can answer "yes" to all five, you've avoided the most common problems.

## State Agency Applicability

### Do we need an agency accessibility coordinator?

{updated:2026-11-06}

**Quick answer:** Yes. The coordinator should be in an executive, compliance, or management role — not a web developer or content creator. Practitioners are busy doing compliance work and typically lack organizational authority for policy and resource decisions.

**This is a legal requirement, not just good practice.** Under ADA Title II, <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.107" target="_blank" rel="noopener noreferrer">28 CFR § 35.107(a)</a> requires every public entity with 50 or more employees to **designate at least one responsible employee** to coordinate its efforts to comply with Title II — commonly called the agency's "ADA Coordinator." ICJIA is well over that threshold (130 employees in fiscal year 2025, according to the <a href="https://budget.illinois.gov/content/dam/soi/en/web/budget/documents/budget-book/fy2027-budget/Fiscal-Year-2027-Operating-Budget.pdf" target="_blank" rel="noopener noreferrer">Illinois State Budget for Fiscal Year 2027</a>), so the rule already requires ICJIA to have one — and to make that employee's name, office address, and telephone number available to all interested individuals. Digital accessibility is one of the things that coordinator has to coordinate; the open questions are _who_ holds the role and _with what authority_ — not _whether_. (The same section, § 35.107(b), separately requires a published grievance procedure — see [How do we handle accessibility complaints?](#icjia-specific-information-how-do-we-handle-accessibility-complaints).)

**Why a practitioner usually isn't the right coordinator:**

- **Limited scope** — Web developers handle websites; content creators handle documents. Accessibility covers both, plus videos, social media, mobile apps, and third-party tools.
- **Busy doing the work** — They're implementing standards and remediating content, not coordinating organizational strategy.
- **No organizational authority** — They can't set agency-wide policy, allocate budgets, or direct other departments.

**What the coordinator does:**

- Set accessibility policy and allocate resources (budget, training, tools)
- Coordinate across IT, communications, legal, procurement, and content teams
- Report compliance status, risks, and progress to executive staff

**Who should be the coordinator:** Compliance officer, IT director/manager, communications director, program manager, or executive staff member — someone with organizational authority across departments.

**Is accessibility a project — or something bigger?**

It's bigger — and this is the most important thing to settle before naming a coordinator, because it decides whether the role is temporary or permanent.

A **project** has a start date, an end date, a defined deliverable, and then it closes. **Remediating your legacy content** — the existing backlog of inaccessible PDFs, pages, and videos — _is_ project-shaped: bounded scope, a finish line. But **accessibility itself is a program, not a project** — a standing operating requirement with no end date. All three authorities that govern an Illinois state agency point the same way:

- **ADA Title II — `28 CFR § 35.200`** requires that web content _be_ accessible. That is a continuous-state obligation: every new page, document, form, and video has to clear the bar, indefinitely.
- **WCAG 2.1 Level AA conformance** is a property of a page _as delivered, every time it is published_. A page that conformed last month fails the moment someone uploads an untagged PDF or pastes low-contrast text. There is no "done" state to reach and lock in.
- **The IITAA** has been law since **2007**, with technical standards in effect since **2008** — eighteen years. If accessibility were a project, it would have "ended" long ago. It has not, because it is not one.

The **April 26, 2027 deadline** is what misleads people. It looks like a project deadline — hit the date, ship it, close the project. It is not. It is the date the _ongoing_ federal obligation becomes enforceable; the IITAA obligation is already in force today. After April 2027 the work does not stop — it just becomes federally enforceable on top of the state obligation that was already there. See [After April 26, 2027, how do we maintain compliance (so we don't fall out of compliance again)?](#state-agency-applicability-after-april-26-2027-how-do-we-maintain-compliance-so-we-don-t-fall-out-of-compliance-again) for what the ongoing program looks like.

**So can a project manager just "run the accessibility project"?**

This is a common assumption — that accessibility coordination is a project, so a project manager (PMP, Six Sigma, or similar) can be handed "the accessibility project" and run it to completion. It is half right, and the half that is wrong causes real problems.

**The half that is right:** project-management skill is genuinely useful here, and the _legacy-remediation backlog_ is a real project — bounded scope, a prioritized list, a finish line. A project manager is often exactly the right person to run _that_ effort, under the coordinator.

**The half that is wrong:** accessibility itself is not a project, so "manage the accessibility project to completion" is the wrong assignment. A coordinator whose mental model is "deliver by the deadline, then close it out" will:

- disband the effort at April 2027 instead of standing up the permanent program,
- treat each new inaccessible document as scope creep rather than the normal, continuous workload it is, and
- let the agency drift back out of compliance — the exact failure mode the maintain-compliance guidance warns about.

Project-management skill is also not the _qualification_ — it is one useful skill among several. The `§ 35.107` responsible-employee role is a **standing** assignment, not a project posting. The coordinator needs **organizational authority across departments**, **accessibility literacy**, and a **program mindset** (ongoing, like security and privacy — not bounded). A project manager who brings all three can absolutely be the coordinator — but at that point they are functioning as a _program owner_, not running a project. A project manager handed only "close the accessibility project by the deadline" is set up to mismanage it.

**The practical split:** let a project manager run the _remediation project_ under the coordinator. Do not let "we'll assign a PM to the accessibility project" stand in for naming a permanent coordinator who owns the ongoing program.

**Is being the IT manager — or any manager — enough?**

Not by title alone. `§ 35.107(a)` requires the agency to _designate_ a responsible employee — a deliberate, documented assignment, not a role someone becomes "de facto" because they happen to run a department. An IT director or manager can be an excellent choice — they already have the organizational authority the role needs — but the title is not the qualification. Two things have to come with it:

- **Cross-domain reach.** Accessibility spans documents, web, video, social media, procurement, and training — not just the IT stack. A coordinator who can only direct the web team is coordinating a slice, not the program. The role is to coordinate _across_ departments, including ones the coordinator does not manage.
- **Accessibility literacy — or a real commitment to build it.** A coordinator does not need to fix a contrast bug or tag a PDF themselves (that is the practitioners' job). But they do need to understand what the rules require, how the work is distributed, and enough to tell a credible remediation plan from a hopeful one. A manager who treats accessibility as "the web team's problem" is not coordinating it.

**What the coordinator should know:**

- **The legal landscape** — the IITAA, the ADA Title II web rule, and WCAG 2.1 Level AA as the shared standard. Enough to know what the rules _do_ and _do not_ require: that the target is AA (not AAA), that the exceptions are narrow, that "effective communication" still applies, that no certificate or vendor "makes you compliant."
- **What WCAG 2.1 AA covers conceptually** — the categories of barriers (perceivable, operable, understandable, robust), not necessarily the line-level fixes.
- **How the work is distributed** — what content creators, developers, and procurement each own, because coordination means knowing who does what and where the gaps are.
- **Testing reality** — automated tools catch only part of the picture, human testing is required, and a vendor's VPAT is a starting point rather than proof. ICJIA's free voicecap tool helps with the screen reader part: it has the real NVDA screen reader read every page on a site's list and keeps a dated record a coordinator can check (see [What is voicecap, and why did ICJIA build it?](#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it)).
- **Why this is mission work, not box-checking** — for ICJIA specifically, accessibility is the agency's own social- and criminal-justice mission applied to its digital front door (see [How does digital accessibility and compliance fit into an agency's DEIA mission?](#understanding-accessibility-how-does-digital-accessibility-and-compliance-fit-into-an-agency-s-deia-mission)). A coordinator who understands that leads it as mission work; one who does not treats it as paperwork.
- **Where the authoritative answers live** — Illinois DoIT for IITAA guidance and training, agency legal counsel for legal determinations.

**What experience helps:**

- **Cross-departmental program coordination** — translating a requirement into operational practice across teams that do not report to you.
- **Compliance, policy, or governance work** — accessibility is a compliance deliverable like security and privacy, and it is run the same way.
- **Enough technical literacy to talk credibly with the web team** — not hands-on remediation experience; the coordinator owns the program, the practitioners do the fixes.

**Does the coordinator need to be IAAP-certified?**

**No — no certification is required by the IITAA, the ADA Title II web rule, or WCAG.** None of the three authorities that govern an Illinois state agency mention a credential. A coordinator with the right knowledge, authority, and cross-domain reach is qualified whether or not they hold a certificate.

That said, certification _can_ help — as a structured way to build the knowledge above and as a signal of baseline competence. If a coordinator wants a path, the **IAAP CPACC** (Certified Professional in Accessibility Core Competencies, from the International Association of Accessibility Professionals) is the one aimed at this role: it covers disabilities and assistive technology, accessibility standards, and the legal and policy landscape — the "core competencies" a coordinator coordinates around. IAAP's deeper technical credential (the WAS, Web Accessibility Specialist) is aimed at hands-on practitioners, not coordinators. Treat CPACC as a useful option, not a requirement — the job is coordination, authority, and a program mindset, not a line on a résumé. (Whether certification builds _agency-wide_ confidence — for leadership, auditors, and the public — is a related but broader question: see [Does IAAP certification help — and can it build agency confidence in our accessibility work?](#state-agency-applicability-does-iaap-certification-help-and-can-it-build-agency-confidence-in-our-accessibility-work).)

**Bottom line:** Yes, you need an accessibility coordinator — and web developers and content creators generally aren't positioned to fill this role. Both are essential practitioners doing the actual compliance work, but they lack the organizational authority, cross-departmental visibility, and strategic positioning the coordinator role requires. The coordinator should be someone in executive, compliance, or management roles who can set policy, allocate resources, coordinate across departments, and report to leadership — while relying on web developers and content creators as the technical experts who get the work done. And the role is **permanent**: accessibility is an ongoing program, not a project that closes at the April 2027 deadline.

**References:**

- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.107" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.107 (eCFR)</a> — requires a designated responsible employee (ADA Coordinator) and published grievance procedures for public entities with 50 or more employees

### Does IAAP certification help — and can it build agency confidence in our accessibility work?

{updated:2026-10-26}

**Quick answer:** Certification is **not required** by any of the three authorities that govern an Illinois state agency — the IITAA, the ADA Title II web rule, and WCAG 2.1 say nothing about a credential. But yes, it **can** build agency confidence: it turns "we think we know accessibility" into "our people demonstrably do," and it is a credible signal — to leadership, to Illinois DoIT, to the public, and as part of a documented accessibility program — that the agency invested in real expertise. The one rule: treat it as something that strengthens the _people_ doing the work, not as a substitute for the _content_ actually meeting WCAG 2.1 Level AA.

**What IAAP certification is:**

The **IAAP** (International Association of Accessibility Professionals) offers vendor-neutral credentials. The four that matter here:

- **CPACC** — _Certified Professional in Accessibility Core Competencies._ Broad and non-technical: disabilities and assistive technology, accessibility standards, and the legal and policy landscape. This is the one aimed at **coordinators, managers, and content leads** — the people who set direction.
- **WAS** — _Web Accessibility Specialist._ Technical and hands-on: evaluating and remediating web content against WCAG. Aimed at **web developers and practitioners** — the people who build and fix.
- **ADS** — _Accessible Document Specialist._ For the people who create and fix accessible digital documents, such as Word files and PDFs. Aimed at **content creators and document remediators** — the people who produce most of an agency's PDFs.
- **CPWA** — _Certified Professional in Web Accessibility._ Simply CPACC and WAS together.

It is **not** a compliance certificate. No IAAP credential — and no credential of any kind — makes your websites or documents conform. (See [Who signs off that we're compliant? Can we "certify" WCAG 2.1 Level AA compliance?](#getting-started-who-signs-off-that-we-re-compliant-can-we-certify-wcag-2-1-level-aa-compliance).) Certification is a statement about a **person's** knowledge; conformance is a property of your **content**.

**How it can build agency confidence:**

- **Real competence instead of guesswork.** A structured curriculum means staff actually understand the standards, the range of disabilities, the assistive technology, and what the rules require — rather than improvising. That is the difference between an accessibility program and an accessibility hope.
- **A credible signal of good-faith investment.** "Our accessibility lead holds CPACC; our web developers hold WAS" is concrete evidence the agency took this seriously and resourced it — for leadership weighing whether to trust the program, for Illinois DoIT, and, if it ever comes to it, as part of the good-faith record in an enforcement review.
- **Harder to be snowed.** Certified staff can read a vendor's VPAT/ACR critically, push back on a consultant, and judge a remediation plan on its merits — because they know the standard and share the vocabulary.
- **Less single-person risk.** Spreading certification across a few roles reduces the "what happens when that one person leaves" exposure.

**The honest limit:**

The confidence the three frameworks actually reward is **demonstrated WCAG 2.1 Level AA conformance plus a documented process** — not credentials on a wall. A fully certified team sitting on an inaccessible site is still out of compliance. Certification raises the floor on your _people_; it does not certify your _content_. Pair it with the real work: testing, remediation, and accessible-by-default authoring.

**Practical approach:**

- **CPACC** for the accessibility coordinator and any managers or content leads who set direction.
- **WAS** for the web developers doing hands-on remediation.
- **ADS** for the staff who produce or remediate PDFs and other documents.
- You do not need to certify everyone — target the people who set direction and the people who build. For everyone else, role-based training (for example, <a href="https://doit.illinois.gov/initiatives/accessibility/guides.html" target="_blank" rel="noopener noreferrer">Illinois DoIT's free accessibility guides and training</a>) is the right level.

**See also:** [Do we need an agency accessibility coordinator?](#state-agency-applicability-do-we-need-an-agency-accessibility-coordinator) | [Who signs off that we're compliant? Can we "certify" WCAG 2.1 Level AA compliance?](#getting-started-who-signs-off-that-we-re-compliant-can-we-certify-wcag-2-1-level-aa-compliance) | [How can I track and demonstrate "good-faith progress" toward compliance?](#getting-started-how-can-i-track-and-demonstrate-good-faith-progress-toward-compliance)

**References:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — the IITAA sets WCAG 2.1 Level AA as the standard; it does not require any staff credential
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.200 (eCFR)</a> — the web rule requires content to meet WCAG 2.1 Level AA; it does not require certified staff
- <a href="https://www.w3.org/TR/WCAG21/#conformance" target="_blank" rel="noopener noreferrer">WCAG 2.1, Section 5 (Conformance)</a> — conformance is defined by meeting the success criteria, not by who evaluated them

### Why does your agency need to worry about digital accessibility? What does the April 2027 deadline mean?

{updated:2026-10-26}

**Illinois state agencies are subject to both state and federal accessibility requirements (IITAA and ADA Title II).** Under the ADA Title II web rule (28 CFR Part 35), the federal compliance deadline is April 26, 2027 for public entities with a total population of 50,000 or more — which includes all Illinois state agencies, because a state agency's population under the rule is the state's. The IITAA 2.1 Standards, which require the same WCAG 2.1 Level AA, already apply: since June 24, 2024, to anything an agency builds, buys, or substantially changes (older technology was held to WCAG 2.0 Level AA under IITAA 2.0).

**Why this matters for Illinois state agencies:**

1. **State agency status** — Illinois state agencies fall under the Illinois Information Technology Accessibility Act (IITAA), which has required accessible digital content since 2008. The current IITAA 2.1 Standards (effective June 24, 2024) require WCAG 2.1 Level AA compliance.

2. **Public service mission** — State agencies provide information, research, and resources to Illinois residents. Under ADA Title II, all public-facing digital content must be accessible to people with disabilities.

3. **Illinois residents with disabilities need accessible digital content** — The <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois Information Technology Accessibility Act (IITAA)</a>, overseen by Illinois DoIT, requires that all state agency digital content be accessible to people with disabilities. Common disabilities include mobility limitations, cognitive difficulties, hearing difficulties, and vision impairment. Illinois residents with disabilities rely on accessible digital content to access government services and information. When state agency websites or documents aren't accessible, we're excluding Illinois residents with disabilities from critical government information and resources.

4. **Federal funding** — Many Illinois state agencies receive federal grants. Section 504 of the Rehabilitation Act requires that any organization receiving federal funding ensure their programs and activities are accessible to people with disabilities.

5. **The April 2027 deadline is current federal law** — The U.S. Department of Justice's ADA Title II web accessibility rule (published April 24, 2024) originally required state and local governments with populations of 50,000 or more to achieve WCAG 2.1 Level AA compliance by April 24, 2026. On April 20, 2026, DOJ published an <a href="https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web" target="_blank" rel="noopener noreferrer">Interim Final Rule</a> extending the compliance date by one year to **April 26, 2027**. Illinois has over 12 million residents, so this deadline applies to all state agencies. Don't plan around another extension: DOJ says it expects to implement the new date unless it proposes rule changes or "circumstances suggesting further delays" arise, and a pending lawsuit asks a court to restore the original 2026 date — see [Is the April 26, 2027 deadline final, or could a court move it back?](#compliance-requirements-iitaa-and-ada-title-ii-is-the-april-26-2027-deadline-final-or-could-a-court-move-it-back)

**The reality of digital accessibility now:**

Accessibility isn't just a "best practice" — it has been a legal requirement for Illinois agencies under the IITAA since its first standards took effect in 2008, and under ADA Title II, and the federal rule now adds a specific standard and date. The 2027 deadline creates accountability for what has always been the right thing to do. For state agencies, this means integrating accessibility into every aspect of your digital presence: websites, documents, social media, and any tools you provide to the public.

**Additional benefit:** Many accessibility improvements also benefit all users — clearer content, better-organized documents, and more usable websites make information easier to find and understand for everyone.

**See also:** [What is the ADA Title II digital accessibility rule?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-ada-title-ii-digital-accessibility-rule) | [Why are we just hearing about this now?](#state-agency-applicability-why-are-we-just-hearing-about-this-now) | [What happens after April 26, 2027?](#state-agency-applicability-what-happens-after-april-26-2027) | [Are there exceptions to the April 2027 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies)

**References:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA Requirements</a> — Illinois state agency accessibility requirements
- <a href="https://doit.illinois.gov/doit-news/accessibility-news/iitaa-2-1-update.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Update (DoIT)</a> — Effective date + what changed
- <a href="https://www.ada.gov/title-ii-web-rule/" target="_blank" rel="noopener noreferrer">ADA.gov: Title II Web Rule (overview and recorded webinar)</a> — DOJ's landing page for the rule
- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Fact Sheet</a> — Plain language summary of requirements and deadlines
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register (Final Rule)</a> — Full legal text

### What happens after April 26, 2027?

{updated:2026-11-06}

**Quick answer:** After April 26, 2027, Illinois state agencies — like every state or local government with a total population of 50,000 or more — must have web content and mobile apps that meet WCAG 2.1 Level AA, apart from the rule's narrow exceptions and defenses (§§ 35.200(b), 35.201, 35.205). (Smaller local governments and special districts have until April 26, 2028.) Agencies that don't comply risk DOJ investigations, lawsuits, legal costs, and — most importantly — excluding people with disabilities from accessing government services.

**Full explanation:**

**After April 26, 2027, Illinois state agencies — and every other state or local government with a total population of 50,000 or more — must meet WCAG 2.1 Level AA for their web content and mobile apps, apart from the rule's narrow exceptions and defenses (§§ 35.200(b), 35.201, 35.205).** Agencies that fail to meet this deadline may face several potential issues:

**Legal and enforcement consequences:**

- **Department of Justice investigations** — The DOJ has authority to investigate complaints and pursue enforcement actions against non-compliant agencies (<a href="https://www.ada.gov/file-a-complaint/" target="_blank" rel="noopener noreferrer">ADA.gov: File a Complaint</a>).
- **Complaints and lawsuits** — Individuals with disabilities can file administrative complaints with the DOJ. Individuals may also bring lawsuits under ADA Title II — its remedies come from the Rehabilitation Act’s enforcement framework (<a href="https://www.govinfo.gov/link/uscode/42/12133" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12133</a>), and courts may award attorney’s fees to the prevailing party (<a href="https://www.govinfo.gov/link/uscode/42/12205" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12205</a>; <a href="https://www.ada.gov/topics/title-ii/" target="_blank" rel="noopener noreferrer">ADA.gov: Title II</a>).
- **Legal costs and remediation expenses** — Agencies may face significant costs for legal defense, settlements, and emergency remediation of inaccessible content.
- **Reputational harm** — Public awareness of accessibility failures can damage an agency's reputation and public trust.

**Note:** The specific consequences in any given situation depend on many factors. This is general information about the types of enforcement mechanisms that exist under ADA Title II, not a prediction of what will happen to any particular agency. Consult your agency's legal counsel for guidance specific to your situation.

**What this means for you professionally:**

**Important distinction:** ADA Title II obligations apply to the **public entity** (the government agency), not to individual employees personally. (See the definition of “public entity” in <a href="https://www.govinfo.gov/link/uscode/42/12131" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12131</a> and Title II’s enforcement/remedies framework in <a href="https://www.govinfo.gov/link/uscode/42/12133" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12133</a>.) In practice, DOJ enforcement actions target the organization’s compliance. However, your agency may establish internal policies and expectations that affect individual staff:

- **Required remediation** — Your agency may ask you to fix inaccessible content you created as part of organizational compliance efforts.
- **Training requirements** — Your agency may require staff who create content to complete accessibility training.
- **Performance expectations** — Your agency may incorporate accessibility compliance into job responsibilities and performance evaluations.
- **Workload considerations** — Emergency remediation is stressful and time-consuming; building accessibility in from the start prevents this.

These are **internal employment matters** determined by agency policy, not direct legal consequences to individuals under ADA Title II.

**Operational impacts:**

- **Service disruptions** — If complaints or lawsuits result in court orders, agencies may need to temporarily remove or restrict access to non-compliant content.
- **Resource reallocation** — Emergency remediation efforts can divert staff time and budget from other priorities.
- **Delayed projects** — New digital projects may be delayed while existing accessibility issues are addressed.
- **Increased scrutiny** — Agencies with known accessibility issues may face increased oversight and reporting requirements.

**The bottom line:** If your agency provides it online or in an app, it generally needs to be accessible by April 26, 2027 — the § 35.201 exceptions are narrow. Agencies that start working toward compliance now have time to address issues systematically. Those that delay may face costly emergency remediation and legal consequences.

**See also:** [What does the April 2027 deadline cover?](#compliance-requirements-iitaa-and-ada-title-ii-what-does-the-april-2027-deadline-cover) for details on what content is included.

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule</a> — see "Highlights of the Requirements in the Rule" and "Summary of the Exceptions"

### Why are we just hearing about this now?

{updated:2026-10-26}

**This is a common question.** Here are the facts:

**The regulatory landscape changed in 2024:**

- **April 2024:** The U.S. Department of Justice published the ADA Title II web rule — the first federal rule to set a technical standard (WCAG 2.1 Level AA) and a compliance date for state and local government web content and mobile apps. (Section 508 already set a web standard for federal agencies: WCAG 2.0 Level AA, required since January 18, 2018.)
- **June 2024:** Illinois IITAA 2.1 standards took effect, aligning state requirements with the same standard.

Before 2024, Illinois agencies already had a state requirement — the IITAA, with technical standards since 2008 and WCAG 2.0 Level AA since January 18, 2018 — and DOJ had said since 1996 that Title II covers state and local government websites. What federal law lacked was a specific technical standard and a compliance date. That changed.

**What's different now (according to the 2024 regulations):**

| Before | Now (per ADA Title II web rule and IITAA 2.1) |
| ------ | --------------------------------------------- |
| No federal technical standard for web content (IITAA already had one) | **WCAG 2.1 Level AA** in the federal rule — the same standard as IITAA 2.1 |
| No federal compliance date | **April 26, 2027** deadline specified in rule |
| Attention focused mainly on websites | Covers web content and mobile apps — PDFs, videos, social media posts, vendor tools — with five narrow exceptions (§ 35.201) |
| Often seen as a technical/IT issue | **Everyone** who creates content shares responsibility |
| IITAA has no enforcement section; Title II web complaints had no set yardstick | DOJ and complainants can now measure web content against a published standard and date |

**Why it feels sudden:**

The 2024 federal rule made an existing obligation concrete — a federal deadline and a measurable standard — on top of an IITAA requirement that many staff had never been told about. Communication across large organizations is always imperfect, and accessibility wasn't always prioritized the same way across all roles. That's understandable given competing demands.

This isn't about blame — it's about moving forward from where we are now.

**What matters now:**

Regardless of what happened before, the requirement is clear, and April 26, 2027 is the deadline in federal law today — though it could still move in either direction (see [Is the April 26, 2027 deadline final, or could a court move it back?](#compliance-requirements-iitaa-and-ada-title-ii-is-the-april-26-2027-deadline-final-or-could-a-court-move-it-back)). ICJIA's public websites have generally followed accessibility practices, which provides a foundation. The work ahead is ensuring **all content** — documents, PDFs, videos, social media, and vendor tools — meets the same standard.

**Key takeaway:** This is a shared responsibility across the agency. Everyone who creates or publishes content has a role to play. Focus on what you can control: inventory your content, prioritize by impact, complete training, and start addressing the biggest barriers first.

### After April 26, 2027, how do we maintain compliance (so we don't fall out of compliance again)?

{updated:2026-01-02}

**Quick answer:** Treat accessibility like **security and privacy**: it’s not a one-time remediation project. Maintaining compliance means building accessibility into **every publish/purchase/build workflow**, continuously testing, fixing regressions, and keeping documentation current.

**Full explanation:**

After the deadline, agencies will still:

- **Publish new content every week** (web pages, PDFs, forms, videos, social posts)
- **Change designs and features** (which can introduce new accessibility issues)
- **Renew or adopt vendor tools** (which can create new barriers if not evaluated and monitored)

If accessibility is treated as a one-time “cleanup,” it will erode quickly. A sustainable approach is an ongoing program:

- **Bake accessibility into workflows** (before publish / before purchase / before launch)
- **Test continuously** (automated + manual; tools help, but human evaluation is required)
- **Monitor and remediate** (track issues like any operational risk)
- **Train and refresh training** (new staff and new tools create predictable drift)

**What to do (minimum viable maintenance plan):**

1. **Set a recurring testing cadence** (monthly/quarterly) for high-traffic and high-stakes services.
2. **Add accessibility gates** to CMS publishing, procurement/renewals, and releases.
3. **Track regressions** (known issues, fixes, and re-tests) in a backlog with owners.
4. **Maintain an “accessibility contact” and response process** for reports/complaints.

**See also:** [When should we run voicecap, and what do we do with the results?](#screen-reader-testing-voicecap-when-should-we-run-voicecap-and-what-do-we-do-with-the-results) — re-run the same pages after major updates and compare line by line

**References:**

- <a href="https://www.w3.org/WAI/planning-and-managing/" target="_blank" rel="noopener noreferrer">W3C: Planning and Managing Web Accessibility</a> — Program guidance and ongoing management
- <a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer">W3C WAI: Evaluating Web Accessibility Overview</a> — Notes that tools help, but no tool alone can determine conformance (human evaluation required)
- <a href="https://www.section508.gov/test/testing-lifecycle-overview/" target="_blank" rel="noopener noreferrer">Section508.gov: Testing Lifecycle</a> — Testing as a lifecycle (plan → scope → test → remediate → ongoing monitoring)

### What if we can't meet the April 26, 2027 deadline?

{updated:2026-11-06}

**Quick answer:** DOJ has already extended the deadline once (from April 24, 2026 to April 26, 2027) via an Interim Final Rule. Agencies should not plan around the possibility of further extensions. If full compliance isn't achievable by April 26, 2027, prioritize high-impact content, document your plan, and keep making progress.

**What to do:**

1. **Prioritize by impact** — High-traffic pages, critical services, and complete blockers first
2. **Document efforts** — Keep records of fixes, maintain a backlog, show a clear remediation timeline. A dated voicecap report, with every page reviewed, is one way to record screen reader testing and re-test after fixes (see [What doesn't voicecap do? Does a clean voicecap report mean our site is compliant?](#screen-reader-testing-voicecap-what-doesn-t-voicecap-do-does-a-clean-voicecap-report-mean-our-site-is-compliant))
3. **Provide accessible alternatives** — Be prepared to provide alternative formats upon request (<a href="https://www.ada.gov/resources/effective-communication/" target="_blank" rel="noopener noreferrer">ADA.gov: Effective Communication</a>)
4. **Continue after the deadline** — The obligation doesn't end; keep working toward full compliance

**Important:** The ADA Title II rule specifies technical requirements (WCAG 2.1 Level AA), not effort-based requirements. However, documented progress is better than undocumented inaction — each barrier removed helps real users access services now. For questions about enforcement risk or legal exposure, consult your agency's legal counsel.

**Verbatim from the rule (28 CFR § 35.205 "Effect of noncompliance that has a minimal impact on access"):**

> "A public entity that is not in full compliance with the requirements of § 35.200(b) will be deemed to have met the requirements of § 35.200 in the **limited circumstance** in which the public entity can demonstrate that the noncompliance has such a **minimal impact** on access that it would not affect the ability of individuals with disabilities to use the public entity's web content or mobile app to do any of the following in a manner that provides substantially equivalent timeliness, privacy, independence, and ease of use:
>
> (a) Access the same information as individuals without disabilities;
>
> (b) Engage in the same interactions as individuals without disabilities;
>
> (c) Conduct the same transactions as individuals without disabilities; and
>
> (d) Otherwise participate in or benefit from the same services, programs, and activities as individuals without disabilities."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.205" target="_blank" rel="noopener noreferrer">28 CFR § 35.205 (eCFR)</a> _(emphasis added)_

**Read this carefully — it is much narrower than it sounds.** § 35.205 is **not** a general "we missed the deadline, give us a pass" defense. It applies only when the public entity can **demonstrate** that the specific noncompliance has **minimal impact on access** — i.e., that a person with a disability can still access the same information, do the same things, with substantially equivalent timeliness/privacy/independence/ease of use as someone without a disability. A wholesale failure to meet WCAG 2.1 AA across an agency's site is not "minimal impact." A single subtle WCAG-AA failure that doesn't actually block any user might be. **Document barriers and remediation progress** so the record is in your favor if you ever need to invoke this provision.

**Note:** Very limited exceptions exist for archived content and pre-existing documents under specific circumstances. See [Are there exceptions to the April 2027 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies) for details.

**Key takeaway:** If you can't achieve full compliance by the deadline, keep making progress. Prioritize high-impact barriers, document your efforts, and provide accessible alternatives upon request.

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule</a> — Requirements and exceptions (see "Highlights of the Requirements in the Rule" and "Summary of the Exceptions")
- <a href="https://www.ada.gov/file-a-complaint/" target="_blank" rel="noopener noreferrer">ADA.gov: File a Complaint</a> — How individuals can file complaints

### Are there exceptions to the April 2027 deadline? What qualifies?

{updated:2026-11-06}

> **Heads up — this is the most commonly misunderstood part of the ADA Title II web rule.** Many agencies assume that documents created before April 26, 2027 are automatically exempt. That's a misreading: the exceptions are narrowly defined and strictly interpreted: most web pages on your active site won't qualify, and no document that people use to apply for, access, or take part in your services qualifies. DoIT takes a pragmatic approach to helping agencies manage existing content, but agencies should know that very little content actually meets the strict criteria for these exceptions.

**The Big Misconception: "Pre-2027 Content Is Automatically Exempt"**

**It isn't — the rule doesn't work that way, and this misreading catches a lot of agencies.**

The ADA Title II rule includes exceptions for certain archived content and pre-existing documents, but these exceptions are **narrowly defined** and require meeting **all** specified criteria. Simply existing before the compliance deadline does not make content exempt.

**The Department of Justice has been explicit about this:**

> "This exception does not apply to documents that are currently used to access the public entity's services, programs, or activities."
>
> — <a href="https://www.ada.gov/resources/web-rule-first-steps/" target="_blank" rel="noopener noreferrer">U.S. Department of Justice, "First Steps Toward an Accessible Web"</a>

**Bottom line:** If a web page is linked from your active website and serves a current purpose — or a document is used to apply for, access, or take part in your services — it almost certainly needs to be accessible by April 26, 2027.

**The Five Exceptions (28 CFR § 35.201)**

The ADA Title II web rule defines exactly five categories of content that may be excepted from the WCAG 2.1 Level AA requirement. Each has specific, strict criteria. **All five exceptions live in § 35.201, not § 35.200.** § 35.200 is the rule that says the agency has to comply; § 35.201 is the short list of things that get a pass.

**Verbatim from the rule (28 CFR § 35.201 "Exceptions") — the exception text itself:**

> "The requirements of § 35.200 do not apply to the following:
>
> (a) _Archived web content._ Archived web content as defined in § 35.104.
>
> (b) _Preexisting conventional electronic documents._ Conventional electronic documents that are available as part of a public entity's web content or mobile apps before the date the public entity is required to comply with this subpart, unless such documents are currently used to apply for, gain access to, or participate in the public entity's services, programs, or activities.
>
> (c) _Content posted by a third party._ Content posted by a third party, unless the third party is posting due to contractual, licensing, or other arrangements with the public entity.
>
> (d) _Individualized, password-protected or otherwise secured conventional electronic documents._ Conventional electronic documents that are: (1) About a specific individual, their property, or their account; and (2) Password-protected or otherwise secured.
>
> (e) _Preexisting social media posts._ A public entity's social media posts that were posted before the date the public entity is required to comply with this subpart."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.201" target="_blank" rel="noopener noreferrer">28 CFR § 35.201 (eCFR)</a> · <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Final rule, 89 FR 31320 (Apr. 24, 2024)</a>

Each subsection below maps to one of the lettered exceptions above.

**Exception 1: Archived Web Content (§ 35.201(a))**

**This is the strictest exception.** Web pages qualify **only if all four** of these criteria are met:

| Criterion | Requirement | What This Means |
| --------- | ----------- | --------------- |
| **1. Created before April 26, 2027** | Content must pre-date the compliance deadline, or reproduce paper documents or other physical media created before that date | New content qualifies only as a reproduction — for example, a 2028 scan of a printed 1995 report |
| **2. Exclusively for reference/research/recordkeeping** | Content cannot serve any current programmatic purpose | If anyone uses it for current services, it fails |
| **3. Not altered or updated after archiving** | **Any edit, however minor, disqualifies it** | Even fixing a typo removes the exception |
| **4. Clearly labeled archive section** | Must be in a dedicated area **clearly identified** as an archive | Putting content in a folder called "archive" on your server isn't enough — users must see clear "archived content" labeling |

**Regulatory basis:** 28 C.F.R. § 35.104 (definition of "archived web content")

**The DOJ explicitly addressed the misconception that labeling something "archived" is enough:**

> "A PDF document that includes a current map of a county park that is based on data collected after the county was required to comply with this rule would probably not fall under the exception **even if the document is posted in the 'archive' section** of the county's website. The PDF provides current information about the park. The exception would probably not apply, and the PDF would probably have to comply with WCAG 2.1, Level AA, because the content is not kept only for reference, research, or recordkeeping." _(emphasis added)_
>
> — <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">U.S. Department of Justice, ADA Title II Web Rule Fact Sheet</a>

**Exception 2: Pre-existing Conventional Electronic Documents (§ 35.201(b))**

PDFs, Word documents, spreadsheets, and presentations posted before April 26, 2027 **may** qualify, but **only if** they are not currently used to **apply for, gain access to, or participate in** the public entity's services, programs, or activities.

**Three checks — a document has to pass all of them:**

1. Is it a PDF, word processor, presentation, or spreadsheet file (such as Word, PowerPoint, or Excel)? Those are the only "conventional electronic document" formats in § 35.104.
2. Was it on your website before April 26, 2027, and has it stayed unchanged since then? DOJ says a document revised after the compliance date is no longer "preexisting."
3. Is it something the public does **not** currently use to apply for, gain access to, or participate in your agency's services?

- **If all three are yes:** The document may be exempt
- **If any answer is no:** The document is not exempt, regardless of when it was created

**Key distinction — the two exceptions work differently (a PDF can qualify under either one):**

| Aspect | Archived web content, any format (Exception 1) | Pre-existing PDF, Word, PowerPoint, and Excel files (Exception 2) |
| ------ | ----------------------- | ----------------------- |
| **Test for exemption** | Must meet ALL 4 criteria | Three checks: a PDF, Word, PowerPoint, or Excel file; posted before April 26, 2027 and not revised since; not currently used to "apply for, gain access to, or participate in" services |
| **Archive area required?** | **Yes** — must be in dedicated, clearly marked archive section | **No** — no archive area requirement |
| **Does being "linked" matter?** | **Yes** — linked from active navigation suggests current use | **No** — linking for reference purposes does not automatically disqualify |
| **Must be "never updated"?** | **Yes** — any edit after archiving disqualifies it | **Yes, from April 26, 2027 on** — DOJ says a document revised after the compliance date is no longer "preexisting" |

**This means:** A research report from 2015 that you link to from a publications page for historical reference may qualify for the exception — it's a pre-existing document not used to apply for services. But a grant application form from 2015 that people still use to apply for grants does not qualify — it's used to "apply for" services.

**Exception 3: Third-Party Content (§ 35.201(c))**

Content posted by a third party — such as a member of the public — unless that third party is posting because of a contractual, licensing, or other arrangement with your agency.

**What this covers:**

- User-generated comments on a public forum you host
- Reviews or posts by members of the public on your agency's social media pages
- Content submitted by the public that you display without modification

**What this does NOT cover (you ARE responsible for accessibility):**

- Content from vendors you contract with (LMS platforms like Docebo, payment processors, survey tools)
- Embedded content from services you have agreements with (maps from ArcGIS, dashboards from Tableau, videos from contracted providers)
- Content created by consultants or contractors under agreement with your agency
- Any content where you have a contractual, licensing, or other arrangement governing it

**Exception 4: Individualized, Password-Protected Documents (§ 35.201(d))**

The regulation's test has two parts (28 CFR § 35.201(d)): the documents are (1) **about a specific individual, their property, or their account**, and (2) **password-protected or otherwise secured**.

**Examples that may qualify:**

- An individual's personal account statements
- Personal records accessible only by the specific individual they concern
- Individual-specific letters (PDF or Word files) in a secure portal

**What this does NOT cover:**

- General password-protected areas (like member portals with shared content)
- Documents that are password-protected but shared among groups
- Internal documents shared among employees
- As a practical matter, any document that multiple members of the public can access (a conservative reading — the rule's own test is the two-part test above)

**Note:** This is a very narrow exception for truly individualized content, not a blanket exception for all password-protected materials.

**Exception 5: Pre-existing Social Media Posts (§ 35.201(e))**

Social media posts made **before the compliance date** (April 26, 2027).

**Important limitations:**

- **New posts after the deadline must be accessible** — this exception only covers pre-existing posts
- Unlike the document exception, § 35.201(e) has **no "currently used" carve-out** — a pre-deadline post remains excepted even if it is still visible
- **Practical caution:** if an old post (for example, a pinned post or one linked from your website) is the public's source for current service information, the safer course is to publish that information accessibly on your website rather than lean on the exception
- The exception does not remove your responsibility for effective communication — if someone with a disability needs information from an old post, you may need to provide it accessibly

**Authoritative Sources: What the Experts Say**

**U.S. Department of Justice (DOJ)**

The DOJ is the federal agency responsible for enforcing ADA Title II. Their guidance is authoritative.

**On the document exception:**

> "This exception does not apply to documents that are currently used to access the public entity's services, programs, or activities."
>
> — <a href="https://www.ada.gov/resources/web-rule-first-steps/" target="_blank" rel="noopener noreferrer">DOJ First Steps Guidance</a>

**On the archived content exception:**

> "A PDF document that includes a current map of a county park that is based on data collected after the county was required to comply with this rule would probably not fall under the exception **even if the document is posted in the 'archive' section** of the county's website. The PDF provides current information about the park. The exception would probably not apply, and the PDF would probably have to comply with WCAG 2.1, Level AA, because the content is not kept only for reference, research, or recordkeeping." _(emphasis added)_
>
> — <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">DOJ Fact Sheet on Web Rule</a>

**On the scope of the rule:**

> "A public entity shall ensure that the following are readily accessible to and usable by individuals with disabilities: (1) Web content that a public entity provides or makes available, directly or through contractual, licensing, or other arrangements ..."
>
> — <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200(a) (eCFR)</a>

**Ohio State University's ADA Digital Accessibility Center**

Ohio State's ADA Digital Accessibility Center has published an analysis of the rule's archived-content exception (28 C.F.R. §§ 35.104 and 35.201(a)).

**On the nature of the exception:**

> "The archived content exception is **not a blanket exception or a free pass** — it's a narrowly defined legal option to help units responsibly manage older content that's no longer in use."
>
> — <a href="https://accessibility.osu.edu/title-ii/archived-content-exception" target="_blank" rel="noopener noreferrer">Ohio State ADA Digital Accessibility Center</a>

**On the "exclusively for reference" requirement:**

> "Used only for research, reference, or recordkeeping. **It is not being kept for use in current instruction, programs, services, or public communication.**"
>
> — <a href="https://accessibility.osu.edu/title-ii/archived-content-exception" target="_blank" rel="noopener noreferrer">Ohio State ADA DAC Checklist</a>

**On the "not altered" requirement:**

> "Not changed after being archived. **Any edits, however minor, disqualify the content from this exception.**"
>
> — <a href="https://accessibility.osu.edu/title-ii/archived-content-exception" target="_blank" rel="noopener noreferrer">Ohio State ADA DAC Checklist</a>

**On effective communication obligations:**

> "Even when content qualifies as archived, the ADA still requires effective communication with individuals with disabilities. This means users must be able to easily request and receive content in accessible formats when needed."
>
> — <a href="https://accessibility.osu.edu/title-ii/archived-content-exception" target="_blank" rel="noopener noreferrer">Ohio State ADA Digital Accessibility Center</a>

**Practical Examples: What Qualifies and What Doesn't**

| Content Type | Exception? | Why |
| ------------ | ---------- | --- |
| **Active website pages** | ❌ No | Currently used by the public for services |
| **Login pages, forms, applications** | ❌ No | Used to access or participate in services |
| **Documents created after April 26, 2027** | ❌ Generally no | New documents must conform. Three exceptions can still apply: third-party posts (§ 35.201(c)), individualized secured documents (§ 35.201(d)), and — for scans or other reproductions of paper records or physical media created before April 26, 2027 — archived web content (§ 35.201(a)) |
| **Current grant application PDF** | ❌ No | Used to apply for services — § 35.201(b) explicitly excludes documents currently used to apply for, access, or participate in services |
| **Reports still relevant to current programs** | ⚠️ Depends | A pre-2027 PDF or Word report is generally covered by § 35.201(b) unless people use it to apply for, gain access to, or participate in a current program — program guidelines, instructions, and Q&A documents are not excepted |
| **Annual reports (posted before April 26, 2027)** | ⚠️ Usually yes | If not revised since and not needed to use a current service — DOJ's examples of old reports that "generally need not conform" include past COVID-19 statistics and old water-quality reports posted next to the current one |
| **Research publications (posted before April 26, 2027)** | ⚠️ Usually yes | Informing policy debates is not the § 35.201(b) test; the question is whether anyone needs the document to use a current service. New reports must conform |
| **Content linked from main website navigation** | ❌ **Likely NO** for HTML pages | Active navigation suggests current use, which rules out § 35.201(a). For pre-2027 PDF/Word files, the link alone doesn't decide it — apply the § 35.201(b) checks |
| **Anything edited after being archived** | ❌ No | Edits disqualify archived web content from § 35.201(a) (per the § 35.104 definition of "archived web content") |
| **Forms someone needs to fill out** | ❌ No | Used to apply for or participate in services |
| **Embedded vendor content (ArcGIS, Tableau)** | ❌ No | Contractual relationship means you're responsible |
| **Board agenda PDF from 2020** | ✅ Yes | Pre-existing document not used to apply for current services — may be exempt under § 35.201(b) |
| **Research report from 2015 kept for reference** | ✅ Yes | Pre-existing document maintained for historical reference — may be exempt under § 35.201(b) |
| **Historical meeting minutes from 2019** | ✅ Yes | Pre-existing documents — nobody uses old meeting minutes to apply for current services |
| **Newsletter archive (pre-2027 issues)** | ✅ Yes | Pre-existing documents kept for historical reference — may be exempt under § 35.201(b) |
| **Old HTML page moved to /archive/ with banner** | ✅ Yes | If moved to dedicated archive area with clear labeling and not updated, may meet § 35.201(a) |
| **User comments on your Facebook page** | ✅ Yes | Third-party content not under contract — § 35.201(c) |
| **Legacy content with no current use** | ✅ Yes | Historical records truly kept only for research purposes |

**Documents That MAY Qualify for an Exception**

- Historical records truly kept only for research purposes
- Old documents that have been superseded and moved to a clearly labeled archive section
- Legacy content with no current programmatic use
- Meeting minutes from years past
- Superseded policies that are kept only for historical reference
- Old newsletters maintained as an archive

**Documents That Likely Do NOT Qualify**

- **Any form someone needs to fill out** — used to apply for or participate in services
- **Grant guidelines, instructions, eligibility guides, and Q&A documents for current programs** — DOJ treats documents people need to apply for or take part in a program as currently used
- **HTML pages linked from main website navigation** — suggests current use, so § 35.201(a) won't apply
- **Any document revised after April 26, 2027** — a revised document is no longer "preexisting"
- **Anything that has been edited after being archived** — disqualifies archived web content
- **Web content that provides current information** — even if old, if the information is still current, it's not archival (§ 35.201(a))
- **Documents people need in order to use a current service** — for example, instructions, a program's eligibility rules, or a description of how to reach a facility

**Who Decides If an Exception Applies?**

This is a legal determination, not an administrative one.

- **Agency legal counsel** makes the final determination for your agency — this is a legal interpretation of federal regulation
- **DoIT provides guidance, not determinations** — DoIT offers training and technical assistance, but exceptions are legal determinations based on the federal rule. DoIT does not grant, approve, or determine exceptions.
- **Before assuming content qualifies, consult your agency's legal counsel first**
- **Document your reasoning** — if you claim an exception, document why the content meets all required criteria

**Even If Content Qualifies: The Effective Communication Obligation Remains**

**This is the part people miss:** Even for content that legitimately qualifies for an exception, the ADA still requires **effective communication** under 28 CFR § 35.160. If a person with a disability asks for excepted material, plan on providing it in a format that works for them — DOJ says you "would likely still need to provide the content" accessibly.

**As Ohio State's guidance emphasizes:**

> "Even when content qualifies as archived, the ADA still requires effective communication with individuals with disabilities. This means users must be able to easily request and receive content in accessible formats when needed."

**This means agencies should:**

- Establish a clear process for accommodation requests
- Include a visible way for users to request accessible versions of archived or excepted content
- Be prepared to remediate documents on request, or provide the content another accessible way — § 35.164's limits apply only on a written determination by the agency head (or a designee) of fundamental alteration or undue burden, and even then you must find another way to provide access
- Respond to requests in a timely manner
- Budget for on-demand remediation

**The exception reduces your proactive remediation burden — it does not eliminate your obligation to provide access when needed.**

**How to Approach Compliance**

1. **Default assumption:** If content is linked from your active website and serves any current purpose, it needs to be accessible by April 26, 2027. For pre-2027 PDF, Word, PowerPoint, and Excel files, the legal test is narrower — see Exception 2

2. **The exceptions are for truly archival content:** Think historical society records, not "documents we published last year that are still useful"

3. **Don't assume — verify:** Before claiming an exception, have legal counsel review the specific content against the regulatory criteria

4. **If you want to use the archived web content exception (§ 35.201(a)):**
   - Create a clearly labeled archive section (not just a folder — visible labeling for users)
   - Move content there
   - Add a clear "This content is archived and is maintained for historical reference only" banner
   - Document that it's for reference only
   - **Leave it untouched after archiving** — under the rule, any edit, however minor, disqualifies it
   - Establish a process for accommodation requests

5. **For documents (§ 35.201(b)):** Focus remediation on documents people need to **apply for, access, or participate in** current services (grant applications, registration forms, required submissions). Historical documents kept for reference may be exempt — but verify with legal counsel.

6. **For everything else:** Prioritize remediation based on traffic, importance, and legal exposure

7. **When in doubt, consult legal counsel** — They make the final determination on whether content qualifies for an exception

**Important Legal Notes**

- **Web pages and documents have different rules** — Don't apply the § 35.201(a) "archive area" requirement to documents. The § 35.201(b) document exception asks three things: Is it a PDF, word processor, presentation, or spreadsheet file posted before April 26, 2027? Has it stayed unrevised since then? Is it currently used to "apply for, gain access to, or participate in" services?

- **"Linked" ≠ "in use" for documents** — A pre-existing PDF linked on your publications page for reference is NOT the same as a PDF used to apply for a grant. The former may be exempt; the latter is not.

- **For web pages, the archive area requirement is strict** — Old HTML pages linked from your main navigation likely don't qualify for § 35.201(a). To qualify, a page has to meet all four § 35.104 criteria: (1) created before April 26, 2027 (or a reproduction of paper or other physical media from before then), (2) kept only for reference, research, or recordkeeping, (3) not altered or updated after the date you archive it, and (4) stored in a dedicated area that users can see is labeled as archived — a visible "This content is archived" banner, not just an `/archive/` folder name.

- **"Archived" labeling alone is not enough** — The DOJ explicitly says that putting content in an "archive" section doesn't make it exempt if the content provides current information or serves a current purpose.

- **Any edit disqualifies archived web content** — Even fixing a typo removes the exception for web pages under § 35.201(a).

- **Effective communication is still required** — You must provide accessible alternatives upon request even for legitimately excepted content.

- **Verify the exact language** — for questions about whether specific content qualifies, have your agency's legal counsel check the Federal Register text.

**Authoritative References:**

**U.S. Department of Justice (Primary Authority):**

- <a href="https://www.ada.gov/resources/web-rule-first-steps/" target="_blank" rel="noopener noreferrer">DOJ: First Steps Toward an Accessible Web</a> — Official DOJ guidance on first steps for compliance
- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">DOJ: ADA Title II Web Rule Fact Sheet</a> — Plain language summary of the rule including exceptions and examples
- <a href="https://www.ada.gov/resources/effective-communication/" target="_blank" rel="noopener noreferrer">DOJ: Effective Communication</a> — Guidance on the effective communication obligation that applies even to excepted content

**Federal Regulations (Legal Text):**

- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: Final Rule (28 CFR Part 35)</a> — Full legal text of the rule; see § 35.201 for exceptions
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35" target="_blank" rel="noopener noreferrer">28 CFR Part 35 (eCFR)</a> — Current Code of Federal Regulations text

**Expert Analysis:**

- <a href="https://accessibility.osu.edu/title-ii/archived-content-exception" target="_blank" rel="noopener noreferrer">Ohio State University ADA Digital Accessibility Center: Archived Content Exception</a> — Analysis and checklist for evaluating content against exception criteria
- <a href="https://www.ala.org/accessibility/ada-rule-exceptions" target="_blank" rel="noopener noreferrer">American Library Association: ADA Web Rule Exceptions</a> — Guidance for public institutions on understanding exceptions
- <a href="https://www.section508.gov/manage/laws-and-policies/update-maintain-agency-accessibility-policy/" target="_blank" rel="noopener noreferrer">Section508.gov: Update and Maintain Agency Accessibility Policy</a> — Federal guidance on accessibility policy updates

**Illinois-Specific:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA Requirements</a> — Illinois state accessibility requirements (IITAA also applies)

### How do we prioritize accessibility work with limited resources and a ticking clock?

{updated:2026-10-26}

**Quick answer:** Focus on highest-impact content first. Don't fix everything at once — remove the biggest barriers first.

**Important context:** ICJIA's public websites are already being remediated by the web team. The priority now is ensuring **content creators understand and fix their content** — documents, PDFs, articles, newsletters, videos, and other materials that content teams produce.

**Priority tiers:**

| Tier               | Focus                                                                   | Examples (Web + Content)                                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Fix First**   | Critical services, high-traffic content, complete blockers, new content | **Web:** Login pages, application forms, high-traffic pages<br>**Content:** Frequently accessed PDFs, published articles, new newsletter issues, new social media posts, training materials |
| **2. Fix Next**    | Frequently used content and tools                                       | **Web:** Secondary pages, embedded tools<br>**Content:** Research reports, policy documents, video content                                    |
| **3. Fix Ongoing** | Archive content, low-traffic materials                                  | **Web:** Historical pages, archived sections<br>**Content:** Older documents, historical newsletters, archived publications                                       |

**Practical steps:**

1. **Audit your content inventory** — List all documents, PDFs, articles, newsletters, videos your team produces
2. **Focus on top 20 highest-priority items first** — Mix of web pages and content based on traffic/importance
3. **Stop creating new barriers** — All new content accessible immediately (this is where content creators have the most control)
4. **Track progress and allocate weekly time for remediation**

**Key takeaway:** Websites are being addressed. Content creators need to prioritize their materials — articles, newsletters, PDFs, videos — by impact and traffic. Fixing 50% is better than 0%.

**References:** <a href="https://www.w3.org/WAI/planning/interim-repairs/" target="_blank" rel="noopener noreferrer">W3C: Interim Repairs</a> | <a href="https://www.section508.gov/manage/identify-user-needs/" target="_blank" rel="noopener noreferrer">Section508.gov: Identify User Needs</a>

### What's the bare minimum we need to do by April 2027?

{updated:2026-10-26}

**Quick answer:** According to ADA Title II and IITAA, the standard is WCAG 2.1 Level AA — the regulations have no general "partial compliance" option, only the narrow § 35.205 minimal-impact provision. But if you're overwhelmed: make new content accessible now, fix highest-impact barriers first, document your plan.

**Minimum viable approach:**

1. **Stop creating new barriers** — All new content accessible from now on
2. **Fix biggest barriers first** — Homepage, forms, top 20 pages/documents, complete blockers
3. **Document your plan** — Inventory, priorities, timeline, responsibilities
4. **Respond to requests** — Process for accessible alternatives; track complaints

**What can wait:** Content an exception may cover (archived web content that meets all four criteria, pre-2027 social posts), then low-traffic pages — which are still covered by the rule, just later in your work order.

**What can't wait:** New content accessible going forward; high-impact services; accessible alternatives upon request (<a href="https://www.ada.gov/resources/effective-communication/" target="_blank" rel="noopener noreferrer">ADA.gov: Effective Communication</a>).

**References:** <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule</a> | <a href="https://www.w3.org/WAI/planning/interim-repairs/" target="_blank" rel="noopener noreferrer">W3C: Interim Repairs</a>

---

## Compliance Requirements (IITAA and ADA Title II)

### What is the IITAA?

{updated:2026-05-14}

**The IITAA (Illinois Information Technology Accessibility Act)** requires Illinois agencies and universities to ensure that their websites, information systems, and information technologies are accessible to people with disabilities. The current IITAA 2.1 Standards (effective June 24, 2024) require conformance with WCAG 2.1 Level AA.

**Verbatim from Illinois DoIT:**

> "The Illinois Information Technology Accessibility Act (IITAA) requires Illinois agencies and universities to **ensure** that their web sites, information systems, and information technologies are accessible to people with disabilities." _(emphasis added)_
>
> "Illinois' accessibility standards are based on the United States' Section 508 Standards and require conformance with the World Wide Web Consortium's Web Content Accessibility Guidelines (WCAG) 2.1 Level AA"

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

**The statute itself (primary source):** The IITAA itself lives at <a href="https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2918&ChapterID=7" target="_blank" rel="noopener noreferrer">30 ILCS 587</a>. **Section 5** sets the State policy that information technology developed, purchased, or provided by the State be accessible to individuals with disabilities; **Section 10** defines the broad range of covered "electronic and information technology"; and **Section 15** directs the State to develop and publish the technical accessibility standards (now the IITAA 2.1 Standards). When you need a primary source for the IITAA, cite the statute — the DoIT page is the plain-language explainer, not the law itself.

**Official IITAA page:** <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/iitaa.html</a>

**See also:** [What is the ADA Title II digital accessibility rule?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-ada-title-ii-digital-accessibility-rule) for the federal requirements that apply alongside IITAA.

### Who must comply with the IITAA?

{updated:2026-10-26}

The IITAA applies to:

- Executive, legislative, and judicial branches of Illinois state government
- All state departments, divisions, and agencies
- Constitutional offices
- Public bodies
- Public universities

The IITAA does **not** directly apply to:

- Local governments
- School districts
- Community colleges
- Private organizations

**Verbatim from the statute (30 ILCS 587/10):**

> "'State entity' means the executive, legislative, and judicial branches of State of Illinois, including its departments, divisions, agencies, constitutional offices, public bodies, and public universities. The term does not include units of local government, school districts, or community colleges."

— <a href="https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2918&ChapterID=7" target="_blank" rel="noopener noreferrer">30 ILCS 587/10 (ILGA)</a>

**Note:** Local governments and school districts still have obligations under ADA Title II.

### How is the IITAA enforced?

{updated:2026-10-26}

**Quick answer:** The IITAA statute has no penalty or complaint process of its own. It required the State to publish accessibility standards (Section 15), has DoIT review and update them (Section 25), and requires each State entity to build them into its own procurement and development rules, policies, and procedures (Section 20) (<a href="https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2918&ChapterID=7" target="_blank" rel="noopener noreferrer">30 ILCS 587</a>). DoIT's standards say compliance "is mandatory for State agencies subject to the Information Technology Accessibility Act (30 ILCS 587)" (<a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-2-1-standards.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Standards, E101.1</a>). In practice, compliance runs through your agency's procurement and governance, with DoIT supplying the standards, guidance, and training. It is separate from (and in addition to) ADA Title II.

**Why IITAA is a separate obligation (verbatim from Illinois DoIT):**

> "While the Americans with Disabilities Act and Section 504 of the Rehabilitation Act already require the State to ensure its communications and services are accessible, the IITAA establishes specific technical standards and encourages the State to address accessibility proactively."

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

DoIT's framing treats the IITAA as **in addition to** ADA / Section 504 — not a substitute for them. Complying with one doesn't get you off the hook for the other.

**Key differences from ADA Title II enforcement:**

| Aspect                                           | IITAA (State)                                                                                                           | ADA Title II (Federal)                                                                                             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Primary oversight** | Each agency, under standards DoIT publishes and reviews (30 ILCS 587/20, /25); DoIT's Office of Information Accessibility gives guidance and training | U.S. Department of Justice (DOJ) |
| **How issues typically surface**                 | State standards compliance, agency governance, and DoIT guidance/training                                               | DOJ complaints/investigations and, in some cases, litigation                                                       |
| **What “enforcement” usually means in practice** | Direction to remediate and align with IITAA standards; procurement and program controls may be used to drive compliance | Court orders/settlements/consent decrees and required remediation; what's ordered depends on the statute and the situation |

**Practical implications:**

- **IITAA has historically focused on compliance assistance** — DoIT provides guidance, training, and support to help agencies achieve compliance
- **ADA Title II creates additional enforcement pressure** — The 2024 web rule adds federal accountability with specific technical standards and compliance dates
- **Both laws require the same standard** — WCAG 2.1 Level AA is required under both IITAA 2.1 and ADA Title II

**Note:** This is general information about enforcement mechanisms, not legal advice. For specific questions about enforcement risk or legal exposure, consult your agency's legal counsel.

**References:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA overview</a> — Illinois DoIT
- <a href="https://www.ada.gov/file-a-complaint/" target="_blank" rel="noopener noreferrer">ADA.gov: File a Complaint</a> — Federal complaint process
- <a href="https://www.govinfo.gov/link/uscode/42/12133" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12133</a> — Title II remedies (statutory enforcement framework)

### What does the IITAA cover?

{updated:2026-05-06}

**See also:** [What does the April 2027 deadline cover?](#compliance-requirements-iitaa-and-ada-title-ii-what-does-the-april-2027-deadline-cover) for comparison with ADA Title II requirements.

The IITAA covers all "information and communication technology," including:

- Websites and web applications
- Software and desktop applications
- Mobile applications
- Electronic documents (PDFs, Word, Excel, PowerPoint)
- Multimedia (video and audio)
- Information kiosks
- Hardware with user interfaces

**Verbatim from Illinois DoIT:**

> "The IITAA covers all 'information and communication technology,' including: websites, electronic documents & videos; software & applications; computers and peripherals; information kiosks; multifunction office machines; telecommunications equipment"

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

**Important:** This is broader than the federal ADA Title II web rule, which is specifically about web content and mobile apps. IITAA reaches **kiosks, hardware, multifunction office machines, and telecommunications equipment** that the federal web rule does not address.

### When did the current IITAA standards take effect?

{updated:2026-10-26}

- **IITAA 1.0** — August 20, 2008 (original standards).
- **IITAA 2.0** — January 18, 2018 (aligned with WCAG 2.0 AA).
- **IITAA 2.1** — June 24, 2024 (aligned with WCAG 2.1 Level AA).

**Verbatim from Illinois DoIT:**

> "The IITAA 2.1 Standards, which require conformance with WCAG 2.1 AA, went into effect on June 24, 2024."

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

**Important takeaway for managers:** The IITAA technical standard is in effect **today** — it isn't waiting for April 26, 2027. DoIT spells out what it applies to: "IITAA 2.1 Standards apply to information technology developed, procured, or substantially modified by State of Illinois entities after June 24, 2024. Technologies developed or procured prior to this date are subject to the IITAA 2.0 Standards which required compliance [with] WCAG 2.0 Level AA." (<a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-2-1-standards.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA 2.1 Standards</a>) So anything you build, buy, or substantially change now must meet WCAG 2.1 Level AA under state law, and older content was already held to WCAG 2.0 Level AA. The federal April 26, 2027 date works differently: it reaches your existing web content too, apart from the rule's narrow exceptions.

**References:**

- <a href="https://doit.illinois.gov/doit-news/accessibility-news/iitaa-2-1-update.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Update (DoIT)</a> — Effective date and what changed
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA (Illinois Information Technology Accessibility Act)</a> — Overview and current standards

### Could the IITAA standards change in 2026?

{updated:2026-11-06}

**Quick answer:** Possibly. The IITAA statute requires the State to review its accessibility standards **during calendar year 2026**, so an update — for example, alignment with WCAG 2.2 — is legally possible this year. As of November 6, 2026, DoIT has announced no change — no draft standards, workgroup, or comment period has been posted — and the IITAA 2.1 Standards (WCAG 2.1 Level AA) remain current. The statutory review window runs through December 31, 2026.

**Verbatim from the statute (30 ILCS 587/25, "Review and amendment of standards"):**

> "In calendar year 2026 and not less often than every 3 years thereafter, the Department of Innovation and Technology shall review the accessibility standards and, as appropriate, amend the standards to reflect technological advances or changes in electronic and information technology."

— <a href="https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2918&ChapterID=7" target="_blank" rel="noopener noreferrer">30 ILCS 587/25</a> (as amended by P.A. 103-729, effective August 2, 2024, which set the calendar-year-2026 date; the review requirement itself dates to the original 2007 Act)

**What this means for your planning:**

- **Nothing about your current work is wasted.** If DoIT moves to WCAG 2.2, everything built for WCAG 2.1 Level AA still counts — WCAG 2.2 keeps the 2.1 requirements (except 4.1.1 Parsing, which it removed as obsolete) and adds a small number of new criteria. See [Should we test against WCAG 2.2 or WCAG 2.1?](#common-concerns-should-we-test-against-wcag-2-2-or-wcag-2-1)
- **Watch <a href="https://doit.illinois.gov/initiatives/accessibility/news.html" target="_blank" rel="noopener noreferrer">DoIT's accessibility news page</a>** for review outcomes; standards changes come with their own effective dates and transition guidance (IITAA 2.1 was announced April 24, 2024, two months before its June 24, 2024 effective date).
- **Procurement teams should note** the statute's follow-through requirement: after amended standards are published, State entities have six months to fold them into procurement policies and procedures.

**References:**

- <a href="https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2918&ChapterID=7" target="_blank" rel="noopener noreferrer">30 ILCS 587 (ILGA)</a> — The IITAA statute, including the § 25 review requirement
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — Current standards and announcements

### Where can I get IITAA training?

{updated:2026-10-26}

The Illinois Department of Innovation & Technology (DoIT) Office of Information Accessibility provides free help for state agencies. DoIT currently describes its offerings as **online guides, live trainings, and technical assistance** (<a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/doj-rule.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: DOJ Rule on Web Accessibility</a>); past topics have included accessible Word documents, PDFs, PowerPoint presentations, and web development.

**Sign up for training:** State staff can use DoIT's <a href="https://ilgov.sharepoint.com/sites/DoIT-Accessibility/SitePages/Training-Sign-Up.aspx" target="_blank" rel="noopener noreferrer">Accessibility Training Sign-up</a> (Illinois staff only). Questions: DoIT.Accessibility@Illinois.gov

**Accessibility guides:** <a href="https://doit.illinois.gov/initiatives/accessibility/guides.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/guides.html</a>

### Who do I contact with IITAA questions?

{updated:2026-10-26}

For questions or comments about information technology accessibility or the IITAA:

**Email:** DoIT.Accessibility@Illinois.gov

**Phone** (DoIT's general contact lines; email is the channel DoIT lists for IITAA questions):

- Springfield: 217-524-3648
- Chicago: 312-814-3648
- TTY Support Line: 866-277-5669

### What is the ADA Title II digital accessibility rule?

{updated:2026-10-26}

**Quick answer:** On April 24, 2024, the U.S. Department of Justice published a <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">final rule</a> requiring state and local governments to make the web content and mobile apps they provide or make available meet **WCAG 2.1 Level AA** by April 26, 2027 for public entities with a total population of 50,000 or more (the 2024 rule originally set April 24, 2026; the date was extended one year by the April 20, 2026 Interim Final Rule).

**What Title II covers (vs. Title I):**

The ADA has multiple titles addressing different contexts:

|                      | **Title I** (Employment)                     | **Title II** (Public Services)                 |
| -------------------- | -------------------------------------------- | ---------------------------------------------- |
| **Scope**            | Employers with 15+ employees                 | State and local governments                    |
| **Focus**            | Workplace accommodations                     | Public programs, services, activities          |
| **Approach**         | Reasonable accommodations upon request       | Proactive accessibility for the web content and mobile apps you provide |
| **Digital standard** | No specific technical standard; case-by-case | **WCAG 2.1 Level AA** required                 |
| **Timeline**         | Accommodations when requested                | Compliance deadline: April 26, 2027            |

**Why Title II may feel "new":** Title II has existed since 1990, but the **April 2024 web rule** is the first time DOJ established specific technical standards (WCAG 2.1 Level AA) for digital content. This adds a clear, measurable requirement on top of the general duties, which still apply.

**For Illinois state agencies:** Both titles apply. Title II covers the web content and mobile apps your agency provides, and it also bars disability discrimination in your agency's own employment, using Title I's standards (<a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-C/section-35.140" target="_blank" rel="noopener noreferrer">28 CFR § 35.140</a>). Title I adds the EEOC's employment rules, such as reasonable accommodation.

**Where the rule lives:** It adds §§ 35.200–35.205 to 28 CFR Part 35, establishing web and mobile app accessibility requirements.

**Verbatim from the rule (28 CFR § 35.200(a) "General"):**

> "A public entity shall ensure that the following are readily accessible to and usable by individuals with disabilities:
>
> (1) Web content that a public entity provides or makes available, directly or through contractual, licensing, or other arrangements; and
>
> (2) Mobile apps that a public entity provides or makes available, directly or through contractual, licensing, or other arrangements."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200 (eCFR)</a> · <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Final rule, 89 FR 31320 (Apr. 24, 2024)</a>

Notice three things: the rule is talking to the **public entity** (your agency), the verb is **"shall ensure,"** and the scope explicitly reaches content the agency provides "directly or through contractual, licensing, or other arrangements." The rule doesn't put vendor-provided or embedded content on a separate track — it pulls them in.

**The duty isn't new — the web rule builds on a decades-old foundation.** The 2024 web rule sits on top of the ADA statute itself — <a href="https://www.govinfo.gov/link/uscode/42/12132" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12132</a>, which bars a public entity from excluding a person with a disability from its services, programs, or activities — and on top of the general Title II regulation that has been on the books since 1991:

**Verbatim from the general Title II regulation (28 CFR § 35.130(b)(1)):**

> "A public entity, in providing any aid, benefit, or service, may not, directly or through contractual, licensing, or other arrangements, on the basis of disability—
>
> (i) Deny a qualified individual with a disability the opportunity to participate in or benefit from the aid, benefit, or service; ..."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-B/section-35.130" target="_blank" rel="noopener noreferrer">28 CFR § 35.130(b)(1) (eCFR)</a>

That "directly or through contractual, licensing, or other arrangements" phrase is the same one the 2024 web rule uses — and it is why an agency cannot push the accessibility duty onto a vendor, a contractor, or a remediation firm. Its neighbor, § 35.130(b)(3), applies the same rule to "methods of administration." See [Does hiring a remediator shield our agency from compliance liability?](#procurement-and-third-party-tools-does-hiring-a-remediator-shield-our-agency-from-compliance-liability) for how this plays out.

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — DOJ plain-language summary
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: Final Rule (28 CFR Part 35)</a> — Full legal text
- <a href="https://www.ada.gov/topics/title-ii/" target="_blank" rel="noopener noreferrer">ADA.gov: Title II Overview</a> — General Title II guidance
- <a href="https://archive.ada.gov/ada_title_I.htm" target="_blank" rel="noopener noreferrer">ADA Title I Overview</a> — Employment provisions (for comparison)
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-B/section-35.130" target="_blank" rel="noopener noreferrer">28 CFR § 35.130 (eCFR)</a> — general Title II non-discrimination rule, including the "contractual, licensing, or other arrangements" language; on the books since 1991
- <a href="https://www.govinfo.gov/link/uscode/42/12132" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12132</a> — the core ADA Title II statutory prohibition the 2024 web rule implements

### When must we comply with the ADA Title II rule?

{updated:2026-11-06}

| Entity Size                                             | Compliance Deadline |
| ------------------------------------------------------- | ------------------- |
| Public entities with a total population of 50,000 or more | **April 26, 2027**  |
| Public entities with a total population under 50,000 | April 26, 2028      |
| Special district governments (regardless of population) | April 26, 2028      |

Both deadlines were extended by one year from the original dates (April 24, 2026 and April 26, 2027 respectively) by the DOJ <a href="https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web" target="_blank" rel="noopener noreferrer">Interim Final Rule</a> published April 20, 2026.

**The extension is under legal challenge (status as of November 6, 2026):** The National Federation of the Blind has sued DOJ and HHS in the U.S. District Court for the District of Maryland (_National Federation of the Blind v. Department of Justice_, filed May 21, 2026), arguing the extensions violated the Administrative Procedure Act and asking the court to restore the original deadlines. The court set a briefing schedule on June 29, 2026; no ruling has been issued, and the extended dates remain the law today — but agencies planning around the extra year should treat it as provisional and keep remediating on their current schedule. (<a href="https://nfb.org/about-us/press-room/national-federation-blind-sues-government-over-delay-accessibility-rules" target="_blank" rel="noopener noreferrer">NFB press release</a> · <a href="https://www.courtlistener.com/docket/73378158/national-federation-of-the-blind-v-department-of-justice/" target="_blank" rel="noopener noreferrer">case docket</a>)

For all Illinois state agencies, the applicable deadline is **April 26, 2027** (since Illinois has over 12 million residents, state agencies fall under the 50,000+ population tier).

**Verbatim from the rule (28 CFR § 35.200(b) — compliance dates, as amended by the April 20, 2026 IFR):**

> "(1) Beginning April 26, 2027, a public entity, other than a special district government, with a total population of 50,000 or more shall ensure that the web content and mobile apps that the public entity provides or makes available, directly or through contractual, licensing, or other arrangements, comply with Level A and Level AA success criteria and conformance requirements specified in WCAG 2.1, unless the public entity can demonstrate that compliance with this section would result in a fundamental alteration in the nature of a service, program, or activity or in undue financial and administrative burdens.
>
> (2) Beginning April 26, 2028, a public entity with a total population of less than 50,000 or any public entity that is a special district government shall ensure that the web content and mobile apps that the public entity provides or makes available, directly or through contractual, licensing, or other arrangements, comply with Level A and Level AA success criteria and conformance requirements specified in WCAG 2.1, unless the public entity can demonstrate that compliance with this section would result in a fundamental alteration in the nature of a service, program, or activity or in undue financial and administrative burdens."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200(b) (eCFR)</a> — original dates of April 24, 2026 / April 26, 2027 were each extended one year by the <a href="https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web" target="_blank" rel="noopener noreferrer">DOJ Interim Final Rule of April 20, 2026</a>. The technical standard (WCAG 2.1 Level AA) is unchanged.

**Important — IITAA is already in effect:** The federal deadlines above only set the date by which **federal** ADA Title II web compliance becomes enforceable. **The IITAA 2.1 Standards (state law) have been in effect since June 24, 2024** and apply right now to anything your agency builds, buys, or substantially changes — see [When did the current IITAA standards take effect?](#compliance-requirements-iitaa-and-ada-title-ii-when-did-the-current-iitaa-standards-take-effect).

**References:**

**Federal sources:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — DOJ plain-language summary with compliance deadlines
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: Final Rule (28 CFR Part 35)</a> — Full legal text of the 2024 rule (its original dates were extended in 2026; the eCFR has the dates in force)

**Statewide sources:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA (Illinois Information Technology Accessibility Act)</a> — Illinois state accessibility requirements
- <a href="https://doit.illinois.gov/doit-news/accessibility-news/iitaa-2-1-update.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Update (DoIT)</a> — Effective date and current standards

### Is the April 26, 2027 deadline final, or could a court move it back?

{updated:2026-11-06}

**Quick answer:** April 26, 2027 is the compliance date in current federal law, but it is not beyond change. It was set by an Interim Final Rule that DOJ could still revise after reviewing public comments, a pending federal lawsuit asks a court to strike the extension and restore the original 2026 deadline, and DOJ's 2026 regulatory agenda flags a possible future proposal to revise parts of the rule itself. Plan your remediation so your agency would be in good shape under either date.

**Three ways the date — or the rule — could move:**

**1. DOJ could revise its own rule.** The extension was issued as an <a href="https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web" target="_blank" rel="noopener noreferrer">Interim Final Rule</a> — effective immediately on April 20, 2026, with a public comment period that closed June 22, 2026. DOJ can still revise an interim final rule when it finalizes it. As of November 6, 2026, DOJ has published no follow-up rule confirming, revising, or withdrawing the extension.

**2. A court could vacate the extension.** In _National Federation of the Blind v. Department of Justice_ (U.S. District Court for the District of Maryland, filed May 21, 2026), the NFB argues that DOJ and HHS violated the Administrative Procedure Act by extending the deadlines without notice-and-comment rulemaking, and asks the court to restore the original compliance dates. The court entered a briefing schedule on June 29, 2026; as of November 6, 2026, no ruling has been issued. (<a href="https://nfb.org/about-us/press-room/national-federation-blind-sues-government-over-delay-accessibility-rules" target="_blank" rel="noopener noreferrer">NFB press release</a> · <a href="https://www.courtlistener.com/docket/73378158/national-federation-of-the-blind-v-department-of-justice/" target="_blank" rel="noopener noreferrer">case docket</a>)

**3. DOJ could propose changes to the rule itself, not just its date.** DOJ's 2026 regulatory agenda, published August 14, 2026, lists this rulemaking at the final-rule stage and says the Department "is considering whether to extend the deadlines for implementation of the final rule then publish a Notice of Proposed Rulemaking (NPRM) to reconsider whether some of the regulatory provisions imposed by the April 24, 2024 rule could be made less burdensome." The NPRM's timing is listed as "To Be Determined," and no proposal has been published. The interim rule itself says DOJ "will consider issuing an NPRM providing members of the public with an opportunity to comment on the substance of the 2024 final rule." If one is, it would go through public notice and comment before anything changed — and the IITAA would still require WCAG 2.1 Level AA in the meantime. (<a href="https://www.reginfo.gov/public/do/eAgendaViewRule?pubId=202510&RIN=1190-AA82" target="_blank" rel="noopener noreferrer">2026 Unified Agenda entry, RIN 1190-AA82 (reginfo.gov)</a>)

**What this means in practice:**

- **The law today:** 28 CFR § 35.200(b) requires WCAG 2.1 Level AA by **April 26, 2027** for Illinois state agencies — see [When must we comply with the ADA Title II rule?](#compliance-requirements-iitaa-and-ada-title-ii-when-must-we-comply-with-the-ada-title-ii-rule)
- **The floor if the extension falls:** the original date — April 24, 2026 — has already passed. If a court restores the original deadlines, entities in the 50,000+ tier — including every Illinois state agency — would effectively be past due the day of the ruling.
- **The safe strategy is the same no matter which way this goes:** keep remediating on your current schedule. The IITAA 2.1 Standards already require WCAG 2.1 Level AA **now** for anything you build, buy, or substantially change, so an Illinois agency working toward IITAA compliance is in good shape whichever way the federal date moves — see [Did the federal deadline extension give Illinois agencies an extra year?](#compliance-requirements-iitaa-and-ada-title-ii-did-the-federal-deadline-extension-give-illinois-agencies-an-extra-year)

**Status note:** Litigation and rulemaking status in this answer is current as of the "Last reviewed" date shown at the top of this page.

**References:**

- <a href="https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web" target="_blank" rel="noopener noreferrer">DOJ Interim Final Rule (91 FR 20902, Apr. 20, 2026)</a> — The extension and its comment period
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200 (eCFR)</a> — Current compliance dates in force
- <a href="https://www.courtlistener.com/docket/73378158/national-federation-of-the-blind-v-department-of-justice/" target="_blank" rel="noopener noreferrer">NFB v. DOJ docket (CourtListener)</a> — The pending APA challenge
- <a href="https://www.reginfo.gov/public/do/eAgendaViewRule?pubId=202510&RIN=1190-AA82" target="_blank" rel="noopener noreferrer">2026 Unified Agenda, RIN 1190-AA82 (reginfo.gov)</a> — DOJ's stated plans for the rule as of August 14, 2026

### Did the federal deadline extension give Illinois agencies an extra year?

{updated:2026-10-26}

**Quick answer:** No — not for the standard your content must meet. The extension moved only the date when the **federal ADA Title II web rule** becomes enforceable. Under the IITAA, anything your agency builds, buys, or substantially changes has had to meet WCAG 2.1 Level AA since **June 24, 2024** (older technology was held to WCAG 2.0 Level AA under IITAA 2.0), and that obligation never moved.

**Illinois DoIT said this directly when the extension was announced (April 20, 2026):**

> "The same requirement already applies under the Illinois Information Technology Accessibility Act (IITAA) and the Americans with Disabilities Act (ADA), so the extension only changes when the DOJ may begin taking additional enforcement actions."

— <a href="https://doit.illinois.gov/doit-news/accessibility-news/doj-extends-deadline-for-rule-on-web-accessibility.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: DOJ Extends Deadline for Rule on Web Accessibility</a>

**How to read the two clocks:**

| Obligation | Standard | Status for Illinois state agencies |
| ---------- | -------- | ---------------------------------- |
| **IITAA 2.1 Standards** (state law) | WCAG 2.1 Level AA | **In effect since June 24, 2024** for anything you build, buy, or substantially change (older technology: WCAG 2.0 Level AA under IITAA 2.0) |
| **ADA Title II web rule** (federal) | WCAG 2.1 Level AA | Enforceable **beginning April 26, 2027** (as extended) |

**The practical takeaway:** the federal extension is breathing room for the *enforcement* clock, not a pause on the *requirement*. DoIT's framing — that the extended timeline "provides welcome opportunity to build on this momentum" — treats the extra year as implementation time, which is exactly how agencies should use it. DoIT's own guidance page on the federal rule puts it plainly: "Because this is the same requirement as the Illinois Information Technology Accessibility Act (IITAA), Illinois agencies have a head start, but there is still work to do." (<a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/doj-rule.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: DOJ Rule on Web Accessibility</a>)

**See also:** [When did the current IITAA standards take effect?](#compliance-requirements-iitaa-and-ada-title-ii-when-did-the-current-iitaa-standards-take-effect) | [How is the IITAA enforced?](#compliance-requirements-iitaa-and-ada-title-ii-how-is-the-iitaa-enforced)

**References:**

- <a href="https://doit.illinois.gov/doit-news/accessibility-news/doj-extends-deadline-for-rule-on-web-accessibility.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: DOJ Extends Deadline for Rule on Web Accessibility</a> — Official Illinois statement on what the extension does and doesn't change
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA (Illinois Information Technology Accessibility Act)</a> — Current standards, in effect now

### Can we face complaints or lawsuits before April 2027?

{updated:2026-10-26}

**Quick answer:** Yes. April 26, 2027 is when the web rule's **specific WCAG 2.1 AA technical standard** becomes enforceable — it isn't a grace period. Title II's general nondiscrimination and effective-communication obligations have bound state agencies since the early 1990s and are enforceable today.

**Three ways that can happen right now:**

1. **DOJ complaints and investigations under existing Title II duties.** The general regulation (28 CFR § 35.130) has required equal access to services, programs, and activities since 1992 — inaccessible web content can violate it today, without waiting for the web rule's date. Individuals don't have to wait for 2027 to file. A Title II complaint is generally due within 180 days of the barrier they ran into (<a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-F/section-35.170" target="_blank" rel="noopener noreferrer">28 CFR § 35.170</a>), and DOJ says public entities "still must comply with these ADA obligations with respect to their web content and mobile apps, including before this rule's effective date" (<a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">89 FR 31320</a>).

2. **Private lawsuits.** People can sue under Title II directly (42 U.S.C. § 12133), and suits over effective communication or program access don't have to wait for the web rule's dates.

3. **The effective-communication duty applies continuously:**

> "A public entity shall take appropriate steps to ensure that communications with applicants, participants, members of the public, and companions with disabilities are as effective as communications with others."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-E/section-35.160" target="_blank" rel="noopener noreferrer">28 CFR § 35.160(a)(1) (eCFR)</a>

If a person with a disability cannot use your PDF, form, or page today, § 35.160 already requires an accessible alternative today — the 2027 date doesn't push that back.

**And separately: the IITAA applies now.** The state-law requirement has applied for years — WCAG 2.1 Level AA under IITAA 2.1 since June 24, 2024 for anything built, bought, or substantially changed, and WCAG 2.0 Level AA under IITAA 2.0 before that — see [How is the IITAA enforced?](#compliance-requirements-iitaa-and-ada-title-ii-how-is-the-iitaa-enforced)

**See also:** [Who's going to notice if we're not compliant by April 26, 2027?](#common-concerns-who-s-going-to-notice-if-we-re-not-compliant-by-april-26-2027) | [When must we comply with the ADA Title II rule?](#compliance-requirements-iitaa-and-ada-title-ii-when-must-we-comply-with-the-ada-title-ii-rule)

**References:**

- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-B/section-35.130" target="_blank" rel="noopener noreferrer">28 CFR § 35.130 (eCFR)</a> — General nondiscrimination rule, on the books since 1991
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-E/section-35.160" target="_blank" rel="noopener noreferrer">28 CFR § 35.160 (eCFR)</a> — Effective communication requirement
- <a href="https://www.govinfo.gov/link/uscode/42/12133" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12133</a> — Title II remedies (private enforcement framework)

### What does the April 2027 deadline cover?

{updated:2026-11-06}

**See also:** [What does the IITAA cover?](#compliance-requirements-iitaa-and-ada-title-ii-what-does-the-iitaa-cover) for comparison with Illinois state requirements.

**All the web content and mobile apps your agency provides or makes available, not just websites.** Apart from a few narrow exceptions (see [Are there exceptions to the April 2027 deadline? What qualifies?](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies)), that includes:

- **Websites and web applications** — All pages and interactive features.
- **Documents** — PDFs, Word documents, Excel spreadsheets, PowerPoint presentations.
- **Multimedia** — Videos (must have captions), audio (must have transcripts).
- **Mobile apps** — Any apps your agency provides or makes available.
- **Social media** — Posts, images, and videos shared on social platforms (going forward).
- **Third-party content** — Embedded tools, maps, dashboards, widgets provided through contracts.

**Why the scope is so broad:** Government services have moved online rapidly, especially since 2020. What used to be in-person services are now digital, making digital accessibility essential for equal access.

**Verbatim from 28 CFR § 35.200(a):**

> "A public entity shall ensure that the following are readily accessible to and usable by individuals with disabilities: (1) Web content that a public entity **provides or makes available, directly or through contractual, licensing, or other arrangements;** and (2) Mobile apps that a public entity **provides or makes available, directly or through contractual, licensing, or other arrangements.**"

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200 (eCFR)</a> _(emphasis added)_

The "directly or through contractual, licensing, or other arrangements" language is what makes the scope so broad. It explicitly reaches third-party platforms, embedded vendor tools, and contractor-produced content. See [How do we ensure accessibility compliance with third-party tools…](#procurement-and-third-party-tools-how-do-we-ensure-accessibility-compliance-with-third-party-tools-like-lmss-docebo-docusign-tableau-arcgis-and-canva) for application to specific platforms.

**Reference:** <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA.gov: Title II Web Rule Fact Sheet</a> (see "Highlights of the Requirements in the Rule" and "Summary of the Exceptions")

**See also:** [How do I make mobile apps accessible?](#website-accessibility-how-do-i-make-mobile-apps-accessible)

### Does ADA Title II apply to internal documents?

{updated:2026-10-26}

**See also:** [Does our agency's password-protected intranet need to be accessible?](#website-accessibility-does-our-agency-s-password-protected-intranet-need-to-be-accessible) | [What about archived documents on the intranet?](#website-accessibility-what-about-archived-documents-on-the-intranet) | [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible)

**Don't count on an exemption.** The federal web rule has no "public-facing only" limit. Its text covers web content and mobile apps your agency "provides or makes available" (28 CFR § 35.200(a)). When commenters asked DOJ whether the rule covers "internal, non-public applications, such as web content used solely by employees," DOJ didn't carve them out. It answered that the rule "includes requirements for the web content and mobile apps provided or made available by public entities within the scope of title II" (<a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">89 FR 31320</a>). For Illinois state agencies it's mostly moot: the IITAA expressly covers intranets and many kinds of internal content (see below).

**What is considered "internal" vs. "public-facing"?**

**Internal documents/content** typically includes:

- **Employee-only intranets** — Internal portals, wikis, and knowledge bases accessible only to staff
- **Internal training materials** — Training documents, presentations, and resources used only by employees
- **Internal communications** — Staff memos, internal newsletters, and employee-facing announcements
- **HR documents** — Employee handbooks, policies, and procedures not shared with the public
- **Internal databases and systems** — Administrative systems, internal reporting tools, and employee-facing applications not accessible to the public
- **Draft documents** — Work-in-progress content that has not been published or shared publicly

**Public-facing documents/content** (clearly covered by ADA Title II) includes:

- **Public websites** — Any content accessible to the public, even if primarily intended for specific audiences
- **Publicly shared documents** — PDFs, Word docs, or presentations posted on public websites or shared via public links
- **Documents provided to the public** — Forms, reports, or resources distributed to external stakeholders, partners, or the general public
- **Content accessible without login** — Any digital content that can be accessed without authentication, even if not actively promoted
- **Documents shared with external partners** — Content shared with contractors, grantees, or other external parties

**Important distinction:** If a document is accessible to anyone outside your organization (even if not widely publicized), it may be considered public-facing and subject to ADA Title II requirements.

**Internal content is covered by these rules:**

- **IITAA (the one that settles it for Illinois agencies).** The statute's definition of covered technology includes "internet and intranet systems" (<a href="https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2918&ChapterID=7" target="_blank" rel="noopener noreferrer">30 ILCS 587/10</a>). The <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-2-1-standards.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Standards</a> apply to technology "procured, developed, maintained, or used by agencies" (E201.1) and require comparable access for "employees with disabilities" (E203.1). Under E205.3, content that isn't public-facing must still meet WCAG 2.1 Level AA when it's official business delivered as, among other things, "An internal or external program or policy announcement," "A template or form," "Educational or training materials," or "Intranet content designed as a Web page."
- **ADA Title II's employment rule.** Title II itself bars disability discrimination in a public entity's employment and applies Title I's employment standards, including reasonable accommodation (<a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-C/section-35.140" target="_blank" rel="noopener noreferrer">28 CFR § 35.140</a>). If an employee with a disability needs an internal system or document to do the job, you have to make it usable for them.
- **Context only:** ADA Title I and Section 504 carry similar employment duties. They don't change the answer above.

**Verbatim from Illinois DoIT — IITAA's broader scope:**

> "The Illinois Information Technology Accessibility Act (IITAA) requires Illinois agencies and universities to ensure that their **web sites, information systems, and information technologies** are accessible to people with disabilities." _(emphasis added)_

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

The IITAA reaches "information systems and information technologies" — language that is **not** limited to public-facing content. For Illinois state agencies, internal portals, employee tools, kiosks, office multifunction printers, and telecommunications equipment all fall within IITAA's scope, regardless of whether the federal ADA Title II web rule reaches them. Whatever the federal rule's reach, the IITAA requires intranet pages and the internal content types listed in E205.3 to meet WCAG 2.1 Level AA.

**Best practice:** Make internal documents accessible proactively. It's easier than retrofitting later, and you may have employees with disabilities who need access. Additionally, internal documents often become public-facing over time, and making them accessible from the start avoids future remediation work.

**References:**

**Federal sources:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — DOJ's plain-language summary; it says the rule "applies to web content that a state or local government provides or makes available"
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: Final Rule (28 CFR Part 35)</a> — Full legal text defining scope of covered content
- <a href="https://archive.ada.gov/ada_title_I.htm" target="_blank" rel="noopener noreferrer">ADA Title I Overview (archive.ada.gov)</a> — Employment provisions requiring reasonable accommodations
- <a href="https://www.ada.gov/law-and-regs/ada/" target="_blank" rel="noopener noreferrer">ADA Statute (as amended)</a> — Full ADA text including Title I employment provisions (the Title I regulations themselves are EEOC's, at 29 CFR part 1630)
- <a href="https://www.hhs.gov/civil-rights/for-individuals/disability/section-504-rehabilitation-act-of-1973/part-84-final-rule-fact-sheet/index.html" target="_blank" rel="noopener noreferrer">HHS: Section 504 Final Rule Fact Sheet (45 CFR Part 84)</a> — Requirements for recipients of HHS funding, including web and mobile accessibility

**Statewide sources:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA (Illinois Information Technology Accessibility Act)</a> — Covers information systems and technologies used by state agencies, including internal systems
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-2-1-standards.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Standards</a> — Current standards applicable to internal and external systems

### Did the Section 504 web deadlines change too?

{updated:2026-11-06}

**Quick answer:** Yes — in a move parallel to DOJ's, HHS extended the web and mobile-app compliance dates of its 2024 Section 504 rule by one year. This is **context, not a new obligation to track for its own sake**: your load-bearing requirements remain the IITAA, ADA Title II, and WCAG 2.1 Level AA. But if your agency receives HHS funding, the parallel clock is worth knowing about.

**What happened:** HHS's 2024 rule updating its Section 504 regulations (45 CFR part 84) set web/mobile accessibility deadlines for recipients of HHS federal financial assistance, using the same WCAG 2.1 Level AA standard. HHS then published an <a href="https://www.federalregister.gov/documents/2026/05/11/2026-09266/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web" target="_blank" rel="noopener noreferrer">Interim Final Rule</a> — effective May 7, 2026, published May 11, 2026, with a comment period that closed July 6, 2026 — extending those dates by one year:

| Recipient size | Extended compliance date |
| -------------- | ------------------------ |
| Fifteen or more employees | May 11, 2027 |
| Fewer than fifteen employees | May 10, 2028 |

The technical standard (WCAG 2.1 Level AA) is unchanged. As of November 6, 2026, HHS has not finalized, revised, or withdrawn the interim rule. Like DOJ's extension, the HHS extension is challenged in the pending _National Federation of the Blind_ lawsuit — see [Is the April 26, 2027 deadline final, or could a court move it back?](#compliance-requirements-iitaa-and-ada-title-ii-is-the-april-26-2027-deadline-final-or-could-a-court-move-it-back)

**Why this doesn't change your plan:**

- The work is the same work: WCAG 2.1 Level AA on your web content, documents, and apps is what IITAA expects of that content, what ADA Title II requires by April 26, 2027, and what Section 504's web rule requires of HHS-funded programs.
- The two federal clocks now run about two weeks apart (April 26 and May 11, 2027) — one remediation effort serves both.
- ICJIA's federal grants come almost entirely from the U.S. Department of Justice — mostly its Office of Justice Programs — not HHS (<a href="https://www.usaspending.gov/recipient/6d56daa9-a718-d1a7-e00c-7e39bb997d00-C/all" target="_blank" rel="noopener noreferrer">USAspending.gov</a>). DOJ's own Section 504 regulations don't currently include these web deadlines. HHS's rule also covers HHS money received "through another recipient" (<a href="https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-84/subpart-A/section-84.10" target="_blank" rel="noopener noreferrer">45 CFR § 84.10</a>), so consult your legal counsel about which funding-based rules apply to your agency's grants.

**References:**

- <a href="https://www.federalregister.gov/documents/2026/05/11/2026-09266/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web" target="_blank" rel="noopener noreferrer">HHS Interim Final Rule (91 FR 25496, May 11, 2026)</a> — "Extension of Compliance Dates for Nondiscrimination on the Basis of Disability; Accessibility of Web Content and Mobile Applications of Recipients of Departmental Financial Assistance" (45 CFR § 84.84)
- <a href="https://www.govinfo.gov/link/uscode/29/794" target="_blank" rel="noopener noreferrer">29 U.S.C. § 794 (Section 504)</a> — The underlying statute

---

## Website Accessibility

### How do I test my website for accessibility?

{updated:2026-11-06}

**See also:** [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility) (for testing PDF documents specifically)

**Why this matters:** Automated tools catch many issues quickly, but they can't detect everything. Manual testing with keyboard navigation and screen readers reveals barriers that automated tools miss — and these barriers can prevent people with disabilities from using your website entirely.

Use a combination of automated and manual testing:

**Automated Testing Tools (free):**

- **WAVE** — <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">https://wave.webaim.org/</a> (browser extension). Illinois DoIT notes that WAVE "can't (yet) test within shadow DOMs," and advises that unless you're sure your site doesn't use them, you probably shouldn't use WAVE — use axe instead (<a href="https://doit.illinois.gov/initiatives/accessibility/testing.html" target="_blank" rel="noopener noreferrer">DoIT: Testing</a>)
- **axe DevTools** — <a href="https://www.deque.com/axe/" target="_blank" rel="noopener noreferrer">https://www.deque.com/axe/</a> (browser extension)
- **ANDI** — <a href="https://www.ssa.gov/accessibility/andi/help/install.html" target="_blank" rel="noopener noreferrer">https://www.ssa.gov/accessibility/andi/help/install.html</a> (bookmarklet)
- **Lighthouse** — Built into Chrome DevTools.

**Manual Testing:**

- **Keyboard navigation** — Can you access everything without a mouse? Tab through the page and verify all interactive elements are reachable and operable with Enter/Space.
- **Screen reader testing** — Does content make sense when read aloud? Test with at least one screen reader (see below).
- **Zoom and reflow testing** — Does content remain usable at 200% zoom? At 400% zoom (or 320px viewport width), does content reflow without requiring horizontal scrolling?
- **Color contrast** — Is text readable against its background?

**Screen Reader Testing (practical approach):**

You don't need to become a screen reader expert, but basic testing helps identify critical barriers:

| Screen Reader | Platform  | Cost     | Best For                       |
| ------------- | --------- | -------- | ------------------------------ |
| **NVDA**      | Windows   | Free     | Most common choice for testing |
| **VoiceOver** | macOS/iOS | Built-in | Testing on Apple devices       |
| **TalkBack**  | Android   | Built-in | Testing Android apps           |
| **Narrator**  | Windows   | Built-in | Quick Windows testing          |

**Basic NVDA testing workflow:**

1. Download NVDA from <a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer">nvaccess.org</a> (free), open the download, and choose **Install NVDA on this computer** (keep the desktop shortcut option checked — it's on by default)
2. Press **Ctrl+Alt+N** to start NVDA (this works once NVDA is installed)
3. Navigate your page using **Tab** (interactive elements) and **arrow keys** (content)
4. Press **H** to jump between headings — do they make sense and follow a logical order?
5. Press **D** to jump between landmarks — is the page structure clear?
6. Test forms — are labels announced when you focus on form fields?
7. Test images — is meaningful alt text announced?
8. Press **Insert+Q**, then **Enter**, to quit NVDA

**What to listen for:**

- Are headings announced with their level (Heading Level 1, Heading Level 2)?
- Are form fields announced with their labels?
- Are images described meaningfully (or announced as decorative)?
- Can you complete key tasks (submit a form, navigate to important content)?
- Are error messages announced when they appear?

**Testing a whole site with a real screen reader?** Pressing through every page by hand is slow, and what NVDA says is gone unless someone writes it down. ICJIA's free **voicecap** tool takes NVDA through every page on a site's sitemap or a list of pages — line by line, heading by heading, and control by control — and saves every word NVDA says as transcripts, with a plain-language report and a dated, fingerprinted record. A person still reviews the results; voicecap does the key presses and the record keeping. See [What is voicecap, and why did ICJIA build it?](#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it)

**Illinois testing guidance:** <a href="https://doit.illinois.gov/initiatives/accessibility/testing.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/testing.html</a>

**See also:** [What are the most common accessibility mistakes and issues to avoid?](#common-concerns-what-are-the-most-common-accessibility-mistakes-and-issues-to-avoid) | [I'm a web developer. Where do I start?](#getting-started-i-m-a-web-developer-where-do-i-start) | [How do we ensure accessibility compliance with third-party tools?](#procurement-and-third-party-tools-how-do-we-ensure-accessibility-compliance-with-third-party-tools-like-lmss-docebo-docusign-tableau-arcgis-and-canva) | [How is voicecap different from automated checkers like axe, Pa11y, Lighthouse, or SiteImprove?](#screen-reader-testing-voicecap-how-is-voicecap-different-from-automated-checkers-like-axe-pa11y-lighthouse-or-siteimprove)

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#keyboard" target="_blank" rel="noopener noreferrer">Success Criterion 2.1.1 Keyboard - Level A</a> (keyboard navigation)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#name-role-value" target="_blank" rel="noopener noreferrer">Success Criterion 4.1.2 Name, Role, Value - Level A</a> (screen reader compatibility)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#resize-text" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.4 Resize Text - Level AA</a> (zoom/200% requirement)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)

### Why does SiteImprove (or another scanner) show 98% when axe-core shows 100%?

{updated:2026-10-26}

**Quick answer:** The two tools are scoring different rule sets. **axe-core**, when it's run with only its WCAG 2.0/2.1 Level A and Level AA rule tags, checks the actual ADA Title II / IITAA 2.1 target. **SiteImprove's overall score** rolls in WCAG **AAA** criteria, ARIA authoring practices, and SiteImprove's own "best practices" alongside AA. Items in those extra categories pull the score below 100 even when every Level A and Level AA rule is satisfied. So the 2-point gap between "100" and "98" often sits in AAA or best-practice rules the law doesn't require — the per-finding breakdown will tell you for sure.

**A worked example (real ICJIA SiteImprove export, May 6, 2026):**

The Violence Prevention Plan site (`vpp.icjia.illinois.gov`) was audited by SiteImprove. Here's how the issue rules broke down:

| Conformance category                       | # of rules | # at 100/100 | # below 100 |
| ------------------------------------------ | ---------- | ------------ | ----------- |
| **WCAG 2.1 Level A**                       | 38         | **38**       | **0**       |
| **WCAG 2.1 Level AA**                      | 10         | **10**       | **0**       |
| WCAG 2.1 Level AAA                         | 8          | 5            | 3           |
| WAI-ARIA authoring practices               | 6          | 6            | 0           |
| SiteImprove "best practices" (not WCAG)    | 13         | 12           | 1           |

**Every single Level A and Level AA rule scored 100/100.** SiteImprove's automated checks found no Level A or AA problems on this site. That's strong evidence, but not proof of conformance on its own — automated checks cover only part of WCAG, so the rest still takes a person.

**The four findings below 100/100, with their actual standing:**

| Finding (from SiteImprove)                              | Score    | What it actually is                                                                |
| ------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| Color contrast does not meet enhanced requirement       | 44.33    | WCAG SC <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#contrast-enhanced" target="_blank" rel="noopener noreferrer">1.4.6</a> — **AAA** (7:1 ratio; AA only requires 4.5:1, which the site already meets)         |
| Interactive element does not meet enhanced size         | 62.03    | WCAG SC <a href="https://www.w3.org/TR/WCAG21/#target-size" target="_blank" rel="noopener noreferrer">2.5.5</a> — **AAA** (44×44 CSS pixels; WCAG 2.1 has no AA equivalent)            |
| Line height is below minimum value                      | 72.98    | WCAG SC <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#visual-presentation" target="_blank" rel="noopener noreferrer">1.4.8</a> Visual Presentation — **AAA** (1.5× line height for paragraphs) |
| Overuse of italics                                      | 65.07    | SiteImprove "best practice" — **not in WCAG at any level**                         |

The ~98 rollup score is being pulled down by three AAA criteria and one editorial best-practice rule. None of those are required by:

- The **ADA Title II web rule** (28 CFR § 35.200(b)(1)–(2) requires **WCAG 2.1 Level A and AA**, full stop — no AAA mandate; paragraph (b)(3) is the one that incorporates WCAG 2.1 by reference).
- **IITAA 2.1 Standards** (also cite **WCAG 2.1 Level AA** — see [When did the current IITAA standards take effect?](#compliance-requirements-iitaa-and-ada-title-ii-when-did-the-current-iitaa-standards-take-effect)).

**Why axe-core stays at 100 here:**

When axe-core is run with only its WCAG 2.0/2.1 Level A and Level AA tags (`runOnly`: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`), axe's own "best practice" rules stay out of the run. (The axe check built into voicecap is broader: it adds WCAG 2.2 Level AA and best-practice rules.) AAA rules are disabled in axe-core by default regardless. (Note: a bare `axe.run()` with no tag filter *would* include best-practice rules — the tag restriction is what scopes the audit to the legal standard.) So axe-core and SiteImprove aren't disagreeing about the WCAG 2.1 AA result — they're scoring different rule sets.

**How to read a SiteImprove report when AA is your target:**

When a manager or auditor cites "your SiteImprove score is X," ask three questions:

1. **What conformance level are the sub-100 items at?** AAA findings don't fail an AA audit. The "Conformance" column in SiteImprove's CSV exports tells you this directly.
2. **Are any of them "best practices" rather than WCAG criteria?** Editorial rules like "overuse of italics" aren't in WCAG. SiteImprove labels these as "Accessibility best practices" — not "A," "AA," or "AAA."
3. **What's the score if you filter to Level A + Level AA only?** That's the number that lines up with the ADA Title II / IITAA 2.1 target, for the parts of WCAG a scanner can check. In the worked example above, it's 100%.

If the answer is "all sub-100 findings are AAA or best-practice," the rollup score is misleading for legal-compliance purposes — on the automated checks for the standard the law actually requires, the site is at 100%.

**Why is the rollup formula like this?**

SiteImprove sells a single accessibility score because customers want a single number to track over time. To compute it, the platform mixes multiple rule families into one weighted average. That's reasonable as an editorial-quality dashboard. It's just not the right number to point at when the question is "are we WCAG 2.1 AA compliant under ADA Title II?" — that question wants the AA-only result.

**Practical takeaway:**

Three rules of thumb when scanners disagree:

- **Aiming for AAA is admirable but not required.** WCAG 2.1 AAA is a stretch goal. Hitting AA is what the law asks for. Ship at AA, then chase AAA where it adds real value (e.g., enhanced contrast for vision-impaired users, larger tap targets for motor-impaired users).
- **SiteImprove "best practices" are editorial guidance, not law.** Treat them like internal style-guide items: useful, opinion-bearing, sometimes worth fixing, but not part of compliance.
- **When tools disagree, look at rule sets first, not scores.** Two tools showing different scores on the same site usually means they're testing different criteria, not that one is wrong. Get the per-finding breakdown — it almost always explains the gap.

**See also:**

- [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility) — the broader testing guidance
- [How is voicecap different from automated checkers like axe, Pa11y, Lighthouse, or SiteImprove?](#screen-reader-testing-voicecap-how-is-voicecap-different-from-automated-checkers-like-axe-pa11y-lighthouse-or-siteimprove) — what no scanner score can tell you: what a screen reader user actually hears
- [Do we need an independent (external) accessibility audit to prove compliance? When is it worth it?](#website-accessibility-do-we-need-an-independent-external-accessibility-audit-to-prove-compliance-when-is-it-worth-it) — when an external audit adds value
- [What does "WCAG 2.1 Level AA" mean?](#common-concerns-what-does-wcag-2-1-level-aa-mean) — the A vs AA vs AAA distinction
- [When did the current IITAA standards take effect?](#compliance-requirements-iitaa-and-ada-title-ii-when-did-the-current-iitaa-standards-take-effect) — IITAA 2.1's WCAG 2.1 AA target

**References:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#contrast-enhanced" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.4.6 Contrast (Enhanced) — AAA</a>
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#visual-presentation" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.4.8 Visual Presentation — AAA</a>
- <a href="https://www.w3.org/TR/WCAG21/#target-size" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 2.5.5 Target Size — AAA</a>
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200 (eCFR)</a> — federal rule cites WCAG 2.1 Level AA
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — IITAA 2.1 cites WCAG 2.1 Level AA

### Do we need an independent (external) accessibility audit to prove compliance? When is it worth it?

{updated:2026-01-02}

**Quick answer:** An external audit is **not the only way** to validate accessibility, but it can be worth it for **high-risk, high-visibility services** or when you need **independent evidence**. Regardless of who does it, **no automated tool alone can determine conformance** — knowledgeable human evaluation is required.

**When it’s worth paying for an external audit:**

- **High-risk public services** (forms, applications, services that affect benefits, rights, public access)
- **Large public sites** where sampling + methodology matters
- **Vendor-delivered systems** where you need third-party documentation and leverage for remediation
- **When leadership doesn’t trust internal validation** and you need an independent report

**When internal evaluation can be sufficient (if done well):**

- You have staff with accessibility testing skills (web + documents)
- You follow a recognized methodology and produce a clear report
- You maintain evidence of testing and remediation over time

**See also:** [How accurate is voicecap, and how can a manager or auditor check its results?](#screen-reader-testing-voicecap-how-accurate-is-voicecap-and-how-can-a-manager-or-auditor-check-its-results) | [What doesn't voicecap do? Does a clean voicecap report mean our site is compliant?](#screen-reader-testing-voicecap-what-doesn-t-voicecap-do-does-a-clean-voicecap-report-mean-our-site-is-compliant)

**References:**

- <a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer">W3C WAI: Evaluating Web Accessibility Overview</a> — Explains that evaluation is also called “audit” and that no tool alone can determine conformance
- <a href="https://www.w3.org/TR/WCAG-EM/" target="_blank" rel="noopener noreferrer">W3C WCAG-EM</a> — Methodology for conformance evaluation and reporting
- <a href="https://www.section508.gov/test/" target="_blank" rel="noopener noreferrer">Section508.gov: Test for Accessibility</a> — Federal overview of automated/manual/hybrid testing and the testing lifecycle

### Can’t we just use an accessibility overlay/widget (a “one-click fix”) instead of doing remediation?

{updated:2026-11-06}

**Quick answer:** No. Overlays/widgets can add UI features, but they **do not reliably make a site conform to WCAG 2.1 Level AA** because accessibility issues usually require **fixing the underlying code and content**. Also, **conformance cannot be validated by automation alone**.

**Why overlays don’t solve compliance:**

- **WCAG issues are often structural** (labels, headings, keyboard behavior, focus order, meaningful text alternatives, error handling). These require real fixes in templates, components, and content—not a layer on top.
- **Automation limits still apply.** If a tool can’t determine conformance on its own, an overlay (which is largely automation) can’t guarantee compliance either.
- **Practitioners rate them poorly, and Illinois DoIT advises against them.** In WebAIM's latest survey of accessibility practitioners, 67% rated overlays "not very" or "not at all" effective. Illinois DoIT's Office of Information Accessibility "currently advises against including overlays on State websites."

**What to do instead (the practical manager approach):**

1. **Stop creating new barriers** (publish/purchase/build with accessibility checks).
2. **Prioritize** high-traffic and high-stakes services first.
3. **Use tools + human testing** to find issues, then remediate and re-test.

**See also:** [What is voicecap, and why did ICJIA build it?](#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it) — human screen reader review, sped up rather than replaced

**References:**

- <a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer">W3C WAI: Evaluating Web Accessibility Overview</a> — “No tool alone can determine if a site meets accessibility standards” (human evaluation required)
- <a href="https://doit.illinois.gov/initiatives/accessibility/guides/overlays.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: Accessibility Overlays</a> — DoIT "currently advises against including overlays on State websites"
- <a href="https://webaim.org/projects/practitionersurvey3/" target="_blank" rel="noopener noreferrer">WebAIM: Survey of Web Accessibility Practitioners #3 (results)</a> — Includes practitioner ratings of overlay/plugin/widget effectiveness
- <a href="https://wave.webaim.org/help" target="_blank" rel="noopener noreferrer">WAVE Help (WebAIM)</a> — Notes that automated tools cannot determine true accessibility/conformance by themselves

### What WCAG requirements are commonly overlooked?

{updated:2026-10-26}

**See also:** [What are the most common accessibility mistakes and issues to avoid?](#common-concerns-what-are-the-most-common-accessibility-mistakes-and-issues-to-avoid) | [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility) | [How is voicecap different from automated checkers like axe, Pa11y, Lighthouse, or SiteImprove?](#screen-reader-testing-voicecap-how-is-voicecap-different-from-automated-checkers-like-axe-pa11y-lighthouse-or-siteimprove)

Beyond the most common issues (alt text, color contrast, headings), these WCAG 2.1 Level AA requirements are frequently missed during accessibility reviews. **Note:** WCAG applies to websites, documents (PDFs, Word, Excel, PowerPoint), videos, and third-party tools — not just web pages.

> **What does "SC" mean?** SC stands for **Success Criterion** — the specific, testable requirements within WCAG. Each SC has a number (like 2.4.1) and a conformance level (A, AA, or AAA). For example, "SC 2.4.1" means Success Criterion 2.4.1. You can look up any SC at the <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a> — use the search box to find specific criteria by number or keyword.

#### Website-Specific Requirements Often Missed

**Navigation and Structure:**

1. **Skip links / Bypass blocks (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#bypass-blocks" target="_blank" rel="noopener noreferrer">SC 2.4.1 - Level A</a>)** — Pages with repeated content (like navigation menus) should provide a way to skip directly to main content. This is typically implemented as a "Skip to main content" link.

2. **Consistent navigation (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#consistent-navigation" target="_blank" rel="noopener noreferrer">SC 3.2.3 - Level AA</a>)** — Navigation menus should appear in the same relative order across all pages of a website.

3. **Multiple ways to find pages (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#multiple-ways" target="_blank" rel="noopener noreferrer">SC 2.4.5 - Level AA</a>)** — Users should have more than one way to locate pages (e.g., navigation menu + site search + sitemap).

**Forms and User Input:**

4. **Error identification (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-identification" target="_blank" rel="noopener noreferrer">SC 3.3.1 - Level A</a>)** — When a form error is detected, the error must be identified and described in text. Visual indicators alone (like red borders) are not sufficient.

5. **Error suggestions (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-suggestion" target="_blank" rel="noopener noreferrer">SC 3.3.3 - Level AA</a>)** — When an error is detected and suggestions for correction are known, provide them to the user (e.g., "Please enter a valid email address in the format name@example.com").

6. **Labels or instructions (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#labels-or-instructions" target="_blank" rel="noopener noreferrer">SC 3.3.2 - Level A</a>)** — All form fields must have clear labels or instructions. Placeholder text alone is not sufficient.

7. **Timing adjustable (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#timing-adjustable" target="_blank" rel="noopener noreferrer">SC 2.2.1 - Level A</a>)** — If a page has a time limit (session timeout, form expiration), users must be able to turn off, adjust, or extend the time.

**Content Presentation:**

8. **Reflow (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#reflow" target="_blank" rel="noopener noreferrer">SC 1.4.10 - Level AA</a>)** — Content must reflow without horizontal scrolling at 400% zoom (or 320px viewport width). Content should not require scrolling in two dimensions.

9. **Text spacing (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#text-spacing" target="_blank" rel="noopener noreferrer">SC 1.4.12 - Level AA</a>)** — Content must remain readable when users adjust line height, paragraph spacing, letter spacing, or word spacing. No loss of content or functionality.

10. **Language of page (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#language-of-page" target="_blank" rel="noopener noreferrer">SC 3.1.1 - Level A</a>)** — The default human language of each page must be programmatically determined (e.g., `<html lang="en">`).

#### Document-Specific Requirements Often Missed (PDFs, Word, Excel, PowerPoint)

These requirements apply to all documents, not just websites:

1. **Document language (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#language-of-page" target="_blank" rel="noopener noreferrer">SC 3.1.1 - Level A</a>)** — Set the document language in document properties. Screen readers use this to pronounce words correctly.

2. **Proper tags and reading order (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#meaningful-sequence" target="_blank" rel="noopener noreferrer">SC 1.3.2 - Level A</a>)** — PDFs must have tags that define structure (headings, lists, tables). Reading order must match visual order.

3. **Scanned documents = inaccessible** — A scanned PDF is an image. Without OCR and manual remediation, screen readers cannot read the text.

4. **Table headers (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)** — Tables in documents must have designated header rows/columns so screen readers announce column/row context.

5. **Color alone to convey meaning (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#use-of-color" target="_blank" rel="noopener noreferrer">SC 1.4.1 - Level A</a>)** — "Items in red are required" fails because users who can't perceive color won't know which items are required.

6. **Complex images without text alternatives (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">SC 1.1.1 - Level A</a>)** — Charts, graphs, and infographics need both alt text and a text description of the data (often as a data table or long description).

7. **Excel spreadsheets without context (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)** — Spreadsheets need real header rows (for example, Format as Table with a header row), descriptive sheet names, and a short note explaining how the data is laid out. Named ranges can help some screen reader users, but WCAG doesn't require them.

8. **PowerPoint without slide titles (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#headings-and-labels" target="_blank" rel="noopener noreferrer">SC 2.4.6 - Level AA</a>)** — Slide titles work as a deck's headings, and screen reader users move through a presentation by them. Give every slide a unique, descriptive title; PowerPoint's Accessibility Checker flags a missing one. (SC 2.4.2 Page Titled applies to the presentation's own title, set in its file properties.)

#### Third-Party Tools Requirements Often Missed

When your agency uses third-party platforms (Docebo, DocuSign, Tableau, ArcGIS, survey tools, etc.):

1. **Vendor claims ≠ your compliance** — A vendor saying "we're accessible" doesn't mean your implementation is accessible. Your content, configurations, and customizations must also be accessible.

2. **Interactive elements must be keyboard accessible (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#keyboard" target="_blank" rel="noopener noreferrer">SC 2.1.1 - Level A</a>)** — If users can't complete a workflow using only a keyboard, it fails. Test all critical user paths.

3. **Custom content on vendor platforms (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">SC 1.1.1</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)** — Training modules, survey questions, dashboards, and maps that you create must meet the same standards.

4. **Data visualizations need text alternatives (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">SC 1.1.1 - Level A</a>)** — Charts and maps must provide equivalent information for users who can't see them.

**See also:** [How do we ensure accessibility compliance with third-party tools like LMSs (Docebo), DocuSign, Tableau, ArcGIS, and Canva?](#procurement-and-third-party-tools-how-do-we-ensure-accessibility-compliance-with-third-party-tools-like-lmss-docebo-docusign-tableau-arcgis-and-canva)

#### Why These Matter

These requirements are often missed because:

- Automated testing tools may not detect all violations
- Some issues only appear during specific interactions
- People assume "accessibility" only means websites
- Document accessibility is often an afterthought
- Third-party tool compliance is assumed rather than verified

**Testing approach:**

| Content Type          | Testing Approach                                                                   |
| --------------------- | ---------------------------------------------------------------------------------- |
| **Websites**          | Keyboard testing, screen reader testing, zoom testing, automated tools (WAVE, axe) |
| **PDFs**              | Adobe Acrobat Accessibility Checker, PAC (PDF Accessibility Checker), screen reader testing |
| **Word/PowerPoint**   | Microsoft Accessibility Checker, screen reader testing                             |
| **Excel**             | Microsoft Accessibility Checker, verify navigation with screen reader              |
| **Third-party tools** | Request VPAT/ACR from vendor (the vendor's self-reported accessibility assessment — see [What is a VPAT?](#procurement-and-third-party-tools-what-is-a-vpat-what-is-an-acr)), test critical user workflows manually |

**References:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a> — Every Level A, AA, and AAA success criterion; use its filters to hide AAA
- <a href="https://webaim.org/standards/wcag/checklist" target="_blank" rel="noopener noreferrer">WebAIM WCAG 2 Checklist</a> — Simplified checklist format
- <a href="https://www.section508.gov/create/" target="_blank" rel="noopener noreferrer">Section508.gov: Create Accessible Content</a> — Guidance for documents, presentations, and more

### What color contrast ratio is required?

{updated:2026-08-13}

> **Note:** "SC" = Success Criterion. Look up any SC number at the <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a>.

For WCAG 2.1 Level AA:

- **Normal text** (smaller than 18pt/~24px regular or 14pt/~19px bold): **4.5:1** contrast ratio.
- **Large text** (18pt/~24px+ regular or 14pt/~19px+ bold): **3:1** contrast ratio.
- **UI components and graphics**: **3:1** contrast ratio (for interactive elements, icons, and graphical objects required to understand content - WCAG <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-contrast" target="_blank" rel="noopener noreferrer">Success Criterion (SC) 1.4.11 Non-text Contrast - Level AA</a>).

**Verbatim from WCAG 2.1, Success Criterion 1.4.3 "Contrast (Minimum)" (Level AA):**

> "The visual presentation of text and images of text has a **contrast ratio of at least 4.5:1**, except for the following:
>
> - **Large Text:** Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;
> - **Incidental:** Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.
> - **Logotypes:** Text that is part of a logo or brand name has no contrast requirement."

— <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.4.3 (W3C, normative)</a>

**Check contrast:** <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">https://webaim.org/resources/contrastchecker/</a>

**Visual example: Color contrast ratios**

| Text Size          | Contrast Ratio | Example                        | Status    |
| ------------------ | -------------- | ------------------------------ | --------- |
| Normal text        | 4.5:1 minimum  | Dark gray (#767676) on white   | ✅ Passes |
| Normal text        | 2.8:1          | Light gray (#999999) on white  | ❌ Fails  |
| Large text (18pt+) | 3:1 minimum    | Medium gray (#808080) on white | ✅ Passes |
| UI components      | 3:1 minimum    | Blue button (#0066CC) on white | ✅ Passes |

**Quick test:** If you can't easily read text without squinting, the contrast is likely too low. Use the <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">WebAIM Contrast Checker</a> to verify exact ratios.

**WCAG Reference:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a>
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-contrast" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.11 Non-text Contrast - Level AA</a>

**See also:** [What are focus indicators and why do they matter?](#website-accessibility-what-are-focus-indicators-and-why-do-they-matter) | [I'm a web developer. Where do I start?](#getting-started-i-m-a-web-developer-where-do-i-start)

### What are focus indicators and why do they matter?

{updated:2026-01-06}

> **Note:** "SC" = Success Criterion. Look up any SC number at the <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a>.

**Quick answer:** Focus indicators are the visible outlines or highlights that show which element currently has keyboard focus. WCAG 2.1 Level AA requires that focus is visible (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#focus-visible" target="_blank" rel="noopener noreferrer">Success Criterion (SC) 2.4.7 - Level AA</a>). Removing or suppressing focus indicators creates a significant barrier for keyboard users.

**Why focus indicators matter:**

Users who navigate by keyboard (including screen reader users, users with motor disabilities, and power users) need to see where they are on the page. Without visible focus, they cannot:

- Know which link or button is currently selected
- Navigate forms reliably
- Confirm which element will activate when they press Enter

**Common mistakes:**

1. **Removing outlines with CSS** — `outline: none` or `outline: 0` without providing an alternative focus style removes focus indicators entirely. This is a WCAG failure.

2. **Low-contrast focus indicators** — Focus indicators must meet the 3:1 contrast requirement against adjacent colors (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-contrast" target="_blank" rel="noopener noreferrer">SC 1.4.11 Non-text Contrast - Level AA</a>).

3. **Invisible focus on certain backgrounds** — A blue outline may be visible on white but invisible on dark blue backgrounds.

**Best practices:**

```css
/* Don't do this */
*:focus {
  outline: none;
}

/* Do this instead */
*:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* Or use focus-visible for better UX */
*:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

**Testing focus indicators:**

1. Tab through your entire page using only the keyboard
2. Verify you can always see which element has focus
3. Check that focus indicators are visible on all background colors
4. Check that focus order matches the visual reading order

**WCAG Reference:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#focus-visible" target="_blank" rel="noopener noreferrer">Success Criterion 2.4.7 Focus Visible - Level AA</a> — Focus indicator must be visible
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-contrast" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.11 Non-text Contrast - Level AA</a> — Focus indicators need 3:1 contrast

**See also:** [What color contrast ratio is required?](#website-accessibility-what-color-contrast-ratio-is-required) | [I'm a web developer. Where do I start?](#getting-started-i-m-a-web-developer-where-do-i-start) | [How do I test my website?](#website-accessibility-how-do-i-test-my-website-for-accessibility)

### Do I need to caption all videos?

{updated:2026-11-06}

> **Note:** "SC" = Success Criterion. Look up any SC number at the <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a>.

**Quick answer:** Yes, for WCAG 2.1 Level AA compliance:

- **Pre-recorded video with audio** — Requires synchronized captions (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#captions-prerecorded" target="_blank" rel="noopener noreferrer">SC 1.2.2 - Level A</a>).
- **Live video with audio** — Requires live captions (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#captions-live" target="_blank" rel="noopener noreferrer">SC 1.2.4 - Level AA</a>). Accuracy matters: for important live events, use a professional real-time (CART) captioner, and correct the captions before you post the recording.
- **Pre-recorded audio only** — Requires a text transcript (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#audio-only-and-video-only-prerecorded" target="_blank" rel="noopener noreferrer">SC 1.2.1 - Level A</a>).
- **Video with essential visual content** — Requires audio description at Level AA **only if** important visual information isn't already conveyed in the existing audio track (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#audio-description-prerecorded" target="_blank" rel="noopener noreferrer">SC 1.2.5 - Level AA</a>). For example, a video where a speaker says 'as you can see on this chart...' without describing the chart would need audio description. A talking-head video where the speaker fully explains their points verbally typically does not.

**Verbatim from WCAG 2.1 (W3C, normative):**

> **SC 1.2.2 Captions (Prerecorded) — Level A:** "Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such."

— <a href="https://www.w3.org/TR/WCAG21/#captions-prerecorded" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.2.2 (W3C)</a>

> **SC 1.2.4 Captions (Live) — Level AA:** "Captions are provided for all live audio content in synchronized media."

— <a href="https://www.w3.org/TR/WCAG21/#captions-live" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.2.4 (W3C)</a>

> **SC 1.2.5 Audio Description (Prerecorded) — Level AA:** "Audio description is provided for all prerecorded video content in synchronized media."

— <a href="https://www.w3.org/TR/WCAG21/#audio-description-prerecorded" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.2.5 (W3C)</a>

**Are AI-generated subtitles (like YouTube's auto-captions) enough?**

**No.** AI-generated subtitles are a **starting point**, but they typically contain errors that must be corrected. Success Criterion 1.2.2 requires captions for prerecorded video, and W3C is clear about auto-captions: "Automatically-generated captions do not meet user needs or accessibility requirements, unless they are confirmed to be fully accurate. Usually they need significant editing." (<a href="https://www.w3.org/WAI/media/av/captions/" target="_blank" rel="noopener noreferrer">W3C: Captions/Subtitles</a>)

**Common accuracy issues with AI-generated captions:**

- Misspellings and incorrect word substitutions (e.g., "accessibility" becomes "access ability")
- Missing or incorrect punctuation
- Failure to identify speakers in multi-speaker videos
- Misinterpretation of technical terms, names, or acronyms
- Missing non-speech sounds (e.g., "[door closes]", "[music playing]")

**What to do instead:**

1. **Use AI subtitles as a starting point** — YouTube's auto-generated captions can save time, but to get to compliance you'll need to:
   - Review and edit the captions for accuracy
   - Correct misspellings and word errors
   - Add proper punctuation and capitalization
   - Identify speakers when multiple people are speaking
   - Add descriptions of important non-speech sounds (e.g., "[applause]", "[phone ringing]")

2. **Provide a text transcript** — For **prerecorded video with audio**, WCAG 2.1 Level AA requires captions but does not require a transcript. However:
   - **Audio-only content** (podcasts, audio recordings) **requires a transcript** at Level A
   - **Transcripts are recommended** for all video content as a best practice — they benefit users who prefer reading, need to search content, or cannot access video
   - **Transcripts may be necessary** for complex content where captions alone may not provide equivalent access (e.g., dense information, technical terminology, or users with cognitive disabilities)
   - **Deafblind users** who read braille need transcripts — W3C says "Transcripts are needed to provide access to people who are Deaf-blind and use braille"

**How to add accurate captions to YouTube videos:**

1. Upload your video to YouTube
2. In YouTube Studio, select **Subtitles** from the left menu, then click the video
3. In the "Subtitles" column for your language, select **Edit**. For automatic captions, select **Duplicate and edit**, then **Continue**
4. Review and correct errors, add speaker names, and improve formatting
5. Click **Publish**

**How to provide a transcript:**

- Link to a text transcript in the video description
- Include the transcript on the webpage where the video is embedded
- Provide the transcript as a downloadable document (PDF, Word, or plain text)

**References:**

- <a href="https://www.w3.org/WAI/media/av/captions/" target="_blank" rel="noopener noreferrer">W3C: Captions/Subtitles</a> — Complete guide to video captions
- <a href="https://www.w3.org/WAI/media/av/transcripts/" target="_blank" rel="noopener noreferrer">W3C: Transcripts</a> — Guidance on audio transcripts
- <a href="https://support.google.com/youtube/answer/2734705" target="_blank" rel="noopener noreferrer">YouTube Help: Edit or remove captions</a> — How to edit YouTube captions, including automatic ones

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#captions-prerecorded" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.2 Captions (Prerecorded) - Level A</a> — Requires accurate, synchronized captions
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#captions-live" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.4 Captions (Live) - Level AA</a>
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#audio-only-and-video-only-prerecorded" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.1 Audio-only and Video-only (Prerecorded) - Level A</a>
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#audio-description-prerecorded" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.5 Audio Description (Prerecorded) - Level AA</a>

**See also:** [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start) | [What about cognitive accessibility and plain language?](#website-accessibility-what-about-cognitive-accessibility-and-plain-language)

### What about cognitive accessibility and plain language?

{updated:2026-10-26}

**Quick answer:** WCAG 2.1 Level AA includes several requirements that support cognitive accessibility: readable text, predictable navigation, error prevention, and sufficient time. Beyond WCAG compliance, plain language principles help make content accessible to users with cognitive disabilities, learning disabilities, limited literacy, and non-native speakers.

**WCAG 2.1 Level AA requirements supporting cognitive accessibility:**

> **Note:** "SC" = Success Criterion. Look up any SC number at the <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a>.

1. **Readable content** (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#language-of-page" target="_blank" rel="noopener noreferrer">SC 3.1.1 - Level A</a>) — Specify the language of the page so assistive technologies can render it correctly.

2. **Consistent navigation** (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#consistent-navigation" target="_blank" rel="noopener noreferrer">SC 3.2.3 - Level AA</a>) — Navigation appears in the same order across pages, reducing cognitive load.

3. **Consistent identification** (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#consistent-identification" target="_blank" rel="noopener noreferrer">SC 3.2.4 - Level AA</a>) — Components with the same function are identified consistently (e.g., all "Submit" buttons use the same label).

4. **Error identification** (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-identification" target="_blank" rel="noopener noreferrer">SC 3.3.1 - Level A</a>) — Errors are clearly described in text, helping users understand what went wrong.

5. **Error suggestion** (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-suggestion" target="_blank" rel="noopener noreferrer">SC 3.3.3 - Level AA</a>) — When errors are detected, provide specific suggestions for correction.

6. **Error prevention** (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-prevention-legal-financial-data" target="_blank" rel="noopener noreferrer">SC 3.3.4 - Level AA</a>) — For pages with legal commitments or financial transactions, allow users to review, correct, or confirm before final submission.

7. **Timing adjustable** (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#timing-adjustable" target="_blank" rel="noopener noreferrer">SC 2.2.1 - Level A</a>) — Users can extend time limits, important for users who need more time to read and process content.

**Plain language best practices (beyond WCAG compliance):**

While WCAG doesn't specify reading level requirements at Level AA, these practices improve accessibility for all users:

- **Use simple, clear language** — Avoid jargon, acronyms (or define them on first use), and complex sentence structures
- **Structure content logically** — Use headings, lists, and short paragraphs
- **Front-load important information** — Put key points first, details later
- **Use consistent terminology** — Don't use multiple terms for the same concept
- **Provide context and instructions** — Don't assume users know what to do next
- **Avoid walls of text** — Break content into scannable sections

**Why this matters:**

Cognitive disabilities are the most common type of disability. According to the CDC, about 14% of U.S. adults (13.9%) have a cognitive disability — serious difficulty concentrating, remembering, or making decisions (<a href="https://www.cdc.gov/disability-and-health/articles-documents/disability-impacts-all-of-us-infographic.html" target="_blank" rel="noopener noreferrer">CDC: Disability Impacts All of Us</a>). Plain language and cognitive accessibility features benefit:

- Users with cognitive disabilities or learning disabilities
- Users with attention disorders
- Non-native English speakers
- Users accessing content in stressful or distracting environments
- Older adults experiencing age-related cognitive changes
- Everyone who prefers clear, direct communication

**References:**

- <a href="https://www.w3.org/WAI/cognitive/" target="_blank" rel="noopener noreferrer">W3C: Cognitive Accessibility at W3C</a> — Overview of cognitive accessibility efforts
- <a href="https://digital.gov/guides/plain-language" target="_blank" rel="noopener noreferrer">Digital.gov: Plain Language Guides (formerly PlainLanguage.gov)</a> — Federal plain language guidelines
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#readable" target="_blank" rel="noopener noreferrer">WCAG 2.1: Readable (Guideline 3.1)</a> — Make text content readable and understandable
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#input-assistance" target="_blank" rel="noopener noreferrer">WCAG 2.1: Input Assistance (Guideline 3.3)</a> — Help users avoid and correct mistakes

### How do I make forms accessible?

{updated:2026-01-06}

**Quick answer:** Give every form field a visible label that's programmatically associated with it, error messages must be clear and specific, and users must be able to navigate and complete the form using only a keyboard.

**Critical elements of accessible forms:**

**1. Labels and Instructions**

- Give every input field a visible `<label>`, associated using `for` and `id` attributes
- Placeholder text is **not** a substitute for labels (it disappears when users start typing)
- Group related fields (like address components) using `<fieldset>` and `<legend>`
- Provide clear instructions before the form, not just inline

**Example of correct labeling:**

```html
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required />
```

**2. Error Handling**

- Identify errors in text, not just with color or icons
- Describe what went wrong and how to fix it
- Associate error messages with the field using `aria-describedby`
- Move focus to the first error or provide an error summary at the top

**Example error message:**

```html
<input
  type="email"
  id="email"
  aria-describedby="email-error"
  aria-invalid="true"
/>
<span id="email-error" role="alert"
  >Please enter a valid email address (example: name@agency.gov)</span
>
```

**3. Required Fields**

- Indicate required fields both visually and programmatically
- Use `required` attribute or `aria-required="true"`
- Don't rely only on asterisks (\*) — explain what they mean

**4. Keyboard Accessibility**

- All form controls must be reachable and operable via keyboard (<a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#keyboard" target="_blank" rel="noopener noreferrer">WCAG SC 2.1.1 Keyboard — Level A</a>)
- Tab order should follow visual order
- Custom controls (date pickers, dropdowns) need keyboard support

**5. Time Limits**

- If forms have session timeouts, warn users before timeout occurs
- Allow users to extend time or save progress
- Don't auto-submit forms without user confirmation

**Common form accessibility problems:**

| Problem                                   | Impact                                                      | Solution                                           |
| ----------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------- |
| No visible labels                         | Screen readers don't announce what the field is for         | Add `<label>` elements                             |
| Placeholder as label                      | Label disappears; difficult to remember what to enter       | Use real labels above or beside fields             |
| Color-only error indication               | Users who can't see red don't know there's an error         | Add text description of error                      |
| No error suggestions                      | Users don't know how to fix the problem                     | Provide specific correction guidance               |
| Unlabeled required fields                 | Users don't know which fields are mandatory                 | Add "(required)" text and `required` attribute     |
| Custom dropdowns with no keyboard support | Keyboard users cannot select options                        | Ensure custom controls have full keyboard support  |
| CAPTCHAs without alternatives             | Users with vision or cognitive disabilities cannot complete | Provide audio alternative or use invisible CAPTCHA |

**References:**

- <a href="https://www.w3.org/WAI/tutorials/forms/" target="_blank" rel="noopener noreferrer">W3C: Forms Tutorial</a> — Complete guide to accessible forms
- <a href="https://webaim.org/techniques/forms/" target="_blank" rel="noopener noreferrer">WebAIM: Creating Accessible Forms</a> — Practical form accessibility guidance

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#labels-or-instructions" target="_blank" rel="noopener noreferrer">Success Criterion 3.3.2 Labels or Instructions - Level A</a>
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-identification" target="_blank" rel="noopener noreferrer">Success Criterion 3.3.1 Error Identification - Level A</a>
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-suggestion" target="_blank" rel="noopener noreferrer">Success Criterion 3.3.3 Error Suggestion - Level AA</a>
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#error-prevention-legal-financial-data" target="_blank" rel="noopener noreferrer">Success Criterion 3.3.4 Error Prevention - Level AA</a>

### How do I make mobile apps accessible?

**Quick answer:** Mobile apps your agency provides to the public must meet the same WCAG 2.1 Level AA standards as websites. This includes proper labeling, keyboard/gesture navigation, sufficient color contrast, and compatibility with mobile screen readers (VoiceOver on iOS, TalkBack on Android).

**Full explanation:**

Mobile apps provided to the public by state and local governments must meet WCAG 2.1 Level AA standards under the ADA Title II web rule. Mobile accessibility follows the same principles as web accessibility, but with platform-specific considerations.

**Core mobile accessibility requirements:**

1. **Screen reader compatibility** — Apps must work with:
   - **iOS:** VoiceOver (built-in)
   - **Android:** TalkBack (built-in)
   - Content should be properly labeled and navigable

2. **Touch target size** — While WCAG 2.1 Level AA doesn't mandate specific sizes, platform guidelines recommend at least 44x44 points (iOS) or 48x48 density-independent pixels (Android) for usability. It's a strong best practice for users with motor disabilities.

3. **Color contrast** — Same 4.5:1 ratio for normal text, 3:1 for large text as web content

4. **Alternative input methods** — Support for:
   - External keyboards
   - Switch control devices
   - Voice control

5. **Dynamic content** — Announce updates to screen readers (e.g., form validation, loading states)

**Platform-specific guidance:**

**iOS (Apple):**

- Use native accessibility APIs (UIAccessibility)
- Test with VoiceOver (Settings > Accessibility > VoiceOver)
- Use semantic labels (`accessibilityLabel`, `accessibilityHint`)
- Support Dynamic Type for text scaling
- Ensure proper focus management

**Android:**

- Use Android Accessibility APIs
- Test with TalkBack (Settings > Accessibility > TalkBack)
- Use content descriptions for images and icons
- Support font scaling
- Implement proper focus indicators

**Step-by-step mobile app accessibility workflow:**

1. **Design phase:**
   - Aim for touch targets of at least 44x44 points (strong usability best practice)
   - Design with sufficient color contrast
   - Plan for text scaling (support Dynamic Type/Large Text)
   - Avoid relying solely on color to convey information

2. **Development phase:**
   - Use native accessibility APIs (don't build custom solutions)
   - Add accessibility labels to all interactive elements
   - Test with screen readers during development (not just at the end)
   - Implement proper focus management

3. **Testing phase:**
   - Test with VoiceOver (iOS) and TalkBack (Android)
   - Test with keyboard navigation (external keyboard)
   - Test with text scaling enabled
   - Test with color contrast checkers
   - Use automated tools (axe DevTools Mobile, Accessibility Scanner for Android)

4. **Before release:**
   - Complete accessibility audit
   - Document known issues and remediation plan
   - Test with real users with disabilities if possible

**Common mobile accessibility mistakes:**

- **Too-small touch targets** — Buttons or links that are hard to tap.
- **Missing labels** — Icons without text descriptions.
- **Poor focus management** — Focus gets lost or trapped.
- **Inaccessible gestures** — Complex swipe patterns that can't be performed with assistive technology.
- **No keyboard support** — App doesn't work with external keyboards.

**Resources:**

- <a href="https://developer.apple.com/documentation/accessibility" target="_blank" rel="noopener noreferrer">Apple Accessibility (developer documentation)</a>
- <a href="https://developer.android.com/guide/topics/ui/accessibility" target="_blank" rel="noopener noreferrer">Android Accessibility</a>
- <a href="https://www.w3.org/WAI/standards-guidelines/mobile/" target="_blank" rel="noopener noreferrer">W3C Mobile Accessibility</a>
- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule - Mobile Apps</a>

**See also:** [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility) | [What does the April 2027 deadline cover?](#compliance-requirements-iitaa-and-ada-title-ii-what-does-the-april-2027-deadline-cover)

**Key takeaway:** Test the workflows people actually use. If the app can't be made accessible right away, you still need to provide an **accessible alternative** for the service.

### Does our agency's password-protected intranet need to be accessible?

{updated:2026-10-26}

**See also:** [Does ADA Title II apply to internal documents?](#compliance-requirements-iitaa-and-ada-title-ii-does-ada-title-ii-apply-to-internal-documents) | [What about archived documents on the intranet?](#website-accessibility-what-about-archived-documents-on-the-intranet)

**Quick answer:** Yes — for Illinois state agencies, plan on it. The IITAA 2.1 Standards require internal content to meet WCAG 2.1 Level AA when it's official agency business delivered as "Intranet content designed as a Web page" (or another listed kind of official communication, such as training materials, forms, and policy announcements). Whether the federal ADA Title II web rule also reaches an employee-only intranet is unsettled: the rule covers web content an agency "provides or makes available," with no "to the public" limit, and DOJ didn't exempt employee-only content when commenters asked. If an employee requests an accommodation, treat that as the top priority.

**Verbatim from Illinois IITAA — why the intranet may still need to be accessible under state law:**

> "The Illinois Information Technology Accessibility Act (IITAA) requires Illinois agencies and universities to ensure that their **web sites, information systems, and information technologies** are accessible to people with disabilities." _(emphasis added)_

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

The IITAA's "information systems and information technologies" language is **broader** than the federal web rule and reaches employee-facing systems. For Illinois state agencies, an internal intranet is squarely within IITAA's scope, whatever the federal web rule's reach. **Note:** § 35.201(d) (the federal "individualized, password-protected documents" exception) is narrower than a general intranet exemption — it covers a specific individual's documents (e.g., a person's account statements), not shared internal portals.

**Full explanation:**

**What the federal rule says — and doesn't:** The ADA Title II web rule covers "web content that a public entity provides or makes available, directly or through contractual, licensing, or other arrangements" (<a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200(a)</a>). It doesn't say "to the public," and § 35.201 has no intranet exception. When commenters asked whether the rule covers "internal, non-public applications, such as web content used solely by employees," DOJ didn't say no. It said the rule covers web content "provided or made available by public entities within the scope of title II," and that complying with it "will not relieve title II entities of their distinct employment-related obligations under title I of the ADA" (<a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">89 FR 31320</a>). A login doesn't take content out of the rule either: DOJ said the password-protected documents exception "is not intended to apply to all content or functionality that a public entity offers that is password-protected." So don't count on an employee-only intranet being exempt from the federal rule. For Illinois agencies it doesn't change the to-do list: the IITAA already requires it.

**What requires it, in order of weight:**

1. **IITAA** — The <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-2-1-standards.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Standards</a> require agencies to ensure "that employees with disabilities have access to and use of information and data that is comparable to the access and use by employees who are not individuals with disabilities" (E203.1). Internal content must meet WCAG 2.1 Level AA when it's official business delivered as "Intranet content designed as a Web page," training materials, a form or template, a policy announcement, or another listed type of official communication (E205.3).
2. **ADA Title II (employment)** — Title II also bars disability discrimination in an agency's employment and applies the ADA Title I standards, including reasonable accommodation (<a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-C/section-35.140" target="_blank" rel="noopener noreferrer">28 CFR § 35.140</a>).
3. **Section 504** (context) — Agencies that receive federal funding have parallel obligations to employees with disabilities.

**Best practice:** Make your intranet accessible proactively. It supports employees with disabilities, prevents costly retrofitting, and helps you meet IITAA's requirements.

**Resources:**

- **IITAA Requirements:** <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/iitaa.html</a>
- **ADA Title I (Employment):** <a href="https://archive.ada.gov/ada_title_I.htm" target="_blank" rel="noopener noreferrer">https://archive.ada.gov/ada_title_I.htm</a>
- **ADA Title II Web Rule (scope):** <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">https://www.ada.gov/resources/2024-03-08-web-rule/</a>

### What about archived documents on the intranet?

{updated:2026-10-26}

**See also:** [Does our agency's password-protected intranet need to be accessible?](#website-accessibility-does-our-agency-s-password-protected-intranet-need-to-be-accessible) | [Does ADA Title II apply to internal documents?](#compliance-requirements-iitaa-and-ada-title-ii-does-ada-title-ii-apply-to-internal-documents) | [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible) | [Are there exceptions to the April 2027 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies)

**Quick answer:** Truly archived documents that are no longer used may not need proactive remediation, but you may still need to provide access in an alternative format if an employee with a disability needs them (typically handled through reasonable accommodation processes). Note: This section addresses **internal/intranet** documents; for public-facing archived content exceptions, see the comprehensive exceptions FAQ linked above.

**Full explanation:**

**Archived documents that are not currently used may not need proactive remediation** — but you may still need to provide an accessible alternative **when needed for an employee with a disability**, depending on the circumstances and your agency’s accommodation process.

**What counts as truly archived:** it's kept only for reference, research, or recordkeeping; it isn't edited anymore; and it's stored in a clearly labeled archive area. (This mirrors the ADA Title II rule's definition of archived web content in <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.104" target="_blank" rel="noopener noreferrer">28 CFR § 35.104</a>, which also requires the content to predate the compliance date.)

**Fix it now, even if it's old,** if people still use it for current work — for example, it's linked from active intranet pages, or it's a current policy, form, template, or training document. The IITAA 2.1 Standards require those kinds of internal content to meet WCAG 2.1 Level AA (E205.3), and IITAA has no archive exception (its only carve-out for old material is E202.2, for unaltered "Legacy ICT" that met an earlier standard).

**If an employee needs access to archived content:** Coordinate with your ADA/HR process to provide an accessible alternative promptly (for example, an accessible version of the document, or another effective format that provides equivalent access).

**References:** <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-2-1-standards.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Standards</a> (E202.2, E203.1, E205.3) | <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-C/section-35.140" target="_blank" rel="noopener noreferrer">28 CFR § 35.140</a> — employment under ADA Title II | <a href="https://archive.ada.gov/ada_title_I.htm" target="_blank" rel="noopener noreferrer">Archive.ADA.gov: Employment (Title I)</a> (context)

---

## Screen Reader Testing (voicecap)

### What is voicecap, and why did ICJIA build it?

{new:2026-10-26}

**Quick answer:** **voicecap** is a free, open-source tool from ICJIA that has a real screen reader — **NVDA** — read each page of a website (every page on its sitemap or a page list), and saves every word it says as plain-text transcripts. Automated checkers such as axe, Pa11y, Lighthouse, and SiteImprove test a page's _code_; voicecap captures what a blind visitor actually _hears_. It turns screen reader testing — normally slow, one page at a time, and undocumented — into something one person can do across a whole site, with a dated record that managers and auditors can check.

**What it is (and isn't):** voicecap isn't a screen reader itself. It runs the real NVDA screen reader for you on a Windows PC: it presses NVDA's keys the way a person would, moves from page to page through the site's sitemap or a list of pages, and writes down everything NVDA says. A person still does the listening, reading, and deciding — voicecap does the key presses, the page turning, and the record keeping. Its own documentation sums it up as "a human review, sped up."

**Why ICJIA built it:** ICJIA has more than a dozen websites to review before the April 26, 2027 ADA Title II compliance date. Automated scans can come back clean while a screen reader user still hits real barriers — and checking by hand with NVDA goes one page at a time, depends on what the tester remembers to write down, and leaves no record anyone else can check. voicecap was built to close that gap: hear every page on the list, keep every word, and turn the result into something a manager can read and an auditor can verify.

> **Full disclosure:** voicecap is ICJIA's own tool, built by the same team that maintains this FAQ. It's included here because it fills a specific gap in testing — capturing what a real screen reader says across a whole site — not because it's the only way to test. Its code is public under the MIT license, so anyone can see exactly how it works.

**What you get from a run:**

- **Transcripts** — every word NVDA said on every page, read three ways (line by line, heading by heading, and control by control), with each line tied to the key press that produced it.
- **Flags** — pointers to spots worth a closer listen, such as an unlabeled graphic or a string of "click here" links, each with its likely cause and fix.
- **axe-core results** for each page, shown beside what NVDA said.
- **A plain-language report** — one web page (plus a Word copy) that leads with a verdict a manager can read in seconds, then shows each page's screenshot and what NVDA said.
- **Recordings of NVDA's voice** (on Windows 11), which start slowed down so a person can follow them, and play beside the page's screenshot and transcripts, with the line NVDA is saying outlined as it plays.
- **A sealed, fingerprinted record** that can be checked later for any change to the files it lists.

**A real example:** On October 6, 2026, voicecap took NVDA through all 32 pages of a preview copy of the redesigned i2i.illinois.gov in just under an hour — **2,219 spoken lines**, each saved with the key press that produced it. The review found one problem, on every page: NVDA announced the site's logo as **"Unlabeled graphic."** The site has since fixed it.

**Where to find it:**

- **Source code and full documentation:** <a href="https://github.com/ICJIA/voicecap" target="_blank" rel="noopener noreferrer">github.com/ICJIA/voicecap</a>
- **The package:** <a href="https://www.npmjs.com/package/@icjia/voicecap" target="_blank" rel="noopener noreferrer">@icjia/voicecap on npm</a> — it runs with `npx @icjia/voicecap`, so voicecap itself needs no separate install (its setup command still downloads its own copy of NVDA, and Chromium if Chrome is missing)
- **ICJIA's published results:** <a href="https://voicecap.icjia.app/" target="_blank" rel="noopener noreferrer">voicecap.icjia.app</a> — current screen reader reports for five ICJIA websites as of November 6, 2026 (dvfr.illinois.gov, infonet.icjia.illinois.gov, r3.illinois.gov, sfs.icjia.illinois.gov, and a preview of the redesigned i2i site), each with every page's screenshot, what NVDA said, and recordings of NVDA's voice, plus "Can I trust this?" and "Technical details" pages

**See also:** [How is voicecap different from automated checkers like axe, Pa11y, Lighthouse, or SiteImprove?](#screen-reader-testing-voicecap-how-is-voicecap-different-from-automated-checkers-like-axe-pa11y-lighthouse-or-siteimprove) | [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility)

### How is voicecap different from automated checkers like axe, Pa11y, Lighthouse, or SiteImprove?

{new:2026-10-26}

**Quick answer:** They answer different questions, and a site needs both. Automated checkers read a page's **code** and test it against rules: _Is there alt text? Does this field have a label? Is the contrast high enough?_ voicecap has NVDA read the page **aloud** and records what it says: _What does a screen reader user actually hear — and does it make sense?_ A page can pass every automated rule and still sound confusing, and a page can sound fine and still fail a contrast rule that nobody can hear.

| | Automated checkers (axe, Pa11y, Lighthouse, SiteImprove, WAVE) | voicecap (with NVDA) |
| --- | --- | --- |
| **What they examine** | The page's code: HTML, ARIA, and styles | What NVDA says as it reads the page |
| **The question they answer** | Does the code follow the rules? | What does a screen reader user hear? |
| **What they're best at finding** | Missing alt text, missing form labels, low contrast, invalid ARIA | Alt text that's there but says nothing useful, links that all say "Read more," headings that don't say where you are, a confusing reading order |
| **What you get** | A list of failed rules, often with a score | Every word NVDA said, page by page, with flags on what needs a closer listen |
| **How fast** | Seconds per page | A minute or two per typical page — but hands-off |

**Why the sound matters — and where WCAG asks for it:** For a blind visitor, what the screen reader says _is_ the website. Several WCAG 2.1 success criteria are about whether things make sense, not just whether they exist — and most code rules can only check that something is there (a few, such as WAVE's "suspicious alternative text" and "suspicious link text" alerts, flag common bad wording, but none can judge meaning):

| What a listen-through catches | The WCAG 2.1 success criterion it relates to |
| --- | --- |
| Alt text that's there but says nothing useful ("image," "logo," a file name) | <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">SC 1.1.1 Non-text Content - Level A</a> |
| Ten links in a row that each say "Read more" | <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#link-purpose-in-context" target="_blank" rel="noopener noreferrer">SC 2.4.4 Link Purpose (In Context) - Level A</a> |
| Headings and labels that don't describe their section or purpose | <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#headings-and-labels" target="_blank" rel="noopener noreferrer">SC 2.4.6 Headings and Labels - Level AA</a> |
| A page read in a different order from the one it shows | <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#meaningful-sequence" target="_blank" rel="noopener noreferrer">SC 1.3.2 Meaningful Sequence - Level A</a> |
| Buttons and fields announced with no name ("button," "edit") | <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#name-role-value" target="_blank" rel="noopener noreferrer">SC 4.1.2 Name, Role, Value - Level A</a> |
| A long trip through the navigation before reaching the main content, with no skip link | <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#bypass-blocks" target="_blank" rel="noopener noreferrer">SC 2.4.1 Bypass Blocks - Level A</a> |

**Verbatim from WCAG 2.1, SC 1.1.1 Non-text Content (Level A):**

> "All non-text content that is presented to the user has a text alternative that **serves the equivalent purpose**, except for the situations listed below." _(emphasis added)_

— <a href="https://www.w3.org/TR/WCAG21/#non-text-content" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.1.1 (W3C)</a>

An automated checker can confirm that a text alternative exists. Only a person listening — or reading exactly what the screen reader said — can tell whether it "serves the equivalent purpose."

**voicecap runs axe too.** On each page's first load, before NVDA starts reading, voicecap runs axe-core and shows what axe found beside what NVDA said — as evidence for the person's review, never as the verdict. One thing to know: voicecap's axe check also includes WCAG 2.2 Level AA rules and axe's "best practice" rules, so some of its findings can go beyond the WCAG 2.1 Level AA legal target. See [Why does SiteImprove (or another scanner) show 98% when axe-core shows 100%?](#website-accessibility-why-does-siteimprove-or-another-scanner-show-98-when-axe-core-shows-100) for how to sort findings by rule set.

**Why NVDA?** NVDA is a free, open-source screen reader for Windows and, along with JAWS, one of the two most widely used. In <a href="https://webaim.org/projects/screenreadersurvey11/" target="_blank" rel="noopener noreferrer">WebAIM's Screen Reader User Survey #11</a> (July–August 2026, 1,780 respondents), 59.3% said they commonly use NVDA — second only to JAWS, at 69.2%. Every screen reader gets a page from the same place — what the browser makes of the page's code — so a button with no name has no name in JAWS either, and a link that only says "click here" says it in every screen reader. And because NVDA is free, anyone — an auditor, a vendor, a developer — can repeat a run without buying a license.

**The practical split:** Run automated checkers early and often; they're fast and catch a whole class of code mistakes. Use voicecap on the deployed site to hear what those checks can't. Then cover the rest — contrast, zoom, captions — with the manual checks in [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility)

**References:**

- <a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer">W3C WAI: Evaluating Web Accessibility Overview</a> — "no tool alone can determine if a site meets accessibility standards"
- <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">WCAG 2.1 (W3C Recommendation)</a> — the standard cited by both ADA Title II and the IITAA
- <a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer">NV Access: NVDA</a> — the free screen reader voicecap drives
- <a href="https://webaim.org/projects/screenreadersurvey11/" target="_blank" rel="noopener noreferrer">WebAIM: Screen Reader User Survey #11 results</a> — which screen readers people actually use (published September 2026)
- <a href="https://github.com/dequelabs/axe-core" target="_blank" rel="noopener noreferrer">axe-core (Deque)</a> — the open-source checker voicecap runs on each page

### How does voicecap work, step by step?

{new:2026-10-26}

**Quick answer:** You give voicecap a website and a list of pages — its sitemap, a spreadsheet of chosen pages, or a single page. For each page it opens a fresh Chrome browser and has NVDA go through the page three ways — line by line, heading by heading, and control by control — saving every word NVDA says. Then a person reads the transcripts, records what they found, and shares a report.

**The six steps:**

1. **Every page on the list.** voicecap works from the site's sitemap, a CSV or JSON list of chosen pages, or one page at a time. Each page is read once, in full — or recorded with the reason it couldn't be. None is missed or done twice, an easy slip when clicking through a site by hand. (Linked PDFs and other non-HTML files are skipped; for documents, see [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility))
2. **The real screen reader.** voicecap runs NVDA itself — never a simulation — with a fresh browser and an empty profile for every page, so no page's results depend on the pages before it: no "visited" links, cookies, or saved state.
3. **Three passes through each page:**
   - **Read (Down Arrow)** — line by line, top to bottom, the way a screen reader user reads a page.
   - **Headings (H)** — heading by heading, the way many screen reader users skim a page.
   - **Tab (Tab)** — control by control: every link, button, and field a keyboard user can reach.
4. **Every word, checked.** After each key press, voicecap waits until NVDA has been quiet for a full second, so nothing is cut off. Before and after every key press, it checks that its browser still has the screen. If another window got in the way, it throws the step out and tries the page again, with NVDA and the browser started fresh.
5. **A person reviews.** NVDA speaks very fast during a run, so the transcripts are where its words get read. The person running voicecap reads them, records what they found and fixed (`voicecap review`), and can have any page's saved words read aloud at a normal speaking pace (`voicecap review --replay`). Flags point to the moments worth a closer listen.
6. **A sealed record.** Every file the run records gets a SHA-256 fingerprint and every finished run is sealed, so `voicecap verify` can later show whether any of those files has changed. (Keep the record in a Git repository with a protected branch, too: Git history is what shows a record that was deleted, or edited and sealed again.)

**What a transcript sounds like:** here are the first lines NVDA said on the home page of the redesigned i2i site on October 6, before the logo was fixed, in each pass:

| Pass (key) | First lines NVDA said |
| --- | --- |
| **Read** (Down Arrow) | "same page, link, Skip to navigation" → "banner landmark, same page, link, current page, Unlabeled graphic, i 2i Logo. To get missing image descriptions, open the context menu." |
| **Headings** (H) | "main landmark, INSTITUTE to INNOVATE, heading, level 1" → "Directory, heading, level 2" |
| **Tab** (Tab) | "Skip to main content, same page, link" → "Skip to navigation, same page, link" |

That "Unlabeled graphic" was the one problem the review found on the site: its logo, on all 32 pages.

**What else each run keeps:** a screenshot of each page as it loaded; axe-core's results for each page; NVDA's own log (from voicecap 0.17.0), which the shareable report checks against the transcripts, line by line; on Windows 11, a recording of NVDA's voice for each page; and an event log of everything that happened during the run.

**What you share:** a single, self-contained report page that opens in any browser, even offline. It leads with **"At a glance"** — a plain-language verdict such as "Nothing needs attention" or "1 problem needs attention, on 32 pages," how many pages NVDA read, and how long it took. Next comes **what needs attention**, with NVDA's exact words, the likely cause, and the fix; then **every page**, with its screenshot and what NVDA said first; and last, **the details** for reviewers and auditors. Alongside it come a **Word copy** for the files, a **voice page** that plays NVDA's recordings slowed to 0.3× from the first press of play (with full speed, 0.75×, and 0.5× a click away), beside each page's screenshot and transcripts, and outlines the line NVDA is saying as it plays, and **Markdown and JSON copies** for AI tools.

**See also:** [How much time does voicecap save?](#screen-reader-testing-voicecap-how-much-time-does-voicecap-save) | [How accurate is voicecap, and how can a manager or auditor check its results?](#screen-reader-testing-voicecap-how-accurate-is-voicecap-and-how-can-a-manager-or-auditor-check-its-results)

### How much time does voicecap save?

{new:2026-10-26}

**Quick answer:** A lot of _people_ time. The run itself still takes real time — NVDA has to say every line, and voicecap waits a full second after each key press so nothing is cut off — but nobody has to sit at the keyboard pressing keys and typing what NVDA said. Re-checking after a fix is one command instead of another full session, and the report writes itself.

**Run times** (Windows 11, NVDA 2026.2, Chrome 153, from voicecap's documentation — the 1.3 seconds a key press and the sampled i2i pages were measured; the rest is worked out from them, at about 1.3 seconds a key press plus 17 seconds a page):

| Kind of page | Per key press | Per page (all three passes) | 100 pages, unattended |
| --- | --- | --- | --- |
| Typical page (sampled i2i pages: 46–68 key presses) | about 1.3 seconds | 78–106 seconds (92 on average) | about 2½ hours |
| Long page (about 250 key presses) | about 1.3 seconds | about 6 minutes | about 9½ hours |

For a real site: the redesigned i2i site — 32 pages, 2,219 spoken lines — took just under an hour. (These times were measured before voicecap added its axe check and its recordings of NVDA's voice, which add little to a page of ordinary size.)

**The same work by hand:** A careful tester would press each of those 2,219 keys, listen, and type what NVDA said. Even at a brisk 15 seconds a line, that's more than nine hours of focused work for one site — and the same again after each round of fixes. (That figure is an illustration, not a measurement; real hand-testing tends to be slower, and its notes less complete.)

**Where the time goes back to people:**

| Task | NVDA by hand | NVDA with voicecap |
| --- | --- | --- |
| Pressing the keys | A person presses every key on every page, three ways | voicecap presses them and turns the pages; the person can do other work |
| Writing down what NVDA said | Spoken once, then gone — unless someone types it | Every word saved automatically, with the key press that produced it |
| Knowing which pages were checked | The ones the tester got to | Every page on the list: read in full, or recorded with the reason it wasn't |
| Spotting problems | Whatever the tester catches at NVDA's speed | Flags on what's worth a closer listen, each with a likely cause and fix, plus axe's results for the same page |
| Re-testing after a fix | Another full session, done a little differently each time | Re-run just the fixed pages and compare line by line with the run before |
| Reporting to a manager | Notes, written up separately | A plain-language report, a Word copy, and recordings — generated automatically |

**Plan for the computer's time, though:** during a run the PC belongs to voicecap — NVDA and Chrome need the screen and keyboard. Long runs can go over a lunch hour or overnight, and a run that's interrupted (a reboot, a Windows update) picks up where it stopped when you run the same command again. voicecap keeps Windows awake during a run, but it can't override a screen lock: if your agency PC locks itself after a few idle minutes, talk to IT before planning a long unattended run.

### How accurate is voicecap, and how can a manager or auditor check its results?

{new:2026-10-26}

**Quick answer:** Every line of a voicecap transcript is NVDA's own words, captured as text straight from NVDA — not simulated, and not guessed from a recording. voicecap guards against the usual ways a listen-through goes wrong (cut-off speech, another window stealing the screen, leftovers from the page before), cross-checks its transcripts against NVDA's own log, and fingerprints every file it records, so anyone can later check whether a recorded file has changed.

**How voicecap keeps transcripts accurate:**

| What can go wrong in screen reader testing | What voicecap does about it |
| --- | --- |
| A simulated screen reader says something the real one wouldn't | It runs the real NVDA. Nothing is simulated or rewritten. |
| Speech gets cut off | It waits for a full second of silence after every key press before moving on. |
| Another window (a pop-up, Teams, Windows Update) takes the screen, and its words end up in the transcript | It checks that its browser has the screen before and after every key press. If not, it throws the step out and tries the page again — up to five tries — and the record says so. |
| One page's state carries over to the next (visited links, cookies, open menus) | Every page, and every pass, loads in a fresh browser with an empty profile. |
| A page gets skipped or done twice | Every page on the list is accounted for: read in full, or recorded with the reason it couldn't be. |
| The transcript and what NVDA actually did disagree | NVDA's own log is kept with each run (from voicecap 0.17.0), and the shareable report checks it against the transcripts, line by line — how many lines agree, any that differ, and any steps it couldn't check, with the reason. On Windows 11, each page's recording lets anyone hear NVDA say it. |

**How someone else can check the results — without taking anyone's word for it:**

- **Fingerprints and seals.** Each transcript, screenshot, axe result, and recording gets a SHA-256 fingerprint; each finished run is sealed; and each review decision is chained to the one before it. `voicecap verify` checks every seal, the review chain, and every recorded file, and names any file that's missing or has changed. What it can't catch on its own — a record edited and sealed again, or a whole run deleted — shows in Git history, when the record is kept in a repository whose main branch is protected.
- **The report checks itself — and you can check the report.** The shareable report's "Check the fingerprints" button checks, in the browser and with no network connection, that its transcripts, screenshots, and axe results match their sealed records. The voice page has the same button, for its recordings, transcripts, and screenshots. That shows the page agrees with itself, not that nobody changed it — so also check the file: `Get-FileHash` in PowerShell, or `shasum -a 256` on a Mac, gives its fingerprint, to compare with the one the sender gave you (`voicecap share` prints it) or the one listed on the results website.
- **Anyone can repeat the run.** Each report offers a "walkthrough file" — the run's recipe. Anyone with a Windows PC set up for voicecap can repeat the same pages, passes, and order with NVDA, and voicecap says page by page whether each one "sounds the same" as the original or "sounds different." A changed site, a newer NVDA or Chrome, or timing can change the words, so "sounds different" means "look here," not "the record was wrong."
- **voicecap tests itself.** About 7,900 automated tests run on every change, on Windows, macOS, and Linux, and, per its documentation, changes to the part that drives NVDA are checked with real NVDA before they're released.

**The honest limits on accuracy:**

- **One consistent setup — not everyone's.** voicecap runs the same portable copy of NVDA every time, with fixed settings, at top speed, in Chrome. That consistency is what makes runs comparable and repeatable, but real users' screen readers, settings, and browsers vary.
- **Timing.** Driving a screen reader is timing-sensitive; a slow page or a busy PC can produce slightly different output between runs. The one-second wait absorbs most of this, but compare runs with care.
- **Notifications.** A notification that NVDA reads aloud during a step ends up in that step's transcript, so turn on Do Not Disturb before a run.
- **English wording.** voicecap's flags and its end-of-page detection match NVDA's English phrasing.
- **Small gaps in the window check.** A window that pops up in the instant before a key press can get that one key press (the step is still thrown out), and one that comes and goes while focus is inside an embedded frame (a video, map, or form) can slip past the check. Do Not Disturb and keeping hands off the computer make this rare.

**References:**

- <a href="https://voicecap.icjia.app/trust" target="_blank" rel="noopener noreferrer">voicecap: "Can I trust this?"</a> — how every claim about the records can be checked
- <a href="https://voicecap.icjia.app/technical-details" target="_blank" rel="noopener noreferrer">voicecap: Technical details</a> — the full technical reference, for auditors and developers

### What doesn't voicecap do? Does a clean voicecap report mean our site is compliant?

{new:2026-10-26}

**Quick answer:** No — a clean voicecap report, with every page reviewed by a person, is strong, documented evidence about one important part of accessibility: how your pages read with a real screen reader. It isn't a compliance certificate. WCAG 2.1 Level AA — the standard under both the ADA Title II web rule and the IITAA — covers much more than what a screen reader says, and conformance has to be judged by a person across whole pages and complete processes.

**What voicecap doesn't do:**

- **It doesn't decide.** Its flags point to places worth a closer listen; they never pass or fail a page. A person reads the transcripts and makes the call.
- **It uses one screen reader and one browser.** NVDA with Chrome, on Windows. It doesn't test JAWS — the primary screen reader for 72.5% of North American respondents in WebAIM's 2026 survey — or VoiceOver, TalkBack, or mobile apps, and it reads each page in one desktop-sized window (1280 × 960), so it doesn't hear a site's phone-sized layout. (On a Mac, voicecap can set up and check VoiceOver, but its audits run on Windows.)
- **It can't hear what isn't spoken.** Color contrast, zoom and reflow, visible focus, captions, and audio description don't show up in a transcript. Use axe, WAVE, a contrast checker, and the manual checks in [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility)
- **It reads web pages, not documents.** PDFs, Word files, and other non-HTML links are skipped. Check documents with ICJIA's file checker at <a href="https://audit.icjia.app" target="_blank" rel="noopener noreferrer">audit.icjia.app</a>.
- **It reads what an anonymous visitor gets.** Each page opens in a fresh, empty browser profile, so pages behind a sign-in need hands-on testing. (On an intranet that signs people in with their Windows account, Windows may sign voicecap's browser in by itself.)
- **Its axe check sees each page as it first loads.** It checks the page's main frame once, before anything is clicked or scrolled — not the inside of embedded iframes, and not content that appears later.
- **It isn't a substitute for people.** Feedback from screen reader users and other people with disabilities is still the best test there is.

**Why a clean report isn't a conformance claim:** WCAG defines conformance as meeting every Level A and AA success criterion for the full page — and for every page in a multi-step process:

> "Conformance (and conformance level) is for full web page(s) only, and cannot be achieved if part of a web page is excluded."

— <a href="https://www.w3.org/TR/WCAG21/#conformance" target="_blank" rel="noopener noreferrer">WCAG 2.1, Conformance Requirement 2 (W3C)</a>

W3C is also direct about tools: "no tool alone can determine if a site meets accessibility standards" (<a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer">W3C WAI: Evaluating Web Accessibility Overview</a>). voicecap is built around that principle — it speeds up the human review instead of replacing it.

**What a clean report _does_ tell you:** NVDA read every page on the list to its end; none of voicecap's flags is still open (none was raised, or a reviewer checked it and recorded it as not an issue); no recorded issue is still unfixed; and the record shows exactly what NVDA said, and when. On its own, a clean verdict doesn't show that a person read every transcript — a page with no flags counts as clean without a review. The report's details show that part ("Transcripts reviewed"), so record a decision for every page with `voicecap review` (or `voicecap review --replay --all`) before you file the report. A clean report with every page reviewed is solid evidence of systematic, good-faith testing — to keep alongside your other test results, your remediation log, and your sign-off process.

**See also:** [How can I track and demonstrate "good-faith progress" toward compliance?](#getting-started-how-can-i-track-and-demonstrate-good-faith-progress-toward-compliance) | [Who signs off that we're compliant? Can we "certify" WCAG 2.1 Level AA compliance?](#getting-started-who-signs-off-that-we-re-compliant-can-we-certify-wcag-2-1-level-aa-compliance) | [Do we need an independent (external) accessibility audit to prove compliance? When is it worth it?](#website-accessibility-do-we-need-an-independent-external-accessibility-audit-to-prove-compliance-when-is-it-worth-it)

**References:**

- <a href="https://www.w3.org/TR/WCAG21/#conformance" target="_blank" rel="noopener noreferrer">WCAG 2.1, Section 5 (Conformance)</a> — conformance is for full pages and complete processes
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">ADA Title II — 28 CFR § 35.200 (eCFR)</a> — requires WCAG 2.1 Level AA
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — IITAA 2.1 Standards require WCAG 2.1 Level AA

### What do I need to run voicecap, and how do I get started?

{new:2026-10-26}

**Quick answer:** A Windows PC (Windows 11 recommended), Node.js 22.19 or later, and Google Chrome (if Chrome is missing, setup installs a copy of Chromium instead). You don't need to install NVDA yourself, or have administrator rights for voicecap: one setup command downloads voicecap's own portable copy of NVDA. A guided command then asks a few questions and starts your first run.

**What you need:**

| Item | Notes |
| --- | --- |
| **A Windows PC** | Windows 11 recommended. Recording NVDA's voice needs Windows 11 (or Windows Server 2022) and a PC whose security policy lets PowerShell compile a small helper (a policy such as AppLocker or WDAC can block it); without either, runs work without the recordings. Audits don't run on a Mac or on Linux, though reviewing, reporting, and checking records work on any computer. |
| **Node.js 22.19 or later** (24 recommended) | Node's installer usually needs administrator rights once. On a managed agency PC, ask IT to install it. |
| **Google Chrome** | If Chrome isn't installed, voicecap's setup installs a copy of Chromium for it to use. |
| **PowerShell, in Windows Terminal** | Recommended over Git Bash, which rewrites any argument that starts with "/". If PowerShell says "running scripts is disabled," type `npx.cmd` in place of `npx`, or see the one-time fix in voicecap's README. |
| **NVDA** | Installed by voicecap's setup: a separate, portable copy (about 100 MB) that doesn't touch any NVDA you already have. If your own NVDA is running, voicecap turns it off during a run and back on afterward, with your settings. |

**Getting started — five commands, in PowerShell:**

```
npx @icjia/voicecap preflight
npx @icjia/voicecap setup
npx @icjia/voicecap doctor
npx @icjia/voicecap demo
npx @icjia/voicecap init
```

1. **`preflight`** checks the computer — without starting NVDA — and ends with "Ready," or a numbered list of exactly what to fix.
2. **`setup`** installs what's missing: voicecap's own copy of NVDA, and Chromium if Chrome isn't there. No administrator rights needed.
3. **`doctor`** checks everything again and runs a 20-second live test with NVDA.
4. **`demo`** (optional) is a guided first run, about 9 minutes long, against a small demo site that comes with voicecap — a good way to see transcripts and a report before pointing voicecap at your own site.
5. **`init`** asks for your website, where its pages are (sitemap, page list, or one page), how many pages to read, where to keep the transcripts, and your name — then prints the exact command for your run and offers to start it.

`npx` downloads voicecap the first time and reuses it after that, so voicecap itself needs no separate install. (`npx @icjia/voicecap@latest` picks up a newer version.)

**Before a run:**

- **Hands off.** NVDA takes over the keyboard until the run ends. Don't use the computer during a run; a click elsewhere costs that page an attempt (voicecap tries it again).
- **Keep it unlocked.** voicecap keeps Windows awake, but it can't override a screen lock. If your PC locks itself after a few idle minutes, talk to IT before planning a long run.
- **Turn on Do Not Disturb** (or quit Outlook and Teams), so notifications aren't read into the transcripts.
- **Close windows that show private information.** NVDA reads aloud any window that comes to the front.
- **When Windows asks whether NVDA may communicate on networks, click Cancel** and leave the boxes unticked. voicecap talks to NVDA on the computer's own address, so it doesn't need network access, and allowing it would let other computers on the network reach NVDA's control port — whose password is public — and press keys on your PC. If someone already clicked Allow, IT can close the port (voicecap's README explains how, under "NVDA's control port").

**Security and privacy, briefly:** voicecap runs entirely on your PC — no server, no account, no outside service. Transcripts stay in a folder you control and go only where you send them. A few cautions: `doctor`'s report names your computer and your Windows account, so read it before you post it anywhere public; keep the transcripts folder out of OneDrive and Dropbox; and anything you publish to a results website is public. voicecap's README has a full security section.

**References:**

- <a href="https://github.com/ICJIA/voicecap" target="_blank" rel="noopener noreferrer">voicecap on GitHub</a> — the README covers setup for someone new to Windows, every command and option, and security
- <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> — download version 24, which voicecap recommends (its tests run on Node 22 and 24)

### When should we run voicecap, and what do we do with the results?

{new:2026-10-26}

**Quick answer:** Run voicecap on the **deployed** site — a staging copy just before launch, and the live site again after any major update — not on every development build. Read what needs attention, fix it, re-run the fixed pages and compare, record what you decided, and share the dated report.

**When to run it:**

- **Before launch:** run the full listen-through on the site as it will go live, such as a staging copy of the production site. Fix what you find, then run the pages you fixed again.
- **After a major update** (a redesign, a new template, a CMS upgrade): run the same pages again and compare with the run before, to see exactly what changed in what NVDA says.
- **Not on every build.** Builds change daily, and a development copy isn't what users get. Screen reader users hear the deployed site, with its real content — so that's the one to listen to.

**A typical cycle:**

1. **Choose the pages.** For a small site, use the whole sitemap. For a big one, start with a sample: `voicecap list-urls` with `--sample` drafts a page list with a few pages from each part of the site, which you can trim in Excel.
2. **Run it.** `voicecap init` prints the command; a run looks like this:

   ```
   npx @icjia/voicecap --site https://www.example.org --sitemap sitemap.xml --limit 25
   ```

3. **Start with "What needs attention"** in the report, then read the transcripts behind it. Each problem comes with NVDA's exact words, the likely cause, and a suggested fix.
4. **Fix, then re-check just what you fixed.** Re-run those pages (`--page`) and compare them with the earlier run by its id, such as `--compare 2026-09-26_1405` (the report shows each run's id). (`--compare previous` finds only an earlier run made from the same page source — the same sitemap, page list, or `--page` addresses — so it suits a full re-run of the same list.) The report marks the pages that changed and links to line-by-line differences — and warns you if the NVDA, browser, or voicecap versions changed between runs, since tooling can change what's said, too.
5. **Record your decisions.** `voicecap review` records a page as reviewed with no issues, as having an issue, or as fixed, with a note. `voicecap review --replay` reads saved transcripts aloud at a normal speaking pace — by default, the pages that still need attention — and records a decision with one key press per page. Each decision is saved with your name, the date, and the fingerprints of the transcripts you reviewed.
6. **Share it.** `voicecap share` makes the dated copies to send: the report page, its Word copy, the voice page, and the Markdown and JSON versions. Before you send, remember that a report is easy to forward — share only what you'd be comfortable putting on a public page.
7. **Keep the record.** Keep voicecap's transcripts folder in a private Git repository, pushed often to a branch protected against force-pushes and deletion. `voicecap verify` then shows whether any recorded file has changed, and the Git history shows anything deleted or sealed again.

**See also:** [What doesn't voicecap do? Does a clean voicecap report mean our site is compliant?](#screen-reader-testing-voicecap-what-doesn-t-voicecap-do-does-a-clean-voicecap-report-mean-our-site-is-compliant) | [How do I make forms accessible?](#website-accessibility-how-do-i-make-forms-accessible) | [After April 26, 2027, how do we maintain compliance (so we don't fall out of compliance again)?](#state-agency-applicability-after-april-26-2027-how-do-we-maintain-compliance-so-we-don-t-fall-out-of-compliance-again)

## Content Accessibility (Documents, PDFs, Presentations)

### My documents look fine — why do they need to be "accessible"?

{updated:2026-10-26}

**Quick answer:** "Looking fine" means you can see the content visually. "Accessible" means people using screen readers, keyboard navigation, or other assistive technologies can also use the content — and that requires specific structure that's invisible to you but essential for them.

**Full explanation:**

When you create a document, you see formatted text, images, and layout. But someone using a screen reader experiences the document very differently — they hear it read aloud, navigate by headings, and rely on text descriptions of images. If those structural elements aren't there, the document is unusable for them.

**What "accessible" actually means (it's more than alt text):**

| What you see                               | What accessibility requires                                                 |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| Bold, large text that looks like a heading | Proper heading styles (Heading 1, Heading 2) so screen readers can navigate |
| A nice-looking table                       | Header rows defined so screen readers announce column names                 |
| An image or chart                          | Alt text describing what's in the image                                     |
| A clickable link                           | Descriptive link text (not "click here")                                    |
| A form to fill out                         | Properly labeled form fields                                                |
| Good-looking colors                        | Sufficient contrast (4.5:1 ratio for text)                                  |

**Why this matters:**

- **Screen readers can't "see"** — they read the document's underlying structure, not its visual appearance.
- **Keyboard users can't click** — they navigate using Tab and arrow keys, which require proper structure.
- **Users with low vision may zoom 200%+** — the document should reflow properly.
- **Users with cognitive disabilities** — benefit from clear headings, simple language, and logical organization.

**Additional benefit:** Making documents accessible typically makes them better organized and easier to use for all users.

**Quick test:** Run the built-in Accessibility Checker (Review > Check Accessibility in Word, PowerPoint, and Excel). In Word, also open the Navigation Pane (View > Navigation Pane): if your section headings don't show up there, screen reader users can't jump between them either. For PDFs, try ICJIA's free checker at <a href="https://audit.icjia.app" target="_blank" rel="noopener noreferrer">audit.icjia.app</a>.

**Learn more:** See the specific questions below for Word, PDF, Excel, and PowerPoint accessibility.

### What about photos your agency takes at events — like speeches or awards ceremonies? Do those need to be accessible?

**Yes, if you're sharing them digitally.** Any photos published on your agency's website, social media, or in digital documents need alt text (alternative text) that describes the image for people who can't see it.

**What is alt text?**

Alt text is a brief written description of an image that screen readers read aloud to users who are blind or have low vision. It's also displayed if an image fails to load.

**How to write good alt text for event photos:**

- **Be specific and concise** — Describe what's actually happening in the photo.
- **Include relevant names** — If someone is being recognized, name them.
- **Describe the context** — What event is this? What's the setting?
- **Keep it brief** — Usually 1-2 sentences is sufficient.

**Examples:**

| Photo Type     | Poor Alt Text             | Good Alt Text                                                                                                     |
| -------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Award ceremony | "Photo" or "IMG_4523.jpg" | "Director Jane Smith presents the 2025 Excellence Award to Officer John Doe at the annual agency awards ceremony" |
| Speech         | "Person speaking"         | "Agency director addresses attendees at the 2025 victim services conference"                                      |
| Group photo    | "Group of people"         | "Agency research team staff at the December 2025 all-hands meeting"                                               |
| Event venue    | "Conference room"         | "Attendees networking during a break at the Illinois Criminal Justice Summit"                                     |

**Where to add alt text:**

- **Website/CMS** — Look for the "alt text" or "image description" field when uploading.
- **Word documents** — Right-click image > View Alt Text (labeled "Edit Alt Text" in older Office versions).
- **PowerPoint** — Right-click image > View Alt Text (labeled "Edit Alt Text" in older versions).
- **Social media** — Each platform has an alt text option (see Social Media Accessibility section).
- **Email** — Outlook and Gmail both support alt text for images.

**WCAG Reference:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> — All non-text content must have a text alternative

**See also:** [How long should alt text be?](#content-accessibility-documents-pdfs-presentations-how-long-should-alt-text-be) | [How do I handle complex images like charts, graphs, or infographics?](#content-accessibility-documents-pdfs-presentations-how-do-i-handle-complex-images-like-charts-graphs-or-infographics) | [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start)

### How long should alt text be?

{updated:2026-11-06}

**Best practice: Keep alt text short — usually a few words to one sentence, and rarely more than a sentence or two.** The commonly cited "125 character limit" isn't a technical requirement (modern screen readers handle longer text just fine), but brevity helps users process information quickly.

- **Ideal:** Concise and scannable — often one short sentence.
- **Acceptable:** Longer alt text when the image requires detailed description.
- **Too short:** Single words like "photo" or "image" don't help anyone.
- **Consider alternatives:** If you need extensive description (charts, infographics, diagrams), use a visible caption, long description, or linked text instead of cramming everything into alt text.

**The key principle:** Alt text should be **concise but complete**. Describe what's meaningful about the image in as few words as necessary — but don't sacrifice clarity just to hit an arbitrary character limit.

**Key takeaway:** If you took the photo because it captures something meaningful, that meaning needs to be conveyed in alt text for people who can't see it. Keep it concise when possible, but don't truncate important information just to stay under 125 characters — modern screen readers can handle more.

**References:**

- <a href="https://webaim.org/techniques/alttext/" target="_blank" rel="noopener noreferrer">WebAIM: Alternative Text</a> — Best practices for writing alt text
- <a href="https://www.w3.org/WAI/tutorials/images/" target="_blank" rel="noopener noreferrer">W3C: Images Tutorial</a> — Official guidance on alt text for different image types, including complex images
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content</a> — WCAG requirement for text alternatives

**See also:** [What about photos your agency takes at events — like speeches or awards ceremonies? Do those need to be accessible?](#content-accessibility-documents-pdfs-presentations-what-about-photos-your-agency-takes-at-events-like-speeches-or-awards-ceremonies-do-those-need-to-b) | [How do I handle complex images like charts, graphs, or infographics?](#content-accessibility-documents-pdfs-presentations-how-do-i-handle-complex-images-like-charts-graphs-or-infographics) | [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start)

### How do I handle complex images like charts, graphs, or infographics?

Some images — like charts, graphs, infographics, or images containing lots of text — need more than a brief alt text. Here's how to handle them:

**For charts and graphs with data:**

1. **Alt text:** Provide a brief summary of what the chart shows (e.g., "Bar chart showing Illinois crime rates declining 15% from 2020 to 2024")
2. **Data table:** Include the underlying data in an accessible table format, either directly below the chart or linked nearby
3. **Long description:** If the trends or patterns matter, describe them in the body text

**Example for a chart:**

- **Alt text:** "Line graph showing agency grant funding from 2020-2025. Full data in table below."
- **Below the image:** An accessible HTML table with the actual numbers.

**For infographics or images with lots of text:**

1. **Don't use images of text** — If possible, present the information as actual text on the page instead of as an image
2. **If you must use an image:** Provide the full text content in one of these ways:
   - A "long description" link that opens the full text
   - An expandable section below the image with the complete text
   - A text summary in the body of the page

**For scanned documents or PDF images:**

1. **Best approach:** Use OCR (Optical Character Recognition) to convert the image to actual text
2. **If OCR isn't possible:** Provide a text transcript of the document content
3. **Alt text:** Describe what the document is (e.g., "Scanned letter from Governor dated June 2025. Full transcript below.")

**General rule for complex images:**

- **Alt text:** Brief summary + tell users where to find more detail.
- **Long description:** Provide full information in accessible text format nearby or linked.

**Example patterns:**

| Image Type       | Alt Text Approach                                     | Additional Requirement    |
| ---------------- | ----------------------------------------------------- | ------------------------- |
| Data chart       | "Chart showing [brief conclusion]. Data table below." | Accessible data table     |
| Infographic      | "Infographic about [topic]. Full text follows."       | Complete text version     |
| Scanned document | "[Document type] from [source]. Transcript provided." | Text transcript           |
| Complex diagram  | "Diagram of [subject]. Described in detail below."    | Detailed text description |

**WCAG Reference:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content</a> — Complex images need text alternatives that serve equivalent purpose
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#images-of-text" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.5 Images of Text - Level AA</a> — Avoid images of text; use actual text when possible

### How do I make images accessible on social media, Constant Contact, or Canva?

{updated:2026-10-26}

Sharing infographics, charts, or images with text on platforms like social media, Constant Contact, or Canva presents unique challenges because you often can't add data tables or long descriptions directly.

**Social media (Facebook, X/Twitter, Instagram, LinkedIn):**

- **Alt text limits vary** — Most platforms allow 100-1000 characters for alt text, but keep it concise.
- **Use the post text** — Put key information in the post caption itself, not just the image.
- **Link to more** — If sharing a complex infographic, link to a webpage with the full accessible version.
- **Don't rely on the image alone** — If the image contains important text or data, repeat it in your post.

**Example social media approach:**

- **Image:** Infographic showing "5 Steps to Accessible Documents"
- **Alt text:** "Infographic listing 5 steps to create accessible documents. Steps listed in post."
- **Post text:** "Here are 5 steps to accessible documents: 1) Use heading styles, 2) Add alt text to images, 3) Use meaningful link text, 4) Check color contrast, 5) Run accessibility checker. Full guide: [link]"

**Constant Contact and email marketing:**

- **Alt text field:** Constant Contact has an alt text field for images — use it.
- **Character limit:** Keep alt text brief since email clients vary in support.
- **Avoid image-only emails** — Don't put critical information only in images; many users have images disabled by default.
- **Provide text version** — Key messages should appear as actual text in the email, not just in graphics.

**Example email approach:**

- **Image:** Event announcement graphic with date, time, location
- **Alt text:** "Agency training event - details in text below"
- **Email body:** Include all event details as actual text below the image

**Canva:**

- **Canva supports alt text, but not in every download** — Alt text carries into PDF, PowerPoint (PPTX), and HTML downloads, share links, and Presentation mode. It doesn't carry into image or video downloads like PNG or MP4, and posts you schedule to social media from Canva go out without it. When you post a Canva graphic, add the alt text again on the platform
- **Better approach:** Export important text content separately, not just as an image
- **For presentations:** Use Canva's presentation mode which supports alt text, or export to PowerPoint and add alt text there
- **For print vs. digital:** If creating something for digital distribution, consider whether it needs to be an image at all

**General rule for social/email:**

If you're sharing a complex image on social media or email, ask yourself: "If someone can't see this image, can they still get the information?" If not, you need to provide the content as text — either in the post/email body or linked to an accessible page.

**References:**

- <a href="https://www.section508.gov/create/social-media/" target="_blank" rel="noopener noreferrer">Section508.gov: Social Media Accessibility</a> — Federal guidance on accessible social media
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content</a> — WCAG requirement for text alternatives

### Who should write the alt text for photos?

**Ideally, the person supplying the photo should also supply the alt text.** They know what's happening in the image, who's pictured, and why it matters. If you're submitting photos for the website, a newsletter, or social media, include alt text with your submission.

- **You were there** — You know the context, the names, and what made the moment significant
- **You chose the photo** — You selected it for a reason; that reason should be in the alt text
- **It saves time** — The web team or communications staff shouldn't have to guess who's in the photo or what event it's from

**Best practice:** When submitting photos, include a simple list: "Photo 1: [alt text], Photo 2: [alt text]" etc.

**References:**

- <a href="https://webaim.org/techniques/alttext/" target="_blank" rel="noopener noreferrer">WebAIM: Alternative Text</a> — Best practices for writing alt text
- <a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html" target="_blank" rel="noopener noreferrer">Understanding SC 1.1.1: Non-text Content</a> — WCAG guidance on text alternatives

### Are captions the same as alt text?

{updated:2026-10-26}

**No — captions and alt text serve different purposes and both may be needed.**

|                 | Caption                                              | Alt Text                                                            |
| --------------- | ---------------------------------------------------- | ------------------------------------------------------------------- |
| **Visibility**  | Visible to everyone on the page                      | Hidden; only read by screen readers or shown if image fails to load |
| **Purpose**     | Provides context, credits, or additional information | Describes the image for people who can't see it                     |
| **Who sees it** | All users                                            | Users with screen readers, or when images don't load                |
| **Required?**   | Optional but often helpful                           | Required for accessibility                                          |

**Example of both working together:**

- **Alt text:** "Director Jane Smith presents the 2025 Excellence Award to Officer John Doe"
- **Caption:** "Officer John Doe receives the 2025 Excellence Award for his work on community violence intervention programs. Photo: Agency"

The alt text describes what's visually happening. The caption adds context that all readers benefit from (what the award was for, photo credit).

**When you might skip detailed alt text:**

- **Purely decorative images** — If a photo adds no meaningful information (like a decorative border), mark it as decorative. But event photos are almost never purely decorative.
- **Caption already describes it** — If a visible caption already describes what the photo shows, don't repeat it in the alt text. Keep the alt text short and add only what the caption leaves out. If the caption truly covers everything in the photo, the alt text can be left empty (in Word or PowerPoint, mark the image as decorative) so screen readers don't read the same thing twice. Event photos rarely get there — the caption usually explains the event, not what's in the picture.

**References:**

- <a href="https://webaim.org/techniques/alttext/" target="_blank" rel="noopener noreferrer">WebAIM: Alternative Text</a> — Explains the difference between alt text and captions
- <a href="https://www.w3.org/WAI/tutorials/images/decision-tree/" target="_blank" rel="noopener noreferrer">W3C: Alt Decision Tree</a> — Helps determine what kind of text alternative is needed

### Do all documents need to be accessible?

{updated:2026-11-06}

**Quick answer:** For public-facing documents, yes — with limited exceptions. Under both IITAA and ADA Title II, conventional electronic documents must be accessible. By April 26, 2027, **public-facing** documents must meet WCAG 2.1 Level AA under the ADA Title II web rule unless a narrow exception applies — and documents first posted after that date can't use the preexisting-document exception. (An older document posted later can still fit the archived-content exception, but only if it was created before the deadline, is kept only for reference, research, or recordkeeping, isn't changed after it's archived, and is stored in a clearly labeled archive.) **Internal** documents and intranet content are covered by the IITAA when they're official agency communication (IITAA 2.1 Standards, E205.3), and by employment and accommodation duties.

**See also:** [Are there exceptions to the April 2027 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies) for comprehensive details on all five exceptions, their strict criteria, and practical examples. | [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility)

**What documents need to be accessible:**

- PDFs
- Word documents
- Excel spreadsheets
- PowerPoint presentations

**For new public-facing documents (posted after April 26, 2027):**

- **Yes** — New public-facing documents should be created accessibly by default.
- Make accessibility part of your document creation workflow
- This includes documents created internally or received from external sources

**For existing documents (available on your site before April 26, 2027):**

- **Prioritize by usage** — Focus on:
  - Documents actively used by employees or the public
  - Frequently accessed documents
  - Documents required for services or job functions
  - Documents linked from main pages
- **Pre-existing documents exception** — Documents that were available on your website before April 26, 2027 may qualify for an exception under § 35.201(b) (the test is when the document was posted, not when it was created), but **only if** they are not currently used to "apply for, gain access to, or participate in" your agency's services, programs, or activities. See the comprehensive [exceptions FAQ](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies) for full details.

**Important:** Even if a document qualifies for an exception, you must still provide accessible alternatives upon request under the ADA's effective communication requirements. The exception reduces proactive remediation burden — it does not eliminate the obligation to provide access when needed.

**Internal/intranet documents:**

Whatever the Title II web rule's reach inside an agency, Illinois state agencies need accessible internal systems and documents under the IITAA — which covers intranets and official internal communication — and under workplace accommodation obligations. See: [Does ADA Title II apply to internal documents?](#compliance-requirements-iitaa-and-ada-title-ii-does-ada-title-ii-apply-to-internal-documents) | [Does our agency's password-protected intranet need to be accessible?](#website-accessibility-does-our-agency-s-password-protected-intranet-need-to-be-accessible) | [What about archived documents on the intranet?](#website-accessibility-what-about-archived-documents-on-the-intranet)

**Accessibility best practice:** Before creating a document (especially a PDF), consider whether the content could be published as webpage text instead. HTML webpages are generally easier to make and keep accessible than PDFs. As <a href="https://it.cornell.edu/accessibility/create-accessible-pdfs" target="_blank" rel="noopener noreferrer">Cornell IT notes</a>, "Remediating PDFs for web accessibility can be more time consuming than creating a webpage. Complex PDFs, such as forms, are even more challenging to make web accessible. When possible, convert your PDFs to HTML web pages." If you must use a document format, follow established guidance and test it (see <a href="https://www.section508.gov/create/pdfs/" target="_blank" rel="noopener noreferrer">Section508.gov: Accessible PDFs</a>).

**Best practices:**

1. **Create an accessibility workflow** — Make all new documents accessible before posting
2. **Prioritize remediation** — Focus on frequently used existing documents
3. **Respond to requests** — Have a process to quickly provide accessible versions of archived documents upon request
4. **Document your efforts** — Keep records of what's accessible, what needs work, and any requests you've fulfilled

**Key principle:** The requirement is to ensure people with disabilities can access the information they need. If a document is truly archived and never accessed, it may not need immediate remediation — but if access is needed, you should be prepared to provide an accessible alternative.

### How do I make a Word document accessible?

{updated:2026-10-26}

**See also:** [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start) | [My documents look fine — why do they need to be "accessible"?](#content-accessibility-documents-pdfs-presentations-my-documents-look-fine-why-do-they-need-to-be-accessible) | [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible)

**Step-by-step workflow for creating an accessible Word document:**

**Visual example: Accessible document structure**

```
Document Title (Heading 1)
├── Introduction (Heading 2)
│   └── Paragraph text with proper formatting
├── Main Content Section (Heading 2)
│   ├── Subsection A (Heading 3)
│   │   ├── Bullet list with proper formatting
│   │   └── Table with header row
│   └── Subsection B (Heading 3)
│       └── Image with alt text
├── Conclusion (Heading 2)
└── References (Heading 2)
```

**Key elements:**

- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Descriptive alt text for images
- ✅ Table headers identified
- ✅ Lists formatted as actual lists (not manual bullets)
- ✅ Descriptive link text (not "click here")

**Before you start:**

1. Use an accessible template if available (check with your agency's accessibility coordinator)
2. Plan your document structure (main heading, sections, subsections)

**During creation:**

1. **Set the document language** — Press Ctrl+A to select all the text, then go to Review > Language > Set Proofing Language and pick the language. (To make it the default for new documents, go to File > Options > Language, select the language, and choose **Set as Preferred**.)
2. **Use built-in heading styles** (Heading 1, Heading 2, etc.) — don't just make text bold and large
   - _Visual example:_ Instead of making text 18pt and bold, use the "Heading 1" style from the Styles pane
   - _Why:_ Screen readers use heading styles to navigate; bold text doesn't create navigation structure
3. **Add alt text to images** — Right-click image > View Alt Text (labeled "Edit Alt Text" in older versions of Word)
   - _Visual example:_ For a photo of a meeting, alt text might be "Five people sitting around a conference table discussing a document"
   - _Why:_ Screen readers read alt text aloud; without it, images are invisible to users who can't see them
4. **Use simple table structures** — Avoid merged cells; designate header rows
   - _Visual example:_ Click in the table, then on the **Table Design** tab check **Header Row** (on the single-line ribbon, it's the **Table** tab)
   - _Why:_ Screen readers announce column headers when navigating table cells
5. **Use meaningful link text** — Not "click here"
   - _Visual example:_ "Download the 2025 Annual Report" instead of "Click here"
   - _Why:_ Screen readers can list all links on a page; "click here" provides no context
6. **Ensure sufficient color contrast** — Use the Accessibility Checker to identify contrast issues
7. **Use built-in lists** — Bulleted and numbered lists from the ribbon (not manually typed dashes or numbers)
   - _Visual example:_ Use the bullet list button, not typing "-" before each item
   - _Why:_ Screen readers announce list structure and item count

**Before publishing:**

8. **Run the Accessibility Checker** — Review tab > Check Accessibility
   - Fix all errors
   - Review warnings
   - Address tips when possible
   - Check any alt text Word wrote for you (listed under Intelligent Services) for accuracy
9. **Test with a screen reader** — If available, use Narrator (Windows) or VoiceOver (Mac) to verify the document makes sense when read aloud
10. **Save as accessible PDF** — If converting to PDF: on Windows, use File > Save As > PDF > Options and check "Document structure tags for accessibility"; on Mac, use File > Save As > PDF and choose "Best for electronic distribution and accessibility"

**Common mistakes to avoid:**

- Using text boxes for content (screen readers may skip them)
- Using watermarks that interfere with readability
- Embedding essential information only in headers/footers
- Using decorative fonts that are hard to read

**Training available from DoIT:** DoIT.Accessibility@Illinois.gov

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">Success Criterion 1.3.1 Info and Relationships - Level A</a> (heading structure, table headers, lists)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#link-purpose-in-context" target="_blank" rel="noopener noreferrer">Success Criterion 2.4.4 Link Purpose (In Context) - Level A</a> (link text)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)

### How do I make a PDF accessible?

{updated:2026-11-06}

**See also:** [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start) | [My documents look fine — why do they need to be "accessible"?](#content-accessibility-documents-pdfs-presentations-my-documents-look-fine-why-do-they-need-to-be-accessible) | [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible) | [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility)

**Best practice:** Consider publishing content as webpage text instead of PDF when feasible — it's generally easier to make and keep accessible. See: [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible) for details. If you must use a PDF, follow the steps below.

**Important: Scanned PDFs are not accessible**

A scanned PDF (created by scanning a paper document) is essentially an image — screen readers cannot read the text. Scanned PDFs require:

1. **OCR (Optical Character Recognition)** — Convert the image to searchable text using Adobe Acrobat Pro's "Recognize Text" feature or similar tools
2. **Manual review** — OCR errors are common; review and correct the recognized text
3. **Tagging and structure** — Even after OCR, the PDF needs proper tags, alt text, and reading order

**Note:** Complex scanned documents (forms, tables, multi-column layouts) may be very difficult or impossible to remediate. Consider recreating the document from scratch if the original source is lost.

The best approach depends on the source:

**If you have the source document (Word, InDesign, etc.):**

1. Make the source document accessible first (use heading styles, alt text, simple tables)
2. Export to PDF with accessibility settings enabled
   - In Word: File > Save As > PDF > Options > check "Document structure tags for accessibility"
   - In InDesign: File > Export > Adobe PDF (Interactive) > check "Create Tagged PDF"
3. Check and fix any remaining issues in Adobe Acrobat Pro

**If you only have the PDF (not scanned):**

1. Run the Accessibility Checker in Adobe Acrobat Pro (All tools > Prepare for accessibility > Check for accessibility; in the classic interface of older Acrobat versions: Tools > Accessibility > Accessibility Check, formerly called Full Check)
2. Add tags (All tools > Prepare for accessibility > Automatically tag PDF), then correct them with the Reading Order tool (All tools > Prepare for accessibility > Fix reading order; older classic interface: Tools > Accessibility > Reading Order)
3. Add alt text to images (after running the checker, select Figures Alternate Text in the Accessibility Checker panel and choose Fix; Acrobat walks you through each image)
4. Set the document language (File > Properties > Advanced > Reading Options)
5. Verify reading order matches visual order
6. Fix table headers using the Tags panel
7. Test with a screen reader

**What makes a PDF accessible:**

| Element           | Accessible                          | Not Accessible                              |
| ----------------- | ----------------------------------- | ------------------------------------------- |
| **Text**          | Actual text that can be selected    | Image of text (scanned)                     |
| **Structure**     | Tagged with headings, lists, tables | Flat/untagged content                       |
| **Images**        | Alt text describes content          | No alt text or decorative images not marked |
| **Reading order** | Matches visual reading order        | Tags in wrong order                         |
| **Language**      | Document language set               | No language specified                       |
| **Tables**        | Header cells identified             | No header associations                      |
| **Links**         | Descriptive link text               | "Click here" or URLs as link text           |
| **Forms**         | Form fields labeled                 | Unlabeled form fields                       |

**Testing tool:** PAC — PDF Accessibility Checker, currently PAC 2026 (free) — <a href="https://pac.pdf-accessibility.org/" target="_blank" rel="noopener noreferrer">https://pac.pdf-accessibility.org/</a>

**Adobe guidance:**

- <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html" target="_blank" rel="noopener noreferrer">Create and verify PDF accessibility (Acrobat Pro)</a>
- <a href="https://www.adobe.com/accessibility/pdf.html" target="_blank" rel="noopener noreferrer">Adobe: PDF Specifications (PDF/UA and accessibility standards)</a>

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">Success Criterion 1.3.1 Info and Relationships - Level A</a> (document structure, reading order)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#language-of-page" target="_blank" rel="noopener noreferrer">Success Criterion 3.1.1 Language of Page - Level A</a> (document language)

### Why fix the source document (Word) instead of fixing the PDF after it's published?

{updated:2026-10-26}

**Quick answer:** A PDF is an **export**, not an original. The structure that screen readers need — headings, lists, tables, alt text, language, reading order — lives in the source document. Whatever's wrong in the Word file is wrong in the PDF, and the next time someone exports the PDF again, every manual PDF fix evaporates. **Fix accessibility once at the source**, and every future PDF inherits it. **Patch it in Acrobat after the fact**, and you're paying for the same fixes every time the document changes.

**Why this question exists:**

Several agency managers have responded to "fix it in Word" with some version of: "We hired a remediation vendor — they fix any PDF we publish. Why does the source matter?" That sounds clean. Until you look at how documents actually move through an agency.

**The PDF lifecycle that's easy to overlook:**

1. Author creates a Word document → "Save As PDF" → publishes the PDF.
2. Vendor remediates the PDF in Acrobat: tags headings, fixes reading order, adds alt text, marks language. **All those fixes live only in the PDF — not the Word source.**
3. Author edits the Word document next quarter to update a number or fix a typo → "Save As PDF" again → **a fresh PDF with none of the previous tagging.** Back to step 2.
4. Repeat forever.

This is the round-trip problem. Every PDF remediation is paying for fixes that disappear the next time the underlying Word doc is touched. The accessibility debt isn't being retired — it's being rented, with recurring bills.

**Fixing at the source breaks the loop:**

When the structure lives in the Word source — proper Heading 1/2/3 styles, real bulleted lists (not manually-typed `- `), table header rows, alt text on images, document language set to English — every PDF generated from that file inherits the structure automatically. The next "Save As PDF" is born accessible. No second remediation pass.

**Why Microsoft Word's accessibility checker matters:**

Word has a built-in checker (Review tab → "Check Accessibility") that catches several of the issues that cost the most in PDF remediation:

- Images without alt text (WCAG <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">SC 1.1.1</a>)
- Tables without a header row, or with merged or split cells (WCAG <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1</a>)
- Text that doesn't contrast enough with its background (WCAG <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#contrast-minimum" target="_blank" rel="noopener noreferrer">SC 1.4.3</a>)
- Documents that don't use heading styles (WCAG SC 1.3.1)

It doesn't catch everything. <a href="https://support.microsoft.com/en-us/accessibility/office-accessibility/rules-for-the-accessibility-checker" target="_blank" rel="noopener noreferrer">Microsoft's list of checker rules</a> has no check for document language, link text, or heading order, and says the checker can't detect color used as the only way to show meaning. Check those yourself: the document language (WCAG <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#language-of-page" target="_blank" rel="noopener noreferrer">SC 3.1.1</a>), link text like "click here" (WCAG <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#link-purpose-in-context" target="_blank" rel="noopener noreferrer">SC 2.4.4</a>), headings in a logical order, and color used alone (WCAG <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#use-of-color" target="_blank" rel="noopener noreferrer">SC 1.4.1</a>).

The checker runs in seconds, surfaces issues in a clickable list that scrolls you to each problem, and explains the fix. **It usually takes an author a few minutes per document.** The same issues, found later by a remediation vendor in Acrobat Pro, take much longer to fix — because Acrobat is editing a finished output, not the structured source.

**What the source carries that PDFs need:**

| What lives in Word                                | What it gives the PDF                                    |
| ------------------------------------------------- | -------------------------------------------------------- |
| Heading 1/2/3 styles                              | Tagged headings + navigable structure for screen readers |
| Real bulleted/numbered lists                      | Tagged `<L>` lists, not loose paragraphs with bullets    |
| Table → "Table Design" → Header Row               | `<TH>` markup so screen readers announce columns         |
| Alt text on images (right-click → View Alt Text)  | `<Figure>` with `/Alt` attribute                         |
| Document language (Review → Language)             | `/Lang` attribute on the PDF                             |
| Hyperlinks with descriptive text                  | Tagged links with discernible names                      |
| Logical reading order in the document             | Reading order in the PDF tag tree                        |

If any of these are missing or wrong in Word, the exported PDF has the same gap. There is no "Save As PDF" magic that adds structure that was never authored.

**The cost comparison managers ask about:**

- **Author runs the Word accessibility checker before publishing:** usually a few minutes per document.
- **Vendor remediates the PDF in Acrobat after publication:** often far longer, and repeated every time the source is re-exported.
- **One-time fix to a Word template:** every future document built from it inherits the fix.

The vendor isn't slower than the author — they're working on a harder surface. PDFs are an output format; they were never meant to be edited as a primary source. Acrobat's remediation tools exist for legacy documents where the source is gone. They're not the right place to do the work for documents your staff are authoring today.

**The compounding effect of a template fix:**

A single fix in your agency's Word template — turning on heading styles, setting the language, defaulting tables to "Header Row" on — improves every future Word document built from that template and every PDF those documents export. (PowerPoint has its own templates; fix those separately.) An hour spent on the template can save many hours of remediation later.

**When PDF-side remediation is actually the right call:**

- The source document is **lost** (legacy archive, only the PDF survived).
- The source is in a **non-Microsoft tool** that doesn't carry tags into PDF cleanly (some InDesign workflows, scanned documents, paper-original PDFs).
- The PDF is a **one-time deliverable** that genuinely won't be edited again — and even then, fixing the Word source first is usually faster.

**The bottom line for managers:**

A remediation vendor is the right answer for documents you can't fix at the source. For documents your staff are authoring this quarter, **the source is the leverage point.** Word's checker is free, fast, and prevents the work that vendors charge by the hour to do later. Every PDF born from a properly-structured Word file is one less invoice.

**See also:**

- [How do I make a Word document accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-a-word-document-accessible) — step-by-step for the source side
- [How do I make a PDF accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-a-pdf-accessible) — when you do need to remediate the PDF
- [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility) — ICJIA's free file checker (PDF, Word, PowerPoint, Excel)
- [We hired a third-party remediation firm — does that mean authors don't need to learn accessibility anymore?](#procurement-and-third-party-tools-we-hired-a-third-party-remediation-firm-does-that-mean-authors-don-t-need-to-learn-accessibility-anymore) — the broader version of this misconception

**References:**

- <a href="https://support.microsoft.com/en-us/accessibility/office-accessibility/improve-accessibility-with-the-accessibility-checker" target="_blank" rel="noopener noreferrer">Microsoft: Improve accessibility with the Accessibility Checker</a> — How to run Word's built-in checker
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.3.1 Info and Relationships</a> — the criterion that "Save As PDF" without proper Word styles fails
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 1.1.1 Non-text Content</a> — alt text for images
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#language-of-page" target="_blank" rel="noopener noreferrer">WCAG 2.1 SC 3.1.1 Language of Page</a> — document language

### Is there a quick way to test PDF files for accessibility?

{updated:2026-11-06}

**See also:** [How do I make a PDF accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-a-pdf-accessible) | [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible)

**Quick answer:** Yes. ICJIA has created a free, open-source drag-and-drop file accessibility checker at <a href="https://audit.icjia.app" target="_blank" rel="noopener noreferrer">https://audit.icjia.app</a>. It audits PDF, Word (.docx), PowerPoint (.pptx), and Excel (.xlsx) files against WCAG 2.1 Level AA (WCAG 2.2's newer criteria are listed for manual review) — no installation or account required.

**What it does:**

The tool audits each file across weighted categories (nine for PDFs — text extractability, title and language, heading structure, alt text, table markup, reading order, and more) and produces an A–F letter grade with findings ranked by severity (Critical/Moderate/Minor), so you can quickly identify what needs to be fixed. For PDFs it also offers **optional automated remediation**: a server-side pipeline that adds tags and structure, then re-audits the result.

**What it does not do:**

Automated remediation can't fix everything — meaningful alt text, correct reading order for complex layouts, and judgment calls still need a human. For Word, PowerPoint, and Excel files the tool is audit-only: fix the issues in the source document and re-export.

**Why this is especially useful:**

- **Free and open source** — Many PDF accessibility testing tools are expensive or require paid software licenses. This tool is completely free to use, with no hidden costs or subscriptions. Each file can be up to 25 MB, and you can check five at a time.
- **No installation required** — It's a web page. Just drag and drop your file.
- **Privacy-conscious** — Files are uploaded to ICJIA's server for processing but are handled in memory, never shared with external services, and deleted immediately after the audit (remediated files are deleted on first download or within 30 minutes). The tool keeps a usage log for a year (file name, score, and grade — never the file itself), so keep personal information out of file names.
- **Fast triage** — Quickly test a batch of files to identify which ones need remediation and what specific issues to fix, helping you prioritize your remediation workload before the April 26, 2027 deadline.

**Links:**

- **App:** <a href="https://audit.icjia.app" target="_blank" rel="noopener noreferrer">https://audit.icjia.app</a>
- **GitHub repository:** <a href="https://github.com/ICJIA/file-accessibility-audit" target="_blank" rel="noopener noreferrer">https://github.com/ICJIA/file-accessibility-audit</a>

**Note:** Automated checkers (including this one) catch many common issues but cannot verify everything — for example, whether alt text accurately describes an image or whether reading order is logical. Pair automated testing with manual review — neither alone gives the full picture. This checker is for files; for your web pages, ICJIA's free voicecap tool records what a real screen reader says on each page. See: [What is voicecap, and why did ICJIA build it?](#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it)

### Is Canva accessible?

{updated:2026-10-26}

**Canva has made progress on accessibility** and offers several helpful features. However, tool capabilities change over time — check Canva's latest documentation for current features.

_Note: The information below reflects Canva's accessibility features as of October 2026. Verify current capabilities at <a href="https://www.canva.com/accessibility/" target="_blank" rel="noopener noreferrer">Canva's accessibility page</a>._

**What Canva offers (verify current features):**

- **Design Accessibility checker** — Checks contrast, alt text, and typography
- **Alt text support** — Ability to add alt text to images
- **Reading order and heading tagging** — Better structure for PDFs
- **Easier for non-designers** — More accessible than learning Adobe InDesign

**Important limitation:** Canva's own help pages say the Design Accessibility checker "isn't a compliance tool," and Canva PDFs may not be fully WCAG or PDF/UA compliant out of the box. Test exported content before publishing.

**How to export a tagged (accessible) PDF from Canva:**

1. **Set the structure inside Canva first** — add alt text to images; mark headings with File > Accessibility > **Edit text semantics** (web and desktop apps only); and set reading order in the **Position** panel's layer list (the bottom layer is read first), then turn on **Match reading order to layers** (under **Advanced settings**) when you download
2. **Download as a PDF with the Digital preset** — choose Share > Download, pick **PDF** as the file type, and choose **Digital** under Presets (Canva's older menus called this "PDF Standard"); the print preset is for output quality
3. **Leave "Flatten PDF" unchecked** — flattening converts the page to an image and **strips all accessibility tags**
4. **Verify the export in PAC** — Canva's tagged exports still commonly fail full PDF/UA checks (reading order, table markup), so test every export
5. **Remediate whatever remains** in Adobe Acrobat Pro, or rebuild the document in Word/HTML if the fixes run deep

**Best practices for using Canva:**

1. **Use the Design Accessibility tool before exporting** — It will catch many issues
2. **Keep designs simple** — Simpler designs produce better accessibility results
3. **Test exported PDFs** — Use PAC (PDF Accessibility Checker) or Adobe Acrobat to check accessibility
4. **Be prepared to remediate** — You may need to fix PDFs in Adobe Acrobat Pro after export
5. **Consider your audience** — For simple documents, Canva + remediation can work well. For complex technical documents, consider starting in Word or InDesign

**When Canva works well:**

- Social media graphics (with alt text added)
- Simple flyers and announcements
- Presentations with straightforward layouts
- Quick visual content that will be remediated afterward

**When to use alternatives:**

- Complex multi-page reports
- Documents with extensive tables or data
- Forms that need to be fillable and accessible
- Content requiring precise PDF/UA compliance

**References:**

- <a href="https://www.canva.com/accessibility/" target="_blank" rel="noopener noreferrer">Canva Accessibility Features</a> — Official information on Canva's accessibility tools
- <a href="https://pac.pdf-accessibility.org/" target="_blank" rel="noopener noreferrer">PAC (PDF Accessibility Checker)</a> — Free tool to test PDF accessibility

### How do I make Excel spreadsheets accessible?

Key steps for accessible Excel files:

1. **Use a simple, logical structure** — Avoid blank rows/columns for spacing
2. **Name worksheets descriptively** — Not "Sheet1," "Sheet2"
3. **Define table headers** — Format as Table with header row
4. **Add alt text to charts and images**
5. **Avoid merged cells** when possible
6. **Use sufficient color contrast**
7. **Don't rely on color alone** to convey information
8. **Run the Accessibility Checker** — Review tab > Check Accessibility

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">Success Criterion 1.3.1 Info and Relationships - Level A</a> (table structure, headers)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text for charts/images)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#use-of-color" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.1 Use of Color - Level A</a> (don't rely on color alone)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)

### I work with complex data tables. Why does our website use Markdown, and how do I make my tables accessible?

{updated:2026-10-26}

**Quick answer:** Markdown is the bridge between your Word documents and live web content. It's a simple text format that content management systems (like Strapi) use to store and display content on websites. For complex tables, **start with an accessible Word table** — proper headers, simple structure, no merged cells — and the conversion to Markdown will be straightforward. The accessibility principles are the same in both formats.

**Full explanation:**

**Why Markdown?**

Many people ask: _"Why can't I just upload my Word document to the website?"_ The answer involves how modern websites work:

| Format | Good for | Limitations |
| ------ | -------- | ----------- |
| **Word (.docx)** | Creating and editing content, internal review, printing | Not directly displayable on websites; requires download |
| **PDF** | Preserving exact layout, printing | Hard to make accessible; not responsive on mobile; requires download |
| **HTML** | Displaying on websites | Complex to write by hand; requires web development skills |
| **Markdown** | Bridge between Word and HTML | Simple to learn; converts cleanly to HTML; works with CMS platforms |

**Markdown is the translation layer.** Content management systems and site generators (Strapi, static-site tools, and others) use Markdown because:

1. **It's simple** — You can learn the basics in 10 minutes
2. **It converts to HTML automatically** — The CMS handles the technical conversion
3. **It separates content from design** — Writers focus on content; the website handles how it looks
4. **It maps cleanly to accessible HTML** — Markdown headings become real HTML headings, and a Markdown table's first row becomes its column headers. (Markdown can't mark row headers or add a table caption, so keep tables simple.)

**The content workflow:**

```
Word Document → Markdown (in CMS) → HTML (on website)
     ↑                                    ↓
  You create                        Users view
  and edit                          accessible
  content                           web content
```

**Why tables feel harder in Markdown:**

Markdown table syntax looks like this:

```
| Column A | Column B | Column C |
| -------- | -------- | -------- |
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

This is admittedly less intuitive than a Word table. However, **you don't necessarily need to write Markdown directly**. Many CMS platforms have visual editors that let you create tables without seeing the Markdown syntax.

**Making tables accessible (regardless of format):**

The same principles apply whether your table is in Word, Markdown, or HTML:

| Principle | In Word | In Markdown/HTML |
| --------- | ------- | ---------------- |
| **Simple structure** | Avoid merged cells, nested tables | Same — keep it simple |
| **Header row** | Table Design tab > Header Row checked | First row automatically becomes headers |
| **One topic per table** | Split complex tables into multiple simpler ones | Same |
| **Avoid layout tables** | Don't use tables for visual layout | Same |
| **Caption/title** | Add a title above the table | Add a heading or caption above |

**For data scientists and analysts working with complex tables:**

If you're creating tables with many columns, merged headers, or nested data:

1. **Simplify where possible** — Can you split one complex table into multiple simpler ones?
2. **Consider alternatives** — Would a list or multiple smaller tables be clearer?
3. **If complexity is unavoidable** — Add a text summary describing the key findings or patterns
4. **Provide source data** — Link to downloadable CSV/Excel for users who need the raw data

**Example: Simplifying a complex table**

❌ **Hard to make accessible:**

```
| Region | Q1 Sales | Q1 % | Q2 Sales | Q2 % | Q3 Sales | Q3 % | Q4 Sales | Q4 % | Total | YoY Change |
| ------ | -------- | ---- | -------- | ---- | -------- | ---- | -------- | ---- | ----- | ---------- |
```

✅ **Easier approach:** Split into multiple tables (one per quarter) or provide a summary with a link to detailed data.

**Practical tips for Word → Markdown workflow:**

1. **Build your table simply in Word first** — Use Insert > Table; check "Header Row" on the Table Design tab
2. **Avoid merged cells** — They don't convert cleanly to Markdown
3. **Test the Accessibility Checker in Word** — Fix issues before converting
4. **Use your CMS's table tools** — Most have visual table editors
5. **If you must write Markdown tables** — Use a <a href="https://www.tablesgenerator.com/markdown_tables" target="_blank" rel="noopener noreferrer">Markdown table generator</a> to create the syntax

**Key takeaway:** Markdown isn't an obstacle — it's a tool that makes web content possible. Focus on making your content accessible in Word (simple structure, proper headers, no merged cells), and the Markdown conversion will follow. The accessibility principles are the same regardless of format.

**References:**

- <a href="https://www.markdownguide.org/extended-syntax/#tables" target="_blank" rel="noopener noreferrer">Markdown Guide: Tables</a> — Basic Markdown table syntax
- <a href="https://www.tablesgenerator.com/markdown_tables" target="_blank" rel="noopener noreferrer">Tables Generator</a> — Visual tool for creating Markdown tables
- <a href="https://www.w3.org/WAI/tutorials/tables/" target="_blank" rel="noopener noreferrer">W3C: Tables Tutorial</a> — Comprehensive guide to accessible tables
- <a href="https://webaim.org/techniques/tables/data" target="_blank" rel="noopener noreferrer">WebAIM: Creating Accessible Tables</a> — Practical accessibility guidance

**See also:** [How do I make Excel spreadsheets accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-excel-spreadsheets-accessible) | [My documents look fine — why do they need to be "accessible"?](#content-accessibility-documents-pdfs-presentations-my-documents-look-fine-why-do-they-need-to-be-accessible)

### How do I make PowerPoint presentations accessible?

{updated:2026-10-26}

Key steps for accessible PowerPoint:

1. **Use built-in slide layouts** — Don't create from blank slides
2. **Add alt text to images, charts, and graphics**
3. **Ensure reading order is correct** — On Windows, go to Review > Check Accessibility (drop-down arrow) > Reading Order Pane; items are read from the top of the list down. On a Mac or in PowerPoint for the web, use Home > Arrange > Selection Pane, which lists items in reverse — the bottom item is read first
4. **Use unique, descriptive slide titles**
5. **Use sufficient color contrast**
6. **Make hyperlinks descriptive**
7. **Add captions to embedded videos**
8. **Run the Accessibility Checker** — Review tab > Check Accessibility

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">Success Criterion 1.3.1 Info and Relationships - Level A</a> (reading order, structure)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#headings-and-labels" target="_blank" rel="noopener noreferrer">Success Criterion 2.4.6 Headings and Labels - Level AA</a> (descriptive slide titles)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#page-titled" target="_blank" rel="noopener noreferrer">Success Criterion 2.4.2 Page Titled - Level A</a> (the presentation's own title: File > Info > Properties > Title)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#link-purpose-in-context" target="_blank" rel="noopener noreferrer">Success Criterion 2.4.4 Link Purpose (In Context) - Level A</a> (link text)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#captions-prerecorded" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.2 Captions (Prerecorded) - Level A</a> (video captions)

### How do I make emails and newsletters accessible?

{updated:2026-10-26}

**Quick answer:** Emails follow the same principles as documents: use heading structure, add alt text to images, write descriptive links, and ensure good color contrast. The biggest difference is that many email clients have limited support for accessibility features, so simpler is better.

**Full explanation:**

Many state agencies send newsletters, announcements, and other email communications to the public. These emails need to be accessible too, especially if they contain important information about government services.

**Best practice for newsletters:** Consider publishing newsletter content as a webpage and linking to it from your email, rather than attaching a PDF. See: [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible) for why HTML is generally easier to make accessible than PDFs.

**Email accessibility essentials:**

| Element           | What to do                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------- |
| **Images**        | Add alt text; assume images may not display (many email clients block images by default) |
| **Links**         | Use descriptive link text ("View the 2025 report" not "Click here")                      |
| **Structure**     | Use heading styles if your email platform supports them; keep layouts simple             |
| **Color**         | Don't rely on color alone to convey meaning; ensure sufficient contrast                  |
| **Plain text**    | Include a plain-text version of HTML emails when possible                                |
| **Critical info** | Put essential information in text, not just in images or graphics                        |

**Platform-specific tips:**

**Outlook (desktop and web):**

- Use the built-in Accessibility Checker (Outlook for Windows, classic or new: Review > Check Accessibility; Outlook on the web: Options > Check Accessibility, or Message > Check Accessibility; Outlook for Mac: Edit > Check Accessibility)
- Add alt text to images (classic Outlook: right-click the image > View Alt Text, labeled "Edit Alt Text" in older versions; new Outlook and Outlook on the web: right-click the image > Add alternate text)
- Use heading styles from the formatting toolbar
- Avoid excessive use of tables for layout

**Gmail:**

- Add alt text to inserted images (select the image > Edit alt text)
- Keep formatting simple — bold, italics, lists
- Include a plain-text alternative when possible

**Constant Contact / Mailchimp / Email marketing tools:**

- Use the alt text field for all images (it's usually available when you click on an image)
- Use built-in heading styles rather than just making text larger
- Test with keyboard navigation before sending
- Preview in multiple email clients
- Include an accessible web version link at the top

**Common email accessibility mistakes:**

1. **Image-only emails** — If the entire message is a graphic, users who can't see images (or have them blocked) get nothing
2. **"Click here" links** — Screen readers often read links out of context; "View the 2025 Annual Report" is much better
3. **Text in images** — Avoid putting text in images when possible; if you must, ensure sufficient contrast (4.5:1 for normal text, 3:1 for large text)
4. **Low contrast** — Light gray text on white backgrounds is hard to read for everyone
5. **Complex layouts** — Multi-column layouts often break in email clients and screen readers

**The key principle:** Assume someone might read your email:

- With images turned off
- Using a screen reader
- On a mobile device
- With low vision

If your message still makes sense in all those scenarios, you're doing it right.

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#info-and-relationships" target="_blank" rel="noopener noreferrer">Success Criterion 1.3.1 Info and Relationships - Level A</a> (structure)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#link-purpose-in-context" target="_blank" rel="noopener noreferrer">Success Criterion 2.4.4 Link Purpose (In Context) - Level A</a> (link text)

---

## Social Media Accessibility

### Do social media posts need to be accessible? How do I make them accessible?

{updated:2026-10-26}

**Yes.** Under the ADA Title II rule, new social media posts by state and local governments must meet accessibility standards. Pre-existing posts (made before the compliance date) may qualify for an exception under § 35.201(e) — see [Are there exceptions to the April 2027 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies) for full details on all five exceptions and their limitations.

**Verbatim from the rule (28 CFR § 35.201(e) "Preexisting social media posts"):**

> "The requirements of § 35.200 do not apply to the following: ... (e) _Preexisting social media posts._ A public entity's social media posts that were posted before the date the public entity is required to comply with this subpart."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.201" target="_blank" rel="noopener noreferrer">28 CFR § 35.201 (eCFR)</a>

The exception is **only** for posts made before the agency's compliance date (April 26, 2027 for entities with a total population of 50,000 or more, which includes state agencies; April 26, 2028 for smaller entities and special district governments). Every post made on or after that date is covered by the rule's WCAG 2.1 AA requirement (§ 35.200), including alt text on images, captions on video, and accessible link text.

**Note:** Social media platforms themselves have accessibility limitations, but you can control the content you post.

**How to make social media posts accessible:**

**For all platforms:**

- Write in plain language
- Use CamelCase for hashtags (#AccessibilityMatters)
- Limit emoji use; don't place multiple emojis together
- Put hashtags at the end of posts
- Keep videos captioned
- Use sufficient color contrast in graphics

**For images:**

- Add alt text (most platforms support this now)
- Don't put essential text only in images
- Describe images in the post if alt text isn't available
- **How to add alt text on different platforms:**
  - **X (Twitter):** When composing, select the **+ALT** button on the attached image
  - **Facebook:** Click the image > Edit > Alternative Text
  - **Instagram:** On the last screen before you share, tap **More options** > **Write alt text** (on a computer, click **Accessibility**), or edit it after posting
  - **LinkedIn:** Click the image while composing > Alt text

**For video:**

- Add captions (not just auto-generated — review for accuracy)
- Provide audio description for essential visual content if needed

**Resources:**

- **Platform-specific guidance:** <a href="https://www.section508.gov/create/social-media/" target="_blank" rel="noopener noreferrer">https://www.section508.gov/create/social-media/</a>
- **ADA Title II Reference:** <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule - Social Media</a> (see the "Preexisting social media posts" exception discussion)
- **WCAG References:**
  - <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#captions-prerecorded" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.2 Captions (Prerecorded) - Level A</a> (captions)
  - <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text for images)
  - <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#audio-description-prerecorded" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.5 Audio Description (Prerecorded) - Level AA</a> (audio description)
  - <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)

---

## Procurement and Third-Party Tools

### What should I do when purchasing software or services?

When procuring technology products or services:

1. **Include accessibility requirements** in RFPs and contracts
2. **Request accessibility documentation** from vendors — Ask for accessibility conformance reports or documentation that addresses WCAG 2.1 Level AA compliance
3. **Evaluate accessibility claims** — Look for "Supports" not just "Partially Supports"
4. **Request a demo** of accessibility features
5. **Test with assistive technology** if possible

**References:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-procurement.html" target="_blank" rel="noopener noreferrer">IITAA Procurement Guidance</a> — Illinois-specific procurement requirements
- <a href="https://www.section508.gov/buy/define-accessibility-criteria/" target="_blank" rel="noopener noreferrer">Section508.gov: Define Accessibility Criteria</a> — Federal guidance on procurement

### How do we ensure accessibility compliance with third-party tools like LMSs (Docebo), DocuSign, Tableau, ArcGIS, and Canva?

{updated:2026-11-06}

**Quick answer:** Your agency is responsible for accessibility of services delivered through third-party tools, even if you don't control the platform code and even if you only paste an embed iframe onto your page. "We just embed it — they design it" doesn't change who's responsible under the rule. This requires: (1) verifying the platform's accessibility claims, (2) ensuring your content and workflows are accessible, (3) testing real user workflows, and (4) providing accessible alternatives when needed.

**The "we only get an iframe" misconception:**

Authors sometimes assume that because a dashboard (Tableau), a map (ArcGIS), an infographic (Canva), or a video (YouTube) is built on a vendor's platform and pulled in as an `<iframe>`, the vendor is solely responsible for accessibility. **That isn't what the rule says, and it isn't how the experience works for users.**

Whoever **publishes** content for a public program or service is the one on the hook for whether people with disabilities can use it. The accessibility outcome doesn't follow the bytes back to whoever's server they came from — it sits with the page that brought them in. If your agency embeds it, the responsibility stays with your agency.

**The relevant rules:**

- **ADA Title II web rule — 28 CFR § 35.200** (89 FR 31320, April 24, 2024; compliance dates extended by the April 20, 2026 Interim Final Rule to April 26, 2027 for public entities with a total population of 50,000 or more, which includes every Illinois state agency). § 35.200(a) reaches "web content that a public entity **provides or makes available, directly or through contractual, licensing, or other arrangements**" — the contractual-arrangement language is in the rule itself, not just the preamble. The narrow third-party exception is at § 35.201(c), and it applies only to content posted by a third party "**unless** the third party is posting due to contractual, licensing, or other arrangements with the public entity." A forum comment from a member of the public qualifies for the exception; a Tableau, ArcGIS, or Canva license you pay for and embed does not.
- **IITAA + IITAA 2.1 Standards** (30 ILCS 587; standards effective June 24, 2024). IITAA applies to "information and communication technology" that an Illinois state agency develops, procures, maintains, or uses (IITAA 2.1 Standards, E201.1: "ICT that is procured, developed, maintained, or used by agencies shall conform to these Standards"). **It doesn't exclude embedded or hosted content.** If you ship it to the public from a state agency site, IITAA 2.1 applies and the technical bar is WCAG 2.1 Level AA. Illinois DoIT's IITAA Procurement Guidance specifically directs agencies to flow these requirements into vendor contracts.
- **WCAG 2.1 Level AA** — the technical standard cited by both rules. WCAG is **medium-agnostic**: it does not change behavior based on whether content is rendered in-line, in an iframe, or via a third-party SDK. If a screen-reader user can't operate the embedded map, the page doesn't meet WCAG 2.1 AA.

**What the rules actually say (verbatim, with sources):**

Don't take this FAQ's word for it. Here are the actual quotes from the rules — copy these directly into a memo if you need to. Each one links to its primary source.

**ADA Title II — 28 CFR § 35.200(a) "General":**

> "A public entity shall ensure that the following are readily accessible to and usable by individuals with disabilities:
>
> (1) Web content that a public entity provides or makes available, directly or through contractual, licensing, or other arrangements; and
>
> (2) Mobile apps that a public entity provides or makes available, directly or through contractual, licensing, or other arrangements."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200 (eCFR)</a> · <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">final rule, 89 FR 31320 (Apr. 24, 2024)</a>

The verb is **"shall ensure"** and it points at the public entity, not the vendor. The subject is web content the public entity "provides or makes available, **directly or through contractual, licensing, or other arrangements.**" A Tableau, ArcGIS, or Canva license is exactly the kind of contractual arrangement the rule names.

**ADA Title II — 28 CFR § 35.130(b)(1) (the general non-discrimination rule, on the books since 1991):**

> "A public entity, in providing any aid, benefit, or service, may not, directly or through contractual, licensing, or other arrangements, on the basis of disability—
>
> (i) Deny a qualified individual with a disability the opportunity to participate in or benefit from the aid, benefit, or service; ..."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-B/section-35.130" target="_blank" rel="noopener noreferrer">28 CFR § 35.130(b)(1) (eCFR)</a>

This is the older, broader hook. The 2024 web rule's "directly or through contractual, licensing, or other arrangements" language did not come out of nowhere — § 35.130(b)(1) has used it since 1991. An agency can't use a vendor to do what the rule bars it from doing directly, and § 35.130(b)(3) extends the same principle to "methods of administration."

**ADA Title II — 28 CFR § 35.201(c) "Exceptions":**

> "(c) _Content posted by a third party._ Content posted by a third party, unless the third party is posting due to contractual, licensing, or other arrangements with the public entity."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.201" target="_blank" rel="noopener noreferrer">28 CFR § 35.201 (eCFR)</a>

The exception is for content the public did not contract for — a member of the public leaving a forum comment is a textbook example. **A vendor you pay (Esri, Canva, Tableau, DocuSign, etc.) is exactly the case this exception does not cover** — the rule explicitly says the exception does **not** apply when the third party is posting "due to contractual, licensing, or other arrangements."

**Illinois IITAA — 30 ILCS 587 / IITAA 2.1 Standards:**

> "The Illinois Information Technology Accessibility Act (IITAA) requires Illinois agencies and universities to ensure that their web sites, information systems, and information technologies are accessible to people with disabilities."
>
> "The IITAA 2.1 Standards, which require conformance with WCAG 2.1 AA, went into effect on June 24, 2024."
>
> "While the Americans with Disabilities Act and Section 504 of the Rehabilitation Act already require the State to ensure its communications and services are accessible, the IITAA establishes specific technical standards and encourages the State to address accessibility proactively."

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

IITAA is a **separate state-law obligation** that applies to Illinois state agencies independently of (and in addition to) ADA Title II. The Act took effect when it was signed on August 20, 2007, and its first technical standards took effect August 20, 2008 — about 16 years before the federal web rule. "We follow the ADA, so IITAA is covered" doesn't hold up — they apply simultaneously and IITAA's scope is broader (it covers internal-facing IT, hardware, kiosks, and procurement, not just public-facing web/mobile).

**Illinois IITAA — Procurement contract language (DoIT-recommended):**

> "All information technology, including electronic information, software, systems, and equipment, **developed or provided under this contract or procurement** must comply with the applicable requirements of the Illinois Information Technology Accessibility Act (30 ILCS 587) Standards"

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-procurement.html" target="_blank" rel="noopener noreferrer">DoIT: IITAA Procurement Guidance</a>

The state's own procurement language explicitly reaches IT "developed or provided under this contract or procurement" — i.e., **vendor-supplied** IT. The responsibility stays with the agency; the contract is your lever for holding vendors to it.

**WCAG 2.1 — Conformance Requirement 2: Full pages:**

> "Conformance (and conformance level) is for full web page(s) only, and **cannot be achieved if part of a web page is excluded**."

— <a href="https://www.w3.org/TR/WCAG21/#conformance" target="_blank" rel="noopener noreferrer">WCAG 2.1, Section 5 (Conformance)</a>

You cannot conform to WCAG by saying "the rest of our page is accessible — just ignore the embedded map." Conformance is a property of the **whole page**.

**WCAG 2.1 — Conformance Requirement 3: Complete processes:**

> "When a web page is one of a series of web pages presenting a process (i.e., a sequence of steps that need to be completed in order to accomplish an activity), all web pages in the process conform at the specified level or better."

— <a href="https://www.w3.org/TR/WCAG21/#conformance" target="_blank" rel="noopener noreferrer">WCAG 2.1, Section 5 (Conformance Requirement 3)</a>

This is why testing the **whole workflow** matters, not just the landing page. A DocuSign signing flow, an LMS enrollment-to-completion path, or a multi-step ArcGIS search is a "process" — if step 3 is inaccessible, the process does not conform, even if steps 1 and 2 do.

**WCAG 2.1 — Third-party content (W3C Understanding doc):**

> "When an author makes a decision to use a third party implementation, they should choose products that meet WCAG requirements. **If all content on a page, including third party content, meets all WCAG success criteria then the page conforms to WCAG.**"

— <a href="https://www.w3.org/WAI/WCAG21/Understanding/conformance" target="_blank" rel="noopener noreferrer">W3C WAI: Understanding Conformance</a>

W3C is unambiguous: **the author's page** does not conform unless the embedded third-party content also meets the success criteria. Choosing the embed is itself an accessibility decision.

**What that means in practice for Tableau, ArcGIS, Canva, and similar embeds:**

- **You are the publisher.** "The vendor says it's accessible" is a starting point, not the finish — verify with your own testing, in your own context.
- **The embed wrapper is part of the page.** Your `<iframe>` needs an accessible name (`title`), focusable controls around it, and a path for keyboard users to reach and leave it.
- **Configuration choices you make inside the third-party platform are yours.** Color combinations, font sizes, alt text on a Canva graphic, layer labels in ArcGIS, axis titles in Tableau — those are authored by your staff inside the vendor's tool and are your agency's responsibility.
- **If the embed itself can't meet WCAG 2.1 AA, provide an accessible alternative.** A static data table next to a Tableau dashboard, a text/list alternative next to an ArcGIS map, an accessible PDF or HTML version of a Canva infographic, or a transcript and captions for embedded video. The alternative must convey the **same information** — not a stripped-down summary. One limit: under <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.202" target="_blank" rel="noopener noreferrer">28 CFR § 35.202</a>, a separate accessible version counts toward compliance "only where it is not possible to make web content directly accessible due to technical or legal limitations." Running out of time isn't one of those.
- **Procurement is the leverage point.** Require WCAG 2.1 AA conformance in the contract, request a current VPAT/ACR for the exact product version, and document remediation timelines for known issues. (See [What contract language should I use?](#procurement-and-third-party-tools-what-contract-language-should-i-use).)

> **What's a VPAT?** A **VPAT** (_Voluntary Product Accessibility Template_) is a standardized form a vendor fills out to describe how their product meets accessibility standards. The completed document a vendor hands you is technically called an **ACR** (_Accessibility Conformance Report_), but most people use "VPAT" and "ACR" interchangeably. Treat it as the vendor's self-reported accessibility resume — useful as a starting point, not a guarantee. Always verify with your own testing. Full breakdown: [What is a VPAT? What is an ACR?](#procurement-and-third-party-tools-what-is-a-vpat-what-is-an-acr)

**Specifically for Canva embeds and exports:**

Canva is a common source of inaccessible content because the design surface lets authors make choices that fail WCAG 2.1 AA: low-contrast text over photos (1.4.3), color-only emphasis (1.4.1), and text inside images that can't be resized or read by assistive tech (1.4.5). Decorative fonts at small sizes and undersized tap targets aren't AA-level violations on their own, but they compound the contrast and cognitive-load problems that are. The "embed" or PDF export does not fix any of those choices.

- Treat Canva graphics like any other image: WCAG 1.1.1 requires a text alternative that conveys the same information. A short `alt` is not enough for a poster crammed with statistics — provide a long-description, a plain-text equivalent on the page, or both.
- Avoid putting essential information **inside** the Canva graphic. Repeat the key facts as real text on the surrounding page so screen-reader and low-vision users get them without depending on the image.
- Canva can now export **tagged** PDFs — download as **PDF** with the **Digital** preset (formerly "PDF Standard") and leave "Flatten PDF" **unchecked** (flattening strips the tags), set headings with File > Accessibility > "Edit text semantics," and set reading order by arranging layers in the Position panel and turning on "Match reading order to layers" (under Advanced settings) at download. Exports still commonly fail full PDF/UA checks, so verify in PAC and remediate in Acrobat Pro — or recreate the document in Word/HTML — if issues remain.
- Embedded Canva designs (`<iframe>`) inherit the same rules as any other embed: provide an accessible name, ensure keyboard reachability, and provide a non-iframe alternative for the same information.

**Specifically for ArcGIS embeds:**

ArcGIS Online, Story Maps, Experience Builder, and Dashboards each render as embeds with their own keyboard and screen-reader behavior. Configuration choices you make in ArcGIS — pop-up content, layer labels, legend wording, color ramps — are **your** content and must meet WCAG 2.1 AA.

- Esri publishes VPATs per product line; verify against the **specific product and version** you embed (ArcGIS Online ≠ Experience Builder ≠ JS API custom apps).
- Provide a parallel accessible alternative: a sortable HTML data table, a list of locations with attributes, or a downloadable CSV. The map is a visualization; the underlying data must be available without it.
- Test the keyboard path **into** and **out of** the iframe. Users who can't escape an embedded map are blocked from the rest of your page.

**Why this matters:**

Under the ADA Title II web rule, public entities are responsible for the accessibility of third-party content when it is provided "through contractual, licensing, or other arrangements" (§ 35.200(a)). This means:

- **Content you contract for** — Payment processors, scheduling tools, chat widgets, LMS platforms, document signing tools, embedded maps (ArcGIS), dashboards (Tableau), design/infographic tools (Canva), survey tools, and other contracted services — falls under your agency's responsibility
- **Content posted by third parties without a contractual relationship** — Such as user comments on a public forum — is generally excepted (§ 35.201)

**Common third-party tools requiring accessibility:**

- Learning Management Systems (LMSs) like Docebo, Canvas, Moodle
- Document signing tools like DocuSign
- Data visualization and dashboards like Tableau, Power BI
- Mapping platforms like ArcGIS, Google Maps
- Payment processors, scheduling tools, chat widgets
- Survey and form tools integrated into your site

**Important note:** Vendor accessibility status changes over time. All major vendors (Docebo, DocuSign, Tableau, Esri/ArcGIS) publish accessibility information and VPATs on their websites. The guidance below reflects general principles — verify current accessibility status against the vendor's latest documentation for your specific product version and configuration.

**For Learning Management Systems (LMSs) like Docebo:**

**Compliance considerations:**

Compliance varies by platform, version, and configuration. Even if an LMS platform claims accessibility, **your course content and configuration still have to be accessible**. What can affect LMS accessibility:

- Platform version/configuration (accessibility may vary between versions)
- Custom themes/branding (customizations can introduce accessibility issues)
- Plugins/integrations
- Specific feature limitations (quizzes, embedded media, uploads, etc.)

**Step-by-step approach:**

1. **Verify platform accessibility** — Request the vendor's current VPAT/ACR for your specific product version and configuration. Vendor accessibility claims can change with product updates.

2. **Make your course content accessible** — Even if the platform claims accessibility, your uploaded content must be accessible:
   - **Documents** — Upload accessible Word/PDF/PowerPoint files (make the source accessible first)
   - **Videos** — Add accurate captions (review and correct auto-generated captions)
   - **Audio** — Provide transcripts
   - **Images** — Include alt text; don't put essential text only in images
   - **Structure** — Use clear headings and descriptive link text; predictable navigation and module names
   - **Quizzes/forms** — Ensure keyboard accessibility, clear labels, and error messages
   - **Color** — Ensure sufficient contrast and don't rely on color alone to convey meaning

3. **Test the complete workflow** — Test real user journeys (enrollment, course completion, quiz submission) using:
   - Keyboard-only navigation
   - Screen reader (NVDA, VoiceOver, or TalkBack)
   - Automated checkers (axe DevTools or WAVE)

4. **Document and remediate** — Keep records of issues found, vendor responses, and remediation timelines.

**For DocuSign:**

**Does this apply to us?**

Yes. If you use DocuSign for public-facing services, the **signing workflow** and the **documents you send** must be accessible.

**Step-by-step approach:**

1. **Make documents accessible first** — Create accessible Word or PDF documents before uploading to DocuSign. DocuSign can't "fix" an inaccessible document.

2. **Verify the signing workflow** — Request DocuSign's current VPAT/ACR for your specific product version and configuration. Vendor accessibility claims can change with product updates.

3. **Test the signing process** — Test the complete workflow (receiving, reviewing, signing, submitting) using:
   - Keyboard-only navigation
   - Screen reader
   - Automated accessibility checkers

4. **Provide an accessible alternative** — Have a backup method ready if a user can't complete the signing process (e.g., accessible PDF form with supported return method, in-person or assisted signing).

**For Tableau Dashboards:**

**Does this apply to us?**

Yes. If you use Tableau dashboards for public-facing services, the **dashboard interface** and the **data visualization** must be accessible, or you must provide an accessible alternative.

**Common accessibility challenges with Tableau:**

- Interactive charts that rely on hover-only tooltips (not keyboard accessible)
- Visualizations that rely on color alone to convey meaning
- Missing or inadequate text descriptions of what the data shows
- Complex navigation that doesn't work with keyboard or screen readers
- Missing alternative text for visual elements

**Step-by-step approach:**

1. **Verify platform accessibility** — Request Tableau's current VPAT/ACR for your specific product version. Check Tableau's accessibility documentation for your version.

2. **Make your dashboards accessible** — Focus on these high-impact elements:
   - **Alternative text** — Provide text descriptions for all visualizations
   - **Data tables** — Include accessible data tables alongside visualizations (Tableau supports this feature)
   - **Keyboard navigation** — Ensure all interactive elements can be accessed and operated with keyboard
   - **Color contrast** — Use sufficient color contrast and don't rely on color alone to convey meaning
   - **Plain-language summaries** — Provide written summaries of key insights and trends shown in the visualizations

3. **Test the complete workflow** — Test how users interact with your dashboards (viewing, filtering, exporting data) using:
   - Keyboard-only navigation
   - Screen reader
   - Automated accessibility checkers

4. **Provide accessible alternatives** — Offer these alongside the dashboard, and to anyone who asks while fixes are underway. They supplement the fix; a separate version only stands in for it when a technical or legal limitation makes the dashboard itself impossible to make accessible (28 CFR § 35.202):
   - Accessible data tables or CSV downloads
   - Plain-language summaries of key findings
   - Text-based reports with the same information

**For ArcGIS Maps:**

**Does this apply to us?**

Yes. If you use ArcGIS maps for public-facing services, the **map interface** and the **geographic information** must be accessible, or you must provide an accessible alternative.

**Common accessibility challenges with ArcGIS:**

- Interactive maps that require mouse/touch interaction
- Spatial information conveyed only visually
- Missing text descriptions of map features and locations
- Complex map controls that don't work with keyboard or screen readers
- Pop-ups and tooltips that aren't accessible

**Step-by-step approach:**

1. **Verify platform accessibility** — Request Esri's current VPAT/ACR for your specific ArcGIS products. Esri publishes accessibility information for ArcGIS products.

2. **Make your maps accessible** — Focus on these high-impact elements:
   - **Alternative text and descriptions** — Provide text descriptions of what the map shows (e.g., "Map showing crime rates by county in Illinois, 2023-2024")
   - **Data tables/lists** — Include accessible tables or lists of locations, features, and attributes shown on the map
   - **Keyboard navigation** — Ensure map controls (zoom, pan, layer toggles) work with keyboard
   - **Text-based content** — Provide text summaries of geographic patterns, trends, or insights
   - **Search functionality** — Allow users to search for locations rather than requiring visual scanning

3. **Test the complete workflow** — Test how users interact with your maps (viewing, searching locations, accessing data) using:
   - Keyboard-only navigation
   - Screen reader
   - Automated accessibility checkers

4. **Provide accessible alternatives** — Offer these alongside the map, and to anyone who asks while fixes are underway. They supplement the fix; a separate version only stands in for it when a technical or legal limitation makes the map itself impossible to make accessible (28 CFR § 35.202):
   - Accessible tables or lists of locations with relevant attributes
   - Written summaries of what the map shows and key geographic patterns
   - Text-based search or directory of locations
   - Contact information for requesting information in alternative formats

**How to test third-party tool accessibility:**

**Why testing matters:** Vendor claims about accessibility aren't always accurate, and even accessible platforms can become inaccessible through custom configuration or content you add. Testing real workflows ensures the tools your agency uses actually work for people with disabilities — not just in theory, but in practice.

**Minimum test plan:**

1. **Pick 2–3 real workflows** (example: "sign a document," "enroll and complete a course," "view a dashboard," "search a map").

2. **Run an automated scan** (axe DevTools or WAVE) on each workflow screen:
   - **axe DevTools** — <a href="https://www.deque.com/axe/" target="_blank" rel="noopener noreferrer">https://www.deque.com/axe/</a>
   - **WAVE** — <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">https://wave.webaim.org/</a>

3. **Keyboard-only check** (no mouse):
   - You can reach everything (Tab/Shift+Tab) and activate it (Enter/Space)
   - Focus is visible and never gets "stuck"

4. **Screen reader spot-check** (at least one):
   - **NVDA** (free) — <a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer">https://www.nvaccess.org/</a>
   - **VoiceOver** (built-in on Mac/iOS)
   - Confirm labels make sense, errors are announced, and the workflow can be completed
   - For a vendor's public web pages, ICJIA's free **voicecap** tool runs NVDA through each page on a sitemap or page list and saves what it says as transcripts you can keep with your test records — see [What is voicecap, and why did ICJIA build it?](#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it)

5. **Document what you found**:
   - Date/version tested, workflow steps, issues, and screenshots
   - "Workaround/alternative provided" if the vendor can't fix quickly

**Procurement/contract expectations:**

- **VPAT/ACR** for the exact product/version you're buying/using
- A list of **known issues** + vendor **remediation timeline**
- Contract language requiring **WCAG 2.1 Level AA** and support for accessibility fixes

**Common pitfalls to avoid:**

- **Assuming vendor claims are accurate** — Verify with a current VPAT/ACR and test it yourself
- **Focusing only on the platform** — Your content and configuration matter just as much
- **Ignoring customizations** — Custom themes, plugins, or integrations can introduce accessibility issues
- **Skipping workflow testing** — Testing individual pages isn't enough; test complete user journeys
- **No backup plan** — Keep an accessible alternative ready

**Ongoing monitoring:**

- Re-test after major platform updates, configuration/theme changes, or new integrations
- Track user feedback and escalate issues to vendors
- Keep accessibility requirements in renewal contracts
- Document your testing and remediation efforts

**See also:**

- [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility) — Additional testing guidance for web content

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — See exception 3, "Content posted by a third party…"
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: Final Rule</a> — § 35.200(a) on contractual arrangements
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-procurement.html" target="_blank" rel="noopener noreferrer">IITAA Procurement Guidance</a> — Illinois-specific procurement requirements
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference (Level AA)</a> — Filterable checklist of accessibility requirements
- <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">WebAIM Contrast Checker</a> — Tool for checking color contrast ratios
- <a href="https://doit.illinois.gov/initiatives/accessibility/testing.html" target="_blank" rel="noopener noreferrer">DoIT Testing Resources</a> — Illinois-specific testing guidance
- <a href="https://www.section508.gov/test/" target="_blank" rel="noopener noreferrer">Section 508 Testing Resources</a> — Federal testing guidance

**Key takeaway:** Third-party tools don't exempt you from accessibility requirements. Verify platform accessibility, ensure your content is accessible, test real workflows, and keep an accessible alternative ready.

### What contract language should I use?

{updated:2026-10-26}

Illinois DoIT says the State "should include a requirement similar to the following whenever procuring information technology":

> "All information technology, including electronic information, software, systems, and equipment, developed or provided under this contract or procurement must comply with the applicable requirements of the Illinois Information Technology Accessibility Act (30 ILCS 587) Standards as published at <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/accessibility/iitaa</a>
>
> Where applicable, vendor shall provide the State of Illinois their most recent Voluntary Product Accessibility Template/Accessibility Conformance Report (VPAT/ACR)."

DoIT also suggests this optional clause:

> "Vendor shall, if requested by the State, provide a brief demonstration of accessibility features, including operation with keyboard-only commands, compliance with browser or device zoom and high-contrast settings, and compatibility with screen reading technologies."

**References:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-procurement.html" target="_blank" rel="noopener noreferrer">IITAA Procurement Guidance</a> — Official Illinois contract language recommendations
- <a href="https://www.section508.gov/buy/request-accessibility-information/" target="_blank" rel="noopener noreferrer">Section508.gov: Request Accessibility Information</a> — Federal procurement best practices

### What is a VPAT? What is an ACR?

{updated:2026-10-26}

**Quick answer:** A **VPAT (Voluntary Product Accessibility Template)** is a standardized form vendors fill out to describe how their product meets accessibility standards. An **ACR (Accessibility Conformance Report)** is the completed VPAT — the actual document you request from vendors. ITI's template uses only these two terms, so if a solicitation asks for a document by another name, ask the buyer what they mean.

**Full explanation:**

**VPAT = the blank form; ACR = the completed report.** These terms are often used interchangeably, but technically:

- **VPAT (Voluntary Product Accessibility Template)** — The blank template created by the Information Technology Industry Council (ITI) that provides a standard format for documenting accessibility conformance
- **ACR (Accessibility Conformance Report)** — The completed document a vendor provides, showing how their specific product meets (or doesn't meet) accessibility standards

**What a VPAT/ACR tells you:**

1. **Which standard is evaluated** — Look for WCAG 2.1 Level AA (the current requirement)
2. **Conformance level for each criterion** — Common ratings include:
   - **Supports** — at least one way to meet the criterion with no known defects
   - **Partially Supports** — some functionality doesn't meet the criterion
   - **Does Not Support** — most functionality doesn't meet the criterion
   - **Not Applicable** — the criterion doesn't apply to the product
   - **Not Evaluated** — ITI allows this only for Level AAA rows; on a Level A or AA row it means untested, so ask
3. **Remarks and explanations** — Details on how conformance is achieved or what barriers exist

**How to use VPATs in procurement:**

1. **Request a current VPAT/ACR** — Ask for one dated within the last 12 months
2. **Check the version** — Ensure it covers the exact product and version you're purchasing
3. **Look for "Supports"** — Products with many "Partially Supports" or "Does Not Support" ratings may require accessible alternatives
4. **Ask about remediation** — If issues exist, ask the vendor for a remediation timeline
5. **Include in contracts** — Require WCAG 2.1 Level AA compliance and ongoing accessibility support

**Where to find VPATs:**

- Check the vendor's website (often under "Accessibility" or "Legal")
- Request directly from your sales representative
- Search the <a href="https://www.itic.org/policy/accessibility/vpat" target="_blank" rel="noopener noreferrer">ITI VPAT template page</a> for the latest template version

**Red flags in a VPAT:**

- Very old date (more than 12-18 months)
- Wrong product version
- Many "Does Not Support" ratings for critical criteria
- Vague or missing explanations
- No commitment to remediation

**The bottom line:** Request a current VPAT/ACR before purchasing technology. It won't guarantee accessibility, but it's your first line of defense against buying inaccessible tools.

**References:**

- <a href="https://www.itic.org/policy/accessibility/vpat" target="_blank" rel="noopener noreferrer">ITI VPAT Template</a> — Official VPAT template and guidance
- <a href="https://www.section508.gov/sell/how-to-create-acr-with-vpat/" target="_blank" rel="noopener noreferrer">Section508.gov: How to Create an ACR</a> — Federal guidance on VPATs

### What if a vendor has no VPAT or refuses to provide one?

{new:2026-08-13}

**Quick answer:** A missing VPAT doesn't excuse the purchase — your agency stays responsible for vendor-provided content under 28 CFR § 35.200(a), which covers content made available "directly or through contractual, licensing, or other arrangements." Treat "no VPAT" as a risk signal, and shift the burden back onto the vendor before you sign.

**Escalation path when a vendor can't produce accessibility documentation:**

1. **Ask again, in writing, with the template.** Some vendors simply haven't been asked before. Point them to the <a href="https://www.itic.org/policy/accessibility/vpat" target="_blank" rel="noopener noreferrer">ITI VPAT template</a> and Section508.gov's <a href="https://www.section508.gov/buy/request-accessibility-information/" target="_blank" rel="noopener noreferrer">guidance on requesting accessibility information</a>.
2. **Test the actual product yourself.** A VPAT is a self-report anyway — run the product's key workflows with keyboard-only navigation, a screen reader, and an automated checker (axe, WAVE). A live demo you can test beats paperwork you can't verify.
3. **Put the obligation in the contract.** Require WCAG 2.1 Level AA conformance, a remediation timeline for defects, and delivery of an ACR — see [What contract language should I use?](#procurement-and-third-party-tools-what-contract-language-should-i-use)
4. **Weigh competitors that can document conformance.** An available ACR is a real differentiator between otherwise similar products.
5. **If you must proceed anyway, document the decision:** the accessibility testing you did, the barriers you found, the vendor's remediation commitments, and how you will provide an accessible alternative path to the same service (the effective-communication duty applies regardless of the tool you buy).

**Remember why this matters:** the rule pulls vendor content into *your* obligation — a vendor's silence on accessibility becomes your compliance gap. See [Does hiring a remediator shield our agency from compliance liability?](#procurement-and-third-party-tools-does-hiring-a-remediator-shield-our-agency-from-compliance-liability)

**See also:** [What should I do when purchasing software or services?](#procurement-and-third-party-tools-what-should-i-do-when-purchasing-software-or-services) | [What is a VPAT? What is an ACR?](#procurement-and-third-party-tools-what-is-a-vpat-what-is-an-acr)

**References:**

- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200(a) (eCFR)</a> — "directly or through contractual, licensing, or other arrangements"
- <a href="https://www.section508.gov/buy/request-accessibility-information/" target="_blank" rel="noopener noreferrer">Section508.gov: Request Accessibility Information</a> — Federal procurement practice for exactly this situation
- <a href="https://www.itic.org/policy/accessibility/vpat" target="_blank" rel="noopener noreferrer">ITI: VPAT Template</a> — The template to hand a vendor who doesn't have one

### A vendor's VPAT uses WCAG 2.2 — does it satisfy our WCAG 2.1 AA requirement?

{updated:2026-09-02}

**Quick answer:** Usually yes — if the report genuinely covers the criteria that matter. WCAG 2.2 includes every WCAG 2.1 Level A/AA success criterion (it retires only the obsolete parsing criterion, 4.1.1), so a credible WCAG 2.2 Level AA conformance report speaks directly to your WCAG 2.1 Level AA target. The version label is less important than whether the 2.1-relevant rows say "Supports."

**Why you're seeing this:** the current <a href="https://www.itic.org/policy/accessibility/vpat" target="_blank" rel="noopener noreferrer">ITI VPAT template</a> covers WCAG 2.2, and major vendors (Docebo, Tableau/Salesforce, and others) now publish ACRs against WCAG 2.2. That's a good sign, not a mismatch problem.

**How to read a WCAG 2.2-based ACR against a 2.1 requirement:**

1. **Check the edition and standard listed** on the report's first pages — a WCAG 2.2 report's tables include the WCAG 2.1 A/AA criteria as a subset.
2. **Read the ratings on the 2.1-level rows** ("Supports" / "Partially Supports" / "Does Not Support") — those rows *are* your WCAG 2.1 AA assessment.
3. **Ignore 2.2-only rows for compliance purposes** (the four Level AA criteria new in 2.2 — focus not obscured 2.4.11, dragging movements 2.5.7, target size 2.5.8, and accessible authentication 3.3.8 — along with 2.2's Level A and AAA additions) — useful signal, but not part of the legal target. See [Should we test against WCAG 2.2 or WCAG 2.1?](#common-concerns-should-we-test-against-wcag-2-2-or-wcag-2-1)
4. **Treat any ACR as a starting claim, not proof** — spot-check the product's key workflows yourself, and get remediation commitments for anything rated "Partially Supports."

**The reverse situation is the risky one:** an ACR evaluated only against WCAG 2.0 or Section 508's 2017 baseline does **not** cover the criteria added in WCAG 2.1 (mobile/reflow, orientation, input modalities). Ask those vendors for a current report.

**See also:** [What is a VPAT? What is an ACR?](#procurement-and-third-party-tools-what-is-a-vpat-what-is-an-acr)

**References:**

- <a href="https://www.itic.org/policy/accessibility/vpat" target="_blank" rel="noopener noreferrer">ITI: VPAT Template</a> — Current template editions and covered standards
- <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">WCAG 2.2 (W3C Recommendation)</a> — Relationship between 2.2 and 2.1

### We hired a third-party remediation firm — does that mean authors don't need to learn accessibility anymore?

{updated:2026-10-26}

**Quick answer:** No. Hiring a remediation consultant **doesn't move the responsibility off your agency** under ADA Title II or IITAA, and it does not stop the daily creation of new inaccessible content. A remediator cleans up the **past**; only trained authors keep the **future** clean. Both are needed.

**Why authors are still on the hook:**

- **The rule talks to the agency, not its vendors.** Under the **ADA Title II web rule (28 CFR § 35.200(a))**, "a public entity shall ensure" that the web content and mobile apps it "provides or makes available, directly or through contractual, licensing, or other arrangements" comply with WCAG 2.1 Level AA. Notice the subject of that sentence: the **public entity** — your agency. You can hire a vendor to do the work; you can't hire them to be the one who's responsible for the result. If a remediated page regresses or a new inaccessible PDF gets uploaded tomorrow, it's the agency's name on the missed bar, not the consultant's.
- **Illinois IITAA (30 ILCS 587) and the IITAA 2.1 Standards** apply to information and communication technology that is "procured, developed, maintained, or used by agencies" (IITAA 2.1 Standards, E201.1). There is no provision that suspends agency responsibility while a vendor is engaged. DoIT's IITAA Procurement Guidance has the State write the IITAA standards into its IT contracts — vendors help the agency meet its duty; they don't absorb it.
- **WCAG 2.1 Level AA isn't a one-time audit grade — it's a property of the page every time you publish.** A page that conformed yesterday can fail today the moment an author replaces an alt text with `image1.jpg`, pastes a low-contrast color, or uploads an untagged PDF. WCAG even spells this out explicitly — Conformance Requirement 2 (Full pages) says conformance "**cannot be achieved if part of a web page is excluded**." Every save and every new piece of content has to clear the same bar.

**Why IITAA matters even if you think you're "covered" by ADA Title II:**

Managers often hear "ADA Title II web rule" and assume that's the entire universe of rules they need to worry about. It isn't the whole picture. Illinois has had its own digital-accessibility statute on the books since 2007 (with technical standards in effect since 2008) — long before the federal rule existed — and that statute applies to your agency *independently* of the federal rule. The DoIT site is unambiguous about this:

> "While the Americans with Disabilities Act and Section 504 of the Rehabilitation Act already require the State to ensure its communications and services are accessible, the IITAA establishes specific technical standards and encourages the State to address accessibility proactively."
>
> — <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

In practical terms, that means:

- **Two laws apply at once.** ADA Title II (federal) and IITAA (state) both apply to Illinois state agencies. They share the same technical standard (WCAG 2.1 Level AA) but have **separate enforcement paths** — DOJ for ADA Title II; DoIT plus state procurement and governance controls for IITAA. Doing one well doesn't get you a pass on the other.
- **IITAA is broader than the federal web rule in scope.** The federal rule is specifically about web content and mobile apps. IITAA covers all "information and communication technology" — websites, electronic documents, software, computers and peripherals, information kiosks, multifunction office machines, telecommunications equipment. A remediator focused only on web/PDF leaves a chunk of your IITAA exposure untouched.
- **IITAA has been law since 2007, with technical standards since 2008.** The IITAA 2.1 Standards (effective June 24, 2024) require WCAG 2.1 AA — but the underlying obligation predates the federal rule by 16 years. "We'll get to it by April 2027" is a federal-deadline answer, not an IITAA answer; under IITAA, the duty is already in effect today.
- **DoIT says IT contracts should carry IITAA language.** DoIT's guidance is that the State "should include a requirement similar to" its recommended language (quoted below) "whenever procuring information technology," and the Act has each State entity build the standards into its procurement rules, policies, and procedures (30 ILCS 587/20). A remediation contract without that reference skips that step.
- **Both laws point at the agency, not the vendor.** Hiring a remediator doesn't give you a "we paid someone to handle it" answer under either one. In both rules, your agency is the entity being asked to comply.

If a manager only reads one quote on this point, this is the one:

> "The Illinois Information Technology Accessibility Act (IITAA) requires Illinois agencies and universities to **ensure** that their web sites, information systems, and information technologies are accessible to people with disabilities." _(emphasis added)_
>
> — <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

The duty is on the **agency**, not its vendors, and the verb is **"ensure"** — not "delegate," not "outsource," not "contract for."

**What the rules actually say (verbatim, with sources):**

If a manager is going to push back on this guidance, the regulatory text itself is the most persuasive answer. Each block below is a verbatim quote linked to its primary source.

**ADA Title II — 28 CFR § 35.200(a) "General":**

> "A public entity shall ensure that the following are readily accessible to and usable by individuals with disabilities:
>
> (1) Web content that a public entity provides or makes available, directly or through contractual, licensing, or other arrangements; and
>
> (2) Mobile apps that a public entity provides or makes available, directly or through contractual, licensing, or other arrangements."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200 (eCFR)</a> · <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">final rule, 89 FR 31320 (Apr. 24, 2024)</a>

Read the subject and verb: the rule is talking to **"a public entity"** — your agency — and it says that entity **"shall ensure"** the requirement is met. The scope is broad on purpose: content provided **"directly or through contractual, licensing, or other arrangements."** A remediation vendor's deliverables fit squarely inside that scope, not outside it.

**ADA Title II — 28 CFR § 35.130(b)(1) (the general non-discrimination rule, on the books since 1991):**

> "A public entity, in providing any aid, benefit, or service, may not, directly or through contractual, licensing, or other arrangements, on the basis of disability—
>
> (i) Deny a qualified individual with a disability the opportunity to participate in or benefit from the aid, benefit, or service; ..."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-B/section-35.130" target="_blank" rel="noopener noreferrer">28 CFR § 35.130(b)(1) (eCFR)</a>

This provision predates the web rule by 33 years and says the same thing in plainer terms: a public entity may not discriminate **"directly or through contractual, licensing, or other arrangements."** Hiring a remediation firm is a contractual arrangement — it sits squarely inside § 35.130(b)(1), not around it. Its neighbor, § 35.130(b)(3), applies the same rule to "methods of administration."

**Illinois IITAA — agency duty:**

> "The Illinois Information Technology Accessibility Act (IITAA) requires Illinois agencies and universities to ensure that their web sites, information systems, and information technologies are accessible to people with disabilities."
>
> "The IITAA covers all 'information and communication technology,' including: websites, electronic documents & videos; software & applications; computers and peripherals; information kiosks; multifunction office machines; telecommunications equipment"

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

The duty under state law is on the **agency**. The scope of "information and communication technology" is broader than the federal web rule and explicitly includes things a typical web-remediation engagement won't touch (kiosks, office machines, telecommunications equipment).

**Illinois IITAA — current technical standard:**

> "The IITAA 2.1 Standards, which require conformance with WCAG 2.1 AA, went into effect on June 24, 2024."
>
> "Illinois' accessibility standards are based on the United States' Section 508 Standards and require conformance with the World Wide Web Consortium's Web Content Accessibility Guidelines (WCAG) 2.1 Level AA"

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

The IITAA technical bar is in effect **now** (since June 24, 2024) — not on the federal-rule timeline.

**Illinois IITAA — Procurement contract language (DoIT-recommended):**

> "All information technology, including electronic information, software, systems, and equipment, **developed or provided under this contract or procurement** must comply with the applicable requirements of the Illinois Information Technology Accessibility Act (30 ILCS 587) Standards"

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-procurement.html" target="_blank" rel="noopener noreferrer">DoIT: IITAA Procurement Guidance</a>

The state's own recommended language reaches IT "developed or provided under this contract" — i.e., a remediator's deliverables are explicitly within the IITAA frame. The contract is how the agency pushes its duty *toward* the vendor; it is not how the agency divests the duty.

**WCAG 2.1 — Conformance Requirement 2: Full pages:**

> "Conformance (and conformance level) is for full web page(s) only, and **cannot be achieved if part of a web page is excluded**."

— <a href="https://www.w3.org/TR/WCAG21/#conformance" target="_blank" rel="noopener noreferrer">WCAG 2.1, Section 5 (Conformance)</a>

A remediated page that is later joined by a fresh non-conforming widget, embed, or PDF link **breaks** the page-level conformance the remediator delivered. WCAG does not let you carve out the new content and claim conformance for the old.

**WCAG 2.1 — Third-party content (W3C Understanding doc):**

> "When an author makes a decision to use a third party implementation, they should choose products that meet WCAG requirements. **If all content on a page, including third party content, meets all WCAG success criteria then the page conforms to WCAG.**"

— <a href="https://www.w3.org/WAI/WCAG21/Understanding/conformance" target="_blank" rel="noopener noreferrer">W3C WAI: Understanding Conformance</a>

Even W3C — which does not enforce anything — places the choice of third-party content on the **author** and conditions page conformance on the third-party content meeting the same success criteria. Hiring a remediator does not change who the "author" is for new content.

**Why "the firm will catch it" is a treadmill, not a strategy:**

Most remediation engagements have a **finite scope** — a specific list of pages, documents, or sites, audited and fixed once. The agency keeps creating content. Without trained authors:

- New content is **created inaccessible** at the same rate as before, refilling the backlog the consultant just emptied.
- Remediation moves from a **one-time project** (definable cost) to a **permanent line item** (open-ended cost).
- Cycle time for new public information goes up because every piece has to be reviewed and fixed downstream instead of authored correctly upstream.
- Authors lose the chance to design the **information itself** for accessibility (clear headings, plain language, decoupled text and images) — the consultant can fix tagging and contrast but cannot rewrite a 200-page report into a usable structure for a screen reader.

**What a good division of labor actually looks like:**

| Remediation firm                                                                | Agency authors                                                                  |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Audits the existing inventory and produces a prioritized backlog                | Stop the bleeding: every new document/page authored to WCAG 2.1 AA from day one |
| Tags legacy PDFs, adds alt text, fixes color contrast, repairs broken structure | Write descriptive headings, meaningful link text, real alt text at creation     |
| Provides VPAT-style evidence and remediation logs for procurement records (VPAT = the vendor's accessibility self-assessment; see [What is a VPAT?](#procurement-and-third-party-tools-what-is-a-vpat-what-is-an-acr)) | Maintain the accessibility of pages they own after remediation hand-back |
| Trains staff and writes templates/style guides                                  | Use the templates; raise issues the templates don't cover                       |
| Re-tests after major platform changes                                           | Run a quick checklist (headings, alt text, contrast, link text) before publish  |

**Contract clauses that make this real:**

If you are bringing in a remediator, write the contract so the work compounds instead of evaporating:

- **Knowledge transfer.** Templates, checklists, and a written style guide your staff will own after the engagement.
- **Author training.** Live or recorded training tied to the tools your staff actually uses (Word, Acrobat, your CMS, Tableau, ArcGIS, Canva, etc.), not generic WCAG slides.
- **Re-test rights.** A clause allowing the agency to re-engage on regressions after the firm has handed back, at a defined rate.
- **WCAG 2.1 Level AA as the acceptance criterion** — not "best effort" or "industry standard." Reference IITAA 2.1 explicitly so state procurement rules apply (see [What contract language should I use?](#procurement-and-third-party-tools-what-contract-language-should-i-use)).
- **Deliverables in the agency's hands**, not behind the vendor's portal — accessibility conformance reports, source files, and remediation logs that the agency can hand to DOJ, DoIT, or a complainant if asked.

**What changes for individual authors:**

- **Less ambiguity, not less work.** A good remediator will give you concrete templates and patterns. Use them. The expectation is that **new** content goes out accessible — the remediator isn't signing up to check every new piece you publish.
- **Faster review cycles.** When the remediator finds a recurring issue (every Word export missing language metadata, every image lacking alt text), that is a workflow problem the author needs to fix at the source, not a one-off the consultant should keep patching.
- **Better tools, same duty.** Authors should expect training, checklists, and style guides as part of the engagement — and should ask for them if they're not offered.

**The bottom line:**

A remediation firm is leverage, not a substitute. The agency is the entity named in both rules (ADA Title II § 35.200 and IITAA 2.1); WCAG 2.1 Level AA is a bar your pages and digital documents have to clear every time you publish, not a one-time grade; and the only way the math works is if **new** content is authored accessible while the firm clears the **legacy** content. Treat remediation as a one-time floor-clearing exercise that gives your trained authors a clean room to work in — not a service that takes the work off your authors' plates.

**See also:**

- [Does hiring a remediator shield our agency from compliance liability?](#procurement-and-third-party-tools-does-hiring-a-remediator-shield-our-agency-from-compliance-liability) — the liability-specific version of this question
- [How do we ensure accessibility compliance with third-party tools like LMSs (Docebo), DocuSign, Tableau, ArcGIS, and Canva?](#procurement-and-third-party-tools-how-do-we-ensure-accessibility-compliance-with-third-party-tools-like-lmss-docebo-docusign-tableau-arcgis-and-canva) — applies the same "agency stays responsible" logic to embedded vendor platforms
- [What contract language should I use?](#procurement-and-third-party-tools-what-contract-language-should-i-use) — IITAA-aligned procurement language Illinois DoIT recommends

**References:**

- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">ADA Title II web rule (89 FR 31320)</a> — places the WCAG 2.1 AA duty on the public entity (28 CFR § 35.200)
- <a href="https://www.federalregister.gov/documents/2026/04/20/2026-07663/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web" target="_blank" rel="noopener noreferrer">DOJ Interim Final Rule (April 20, 2026)</a> — extended compliance to April 26, 2027 (technical standard unchanged)
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — state-law obligations on agencies (30 ILCS 587)
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-procurement.html" target="_blank" rel="noopener noreferrer">IITAA Procurement Guidance</a> — flowing accessibility duties into vendor contracts
- <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference (Level AA)</a> — the technical bar both rules reference

### Does hiring a remediator shield our agency from compliance liability?

{updated:2026-05-14}

**Quick answer:** No. A remediation vendor can do the _work_, but it cannot become the entity that is _responsible_ for the result. Both the ADA Title II web rule and the IITAA put the duty on the **public entity** — your agency — in language that specifically reaches work done "through contractual, licensing, or other arrangements." A contract can shift **cost** (through indemnification), but the **liability** stays with the agency. When DOJ investigates or a member of the public files a complaint, it is the agency's name on the matter, not the vendor's.

**Full explanation:**

This usually shows up as some version of: _"We're paying a firm to handle remediation — doesn't that move the risk to them?"_ It's a reasonable instinct, and it's how risk works in a lot of procurement. It is not how it works here.

**1. The duty stays with the agency — the rules themselves say so.**

Both rules were drafted with outsourcing in mind, and both close the door on it.

**ADA Title II — 28 CFR § 35.200(a) "General":**

> "A public entity shall ensure that the following are readily accessible to and usable by individuals with disabilities:
>
> (1) Web content that a public entity provides or makes available, directly or through contractual, licensing, or other arrangements; and
>
> (2) Mobile apps that a public entity provides or makes available, directly or through contractual, licensing, or other arrangements."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200 (eCFR)</a>

The subject of that sentence is the **public entity**, and the verb is **"shall ensure."** The rule does not say "shall ensure, unless a vendor is doing the work." It extends the duty to content provided "through contractual ... arrangements" — a remediation contract is exactly that kind of arrangement, so it falls _inside_ the duty, not outside it.

**ADA Title II — 28 CFR § 35.130(b)(1) (the general non-discrimination rule, on the books since 1991):**

> "A public entity, in providing any aid, benefit, or service, may not, directly or through contractual, licensing, or other arrangements, on the basis of disability—
>
> (i) Deny a qualified individual with a disability the opportunity to participate in or benefit from the aid, benefit, or service; ..."

— <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-B/section-35.130" target="_blank" rel="noopener noreferrer">28 CFR § 35.130(b)(1) (eCFR)</a>

This is the older, broader hook, and it is the cleanest statement of the principle: **a public entity cannot do through a contractor what it is not allowed to do itself.** The 2024 web rule did not invent agency responsibility for contracted work — § 35.130(b)(1) has said so for three decades, and § 35.130(b)(3) applies the same rule to "methods of administration."

**Illinois IITAA (30 ILCS 587):**

> "The Illinois Information Technology Accessibility Act (IITAA) requires Illinois agencies and universities to **ensure** that their web sites, information systems, and information technologies are accessible to people with disabilities." _(emphasis added)_

— <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a>

Same structure under state law: the duty is on the **agency**, and the verb is **"ensure"** — not "arrange for," not "delegate." IITAA is also a separate obligation with a separate enforcement path, so even a flawless ADA-focused remediation contract leaves the IITAA duty sitting where it always was.

**2. Enforcement runs against the agency, not the vendor.**

If a member of the public encounters a barrier, they file a complaint against your agency with DOJ — or bring a private suit against your agency. DOJ investigates the **public entity's** compliance. The remediation firm is not the respondent and is not the entity a settlement or consent decree binds. You can hire a vendor to _do_ the remediation; you cannot hire a vendor to _be the one the regulator is asking about._

**3. A contract shifts cost — not liability. Know the difference.**

|  | What it does | What it does **not** do |
| --- | --- | --- |
| **Indemnification clause** | May let the agency recover _money_ from the vendor if a vendor failure causes a loss — assuming the clause is well-drafted, the failure is within scope, and the vendor is solvent | Does **not** change who answers to DOJ, a court, DoIT, or a complainant. The agency is still the responsible party. |
| **"WCAG 2.1 AA" acceptance criteria** | Gives the agency leverage to make the vendor fix substandard work, plus a paper trail | Does **not** make the vendor the legally responsible party for the public-facing result |
| **A VPAT/ACR or audit report from the vendor** | Useful _evidence_ the agency can show DOJ or DoIT | Is **not** a liability shield — it is the agency's evidence, in the agency's file |

Indemnification is risk _allocation between two private parties_. Regulatory liability is a relationship _between the agency and the public/government_. A contract can only touch the first one.

**4. So what is a remediator actually good for?**

Plenty — just not as a shield. The useful question is not _"are we shielded?"_ — it is _"does this engagement make our compliance posture stronger and more defensible?"_ A good remediation contract delivers **capacity** (clears a legacy backlog faster than internal staff could), **expertise** (deep PDF/tagging/ARIA knowledge most agencies lack in-house), **evidence** (audit reports and remediation logs showing systematic, good-faith progress), and **knowledge transfer** (templates and author training that keep _new_ content clean). All of that strengthens the agency's position. None of it moves the agency out of the position.

**5. What actually lowers exposure (instead of relocating it):**

- **Documented remediation progress** — a real inventory, a prioritized backlog, dated fixes. See [How can I track and demonstrate "good-faith progress" toward compliance?](#getting-started-how-can-i-track-and-demonstrate-good-faith-progress-toward-compliance).
- **Stopping the bleeding** — trained authors so new content is born accessible and the backlog stops refilling.
- **A designated ADA coordinator and a published grievance procedure** — <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.107" target="_blank" rel="noopener noreferrer">28 CFR § 35.107</a> requires both for public entities with 50 or more employees.
- **An effective-communication process** — a fast path to provide accessible alternatives on request (28 CFR § 35.160).

**Bottom line:** A remediator is **leverage, not liability transfer.** Use one to clear legacy content faster and to build the evidence file — but the agency is the entity named in both rules, and it stays the entity named in both rules no matter what the contract says. Write the contract to make your compliance posture _stronger_; do not write it expecting it to make the duty _someone else's_.

**Important disclaimer:** This is general guidance, not legal advice. Indemnification language, contractual risk allocation, and your agency's specific exposure are questions for your agency's legal counsel. Use this to frame that conversation — not to replace it.

**See also:**

- [We hired a third-party remediation firm — does that mean authors don't need to learn accessibility anymore?](#procurement-and-third-party-tools-we-hired-a-third-party-remediation-firm-does-that-mean-authors-don-t-need-to-learn-accessibility-anymore) — the broader version of this misconception
- [How do we ensure accessibility compliance with third-party tools like LMSs (Docebo), DocuSign, Tableau, ArcGIS, and Canva?](#procurement-and-third-party-tools-how-do-we-ensure-accessibility-compliance-with-third-party-tools-like-lmss-docebo-docusign-tableau-arcgis-and-canva) — same "agency stays responsible" logic for embedded vendor platforms
- [What contract language should I use?](#procurement-and-third-party-tools-what-contract-language-should-i-use) — IITAA-aligned procurement language
- [How can I track and demonstrate "good-faith progress" toward compliance?](#getting-started-how-can-i-track-and-demonstrate-good-faith-progress-toward-compliance) — what documentation actually helps

**References:**

- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200" target="_blank" rel="noopener noreferrer">28 CFR § 35.200 (eCFR)</a> — "a public entity shall ensure"; the duty attaches to the public entity
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-B/section-35.130" target="_blank" rel="noopener noreferrer">28 CFR § 35.130 (eCFR)</a> — no discrimination "directly or through contractual, licensing, or other arrangements"
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.107" target="_blank" rel="noopener noreferrer">28 CFR § 35.107 (eCFR)</a> — required ADA coordinator and grievance procedures for entities with 50 or more employees
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: ADA Title II Web Rule (89 FR 31320)</a> — full rule text
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — state-law duty on the agency (30 ILCS 587)

---

## ICJIA-Specific Information

This section contains information specific to the Illinois Criminal Justice Information Authority (ICJIA). If you work for a different Illinois state agency, the general principles apply, but the specific resources and contacts may differ.

### How do we handle accessibility complaints?

{updated:2026-11-06}

**Quick answer:** ICJIA has had a formal ADA grievance procedure since 1993: <a href="https://ilga.gov/agencies/JCAR/EntirePart?titlepart=00400150" target="_blank" rel="noopener noreferrer">4 Ill. Adm. Code Part 150</a>. Formal complaints of disability discrimination go to ICJIA's Equal Employment Opportunity (EEO) Officer, who investigates; the Executive Director makes the final decision. The guidance below covers everyday reports of accessibility barriers, which you can often resolve before they become formal complaints.

**Note — a published grievance procedure is a standing legal requirement, not just a best practice.** ADA Title II's <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-A/section-35.107" target="_blank" rel="noopener noreferrer">28 CFR § 35.107(b)</a> requires every public entity with 50 or more employees to **adopt and publish grievance procedures** for prompt and equitable resolution of disability-discrimination complaints. The same section, § 35.107(a), requires a designated ADA Coordinator — see [Do we need an agency accessibility coordinator?](#state-agency-applicability-do-we-need-an-agency-accessibility-coordinator). ICJIA's procedure is Part 150, adopted in 1993 to implement § 35.107.

**How a formal complaint works under Part 150:**

- **Who handles it:** ICJIA's EEO Officer investigates, documents the facts, presents findings, and advises management on resolving the complaint (§ 150.10).
- **How to file:** In writing, on ICJIA's discrimination complaint form, within 180 days of the last incident (unless there are extenuating circumstances). ICJIA must explain how to get the form and, on request, help the person fill it out (§ 150.20).
- **Timeline:** The EEO Officer's findings and recommendation are due within 10 working days. The Executive Director then issues ICJIA's final written decision within 5 working days of receiving the EEO Officer's report (§§ 150.20–150.40).
- **Other options stay open:** Using Part 150 doesn't take away anyone's right to file a charge directly with the Illinois Department of Human Rights or the U.S. EEOC (§ 150.10(d)), and every stage of the process must itself be accessible (§ 150.50).

**If someone reports an accessibility barrier:**

1. **Acknowledge promptly** — Thank the person for reporting and let them know you're looking into it
2. **Document the issue** — Record what barrier was reported, where it occurs, and contact information if provided
3. **Assess and prioritize** — Determine severity (complete blocker vs. inconvenience) and which content/system is affected
4. **Route to appropriate team** — Website issues → web developers; document issues → content owner; third-party tools → procurement/vendor contact
5. **Provide timeline** — Give the reporter an estimate of when they can expect resolution or follow-up
6. **Track resolution** — Document what was fixed and when

**What constitutes a complaint vs. a request:**

| Type                         | Example                                                        | Initial Response                                       |
| ---------------------------- | -------------------------------------------------------------- | ------------------------------------------------------ |
| **Complaint/barrier report** | "I can't access [specific content] because [specific barrier]" | Prioritize investigation and resolution                |
| **Accommodation request**    | "I need [specific format] for [specific document]"             | Provide alternative format while addressing root cause |
| **General feedback**         | "Your website is hard to use"                                  | Thank them and ask for specific examples               |

**For formal ADA complaints:**

Under ADA Title II, individuals may file complaints with the U.S. Department of Justice or pursue private legal action. If your agency receives a formal complaint:

1. **Notify executive staff immediately** — This requires leadership involvement
2. **Contact your agency's legal counsel** — They will guide the formal response
3. **Document everything** — Preserve records of the complaint, your accessibility efforts, and any communication
4. **Send it to ICJIA's EEO Officer** — Part 150 makes the EEO Officer responsible for the investigation. If the barrier is on a website or in a digital file, bring in **ICJIA's IT department** too, so the fix can start right away

**The goal:** Treat accessibility reports as service improvement opportunities, not as problems to defend against. Most people who report barriers just want to access the service — they're not looking for legal action.

**Who to contact:** Formal complaints of disability discrimination go to ICJIA's EEO Officer under Part 150. To report an accessibility barrier, or for accessibility questions, contact **ICJIA's IT department**.

---

## Getting Help

### Illinois Resources

{updated:2026-10-26}

| Resource                                 | Contact/Link                                                                                                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DoIT Office of Information Accessibility | DoIT.Accessibility@Illinois.gov                                                                                                                                                             |
| DoIT Accessibility Website               | <a href="https://doit.illinois.gov/initiatives/accessibility.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility.html</a>                   |
| IITAA 2.1 Standards | <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-2-1-standards.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-2-1-standards.html</a> |
| Accessibility Training Sign-up (Illinois staff only) | <a href="https://ilgov.sharepoint.com/sites/DoIT-Accessibility/SitePages/Training-Sign-Up.aspx" target="_blank" rel="noopener noreferrer">DoIT Accessibility Training Sign-up</a> |
| Accessibility Guides & Training          | <a href="https://doit.illinois.gov/initiatives/accessibility/guides.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/guides.html</a> |
| Testing Resources                        | <a href="https://doit.illinois.gov/initiatives/accessibility/testing.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/testing.html</a>   |

### Federal Resources

| Resource                    | Link                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ADA.gov — Title II web rule overview and webinar | <a href="https://www.ada.gov/title-ii-web-rule/" target="_blank" rel="noopener noreferrer">https://www.ada.gov/title-ii-web-rule/</a> |
| Section508.gov              | <a href="https://www.section508.gov/" target="_blank" rel="noopener noreferrer">https://www.section508.gov/</a>                       |
| W3C WCAG 2.1                | <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">https://www.w3.org/TR/WCAG21/</a>                   |
| WebAIM                      | <a href="https://webaim.org/" target="_blank" rel="noopener noreferrer">https://webaim.org/</a>                                       |

### Free Testing Tools

{updated:2026-10-26}

| Tool                    | Link                                                                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WAVE                    | <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">https://wave.webaim.org/</a>                                                                 |
| axe DevTools            | <a href="https://www.deque.com/axe/" target="_blank" rel="noopener noreferrer">https://www.deque.com/axe/</a>                                                             |
| ANDI                    | <a href="https://www.ssa.gov/accessibility/andi/help/install.html" target="_blank" rel="noopener noreferrer">https://www.ssa.gov/accessibility/andi/help/install.html</a> |
| WebAIM Contrast Checker | <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">https://webaim.org/resources/contrastchecker/</a>                       |
| PAC (PDF checker)       | <a href="https://pac.pdf-accessibility.org/" target="_blank" rel="noopener noreferrer">https://pac.pdf-accessibility.org/</a>                                             |
| ICJIA File Accessibility Audit (PDF, Word, PowerPoint, Excel) | <a href="https://audit.icjia.app" target="_blank" rel="noopener noreferrer">https://audit.icjia.app</a> |
| voicecap (NVDA screen reader transcripts, Windows) | <a href="https://github.com/ICJIA/voicecap" target="_blank" rel="noopener noreferrer">https://github.com/ICJIA/voicecap</a> |

---

## Glossary

**Confused by the jargon?** Here are plain-language definitions of common accessibility terms used throughout these FAQs:

### Legal and Standards Terms

{updated:2026-10-26}

**ADA (Americans with Disabilities Act)** — Federal civil rights law that prohibits discrimination against people with disabilities. **Title I** covers employment, including reasonable accommodations. **Title II** covers public services and requires state and local governments to make digital content accessible. <a href="https://www.ada.gov/" target="_blank" rel="noopener noreferrer">Learn more about ADA</a>

**ADA Title II Web Rule** — The 2024 Department of Justice rule that requires state and local governments to meet **WCAG 2.1 Level AA** for the web content and mobile apps they provide or make available — by April 26, 2027 for public entities with a total population of 50,000 or more (including every Illinois state agency), and by April 26, 2028 for smaller entities and special district governments. <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">Read the ADA Title II Web Rule Fact Sheet</a>

**IITAA (Illinois Information Technology Accessibility Act)** — Illinois state law (30 ILCS 587) requiring Illinois state agencies and universities to ensure their digital content is accessible to people with disabilities. Current standards require **WCAG 2.1 Level AA** compliance. <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Learn more about IITAA</a>

**Section 504** — Part of the Rehabilitation Act of 1973 that requires organizations receiving federal funding to ensure their programs and activities are accessible to people with disabilities. <a href="https://www.govinfo.gov/link/uscode/29/794" target="_blank" rel="noopener noreferrer">Read 29 U.S.C. § 794 (Section 504)</a>

**WCAG (Web Content Accessibility Guidelines)** — International standards published by the World Wide Web Consortium (W3C) that explain how to make digital content accessible. Think of them as a detailed checklist for making websites, documents, and apps usable by everyone. <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">Learn more about WCAG</a>

**WCAG 2.1 Level AA** — The specific accessibility standard required by both IITAA and ADA Title II. "Level AA" means meeting both Level A (minimum) and Level AA (standard) criteria. It's the compliance target for the web content and documents your agency provides — and, under IITAA, for internal systems too. <a href="https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1" target="_blank" rel="noopener noreferrer">View WCAG 2.1 Level AA Quick Reference</a>

### Procurement Terms

{updated:2026-10-26}

**ACR (Accessibility Conformance Report)** — The completed document a vendor provides showing how their product meets (or doesn't meet) accessibility standards. This is the actual report you request from vendors — the filled-out version of a VPAT. <a href="https://www.section508.gov/sell/how-to-create-acr-with-vpat/" target="_blank" rel="noopener noreferrer">Learn how to create an ACR</a>

**VPAT (Voluntary Product Accessibility Template)** — The blank template created by the Information Technology Industry Council (ITI) that provides a standard format for documenting accessibility conformance. Vendors fill out VPATs to create ACRs. <a href="https://www.itic.org/policy/accessibility/vpat" target="_blank" rel="noopener noreferrer">Download VPAT template</a>

**VPAT ratings** — Common ratings in VPATs/ACRs include:

- **Supports** — at least one way to meet the criterion with no known defects
- **Partially Supports** — some functionality doesn't meet the criterion
- **Does Not Support** — most functionality doesn't meet the criterion
- **Not Applicable** — the criterion doesn't apply to the product
- **Not Evaluated** — allowed only for Level AAA rows; on a Level A or AA row, ask why it wasn't tested

### Technical Terms

{updated:2026-11-06}

**Alt text (Alternative text)** — A brief written description of an image that screen readers read aloud to users who can't see the image. Example: "Director Smith presenting award to Officer Jones at the annual ceremony." Best practice: keep it short — usually a few words to one sentence — though screen readers handle longer text when an image needs it.

**ARIA (Accessible Rich Internet Applications)** — Code attributes that provide additional information to screen readers when standard HTML isn't enough. Think of it as labels and instructions for assistive technology. Web developers typically handle ARIA implementation. <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noopener noreferrer">Learn about ARIA Authoring Practices</a>

**Assistive technology** — Tools people with disabilities use to access digital content. Examples: screen readers (read content aloud), screen magnifiers, voice recognition software, alternative keyboards, switch devices.

**Captions** — Text displayed on screen that shows what's being said in a video. Different from subtitles (which assume you can hear) — captions also describe important sounds like "[door slams]" or "[music playing]." Required for WCAG 2.1 Level AA compliance. <a href="https://www.w3.org/WAI/media/av/captions/" target="_blank" rel="noopener noreferrer">Learn about captions</a>

**Color contrast ratio** — A measure of how readable text is against its background. WCAG 2.1 Level AA requires:

- **4.5:1** for normal text (smaller than 18pt regular or 14pt bold)
- **3:1** for large text (18pt+ regular or 14pt+ bold)
  <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">Test color contrast with WebAIM Contrast Checker</a>

**Focus indicator** — The visual outline that shows which element on a page is currently selected when navigating with a keyboard (usually by pressing Tab). Should be clearly visible so keyboard users know where they are.

**Heading structure** — Using proper heading styles (Heading 1, Heading 2, etc.) instead of just making text bold or larger. Screen readers use headings to navigate documents and web pages. Example: Use "Heading 1" for main titles, "Heading 2" for major sections, not just "Bold" formatting. <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" rel="noopener noreferrer">Learn about heading structure</a>

**Keyboard navigation** — The ability to access and use all website features using only a keyboard (Tab, Enter, Space, arrow keys) without a mouse. Required for WCAG 2.1 Level AA compliance.

**Screen reader** — Software that reads digital content aloud for people who are blind or have low vision. Common screen readers include <a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer">NVDA</a> (free, Windows), <a href="https://vispero.com/jaws-screen-reader-software/" target="_blank" rel="noopener noreferrer">JAWS</a> (Windows), and VoiceOver (built into Mac/iOS). To test a whole website with NVDA, see **voicecap** under Process Terms below.

**Transcript** — A written version of spoken audio content. Required for prerecorded audio-only content (like podcasts) under WCAG 2.1 SC 1.2.1 — a Level A criterion, so part of the Level AA target. <a href="https://www.w3.org/WAI/media/av/transcripts/" target="_blank" rel="noopener noreferrer">Learn about transcripts</a>

### Content-Specific Terms

{updated:2025-12-27}

**Accessible document** — A document (Word, PDF, PowerPoint, Excel) that has proper structure (headings, not just bold text), alt text for images, readable tables, and other features that make it usable by assistive technologies. <a href="https://www.section508.gov/create/documents/" target="_blank" rel="noopener noreferrer">Learn how to create accessible documents</a>

**Accessible template** — A document template (Word, PowerPoint, etc.) that's already set up with proper heading styles, accessible fonts, sufficient color contrast, and other accessibility features built in.

**Remediation** — The process of fixing inaccessible content to make it accessible. Example: Adding alt text to images, fixing heading structure, adding captions to videos.

**Semantic HTML** — HTML code that uses the correct elements for their intended purpose (e.g., `<button>` for buttons, `<nav>` for navigation, `<h1>`–`<h6>` for headings). This helps screen readers understand the structure and purpose of content.

### Process Terms

{updated:2026-10-26}

**Automated testing** — Using software tools (like <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">WAVE</a>, <a href="https://www.deque.com/axe/" target="_blank" rel="noopener noreferrer">axe DevTools</a>, Lighthouse) to automatically scan for accessibility issues. These tools catch many problems but can't detect everything — manual testing is also required. <a href="https://doit.illinois.gov/initiatives/accessibility/testing.html" target="_blank" rel="noopener noreferrer">Illinois DoIT Testing Resources</a>

**Manual testing** — Testing accessibility by actually using assistive technologies (keyboard navigation, screen readers) or checking things manually (color contrast, zoom testing). Required because automated tools miss many issues. <a href="https://doit.illinois.gov/initiatives/accessibility/testing.html" target="_blank" rel="noopener noreferrer">Illinois DoIT Testing Resources</a>

**Prioritization** — The process of deciding which accessibility issues to fix first when you can't fix everything at once. Typically based on impact: high-traffic content, critical services, and complete blockers come first.

**voicecap** — ICJIA's free, open-source screen reader testing tool. It runs the NVDA screen reader through each page on a website's sitemap or page list — line by line, heading by heading, and control by control — and saves everything NVDA says as text transcripts for a person to review, with a plain-language report and a fingerprinted record. See [What is voicecap, and why did ICJIA build it?](#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it)

**VPAT/ACR review** — The process of evaluating a vendor's accessibility documentation (VPAT/ACR) to determine if their product meets your accessibility requirements before purchasing.

---

## Keyword Index

**Find questions by topic:** Use this index to quickly locate FAQs related to specific keywords or topics. Questions may appear under multiple keywords.

### Accessibility Basics

- [What is digital accessibility?](#understanding-accessibility-what-is-digital-accessibility)
- [What is WCAG?](#common-concerns-what-is-wcag)
- [What does "WCAG 2.1 Level AA" mean?](#common-concerns-what-does-wcag-2-1-level-aa-mean)
- [Should we test against WCAG 2.2 or WCAG 2.1?](#common-concerns-should-we-test-against-wcag-2-2-or-wcag-2-1)
- [What are the most common accessibility mistakes and issues to avoid?](#common-concerns-what-are-the-most-common-accessibility-mistakes-and-issues-to-avoid)
- [What WCAG requirements are commonly overlooked?](#website-accessibility-what-wcag-requirements-are-commonly-overlooked)
- [Why should I trust this FAQ if it wasn't created by agency leadership or official accessibility experts?](#understanding-accessibility-why-should-i-trust-this-faq-if-it-wasn-t-created-by-agency-leadership-or-official-accessibility-experts)
- [I'm already busy. Why should accessibility be a priority when I have other responsibilities?](#understanding-accessibility-i-m-already-busy-why-should-accessibility-be-a-priority-when-i-have-other-responsibilities)
- [How does digital accessibility and compliance fit into an agency's DEIA mission?](#understanding-accessibility-how-does-digital-accessibility-and-compliance-fit-into-an-agency-s-deia-mission)
- [Why does accessibility compliance require everyone's participation?](#common-concerns-why-does-accessibility-compliance-require-everyone-s-participation)
- [I'm already overloaded — how am I supposed to add accessibility to my workload?](#common-concerns-i-m-already-overloaded-how-am-i-supposed-to-add-accessibility-to-my-workload)

### Getting Started by Role

- [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start)
- [I'm a web developer. Where do I start?](#getting-started-i-m-a-web-developer-where-do-i-start)
- [I'm a manager. Where do I start?](#getting-started-i-m-a-manager-where-do-i-start)
- [I'm on executive staff. Where do I start?](#getting-started-i-m-on-executive-staff-where-do-i-start)
- [Quick Reference: Critical Actions By Role](#quick-reference-critical-actions-by-role)
- [Executive summary: what you need to know right now](#quick-start-read-this-first-executive-summary-what-you-need-to-know-right-now)
- [How should I track my accessibility fixes as a content creator?](#getting-started-how-should-i-track-my-accessibility-fixes-as-a-content-creator)
- [What exactly am I accountable for as a manager (vs. what my team is accountable for)?](#getting-started-what-exactly-am-i-accountable-for-as-a-manager-vs-what-my-team-is-accountable-for)

### Compliance & Legal

- [What is the IITAA?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-iitaa)
- [What is the ADA Title II digital accessibility rule?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-ada-title-ii-digital-accessibility-rule)
- [When must we comply with the ADA Title II rule?](#compliance-requirements-iitaa-and-ada-title-ii-when-must-we-comply-with-the-ada-title-ii-rule)
- [What happens after April 26, 2027?](#state-agency-applicability-what-happens-after-april-26-2027)
- [What if we can't meet the April 26, 2027 deadline?](#state-agency-applicability-what-if-we-can-t-meet-the-april-26-2027-deadline)
- [Are there exceptions to the April 2027 deadline? What qualifies?](#state-agency-applicability-are-there-exceptions-to-the-april-2027-deadline-what-qualifies)
- [Is the April 26, 2027 deadline final, or could a court move it back?](#compliance-requirements-iitaa-and-ada-title-ii-is-the-april-26-2027-deadline-final-or-could-a-court-move-it-back)
- [Did the federal deadline extension give Illinois agencies an extra year?](#compliance-requirements-iitaa-and-ada-title-ii-did-the-federal-deadline-extension-give-illinois-agencies-an-extra-year)
- [Can we face complaints or lawsuits before April 2027?](#compliance-requirements-iitaa-and-ada-title-ii-can-we-face-complaints-or-lawsuits-before-april-2027)
- [Did the Section 504 web deadlines change too?](#compliance-requirements-iitaa-and-ada-title-ii-did-the-section-504-web-deadlines-change-too)
- [Could the IITAA standards change in 2026?](#compliance-requirements-iitaa-and-ada-title-ii-could-the-iitaa-standards-change-in-2026)
- [Who must comply with the IITAA?](#compliance-requirements-iitaa-and-ada-title-ii-who-must-comply-with-the-iitaa)
- [What does the IITAA cover?](#compliance-requirements-iitaa-and-ada-title-ii-what-does-the-iitaa-cover)
- [How is the IITAA enforced?](#compliance-requirements-iitaa-and-ada-title-ii-how-is-the-iitaa-enforced)
- [When did the current IITAA standards take effect?](#compliance-requirements-iitaa-and-ada-title-ii-when-did-the-current-iitaa-standards-take-effect)
- [Where can I get IITAA training?](#compliance-requirements-iitaa-and-ada-title-ii-where-can-i-get-iitaa-training)
- [Who do I contact with IITAA questions?](#compliance-requirements-iitaa-and-ada-title-ii-who-do-i-contact-with-iitaa-questions)
- [What does the April 2027 deadline cover?](#compliance-requirements-iitaa-and-ada-title-ii-what-does-the-april-2027-deadline-cover)
- [Does ADA Title II apply to internal documents?](#compliance-requirements-iitaa-and-ada-title-ii-does-ada-title-ii-apply-to-internal-documents)
- [Why does your agency need to worry about digital accessibility? What does the April 2027 deadline mean?](#state-agency-applicability-why-does-your-agency-need-to-worry-about-digital-accessibility-what-does-the-april-2027-deadline-mean)
- [Why are we just hearing about this now?](#state-agency-applicability-why-are-we-just-hearing-about-this-now)
- [Who's going to notice if we're not compliant by April 26, 2027?](#common-concerns-who-s-going-to-notice-if-we-re-not-compliant-by-april-26-2027)
- [Given the uncertainty around enforcement, can we tell staff to continue with their current workflows for now?](#common-concerns-given-the-uncertainty-around-enforcement-can-we-tell-staff-to-continue-with-their-current-workflows-for-now)
- [After April 26, 2027, how do we maintain compliance (so we don't fall out of compliance again)?](#state-agency-applicability-after-april-26-2027-how-do-we-maintain-compliance-so-we-don-t-fall-out-of-compliance-again)

### Testing & Auditing

- [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility)
- [Why does SiteImprove (or another scanner) show 98% when axe-core shows 100%?](#website-accessibility-why-does-siteimprove-or-another-scanner-show-98-when-axe-core-shows-100)
- [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility)
- [Do we need an independent (external) accessibility audit to prove compliance? When is it worth it?](#website-accessibility-do-we-need-an-independent-external-accessibility-audit-to-prove-compliance-when-is-it-worth-it)
- [Can’t we just use an accessibility overlay/widget (a “one-click fix”) instead of doing remediation?](#website-accessibility-can-t-we-just-use-an-accessibility-overlay-widget-a-one-click-fix-instead-of-doing-remediation)
- [What is voicecap, and why did ICJIA build it?](#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it) — screen reader testing with NVDA

### Screen Reader Testing (voicecap)

- [What is voicecap, and why did ICJIA build it?](#screen-reader-testing-voicecap-what-is-voicecap-and-why-did-icjia-build-it)
- [How is voicecap different from automated checkers like axe, Pa11y, Lighthouse, or SiteImprove?](#screen-reader-testing-voicecap-how-is-voicecap-different-from-automated-checkers-like-axe-pa11y-lighthouse-or-siteimprove)
- [How does voicecap work, step by step?](#screen-reader-testing-voicecap-how-does-voicecap-work-step-by-step)
- [How much time does voicecap save?](#screen-reader-testing-voicecap-how-much-time-does-voicecap-save)
- [How accurate is voicecap, and how can a manager or auditor check its results?](#screen-reader-testing-voicecap-how-accurate-is-voicecap-and-how-can-a-manager-or-auditor-check-its-results)
- [What doesn't voicecap do? Does a clean voicecap report mean our site is compliant?](#screen-reader-testing-voicecap-what-doesn-t-voicecap-do-does-a-clean-voicecap-report-mean-our-site-is-compliant)
- [What do I need to run voicecap, and how do I get started?](#screen-reader-testing-voicecap-what-do-i-need-to-run-voicecap-and-how-do-i-get-started)
- [When should we run voicecap, and what do we do with the results?](#screen-reader-testing-voicecap-when-should-we-run-voicecap-and-what-do-we-do-with-the-results)

### Images & Alt Text

- [What about photos your agency takes at events — like speeches or awards ceremonies? Do those need to be accessible?](#content-accessibility-documents-pdfs-presentations-what-about-photos-your-agency-takes-at-events-like-speeches-or-awards-ceremonies-do-those-need-to-b)
- [How long should alt text be?](#content-accessibility-documents-pdfs-presentations-how-long-should-alt-text-be)
- [How do I handle complex images like charts, graphs, or infographics?](#content-accessibility-documents-pdfs-presentations-how-do-i-handle-complex-images-like-charts-graphs-or-infographics)
- [How do I make images accessible on social media, Constant Contact, or Canva?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-images-accessible-on-social-media-constant-contact-or-canva)
- [Who should write the alt text for photos?](#content-accessibility-documents-pdfs-presentations-who-should-write-the-alt-text-for-photos)
- [Are captions the same as alt text?](#content-accessibility-documents-pdfs-presentations-are-captions-the-same-as-alt-text)

### Documents (Word, PDF, Excel, PowerPoint)

- [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible)
- [My documents look fine — why do they need to be "accessible"?](#content-accessibility-documents-pdfs-presentations-my-documents-look-fine-why-do-they-need-to-be-accessible)
- [How do I make a Word document accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-a-word-document-accessible)
- [How do I make a PDF accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-a-pdf-accessible)
- [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility)
- [How do I make Excel spreadsheets accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-excel-spreadsheets-accessible)
- [How do I make PowerPoint presentations accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-powerpoint-presentations-accessible)
- [Is Canva accessible?](#content-accessibility-documents-pdfs-presentations-is-canva-accessible)
- [Why fix the source document (Word) instead of fixing the PDF after it's published?](#content-accessibility-documents-pdfs-presentations-why-fix-the-source-document-word-instead-of-fixing-the-pdf-after-it-s-published)
- [I work with complex data tables. Why does our website use Markdown, and how do I make my tables accessible?](#content-accessibility-documents-pdfs-presentations-i-work-with-complex-data-tables-why-does-our-website-use-markdown-and-how-do-i-make-my-tables-acces)

### Videos & Media

- [Do I need to caption all videos?](#website-accessibility-do-i-need-to-caption-all-videos)
- [What about cognitive accessibility and plain language?](#website-accessibility-what-about-cognitive-accessibility-and-plain-language)

### Website Development

- [What color contrast ratio is required?](#website-accessibility-what-color-contrast-ratio-is-required)
- [What are focus indicators and why do they matter?](#website-accessibility-what-are-focus-indicators-and-why-do-they-matter)
- [How do I make forms accessible?](#website-accessibility-how-do-i-make-forms-accessible)
- [How do I make mobile apps accessible?](#website-accessibility-how-do-i-make-mobile-apps-accessible)
- [Does our agency's password-protected intranet need to be accessible?](#website-accessibility-does-our-agency-s-password-protected-intranet-need-to-be-accessible)
- [What about archived documents on the intranet?](#website-accessibility-what-about-archived-documents-on-the-intranet)

### Social Media & Email

- [Do social media posts need to be accessible? How do I make them accessible?](#social-media-accessibility-do-social-media-posts-need-to-be-accessible-how-do-i-make-them-accessible)
- [How do I make emails and newsletters accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-emails-and-newsletters-accessible)

### Procurement & Third-Party Tools

- [What should I do when purchasing software or services?](#procurement-and-third-party-tools-what-should-i-do-when-purchasing-software-or-services)
- [How do we ensure accessibility compliance with third-party tools like LMSs (Docebo), DocuSign, Tableau, ArcGIS, and Canva?](#procurement-and-third-party-tools-how-do-we-ensure-accessibility-compliance-with-third-party-tools-like-lmss-docebo-docusign-tableau-arcgis-and-canva)
- [What contract language should I use?](#procurement-and-third-party-tools-what-contract-language-should-i-use)
- [What is a VPAT? What is an ACR?](#procurement-and-third-party-tools-what-is-a-vpat-what-is-an-acr)
- [What if a vendor has no VPAT or refuses to provide one?](#procurement-and-third-party-tools-what-if-a-vendor-has-no-vpat-or-refuses-to-provide-one)
- [A vendor's VPAT uses WCAG 2.2 — does it satisfy our WCAG 2.1 AA requirement?](#procurement-and-third-party-tools-a-vendor-s-vpat-uses-wcag-2-2-does-it-satisfy-our-wcag-2-1-aa-requirement)
- [We hired a third-party remediation firm — does that mean authors don't need to learn accessibility anymore?](#procurement-and-third-party-tools-we-hired-a-third-party-remediation-firm-does-that-mean-authors-don-t-need-to-learn-accessibility-anymore)
- [Does hiring a remediator shield our agency from compliance liability?](#procurement-and-third-party-tools-does-hiring-a-remediator-shield-our-agency-from-compliance-liability)

### Agency Management

- [Do we need an agency accessibility coordinator?](#state-agency-applicability-do-we-need-an-agency-accessibility-coordinator)
- [Does IAAP certification help — and can it build agency confidence in our accessibility work?](#state-agency-applicability-does-iaap-certification-help-and-can-it-build-agency-confidence-in-our-accessibility-work)
- [How do we prioritize accessibility work with limited resources and a ticking clock?](#state-agency-applicability-how-do-we-prioritize-accessibility-work-with-limited-resources-and-a-ticking-clock)
- [What's the bare minimum we need to do by April 2027?](#state-agency-applicability-what-s-the-bare-minimum-we-need-to-do-by-april-2027)
- [How can I track and demonstrate "good-faith progress" toward compliance?](#getting-started-how-can-i-track-and-demonstrate-good-faith-progress-toward-compliance)
- [Who signs off that we're compliant? Can we "certify" WCAG 2.1 Level AA compliance?](#getting-started-who-signs-off-that-we-re-compliant-can-we-certify-wcag-2-1-level-aa-compliance)

### Getting Help

- [Illinois Resources](#getting-help-illinois-resources)
- [Federal Resources](#getting-help-federal-resources)
- [Free Testing Tools](#getting-help-free-testing-tools)
- [How do we handle accessibility complaints?](#icjia-specific-information-how-do-we-handle-accessibility-complaints)

### ICJIA-Specific

- [How do we handle accessibility complaints?](#icjia-specific-information-how-do-we-handle-accessibility-complaints)

---

_Last updated: November 6, 2026 · Last reviewed: November 6, 2026_
