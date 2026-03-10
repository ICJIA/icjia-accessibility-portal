---
title: Frequently Asked Questions
description: Common questions about accessibility
lastUpdated: 2026-03-10
disclaimer:
  - label: "Created by"
    text: "These FAQs were created by **ICJIA's IDS Unit** as a best-effort translation of new ADA guidelines into practical guidance."
  - label: "Corrections"
    text: "We make mistakes. We welcome feedback. If you find any incorrect or incomplete information, **please immediately contact ICJIA's IDS Unit** with specific corrections."
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
> **ICJIA Contact Note (March 10, 2026):** No agency accessibility coordinator has been identified yet. This FAQ will be updated with coordinator contact information when available. In the meantime, contact **ICJIA's IT department** with specific accessibility questions or concerns.
>
> **Note (scope):** This FAQ is practical guidance for ICJIA staff and partners. It's not legal advice. For official interpretations and agency-specific direction, consult Illinois DoIT guidance and your agency's legal/compliance leadership.

## Quick Start (Read this first)

### Executive summary: what you need to know right now

**Feeling overwhelmed? Start here.** You don't need to understand everything to begin making progress.

_Last updated: March 10, 2026_

**What you need to know right now:**

1. **The deadline is real:** April 24, 2026. Illinois state agencies must make all public-facing digital content accessible to people with disabilities — websites, documents, PDFs, videos, social media, and mobile apps.

2. **Two laws require this:**
   - **Illinois law:** The <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois Information Technology Accessibility Act (IITAA)</a> has required accessible digital content for state agencies since 2008. The current <a href="https://doit.illinois.gov/doit-news/accessibility-news/iitaa-2-1-update.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 standards</a> (effective June 24, 2024) require WCAG 2.1 Level AA compliance.
   - **Federal law:** The <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Accessibility Rule</a> (published April 24, 2024) requires state and local governments to meet WCAG 2.1 Level AA by April 24, 2026. See [What is the ADA Title II digital accessibility rule?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-ada-title-ii-digital-accessibility-rule) for details.

3. **This applies to your work:** If you create documents, websites, videos, social media posts, or procure digital tools — accessibility is part of your job now.

4. **The standard is clear:** <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Level AA</a> — think of it as a **compliance checklist for digital content**. In practice: proper headings, alt text on images, captions on videos, keyboard navigation, sufficient color contrast, and accessible forms.

5. **Start small, start now:** You don't have to fix everything today. Focus on new content first, then prioritize high-traffic pages and critical services. Every small improvement counts.

6. **Help is available:** This FAQ, your agency's accessibility coordinator, <a href="https://doit.illinois.gov/initiatives/accessibility/training.html" target="_blank" rel="noopener noreferrer">Illinois DoIT accessibility training</a>, and free tools like <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">WAVE</a> and <a href="https://www.deque.com/axe/devtools/" target="_blank" rel="noopener noreferrer">axe DevTools</a> can guide you through the process.

**More people need accessible content than you might expect:**

- **In Illinois alone:** Approximately **1.3 million adults** (12.6% of the adult population) have a disability that may affect how they access digital content — including mobility, cognitive, hearing, and vision impairments (see CDC’s Disability and Health Data System (DHDS): <a href="https://www.cdc.gov/dhds/about/index.html" target="_blank" rel="noopener noreferrer">About DHDS</a>).
- **Beyond Illinois:** ICJIA's research, publications, and resources reach a **national and global audience** — researchers, policymakers, criminal justice professionals, and the public. Accessibility isn't just a state compliance issue; it determines who can access your work worldwide.
- **Temporary and situational disabilities count too:** A broken arm, recovery from surgery, bright sunlight on a screen, or aging-related vision changes — accessible content helps everyone at some point.

**What to do next:**

- Use the Quick Reference checklists below to start with high-impact actions for your role
- Use this FAQ like a reference — search for what you need when you need it

**Key takeaway:** Accessibility means people with disabilities can use your content. The work is manageable if you start now and focus on practical, high-impact actions.

**References:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA (Illinois Information Technology Accessibility Act)</a> — Illinois state accessibility requirements
- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — Federal accessibility requirements and the April 2026 deadline
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: ADA Title II Final Rule</a> — Official rule text (April 24, 2024)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a> — Filterable checklist of accessibility requirements
- <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Full Specification</a> — Complete technical standard
- <a href="https://doit.illinois.gov/initiatives/accessibility/training.html" target="_blank" rel="noopener noreferrer">Illinois DoIT Accessibility Training</a> — Free state-provided training resources

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

**What accessibility means for you:** You build the foundation that makes all digital content accessible or inaccessible. Semantic HTML, keyboard navigation, color contrast, and ARIA labels aren't optional extras — they're core requirements of your work. Your technical expertise directly determines whether people with disabilities can access government information and services.

| Action                             | Impact                                                                                                                                                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Add axe-core to your build      | Catches many issues automatically (<a href="https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues/" target="_blank" rel="noopener noreferrer">studies suggest 30-57%</a>) |
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

{new:2026-01-23}

**Quick answer:** This FAQ is based on official sources — Illinois DoIT guidance, federal ADA regulations, and W3C standards — not personal opinion. The content's authority comes from the sources it cites, not the person who compiled it.

**Full explanation:**

This is a reasonable question. You may be wondering why guidance on an important compliance matter is coming from IT rather than executive leadership, legal counsel, or an official accessibility coordinator.

Here's why this FAQ is worth your time:

1. **The sources are authoritative, not the author:** Every major claim in this FAQ cites official sources — Illinois DoIT policies, the ADA Title II rule from the Federal Register, and W3C's WCAG standards. You can verify any information by checking the linked references.

2. **Accessibility guidance follows established standards:** Unlike areas where professional judgment varies widely, digital accessibility has clear, published standards (WCAG 2.1 Level AA). The requirements are the same whether explained by a web developer, a consultant, or the Department of Justice.

3. **Web development has been doing this for years:** ICJIA's web development team has incorporated accessibility practices into website builds for years — semantic HTML, keyboard navigation, color contrast, alt text, and screen reader compatibility have been part of the work all along. What's changed isn't the practice; it's that accessibility is now a legal mandate rather than a best practice. If anyone in this agency has hands-on experience with accessibility requirements, it's the people who've been implementing them in code.

4. **This fills a gap, not a role:** As of March 2026, ICJIA has not yet designated an official accessibility coordinator. This FAQ exists because staff needed practical guidance now — not because anyone is claiming authority they don't have.

5. **Feedback is welcome:** If you find errors, outdated information, or areas where this FAQ doesn't align with official guidance, please contact ICJIA's IDS Unit with specific corrections. The goal is accuracy, not attribution.

6. **Check with official sources when stakes are high:** For legal interpretations, procurement decisions, or formal complaints, consult Illinois DoIT (`DoIT.Accessibility@Illinois.gov`) or ICJIA's legal counsel — not this FAQ.

**Bottom line:** Use this FAQ as a practical starting point, but verify anything critical against the official sources it cites. The deadline is real regardless of who explains it to you.

---

### I'm already busy. Why should accessibility be a priority when I have other responsibilities?

{new:2026-01-23}

**Quick answer:** Accessibility helps ensure that the people we serve can actually use the services and information we provide. For agencies committed to diversity, equity, inclusion, and accessibility (DEIA), accessible content is part of how we put those values into practice.

**Full explanation:**

This is a fair question. Everyone has competing demands, and new requirements on top of existing work can feel overwhelming. Here's some perspective on why accessibility matters — not as judgment, but as context for the work we're being asked to do.

**1. Accessibility expands who we can reach.**

When content is accessible, more people can use it. A properly structured PDF works for everyone, including someone using a screen reader. A captioned video serves people who are deaf or hard of hearing, but also people watching in a noisy environment or those who prefer reading along. Accessible design often benefits people beyond those with permanent disabilities.

In Illinois alone, approximately 1.3 million adults have disabilities that may affect how they access digital content (according to CDC data). Nationally, that's over 60 million people. Accessible content simply means our work reaches more of the public we're here to serve.

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

**6. Accessible content has no downsides — only upsides.**

There's no tradeoff here. Accessible content doesn't look worse, perform slower, or cost more to maintain. In fact, the opposite is true:

- **Better SEO (Search Engine Optimization):** Search engines can't "see" images or understand poorly structured pages. The same practices that make content accessible — descriptive headings, alt text, semantic structure, transcripts — also help search engines index and rank your content. More accessible content means more people can *find* it in the first place.
- **Wider reach:** Content that works for people with disabilities also works for people on slow connections, older devices, or non-standard browsers.
- **Future-proofing:** Well-structured, semantic content adapts more easily to new technologies and platforms.
- **Reduced legal risk:** Accessible content is compliant content — fewer complaints, fewer remediation emergencies.

Accessibility is one of the rare cases where doing the right thing also happens to be the practical thing. There's no version of this where inaccessible content is the better choice.

**In summary:**

Accessibility work isn't about adding something extra — it's about building content that serves the full range of people who need it. It aligns with the values our agency has already committed to, and it makes our work more effective for the public we serve.

**A note on these FAQs:**

You may be wondering why guidance on this topic is coming from a web developer rather than agency leadership or legal counsel. Fair question. These FAQs aren't personal opinion — they're based on federal regulations (ADA Title II), state law (IITAA), and established standards (WCAG 2.1). The sources are cited throughout.

This resource exists because the developer behind it believes in accessibility — not as an abstract principle, but from personal experience with how much it matters when content is (or isn't) usable by everyone. This is a labor of love, not an attempt to lecture colleagues or claim expertise others don't have. The goal is simply to gather the guidance that exists and make it accessible (in every sense) to the people who need it.

If something here is wrong or could be said better, feedback is welcome.

**References:**

- <a href="https://www.cdc.gov/ncbddd/disabilityandhealth/infographic-disability-impacts-all.html" target="_blank" rel="noopener noreferrer">CDC: Disability Impacts All of Us</a> — Statistics on disability prevalence
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

**The standard:** Both websites and content must meet <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa" target="_blank" rel="noopener noreferrer">WCAG 2.1 Level AA</a> requirements, which is the compliance standard required by both <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA</a> and <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II</a>.

**References:**

- <a href="https://www.w3.org/WAI/fundamentals/accessibility-intro/" target="_blank" rel="noopener noreferrer">W3C: Introduction to Web Accessibility</a> — Official overview of digital accessibility
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa" target="_blank" rel="noopener noreferrer">WCAG 2.1 Level AA Quick Reference</a> — The accessibility standard required for compliance
- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — Federal requirements for state and local governments
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA</a> — Illinois state accessibility requirements
- <a href="https://www.section508.gov/" target="_blank" rel="noopener noreferrer">Section508.gov</a> — Federal accessibility resources and guidance

**See also:** [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start) | [I'm a web developer. Where do I start?](#getting-started-i-m-a-web-developer-where-do-i-start) | [What is WCAG?](#common-concerns-what-is-wcag)

### How does digital accessibility and compliance fit into an agency's DEIA mission?

**Quick answer:** **Accessibility is the "A" in DEIA** — it's how we deliver **equitable access** to services and information by **removing systemic barriers** in our digital work. It's backed by **accountability** through enforceable law (IITAA + ADA Title II) and a **measurable standard** (**WCAG 2.1 Level AA**) with a compliance deadline.

**In practice:**

- **Publish accessibly by default** — headings, link text, alt text, captions are part of equitable communication
- **Procure responsibly** — require accessibility in contracts to prevent "outsourcing" inequity
- **Fix barriers when found** — treat accessibility issues like service issues

**Key takeaway:** Accessibility is how DEIA commitments show up in real work — **equitable access with accountability**.

**References:** <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA</a> | <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule</a>

---

## Getting Started

### I'm a content creator. Where do I start?

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

These four skills address the most common issues per the <a href="https://webaim.org/projects/million/" target="_blank" rel="noopener noreferrer">WebAIM Million</a> analysis.

**Document resources:**

- <a href="https://www.section508.gov/create/documents/" target="_blank" rel="noopener noreferrer">Word</a> | <a href="https://www.section508.gov/create/pdfs/" target="_blank" rel="noopener noreferrer">PDFs</a> | <a href="https://www.section508.gov/create/presentations/" target="_blank" rel="noopener noreferrer">PowerPoint</a> | <a href="https://www.section508.gov/create/spreadsheets/" target="_blank" rel="noopener noreferrer">Excel</a>
- <a href="https://www.w3.org/WAI/media/av/captions/" target="_blank" rel="noopener noreferrer">Video captions</a> | <a href="https://www.w3.org/WAI/media/av/transcripts/" target="_blank" rel="noopener noreferrer">Transcripts</a>

**Training:** <a href="https://doit.illinois.gov/initiatives/accessibility/training.html" target="_blank" rel="noopener noreferrer">Illinois DoIT free training</a> (DoIT.Accessibility@Illinois.gov) | <a href="https://www.edx.org/learn/web-accessibility/the-world-wide-web-consortium-w3c-introduction-to-web-accessibility" target="_blank" rel="noopener noreferrer">W3C free course</a>

**Key mindset:** Can someone using a screen reader or keyboard-only understand and use your content? If not, provide alternatives.

**See also:** [How do I make a Word document accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-a-word-document-accessible) | [How do I make a PDF accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-a-pdf-accessible) | [How long should alt text be?](#content-accessibility-documents-pdfs-presentations-how-long-should-alt-text-be) | [What are the most common accessibility mistakes and issues to avoid?](#common-concerns-what-are-the-most-common-accessibility-mistakes-and-issues-to-avoid)

### How should I track my accessibility fixes as a content creator?

{new:2026-01-23}

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

**You're building the foundation.** Here's your priority roadmap:

**Week 1 (do these first):**

1. **Keyboard navigation** — Everything works without a mouse: <a href="https://webaim.org/techniques/keyboard/" target="_blank" rel="noopener noreferrer">WebAIM: Keyboard</a>
2. **Semantic HTML** — Use `<nav>`, `<main>`, `<button>` not `<div>`: <a href="https://www.w3.org/WAI/tutorials/page-structure/" target="_blank" rel="noopener noreferrer">W3C: Page Structure</a>
3. **Form labels** — Every field needs a proper label: <a href="https://webaim.org/techniques/forms/" target="_blank" rel="noopener noreferrer">WebAIM: Forms</a>
4. **Install testing tools** — axe DevTools or WAVE browser extensions

**Standards:** <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a> | <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noopener noreferrer">ARIA APG</a> (use semantic HTML first)

**Testing:** Automated (axe/WAVE/Lighthouse) + manual (keyboard-only + screen reader). Download <a href="https://www.nvaccess.org/download/" target="_blank" rel="noopener noreferrer">NVDA</a> (free).

**ARIA rules:** Use only when semantic HTML isn't sufficient. Prefer `<button>` over `<div role="button">`. Always test with screen readers.

**Code review checklist:**

✓ Semantic HTML · ✓ Keyboard navigation · ✓ Visible focus indicators · ✓ 4.5:1 contrast · ✓ Alt text · ✓ Form labels · ✓ Automated tests pass

**See also:** [How do I test my website?](#website-accessibility-how-do-i-test-my-website-for-accessibility) | [What are the most common accessibility mistakes and issues to avoid?](#common-concerns-what-are-the-most-common-accessibility-mistakes-and-issues-to-avoid) | [What are focus indicators and why do they matter?](#website-accessibility-what-are-focus-indicators-and-why-do-they-matter) | [What color contrast ratio is required?](#website-accessibility-what-color-contrast-ratio-is-required) | [How do I make forms accessible?](#website-accessibility-how-do-i-make-forms-accessible)

### I'm a manager. Where do I start?

**Your role:** Create the organizational conditions for success — set priorities, allocate resources, and establish accountability.

**Quick checklist:**

1. **Name an owner** for accessibility work and reporting
2. **Inventory public content** (sites, PDFs, videos, social, vendor tools)
3. **Prioritize by impact** (high-traffic + critical services first)
4. **Bake accessibility into process** (before publish / purchase / launch)
5. **Track progress** with clear milestones through April 24, 2026

**Key activities:**

| Activity                 | Notes                                                          |
| ------------------------ | -------------------------------------------------------------- |
| **Staff training**       | DoIT offers free courses; one-time learning                    |
| **Content inventory**    | Depends on content volume; do once                             |
| **Document remediation** | Complex PDFs take longer                                       |
| **Ongoing maintenance**  | Built into existing workflows; once trained, adds minimal time |

**Key actions:**

- **Understand requirements:** Deadline is April 24, 2026 for WCAG 2.1 Level AA compliance across all public-facing content. See [What is the ADA Title II digital accessibility rule?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-ada-title-ii-digital-accessibility-rule) and [Why are we just hearing about this now?](#state-agency-applicability-why-are-we-just-hearing-about-this-now).
- **Assess current state:** Audit content, identify gaps, estimate remediation effort.
- **Allocate resources:** Training, tools (free: WAVE, axe DevTools, PDF checkers), and staff time.
- **Build into processes:** Require accessibility in procurement, add pre-publish checkpoints.
- **Establish accountability:** Assign responsibilities, set expectations, track progress.

**ICJIA Contact:** No accessibility coordinator identified yet. Contact **ICJIA's IT department** for accessibility questions.

**Resources:** <a href="https://doit.illinois.gov/initiatives/accessibility.html" target="_blank" rel="noopener noreferrer">Illinois DoIT Accessibility</a> | <a href="https://www.w3.org/WAI/planning-and-managing/" target="_blank" rel="noopener noreferrer">W3C: Planning Accessibility</a> | <a href="/links" target="_self">Accessibility Links</a>

### I'm on executive staff. Where do I start?

**As executive staff, your role is to make accessibility achievable at scale.** You don't need to be the technical expert; you need to ensure there is clear ownership, adequate resourcing, enforceable process, and consistent reporting through April 2026 and beyond.

**Executive quick checklist (start here):**

1. **Designate an accessibility coordinator** with authority to coordinate across departments and report progress
2. **Adopt an agency accessibility policy** (WCAG 2.1 Level AA, scope, timelines, enforcement)
3. **Fund training and tools** (documents, web, video, procurement) and allocate staff time for remediation
4. **Require accessibility in procurement** (WCAG requirements in contracts; review VPAT/ACR; remediation commitments)
5. **Establish reporting** (inventory → prioritized backlog → milestones → risks → monthly/quarterly updates)

**What "good" looks like (practical, defensible):**

- **Inventory exists** for public-facing websites, documents/PDFs, forms, videos, social, mobile apps, and third-party tools
- **Priorities are explicit** (high-traffic + high-stakes services first; complete blockers first)
- **A remediation plan exists** with milestones through April 24, 2026 (and owners for each track)
- **Evidence is retained** (audit outputs, remediation logs, training completion, procurement language, vendor correspondence)
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

{new:2025-12-30}

**Quick answer:** You're accountable for **making accessibility possible and expected**: ownership, priorities, time/tools/training, and accountability. Your team is accountable for **creating and maintaining accessible content and systems** in their day-to-day work.

**Manager accountabilities (what you control):**

- **Ownership** — Name a coordinator/owner and make reporting routine.
- **Resourcing** — Allocate time, tools, and training (and remove blockers).
- **Process** — Require accessibility checks before publish/purchase/launch.
- **Accountability** — Define responsibilities clearly and track progress to the deadline.

**Team accountabilities (what they do):**

- **Content creators** — headings, link text, alt text, accessible documents, captions/transcripts.
- **Developers/IT** — accessible code, testing, fixing defects, vendor integration requirements.
- **Procurement/program teams** — require WCAG 2.1 AA and review VPAT/ACRs before purchase.

**Helpful framing:** Accessibility is a compliance deliverable like security and privacy — it needs ownership, a plan, and execution across roles.

### How can I track and demonstrate "good-faith progress" toward compliance?

{new:2026-01-06}

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

**Practical manager artifacts (simple, defensible):**

1. **Inventory** of public-facing content/tools (web, PDFs, forms, videos, social, vendor tools)
2. **Prioritized backlog** (top services + top traffic + complete blockers first)
3. **Milestones** (monthly/quarterly targets through April 2026)
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
- <a href="https://www.w3.org/TR/WCAG21/#conformance-reqs" target="_blank" rel="noopener noreferrer">WCAG 2.1 Conformance Requirements</a> — Defines conformance as meeting all Level A and Level AA success criteria for the claimed level. There is no "partial conformance" or "effort-based conformance" defined in WCAG.

**What managers should note:**

The regulations specify a **technical standard** (WCAG 2.1 Level AA), not an effort-based standard. According to the sources above:

- The compliance standard is meeting WCAG 2.1 Level AA criteria
- The regulations do not define "good-faith effort" as an alternative to meeting the technical standard
- For questions about enforcement, risk, or remedies, consult your agency's legal counsel

**Analogy:** Building codes work similarly — an organization can document its progress toward fire safety, but occupancy permits require actually meeting the code. Effort matters, but compliance is measured against the standard itself.

**What this means practically:**

Don't let "we're making progress" become a substitute for "we meet the standard." Progress is necessary and valuable, but the compliance standard is actual accessibility as defined by WCAG 2.1 Level AA.

---

### Who signs off that we're compliant? Can we "certify" WCAG 2.1 Level AA compliance?

{new:2026-01-02}

**Quick answer:** There is no single official "WCAG certificate" you can buy that guarantees compliance. **Compliance is demonstrated by meeting WCAG 2.1 Level AA success criteria across the defined scope of your digital content.** If you choose to make a formal statement, WCAG defines how to make a **conformance claim** — and it's **optional**.

**Full explanation:**

- **WCAG is a standard, not a licensing program.** Organizations can evaluate their websites/apps against WCAG and document results, but WCAG itself does not create a "certified by W3C" program.
- **Conformance claims are optional and scoped.** WCAG allows you to publish a conformance claim (for one page, a set of pages, or a set of related pages), but the claim must include required components and clearly define scope and level.
- **In practice, "sign-off" is an internal governance decision.** For agencies, the defensible approach is to require a written scope (what's included), the target level (WCAG 2.1 AA), and evidence (test results + remediation record), then have the appropriate leadership/compliance owners approve the risk posture.

**What to do (manager-friendly, defensible):**

1. **Define scope** (which sites/apps/pages and which time period/content types).
2. **Use a recognized evaluation methodology** and retain the report.
3. **Record known issues + remediation plan** (including vendor/tool dependencies).
4. **Document who approved** the scope and the plan (so "sign-off" is real).

**References:**

- <a href="https://www.w3.org/TR/WCAG21/#conformance-claims" target="_blank" rel="noopener noreferrer">W3C WCAG 2.1 — Conformance Claims (Optional)</a> — Defines what a conformance claim is and what it must include
- <a href="https://www.w3.org/TR/WCAG-EM/" target="_blank" rel="noopener noreferrer">W3C WCAG-EM: Website Accessibility Conformance Evaluation Methodology</a> — A recognized methodology for evaluating conformance and producing a report

---

## Common Concerns

### Why does accessibility compliance require everyone's participation?

**Because web developers can only fix technical issues — they can't fix content.**

While web developers handle technical implementation (code structure, keyboard navigation, ARIA attributes that help screen readers understand interactive elements), they **cannot** fix content created by others. Achieving compliance requires:

- **Content creators** — Write alt text for images, use proper heading styles, make documents accessible, add captions to videos.
- **Designers** — Ensure color contrast meets requirements, design with keyboard navigation in mind.
- **Procurement staff** — Include accessibility requirements in contracts for third-party tools.
- **Web developers** — Implement technical accessibility standards, test with assistive technologies.
- **Project managers** — Include accessibility in timelines and ensure it's addressed from project start.
- **Leadership** — Allocate time, budget, and resources.

**Example:** If you create a PDF report, the web team cannot add alt text to your images, fix your heading structure, or make your tables accessible. Those are content decisions only you can make as the document creator.

**The cost of waiting:** Fixing accessibility issues after development is typically **significantly more expensive** than building accessibility in from the start—industry research consistently shows remediation costs are several times higher than proactive design (<a href="https://www.w3.org/WAI/business-case/" target="_blank" rel="noopener noreferrer">W3C: The Business Case for Digital Accessibility</a>).

**References:**

- <a href="https://www.w3.org/WAI/planning-and-managing/" target="_blank" rel="noopener noreferrer">W3C WAI: Planning and Managing Web Accessibility</a> — Describes organization-wide accessibility responsibilities
- <a href="https://www.section508.gov/manage/section-508-program-team-roles-and-responsibilities/" target="_blank" rel="noopener noreferrer">Section508.gov: Roles and Responsibilities</a> — Outlines accessibility roles across different teams

### I'm already overloaded — how am I supposed to add accessibility to my workload?

{new:2025-12-27}

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

### Who's going to notice if we're not compliant by April 24, 2026?

{new:2026-01-07}

**Quick answer:** Non-compliance is likely to be discovered through multiple channels: agency audits, automated website scans, content reviews, individual complaints, and enforcement actions. While violations might not be identified immediately, accessibility compliance is actively monitored. Non-compliance can result in legal action, financial costs, and damage to your agency's reputation. From a risk management perspective, the question isn't whether violations will be found, but when — and proactive compliance reduces both legal risk and organizational disruption.

**Full explanation:**

This is a legitimate question that many agencies are asking. Understanding how compliance is monitored helps agencies make informed decisions about resource allocation and risk management.

**How non-compliance is typically discovered:**

**1. Agency audits and compliance reviews:**

- **Illinois DoIT compliance reviews** — State agencies may be subject to accessibility audits that examine both website technical compliance and content accessibility. These audits are part of the state's oversight responsibilities.
- **State audit processes** — Financial and program audits increasingly include accessibility compliance as part of their scope, particularly for agencies receiving federal funding.
- **Federal grant requirements** — Many federal grants require accessibility compliance, and grant audits verify this. Non-compliance can affect current and future grant eligibility.
- **Internal agency audits** — Proactive internal testing and auditing helps identify issues before external parties do, allowing for controlled remediation.

**2. Website compliance monitoring:**

- **Automated scanning tools** — Accessibility scanners can be run by anyone, including advocacy groups, legal firms, and members of the public. These tools can identify technical violations efficiently.
- **Disability rights organizations** — Organizations like the National Federation of the Blind and American Council of the Blind monitor government websites for accessibility barriers as part of their advocacy work.
- **Legal firms** — Some law firms specialize in accessibility law and regularly scan government sites as part of their practice.
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

- **Legal action:** Lawsuits can result in court orders requiring immediate compliance, ongoing monitoring, and payment of attorney's fees. While ADA Title II doesn't provide for monetary damages to individuals, legal costs and remediation expenses can be substantial.
- **Agency audits:** Comprehensive reviews that examine all digital content can be time-consuming and require significant staff resources to address findings.
- **Financial impact:** Enforcement actions, legal fees, remediation costs, and potential grant impacts can create budget pressures.
- **Reputational considerations:** Public awareness of accessibility failures can affect public trust and agency reputation.
- **Service delivery:** Inaccessible content excludes people with disabilities from accessing government services and information, which limits your agency's ability to serve all Illinois residents.

**Why accessibility compliance is different from some other regulations:**

Accessibility violations have characteristics that make them more likely to be discovered:

- **Objectively verifiable** — Automated tools can identify violations, making them measurable rather than subjective
- **Publicly visible** — Websites and digital content are accessible to anyone who wants to review them
- **Actively monitored** — Multiple organizations and agencies actively look for violations
- **Legally actionable** — The ADA provides clear mechanisms for enforcement, and courts have consistently upheld accessibility requirements

**Risk management considerations:**

- **Before April 24, 2026:** Agencies have time to achieve compliance proactively, which typically costs less than reactive remediation
- **After April 24, 2026:** Non-compliance becomes a violation of federal law, subject to enforcement. The ADA does not have a statute of limitations for ongoing violations — accessibility barriers that exist after the deadline can be subject to enforcement at any time.
- **Good faith efforts:** Documenting progress toward compliance, even if not fully achieved by the deadline, can demonstrate good faith efforts, which may be considered in enforcement actions.

**Practical steps for agencies:**

1. **Assess current state** — Conduct an accessibility audit to understand the scope of work needed
2. **Prioritize remediation** — Focus on high-traffic pages, critical services, and new content first
3. **Test regularly** — Run automated accessibility scans regularly to identify and fix issues proactively
4. **Audit content systematically** — Review documents, PDFs, videos, and social media for accessibility
5. **Document progress** — Maintain records of accessibility testing, remediation efforts, and training activities
6. **Plan for ongoing compliance** — Accessibility requires ongoing attention as content is created and updated
7. **Allocate resources** — Ensure adequate staff time and budget for accessibility work

**Key takeaway:** From a risk management perspective, non-compliance is likely to be discovered through audits, scans, complaints, or enforcement actions. The question isn't whether violations will be found, but when — and proactive compliance reduces both legal risk and organizational disruption. Compliance is both a legal requirement and an organizational responsibility to serve all Illinois residents effectively. Agencies that approach accessibility as a risk management priority and allocate appropriate resources are better positioned to meet the deadline and avoid enforcement actions. Proactive compliance is also an opportunity to demonstrate organizational commitment to serving all Illinois residents, including those with disabilities.

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — Official information about the rule and enforcement
- <a href="https://www.ada.gov/topics/web-accessibility/" target="_blank" rel="noopener noreferrer">DOJ: Web Accessibility</a> — Information about web accessibility enforcement
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: ADA Title II Final Rule</a> — Official rule text including enforcement provisions
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA Information</a> — State-level accessibility requirements and compliance information

### Given the uncertainty around enforcement, can we tell staff to continue with their current workflows for now?

{new:2026-01-23}

**Quick answer:** No. While enforcement details may still be evolving, the legal requirements are clear: WCAG 2.1 Level AA compliance is required by April 24, 2026, under both ADA Title II and Illinois IITAA. Directing staff to ignore accessibility requirements exposes the agency to legal risk and creates a larger remediation burden later. A "wait and see" approach is understandable but ultimately more costly than starting now.

**Full explanation:**

It's natural to feel overwhelmed by new compliance requirements, especially when some details about enforcement are still developing. However, several key points are already certain:

**What is NOT uncertain:**

- **The deadline is set:** April 24, 2026, is codified in federal regulation. This is not a proposal or guideline — it's law.
- **The standard is defined:** WCAG 2.1 Level AA is the specific, measurable requirement. There's no ambiguity about what compliance means.
- **Illinois law already requires this:** IITAA has required accessible digital content since 2008. The federal ADA rule reinforces existing state obligations.
- **The legal framework is established:** ADA Title II has been enforced for decades. The web accessibility rule clarifies how it applies to digital content, but the underlying civil rights protections are long-standing.

**Why "wait and see" creates more problems:**

| Concern | Reality |
| ------- | ------- |
| "Enforcement might not happen" | Multiple pathways exist for identifying non-compliance: DOJ investigations, individual complaints, advocacy organization audits, automated scans, and grant compliance reviews. See [Who's going to notice if we're not compliant?](#common-concerns-who-s-going-to-notice-if-we-re-not-compliant-by-april-24-2026) |
| "We can fix it later if needed" | Reactive remediation is significantly more expensive than proactive compliance. Fixing inaccessible content after creation typically costs 2-10x more than building it right the first time. |
| "Staff are already busy" | Accessibility isn't additional work — it's a change in how existing work is done. Starting now allows staff to learn gradually rather than scramble at the deadline. |
| "The rules might change" | WCAG 2.1 Level AA has been the established standard since 2018. The federal rule codified what was already best practice and Illinois state law. |
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
- <a href="https://www.w3.org/WAI/business-case/" target="_blank" rel="noopener noreferrer">W3C: The Business Case for Digital Accessibility</a> — Evidence on proactive vs. reactive compliance costs

**See also:** [Who's going to notice if we're not compliant by April 24, 2026?](#common-concerns-who-s-going-to-notice-if-we-re-not-compliant-by-april-24-2026) | [I'm already overloaded — how am I supposed to add accessibility to my workload?](#common-concerns-i-m-already-overloaded-how-am-i-supposed-to-add-accessibility-to-my-workload)

### What is WCAG?

**WCAG (Web Content Accessibility Guidelines)** are international standards that explain how to make digital content accessible to people with disabilities. Think of them as a detailed checklist for making websites, documents, and apps usable by everyone.

WCAG is organized around four principles, known as **POUR**:

- **Perceivable** — People should be able to see or hear content (or have it described by assistive technology). Example: Images need text descriptions for people who can't see them.
- **Operable** — People should be able to use interface components and navigate content. Example: Everything that works with a mouse should also work with a keyboard.
- **Understandable** — Content and how to use it should be clear. Example: Error messages should explain what went wrong and how to fix it.
- **Robust** — Content should work with different technologies, including assistive tools like screen readers. Example: Use standard HTML so assistive technologies can interpret the content.

**References:**

- <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">W3C: WCAG Overview</a> — Official overview of WCAG standards
- <a href="https://www.w3.org/WAI/fundamentals/accessibility-principles/" target="_blank" rel="noopener noreferrer">W3C: Accessibility Principles</a> — Detailed explanation of POUR principles

**See also:** [What does "WCAG 2.1 Level AA" mean?](#common-concerns-what-does-wcag-2-1-level-aa-mean) | [What WCAG requirements are commonly overlooked?](#website-accessibility-what-wcag-requirements-are-commonly-overlooked)

### What does "WCAG 2.1 Level AA" mean?

WCAG has three conformance levels:

- **Level A** — Minimum accessibility (required to meet).
- **Level AA** — Standard accessibility ← _Required for Illinois agencies under both IITAA and ADA Title II_.
- **Level AAA** — Enhanced accessibility (may meet where feasible).

Illinois requires Level AA conformance, which includes all Level A and Level AA success criteria.

**Note about WCAG versions:** WCAG 2.2 was published in October 2023 and adds additional success criteria. However, the ADA Title II rule specifically requires WCAG 2.1 Level AA. Content that meets WCAG 2.1 Level AA is compliant with current federal requirements. WCAG versions are backward-compatible, so meeting 2.2 also means meeting 2.1 and 2.0.

**References:**

- <a href="https://www.w3.org/WAI/WCAG21/Understanding/conformance#levels" target="_blank" rel="noopener noreferrer">W3C: Understanding WCAG Conformance Levels</a> — Official explanation of A, AA, and AAA levels
- <a href="https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/" target="_blank" rel="noopener noreferrer">W3C: What's New in WCAG 2.2</a> — Comparison of WCAG versions

**See also:** [What is WCAG?](#common-concerns-what-is-wcag) | [What WCAG requirements are commonly overlooked?](#website-accessibility-what-wcag-requirements-are-commonly-overlooked)

### What are the most common accessibility mistakes and issues to avoid?

{new:2025-12-27}

> **What does "SC" mean?** SC stands for **Success Criterion** — the specific, testable requirements within WCAG. Each SC has a number (like 1.1.1) and a conformance level (A, AA, or AAA). You can look up any SC at the <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a>.

**Quick answer:** Most accessibility issues come from a small set of common mistakes. Avoid these and you'll prevent the majority of accessibility problems. Beyond the basics (alt text, color contrast, headings), there are also specific WCAG requirements that are frequently overlooked.

**Top 10 most common accessibility mistakes (and what to do instead):**

| ❌ Don't do this                                                                            | ✅ Do this instead                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Skip alt text on images** — "The image is self-explanatory"                            | Write alt text for every image. If you took the photo for a reason, that reason needs words. (<a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-content" target="_blank" rel="noopener noreferrer">SC 1.1.1 - Level A</a>)            |
| **2. Use "Click here" or "Read more" for links** — Screen readers read links out of context | Write descriptive links: "Download the 2025 Annual Report" or "View training schedule" (<a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#link-purpose-in-context" target="_blank" rel="noopener noreferrer">SC 2.4.4 - Level A</a>)           |
| **3. Make text bold instead of using heading styles** — Looks like a heading but isn't one  | Use Heading 1, Heading 2, Heading 3 styles. Screen readers use headings to navigate. (<a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)              |
| **4. Put essential info only in images** — Images may not load or be visible                | Always include the same information as text in the document or caption                                                                                                                                                                                  |
| **5. Use color alone to convey meaning** — "Required fields are in red"                     | Use text labels, icons, or patterns in addition to color (<a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#use-of-color" target="_blank" rel="noopener noreferrer">SC 1.4.1 - Level A</a>)                                                    |
| **6. Create PDFs by scanning paper** — Results in an image, not readable text               | Use OCR or create documents digitally with proper structure                                                                                                                                                                                             |
| **7. Skip captions on videos** — "People can figure it out"                                 | Always add captions. It's a compliance requirement and benefits everyone. (<a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#captions-prerecorded" target="_blank" rel="noopener noreferrer">SC 1.2.2 - Level A</a>)                           |
| **8. Use tiny or low-contrast text** — Light gray on white, small fonts                     | Use at least 4.5:1 contrast ratio for normal text; avoid very small text sizes that reduce readability (<a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#contrast-minimum" target="_blank" rel="noopener noreferrer">SC 1.4.3 - Level AA</a>) |
| **9. Build complex tables with merged cells** — Screen readers can't interpret them         | Use simple tables with clear headers; avoid merging cells when possible (<a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)                           |
| **10. Assume "IT will fix it later"** — Accessibility is everyone's job                     | Make accessibility part of your workflow from the start                                                                                                                                                                                                 |

**Other common website accessibility issues:**

- **Missing form labels** — Form fields without associated labels (<a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)
- **Keyboard inaccessibility** — Interactive elements that can't be reached or operated with a keyboard (<a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#keyboard" target="_blank" rel="noopener noreferrer">SC 2.1.1 - Level A</a>)
- **Missing page titles** or duplicate titles across pages (<a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#page-titled" target="_blank" rel="noopener noreferrer">SC 2.4.2 - Level A</a>)
- **Auto-playing media** without controls (<a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#audio-control" target="_blank" rel="noopener noreferrer">SC 1.4.2 - Level A</a>)
- **Removing focus indicators** — The blue outline helps keyboard users know where they are
- **Using placeholder text as labels** — Placeholder text disappears when you start typing
- **Making clickable areas too small** — For usability, aim for touch targets of at least 44x44 pixels (strongly recommended best practice)
- **Flashing or blinking content** — Can trigger seizures; avoid any flashing content entirely, or ensure nothing flashes more than 3 times in any one-second period

**See also:** [What WCAG requirements are commonly overlooked?](#website-accessibility-what-wcag-requirements-are-commonly-overlooked) for additional requirements beyond these basics.

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

**Quick answer:** Yes. The coordinator should be in an executive, compliance, or management role — not a web developer or content creator. Practitioners are busy doing compliance work and typically lack organizational authority for policy and resource decisions.

**Why practitioners can't be the coordinator:**

- **Limited scope** — Web developers handle websites; content creators handle documents. Accessibility covers both, plus videos, social media, mobile apps, and third-party tools.
- **Busy doing the work** — They're implementing standards and remediating content, not coordinating organizational strategy.
- **No organizational authority** — They can't set agency-wide policy, allocate budgets, or direct other departments.

**What the coordinator does:**

- Set accessibility policy and allocate resources (budget, training, tools)
- Coordinate across IT, communications, legal, procurement, and content teams
- Report compliance status, risks, and progress to executive staff

**Who should be the coordinator:** Compliance officer, IT director/manager, communications director, program manager, or executive staff member — someone with organizational authority across departments.

**Bottom line:** Yes, you need an accessibility coordinator — and neither web developers nor content creators can fill this role. Both are essential practitioners doing the actual compliance work, but they lack the organizational authority, cross-departmental visibility, and strategic positioning the coordinator role requires. The coordinator should be someone in executive, compliance, or management roles who can set policy, allocate resources, coordinate across departments, and report to leadership — while relying on web developers and content creators as the technical experts who get the work done.

### Why does your agency need to worry about digital accessibility? What does the April 2026 deadline mean?

**Illinois state agencies are subject to both state and federal accessibility requirements (IITAA and ADA Title II).** According to the ADA Title II web rule (28 CFR Part 35) and IITAA 2.1 standards, the compliance deadline is April 24, 2026 for public entities serving populations of 50,000 or more — which includes all Illinois state agencies.

**Why this matters for Illinois state agencies:**

1. **State agency status** — Illinois state agencies fall under the Illinois Information Technology Accessibility Act (IITAA), which has required accessible digital content since 2008. The current IITAA 2.1 Standards (effective June 24, 2024) require WCAG 2.1 Level AA compliance.

2. **Public service mission** — State agencies provide information, research, and resources to Illinois residents. Under ADA Title II, all public-facing digital content must be accessible to people with disabilities.

3. **Illinois residents with disabilities need accessible digital content** — The <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois Information Technology Accessibility Act (IITAA)</a>, overseen by Illinois DoIT, requires that all state agency digital content be accessible to people with disabilities. Common disabilities include mobility limitations, cognitive difficulties, hearing difficulties, and vision impairment. Illinois residents with disabilities rely on accessible digital content to access government services and information. When state agency websites or documents aren't accessible, we're excluding Illinois residents with disabilities from critical government information and resources.

4. **Federal funding** — Many Illinois state agencies receive federal grants. Section 504 of the Rehabilitation Act requires that any organization receiving federal funding ensure their programs and activities are accessible to people with disabilities.

5. **The April 2026 deadline is firm** — The U.S. Department of Justice's ADA Title II web accessibility rule (published April 24, 2024) requires state and local governments with populations of 50,000 or more to achieve WCAG 2.1 Level AA compliance by **April 24, 2026**. Illinois has over 12 million residents, so this deadline applies to all state agencies.

**The reality of digital accessibility now:**

Accessibility is no longer just "best practice" — it's a compliance requirement under ADA Title II and IITAA. The 2026 deadline creates accountability for what has always been the right thing to do. For state agencies, this means integrating accessibility into every aspect of your digital presence: websites, documents, social media, and any tools you provide to the public.

**Additional benefit:** Many accessibility improvements also benefit all users — clearer content, better-organized documents, and more usable websites make information easier to find and understand for everyone.

**See also:** [What is the ADA Title II digital accessibility rule?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-ada-title-ii-digital-accessibility-rule) | [Why are we just hearing about this now?](#state-agency-applicability-why-are-we-just-hearing-about-this-now) | [What happens after April 24, 2026?](#state-agency-applicability-what-happens-after-april-24-2026) | [Are there exceptions to the April 2026 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2026-deadline-what-qualifies)

**References:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA Requirements</a> — Illinois state agency accessibility requirements
- <a href="https://doit.illinois.gov/doit-news/accessibility-news/iitaa-2-1-update.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Update (DoIT)</a> — Effective date + what changed
- <a href="https://www.ada.gov/title-ii-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule</a> — Federal accessibility requirements for state/local governments
- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Fact Sheet</a> — Plain language summary of requirements and deadlines
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register (Final Rule)</a> — Full legal text

### What happens after April 24, 2026?

**Quick answer:** After April 24, 2026, all public-facing digital content from state and local governments must meet WCAG 2.1 Level AA standards. Agencies that don't comply risk DOJ investigations, lawsuits, legal costs, and — most importantly — excluding people with disabilities from accessing government services.

**Full explanation:**

**After April 24, 2026, state and local governments must be in compliance with WCAG 2.1 Level AA standards for all public-facing digital content.** Agencies that fail to meet this deadline may face several potential issues:

**Legal and enforcement consequences:**

- **Department of Justice investigations** — The DOJ has authority to investigate complaints and pursue enforcement actions against non-compliant agencies (<a href="https://www.ada.gov/file-a-complaint/" target="_blank" rel="noopener noreferrer">ADA.gov: File a Complaint</a>).
- **Complaints and lawsuits** — Individuals with disabilities can file administrative complaints with the DOJ. Individuals may also bring lawsuits under ADA Title II; the statute provides remedies and attorney’s fees provisions by incorporating the Rehabilitation Act enforcement framework (<a href="https://www.law.cornell.edu/uscode/text/42/12133" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12133</a>; <a href="https://www.ada.gov/topics/title-ii/" target="_blank" rel="noopener noreferrer">ADA.gov: Title II</a>).
- **Legal costs and remediation expenses** — Agencies may face significant costs for legal defense, settlements, and emergency remediation of inaccessible content.
- **Reputational harm** — Public awareness of accessibility failures can damage an agency's reputation and public trust.

**Note:** The specific consequences in any given situation depend on many factors. This is general information about the types of enforcement mechanisms that exist under ADA Title II, not a prediction of what will happen to any particular agency. Consult your agency's legal counsel for guidance specific to your situation.

**What this means for you professionally:**

**Important distinction:** ADA Title II obligations apply to the **public entity** (the government agency), not to individual employees as personal defendants. (See the definition of “public entity” in <a href="https://www.law.cornell.edu/uscode/text/42/12131" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12131</a> and Title II’s enforcement/remedies framework in <a href="https://www.law.cornell.edu/uscode/text/42/12133" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12133</a>.) In practice, DOJ enforcement actions target the organization’s compliance. However, your agency may establish internal policies and expectations that affect individual staff:

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

**The bottom line:** If it's digital and public-facing, it needs to be accessible by April 24, 2026. Agencies that start working toward compliance now have time to address issues systematically. Those that delay may face costly emergency remediation and legal consequences.

**See also:** [What does the April 2026 deadline cover?](#compliance-requirements-iitaa-and-ada-title-ii-what-does-the-april-2026-deadline-cover) for details on what content is included.

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule</a> — See "What Web Content and Mobile Apps Are Covered" and enforcement provisions

### Why are we just hearing about this now?

{new:2026-01-06}

**This is a common question.** Here are the facts:

**The regulatory landscape changed in 2024:**

- **April 2024:** The U.S. Department of Justice published the ADA Title II web rule — the first time federal law specified a technical standard (WCAG 2.1 Level AA) with a firm compliance deadline.
- **June 2024:** Illinois IITAA 2.1 standards took effect, aligning state requirements with the same standard.

Before 2024, accessibility was a best practice and a general legal principle, but there was no specific federal deadline or measurable technical standard for state agencies. That changed.

**What's different now (according to the 2024 regulations):**

| Before                                         | Now (per ADA Title II web rule and IITAA 2.1)                             |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| Accessibility as **best practice**             | Accessibility with **specific technical standards** and enforcement       |
| "Making progress" was acceptable               | **WCAG 2.1 Level AA** specified as the compliance standard                |
| No firm deadline                               | **April 24, 2026** deadline specified in rule                             |
| Focused mainly on websites                     | Covers **everything**: websites, PDFs, videos, social media, vendor tools |
| Often seen as a technical/IT issue             | **Everyone** who creates content shares responsibility                    |
| IITAA (state) enforcement was largely advisory | **ADA Title II** (federal) adds DOJ enforcement provisions                |

**Why it feels sudden:**

The 2024 federal rule created accountability that didn't exist before — a **hard deadline, a measurable standard, and real enforcement consequences**. Communication across large organizations is always imperfect, and accessibility wasn't always prioritized the same way across all roles. That's understandable given competing demands.

It's also worth acknowledging that large organizations have many competing priorities, and communication across departments is never perfect. This isn't about blame — it's about moving forward from where we are now.

**What matters now:**

Regardless of what happened before, the requirement is clear and the deadline is firm. ICJIA's public websites have generally followed accessibility practices, which provides a foundation. The work ahead is ensuring **all content** — documents, PDFs, videos, social media, and vendor tools — meets the same standard.

**Key takeaway:** This is a shared responsibility across the agency. Everyone who creates or publishes content has a role to play. Focus on what you can control: inventory your content, prioritize by impact, complete training, and start addressing the biggest barriers first.

### After April 24, 2026, how do we maintain compliance (so we don't fall out of compliance again)?

{new:2026-01-02}

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

**References:**

- <a href="https://www.w3.org/WAI/planning-and-managing/" target="_blank" rel="noopener noreferrer">W3C: Planning and Managing Web Accessibility</a> — Program guidance and ongoing management
- <a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer">W3C WAI: Evaluating Web Accessibility Overview</a> — Notes that tools help, but no tool alone can determine conformance (human evaluation required)
- <a href="https://www.section508.gov/test/testing-lifecycle-overview/" target="_blank" rel="noopener noreferrer">Section508.gov: Testing Lifecycle</a> — Testing as a lifecycle (plan → scope → test → remediate → ongoing monitoring)

### What if we can't meet the April 24, 2026 deadline?

**Quick answer:** The deadline is firm — there's no routine extension process. If full compliance isn't achievable, prioritize high-impact content, document your plan, and keep making progress.

**What to do:**

1. **Prioritize by impact** — High-traffic pages, critical services, and complete blockers first
2. **Document efforts** — Keep records of fixes, maintain a backlog, show a clear remediation timeline
3. **Provide accessible alternatives** — Be prepared to provide alternative formats upon request (<a href="https://www.ada.gov/resources/effective-communication/" target="_blank" rel="noopener noreferrer">ADA.gov: Effective Communication</a>)
4. **Continue after the deadline** — The obligation doesn't end; keep working toward full compliance

**Important:** The ADA Title II web rule establishes WCAG 2.1 Level AA as the compliance standard. The rule specifies technical requirements, not effort-based requirements. For questions about enforcement, remedies, or risk, consult your agency's legal counsel. From a practical standpoint: documentation demonstrates organizational commitment, and each barrier removed helps real users access services now.

While the standard is technical compliance, not effort-based, demonstrating ongoing commitment and systematic remediation may be relevant context if enforcement questions arise. The goal should remain full compliance, but documented progress is better than undocumented inaction.

- **Consult legal counsel** — For questions about enforcement risk, legal exposure, or what constitutes adequate compliance in your specific situation, consult your agency's legal counsel

**Note:** Very limited exceptions exist for archived content and pre-existing documents under specific circumstances. See [Are there exceptions to the April 2026 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2026-deadline-what-qualifies) for details.

**Key takeaway:** If you can't achieve full compliance by the deadline, continue making progress. Reduce barriers as quickly as possible, document your efforts, provide accessible alternatives upon request, and keep working toward full compliance. The compliance standard remains WCAG 2.1 Level AA — consult your agency's legal counsel for questions about enforcement or risk.

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule</a> — Requirements and enforcement provisions
- <a href="https://www.ada.gov/file-a-complaint/" target="_blank" rel="noopener noreferrer">ADA.gov: File a Complaint</a> — How individuals can file complaints

### Are there exceptions to the April 2026 deadline? What qualifies?

{new:2026-01-26}

> **⚠️ CRITICAL: This is the most commonly misunderstood aspect of the ADA Title II web rule.** Many agencies assume that documents created before April 24, 2026 are automatically exempt. **This is incorrect.** The exceptions are narrowly defined, strictly interpreted, and most content actively linked from agency websites will NOT qualify. While DoIT takes a pragmatic approach to helping agencies manage existing content, they should be fully aware that very little content actually meets the strict criteria for these exceptions.

**The Big Misconception: "Pre-2026 Content Is Automatically Exempt"**

**No. This is wrong.**

The ADA Title II rule includes exceptions for certain archived content and pre-existing documents, but these exceptions are **narrowly defined** and require meeting **all** specified criteria. Simply existing before the compliance deadline does not make content exempt.

**The Department of Justice has been explicit about this:**

> "This exception does not apply to documents that are currently used to apply for, gain access to, or participate in the public entity's services, programs, or activities."
>
> — <a href="https://www.ada.gov/resources/web-rule-first-steps/" target="_blank" rel="noopener noreferrer">U.S. Department of Justice, "First Steps Toward an Accessible Web"</a>

**Bottom line:** If content is linked from your active website and serves a current purpose, it almost certainly needs to be accessible by April 24, 2026.

**The Five Exceptions (28 CFR § 35.200(b))**

The ADA Title II web rule defines exactly five categories of content that may be excepted from the WCAG 2.1 Level AA requirement. Each has specific, strict criteria.

**Exception 1: Archived Web Content (§ 35.200(b)(1))**

**This is the strictest exception.** Web pages qualify **only if ALL FOUR** of these criteria are met:

| Criterion | Requirement | What This Means |
| --------- | ----------- | --------------- |
| **1. Created before April 24, 2026** | Content must pre-date the compliance deadline (or reproduce physical media created before that date) | New web pages cannot use this exception |
| **2. Exclusively for reference/research/recordkeeping** | Content cannot serve any current programmatic purpose | If anyone uses it for current services, it fails |
| **3. Not altered or updated after archiving** | **Any edit, however minor, disqualifies it** | Even fixing a typo removes the exception |
| **4. Clearly labeled archive section** | Must be in a dedicated area **clearly identified** as an archive | Putting content in a folder called "archive" on your server isn't enough — users must see clear "archived content" labeling |

**Regulatory basis:** 28 C.F.R. § 35.104 (definition of "archived web content")

**The DOJ explicitly addressed the misconception that labeling something "archived" is enough:**

> "A PDF document that includes a current map of a county park...would probably not fall under the exception **even if the document is posted in the 'archive' section** of the county's website. The PDF provides current information about the park. The exception would probably not apply...because the content is not kept only for reference, research, or recordkeeping."
>
> — <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">U.S. Department of Justice, ADA Title II Web Rule Fact Sheet</a>

**Exception 2: Pre-existing Conventional Electronic Documents (§ 35.200(b)(2))**

PDFs, Word documents, spreadsheets, and presentations posted before April 24, 2026 **may** qualify, but **only if** they are not currently used to **apply for, gain access to, or participate in** the public entity's services, programs, or activities.

**This is a single-question test:** Is the document used by the public to apply for, access, or participate in your agency's services?

- **If YES:** The document is NOT exempt, regardless of when it was created
- **If NO:** The document may be exempt

**Key distinction — documents have different rules than web pages:**

| Aspect | Web Pages (Exception 1) | Documents (Exception 2) |
| ------ | ----------------------- | ----------------------- |
| **Test for exemption** | Must meet ALL 4 criteria | Only 1 test: Is it used to "apply for, gain access to, or participate in" services? |
| **Archive area required?** | **YES** — must be in dedicated, clearly marked archive section | **NO** — no archive area requirement |
| **Does being "linked" matter?** | **YES** — linked from active navigation suggests current use | **NO** — linking for reference purposes does not automatically disqualify |
| **Must be "never updated"?** | **YES** — any edit disqualifies it | **NO** — only the "apply for/participate in" test matters |

**This means:** A research report from 2015 that you link to from a publications page for historical reference may qualify for the exception — it's a pre-existing document not used to apply for services. But a grant application form from 2015 that people still use to apply for grants does NOT qualify — it's used to "apply for" services.

**Exception 3: Third-Party Content (§ 35.200(b)(3))**

Content posted by a third party where the public entity has **no contractual or licensing arrangement** governing the content.

**What this covers:**

- User-generated comments on a public forum you host
- Reviews or posts by members of the public on your agency's social media pages
- Content submitted by the public that you display without modification

**What this does NOT cover (you ARE responsible for accessibility):**

- Content from vendors you contract with (LMS platforms like Docebo, payment processors, survey tools)
- Embedded content from services you have agreements with (maps from ArcGIS, dashboards from Tableau, videos from contracted providers)
- Content created by consultants or contractors under agreement with your agency
- Any content where you have a contractual, licensing, or other arrangement governing it

**Exception 4: Individualized, Password-Protected Documents (§ 35.200(b)(4))**

Documents about a **specific individual** that are password-protected and available **only to that individual** and applicable staff.

**Examples that may qualify:**

- An individual's personal account statements
- Personal records accessible only by the specific individual they concern
- Individual-specific correspondence in a secure portal

**What this does NOT cover:**

- General password-protected areas (like member portals with shared content)
- Documents that are password-protected but shared among groups
- Internal documents shared among employees
- Any document that multiple individuals can access

**Note:** This is a very narrow exception for truly individualized content, not a blanket exception for all password-protected materials.

**Exception 5: Pre-existing Social Media Posts (§ 35.200(b)(5))**

Social media posts made **before the compliance date** (April 24, 2026).

**Important limitations:**

- **New posts after the deadline must be accessible** — this exception only covers pre-existing posts
- Pre-existing posts that are **currently used to provide or facilitate access to services, programs, or activities** may NOT be exempt
- **Pinned posts** suggesting current relevance likely don't qualify
- Posts **linked from your website** as current information likely don't qualify
- The exception does not remove your responsibility for effective communication — if someone with a disability needs information from an old post, you may need to provide it accessibly

**Authoritative Sources: What the Experts Say**

**U.S. Department of Justice (DOJ)**

The DOJ is the federal agency responsible for enforcing ADA Title II. Their guidance is authoritative.

**On the document exception:**

> "This exception does not apply to documents that are currently used to apply for, gain access to, or participate in the public entity's services, programs, or activities."
>
> — <a href="https://www.ada.gov/resources/web-rule-first-steps/" target="_blank" rel="noopener noreferrer">DOJ First Steps Guidance</a>

**On the archived content exception:**

> "A PDF document that includes a current map of a county park...would probably not fall under the exception **even if the document is posted in the 'archive' section** of the county's website. The PDF provides current information about the park. The exception would probably not apply...because the content is not kept only for reference, research, or recordkeeping."
>
> — <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">DOJ Fact Sheet on Web Rule</a>

**On the scope of the rule:**

> "The requirements apply to web content that a public entity provides or makes available, directly or through contractual, licensing, or other arrangements."
>
> — <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">DOJ Fact Sheet on Web Rule</a>

**Ohio State University's ADA Digital Accessibility Center**

Ohio State's ADA Digital Accessibility Center has published authoritative legal analysis interpreting the federal rule, citing 28 C.F.R. § 35.104 (defining archived web content) and § 35.201(a) (setting accessibility standards). Their analysis is used by universities and agencies nationwide as guidance.

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

**American Library Association (ALA)**

The ALA provides guidance for libraries and public institutions on ADA compliance.

> "The exceptions are narrow and specific. Most digital content that serves a current purpose will need to comply."
>
> — <a href="https://www.ala.org/accessibility/ada-rule-exceptions" target="_blank" rel="noopener noreferrer">ALA: ADA Web Rule Exceptions</a>

**Practical Examples: What Qualifies and What Doesn't**

| Content Type | Exception? | Why |
| ------------ | ---------- | --- |
| **Active website pages** | ❌ **NO** | Currently used by the public for services |
| **Login pages, forms, applications** | ❌ **NO** | Used to access or participate in services |
| **Documents created after April 2026** | ❌ **NO** | New documents must be accessible — no exception exists for new content |
| **Current grant application PDF** | ❌ **NO** | Used to apply for services — the (b)(2) exception explicitly excludes this |
| **Reports still relevant to current programs** | ❌ **NO** | Informs public about agency work — serves a current purpose |
| **Annual reports that inform the public** | ❌ **NO** | Documents that inform the public about agency work serve a current purpose |
| **Research publications that inform policy** | ❌ **NO** | If they inform current policy discussions, they serve a current purpose |
| **Content linked from main website navigation** | ❌ **Likely NO** | Placement in active navigation suggests current programmatic use |
| **Anything edited after being archived** | ❌ **NO** | Edits disqualify archived web content from exception (b)(1) |
| **Forms someone needs to fill out** | ❌ **NO** | Used to apply for or participate in services |
| **Embedded vendor content (ArcGIS, Tableau)** | ❌ **NO** | Contractual relationship means you're responsible |
| **Board agenda PDF from 2020** | ✅ **YES** | Pre-existing document not used to apply for current services — may be exempt under (b)(2) |
| **Research report from 2015 kept for reference** | ✅ **YES** | Pre-existing document maintained for historical reference — may be exempt under (b)(2) |
| **Historical meeting minutes from 2019** | ✅ **YES** | Pre-existing documents — nobody uses old meeting minutes to apply for current services |
| **Newsletter archive (pre-2026 issues)** | ✅ **YES** | Pre-existing documents kept for historical reference — may be exempt under (b)(2) |
| **Old HTML page moved to /archive/ with banner** | ✅ **YES** | If moved to dedicated archive area with clear labeling and not updated, may meet (b)(1) |
| **User comments on your Facebook page** | ✅ **YES** | Third-party content not under contract — (b)(3) exception |
| **Legacy content with no current use** | ✅ **YES** | Historical records truly kept only for research purposes |

**Documents That MAY Qualify for an Exception**

- Historical records truly kept only for research purposes
- Old documents that have been superseded and moved to a clearly labeled archive section
- Legacy content with no current programmatic use
- Meeting minutes from years past
- Superseded policies that are kept only for historical reference
- Old newsletters maintained as an archive

**Documents That Likely Do NOT Qualify**

- **Any form someone needs to fill out** — used to apply for or participate in services
- **Reports that are still relevant to current programs** — serve a current informational purpose
- **Content linked from main website navigation** — suggests current use
- **Annual reports, research publications, or grant documents that inform the public** — serve a current purpose
- **Anything that has been edited after being archived** — disqualifies archived web content
- **Content that provides current information** — even if old, if the information is still current, it's not archival
- **Documents people reference to understand current services** — serve a current purpose

**Who Decides If an Exception Applies?**

This is a legal determination, not an administrative one.

- **Agency legal counsel** makes the final determination for your agency — this is a legal interpretation of federal regulation
- **DoIT provides guidance, not determinations** — DoIT offers training and technical assistance, but exceptions are legal determinations based on the federal rule. DoIT does not grant, approve, or determine exceptions.
- **Before assuming content qualifies, consult your agency's legal counsel** — don't rely on internal assumptions
- **Document your reasoning** — if you claim an exception, document why the content meets all required criteria

**Even If Content Qualifies: The Effective Communication Obligation Remains**

**This is critical:** Even for content that legitimately qualifies for an exception, the ADA still requires **effective communication** under 28 CFR § 35.130. If a person with a disability requests access to excepted material, you are obligated to provide it in an accessible format upon request.

**As Ohio State's guidance emphasizes:**

> "Even when content qualifies as archived, the ADA still requires effective communication with individuals with disabilities. This means users must be able to easily request and receive content in accessible formats when needed."

**This means agencies should:**

- Establish a clear process for accommodation requests
- Include a visible way for users to request accessible versions of archived or excepted content
- Be prepared to remediate documents upon request — you cannot refuse
- Respond to requests in a timely manner
- Budget for on-demand remediation

**The exception reduces your proactive remediation burden — it does NOT eliminate your obligation to provide access when needed.**

**How to Approach Compliance**

1. **Default assumption:** If content is linked from your active website and serves any current purpose, it needs to be accessible by April 24, 2026

2. **The exceptions are for truly archival content:** Think historical society records, not "documents we published last year that are still useful"

3. **Don't assume — verify:** Before claiming an exception, have legal counsel review the specific content against the regulatory criteria

4. **If you want to use the archived web content exception (b)(1):**
   - Create a clearly labeled archive section (not just a folder — visible labeling for users)
   - Move content there
   - Add a clear "This content is archived and is maintained for historical reference only" banner
   - Document that it's for reference only
   - **Never edit it after archiving** — any edit disqualifies it
   - Establish a process for accommodation requests

5. **For documents (b)(2):** Focus remediation on documents people need to **apply for, access, or participate in** current services (grant applications, registration forms, required submissions). Historical documents kept for reference may be exempt — but verify with legal counsel.

6. **For everything else:** Prioritize remediation based on traffic, importance, and legal exposure

7. **When in doubt, consult legal counsel** — They make the final determination on whether content qualifies for an exception

**Important Legal Notes**

- **Web pages and documents have different rules** — Don't apply the (b)(1) "archive area" requirement to documents. The (b)(2) document exception only asks: Is the document used to "apply for, gain access to, or participate in" services?

- **"Linked" ≠ "in use" for documents** — A pre-existing PDF linked on your publications page for reference is NOT the same as a PDF used to apply for a grant. The former may be exempt; the latter is not.

- **For web pages, the archive area requirement is strict** — Old HTML pages linked from your main navigation likely don't qualify for (b)(1). To qualify: (1) move them to a dedicated `/archive/` URL section, (2) add a clear "This content is archived" banner visible to users, (3) never update them after the compliance date.

- **"Archived" labeling alone is not enough** — The DOJ explicitly says that putting content in an "archive" section doesn't make it exempt if the content provides current information or serves a current purpose.

- **Any edit disqualifies archived web content** — Even fixing a typo removes the exception for web pages under (b)(1).

- **Effective communication is still required** — You must provide accessible alternatives upon request even for legitimately excepted content.

- **Verify exact language** — For questions about whether specific content qualifies, consult your agency's legal counsel and verify exact language in the Federal Register document.

**Authoritative References:**

**U.S. Department of Justice (Primary Authority):**

- <a href="https://www.ada.gov/resources/web-rule-first-steps/" target="_blank" rel="noopener noreferrer">DOJ: First Steps Toward an Accessible Web</a> — Official DOJ guidance on first steps for compliance
- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">DOJ: ADA Title II Web Rule Fact Sheet</a> — Plain language summary of the rule including exceptions and examples
- <a href="https://www.ada.gov/resources/effective-communication/" target="_blank" rel="noopener noreferrer">DOJ: Effective Communication</a> — Guidance on the effective communication obligation that applies even to excepted content

**Federal Regulations (Legal Text):**

- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: Final Rule (28 CFR Part 35)</a> — Full legal text of the rule; see § 35.200(b) for exceptions
- <a href="https://www.ecfr.gov/current/title-28/chapter-I/part-35" target="_blank" rel="noopener noreferrer">28 CFR Part 35 (eCFR)</a> — Current Code of Federal Regulations text

**Expert Analysis:**

- <a href="https://accessibility.osu.edu/title-ii/archived-content-exception" target="_blank" rel="noopener noreferrer">Ohio State University ADA Digital Accessibility Center: Archived Content Exception</a> — Authoritative legal analysis and checklist for evaluating content against exception criteria
- <a href="https://www.ala.org/accessibility/ada-rule-exceptions" target="_blank" rel="noopener noreferrer">American Library Association: ADA Web Rule Exceptions</a> — Guidance for public institutions on understanding exceptions
- <a href="https://www.section508.gov/manage/laws-and-policies/update-agency-policies/" target="_blank" rel="noopener noreferrer">Section508.gov: Update Agency Accessibility Policies</a> — Federal guidance on accessibility policy updates

**Illinois-Specific:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Illinois DoIT: IITAA Requirements</a> — Illinois state accessibility requirements (IITAA also applies)

### How do we prioritize accessibility work with limited resources and a ticking clock?

**Quick answer:** Focus on highest-impact content first. Don't fix everything at once — remove the biggest barriers first.

**Important context:** ICJIA's public websites are already being remediated by the web team. The priority now is ensuring **content creators understand and fix their content** — documents, PDFs, articles, newsletters, videos, and other materials that content teams produce.

**Priority tiers:**

| Tier               | Focus                                                                   | Examples (Web + Content)                                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Fix First**   | Critical services, high-traffic content, complete blockers, new content | **Web:** Login pages, application forms, high-traffic pages<br>**Content:** Frequently accessed PDFs, published articles, newsletter archives, training materials |
| **2. Fix Next**    | Frequently used content and tools                                       | **Web:** Secondary pages, embedded tools<br>**Content:** Research reports, policy documents, video content, social media posts                                    |
| **3. Fix Ongoing** | Archive content, low-traffic materials                                  | **Web:** Historical pages, archived sections<br>**Content:** Older documents, historical newsletters, archived publications                                       |

**Practical steps:**

1. **Audit your content inventory** — List all documents, PDFs, articles, newsletters, videos your team produces
2. **Focus on top 20 highest-priority items first** — Mix of web pages and content based on traffic/importance
3. **Stop creating new barriers** — All new content accessible immediately (this is where content creators have the most control)
4. **Track progress and allocate weekly time for remediation**

**Key takeaway:** Websites are being addressed. Content creators need to prioritize their materials — articles, newsletters, PDFs, videos — by impact and traffic. Fixing 50% is better than 0%.

**References:** <a href="https://www.w3.org/WAI/planning/interim-repairs/" target="_blank" rel="noopener noreferrer">W3C: Interim Repairs</a> | <a href="https://www.section508.gov/manage/identify-user-needs/" target="_blank" rel="noopener noreferrer">Section508.gov: Identify User Needs</a>

### What's the bare minimum we need to do by April 2026?

**Quick answer:** According to ADA Title II and IITAA, the standard is WCAG 2.1 Level AA — there's no "partial compliance" option defined in the regulations. But if you're overwhelmed: make new content accessible now, fix highest-impact barriers first, document your plan.

**Minimum viable approach:**

1. **Stop creating new barriers** — All new content accessible from now on
2. **Fix biggest barriers first** — Homepage, forms, top 20 pages/documents, complete blockers
3. **Document your plan** — Inventory, priorities, timeline, responsibilities
4. **Respond to requests** — Process for accessible alternatives; track complaints

**What can wait:** Archived unused content, low-traffic pages, historical social posts.

**What cannot skip:** New content accessible going forward; high-impact services; accessible alternatives upon request (<a href="https://www.ada.gov/resources/effective-communication/" target="_blank" rel="noopener noreferrer">ADA.gov: Effective Communication</a>).

**References:** <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule</a> | <a href="https://www.w3.org/WAI/planning/interim-repairs/" target="_blank" rel="noopener noreferrer">W3C: Interim Repairs</a>

---

## Compliance Requirements (IITAA and ADA Title II)

### What is the IITAA?

**The IITAA (Illinois Information Technology Accessibility Act)** requires Illinois agencies and universities to ensure that their websites, information systems, and information technologies are accessible to people with disabilities. The current IITAA 2.1 Standards (effective June 24, 2024) require conformance with WCAG 2.1 Level AA.

**Official IITAA page:** <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/iitaa.html</a>

**See also:** [What is the ADA Title II digital accessibility rule?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-ada-title-ii-digital-accessibility-rule) for the federal requirements that apply alongside IITAA.

### Who must comply with the IITAA?

The IITAA applies to:

- Executive, legislative, and judicial branches of Illinois state government
- All state departments, divisions, and agencies
- Constitutional offices
- Public universities

The IITAA does **not** directly apply to:

- Local governments
- School districts
- Community colleges
- Private organizations

**Note:** Local governments and school districts still have obligations under ADA Title II.

### How is the IITAA enforced?

**Quick answer:** The IITAA is implemented through Illinois DoIT standards, oversight, and agency compliance processes. It is separate from (and in addition to) ADA Title II.

**Key differences from ADA Title II enforcement:**

| Aspect                                           | IITAA (State)                                                                                                           | ADA Title II (Federal)                                                                                             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Primary oversight**                            | Illinois DoIT Office of Information Accessibility                                                                       | U.S. Department of Justice (DOJ)                                                                                   |
| **How issues typically surface**                 | State standards compliance, agency governance, and DoIT guidance/training                                               | DOJ complaints/investigations and, in some cases, litigation                                                       |
| **What “enforcement” usually means in practice** | Direction to remediate and align with IITAA standards; procurement and program controls may be used to drive compliance | Court orders/settlements/consent decrees and required remediation; remedies are set by statute and depend on facts |

**Practical implications:**

- **IITAA has historically focused on compliance assistance** — DoIT provides guidance, training, and support to help agencies achieve compliance
- **ADA Title II creates additional enforcement pressure** — The 2024 web rule adds federal accountability with specific technical standards and firm deadlines
- **Both laws require the same standard** — WCAG 2.1 Level AA is required under both IITAA 2.1 and ADA Title II

**Note:** This is general information about enforcement mechanisms, not legal advice. For specific questions about enforcement risk or legal exposure, consult your agency's legal counsel.

**References:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA Requirements and Oversight</a> — Illinois DoIT
- <a href="https://www.ada.gov/file-a-complaint/" target="_blank" rel="noopener noreferrer">ADA.gov: File a Complaint</a> — Federal complaint process
- <a href="https://www.law.cornell.edu/uscode/text/42/12133" target="_blank" rel="noopener noreferrer">42 U.S.C. § 12133</a> — Title II remedies (statutory enforcement framework)

### What does the IITAA cover?

**See also:** [What does the April 2026 deadline cover?](#compliance-requirements-iitaa-and-ada-title-ii-what-does-the-april-2026-deadline-cover) for comparison with ADA Title II requirements.

The IITAA covers all "information and communication technology," including:

- Websites and web applications
- Software and desktop applications
- Mobile applications
- Electronic documents (PDFs, Word, Excel, PowerPoint)
- Multimedia (video and audio)
- Information kiosks
- Hardware with user interfaces

### When did the current IITAA standards take effect?

- **IITAA 1.0** — August 20, 2008 (original standards).
- **IITAA 2.0** — January 18, 2018 (aligned with WCAG 2.0 AA).
- **IITAA 2.1** — June 24, 2024 (aligned with WCAG 2.1 Level AA).

**References:**

- <a href="https://doit.illinois.gov/doit-news/accessibility-news/iitaa-2-1-update.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Update (DoIT)</a> — Effective date and what changed
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA (Illinois Information Technology Accessibility Act)</a> — Overview and current standards

### Where can I get IITAA training?

The Illinois Department of Innovation & Technology (DoIT) Office of Information Accessibility provides free training for state agencies, including:

- Introduction to Accessibility (2-hour overview)
- Accessible Word Documents (half-day hands-on lab)
- Accessible PDF Documents
- Accessible PowerPoint Presentations
- Customized courses on web development, forms, and more

**Request training:** DoIT.Accessibility@Illinois.gov

**Training page:** <a href="https://doit.illinois.gov/initiatives/accessibility/training.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/training.html</a>

### Who do I contact with IITAA questions?

For questions or comments about information technology accessibility or the IITAA:

**Email:** DoIT.Accessibility@Illinois.gov

**Phone:**

- Springfield: 217-524-3648
- Chicago: 312-814-3648
- TTY: 866-277-5669

### What is the ADA Title II digital accessibility rule?

{new:2026-01-06}

**Quick answer:** On April 24, 2024, the U.S. Department of Justice published a <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">final rule</a> requiring state and local governments to make public-facing web content and mobile apps meet **WCAG 2.1 Level AA** by April 24, 2026 (for entities serving 50,000+ population).

**What Title II covers (vs. Title I):**

The ADA has multiple titles addressing different contexts:

|                      | **Title I** (Employment)                     | **Title II** (Public Services)                 |
| -------------------- | -------------------------------------------- | ---------------------------------------------- |
| **Scope**            | Employers with 15+ employees                 | State and local governments                    |
| **Focus**            | Workplace accommodations                     | Public programs, services, activities          |
| **Approach**         | Reasonable accommodations upon request       | Proactive accessibility for all public content |
| **Digital standard** | No specific technical standard; case-by-case | **WCAG 2.1 Level AA** required                 |
| **Timeline**         | Accommodations when requested                | Compliance deadline: April 24, 2026            |

**Why Title II may feel "new":** Title II has existed since 1990, but the **April 2024 web rule** is the first time DOJ established specific technical standards (WCAG 2.1 Level AA) for digital content. This replaces previous case-by-case enforcement with a clear, measurable requirement.

**For Illinois state agencies:** You must comply with both — **Title I** for employee accommodations and **Title II** for public-facing digital content.

**Key regulatory text:** The rule amends 28 CFR Part 35 to add §§ 35.200–35.205 establishing web and mobile app accessibility requirements.

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — DOJ plain-language summary
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: Final Rule (28 CFR Part 35)</a> — Full legal text
- <a href="https://www.ada.gov/topics/title-ii/" target="_blank" rel="noopener noreferrer">ADA.gov: Title II Overview</a> — General Title II guidance
- <a href="https://archive.ada.gov/ada_title_I.htm" target="_blank" rel="noopener noreferrer">ADA Title I Overview</a> — Employment provisions (for comparison)

### When must we comply with the ADA Title II rule?

| Entity Size                                    | Compliance Deadline |
| ---------------------------------------------- | ------------------- |
| Entities serving populations of 50,000 or more | **April 24, 2026**  |
| Entities serving populations under 50,000      | April 26, 2027      |

For most Illinois state agencies, the deadline is **April 24, 2026** (since Illinois has over 12 million residents).

**References:**

**Federal sources:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — DOJ plain-language summary with compliance deadlines
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: Final Rule (28 CFR Part 35)</a> — Full legal text with compliance deadlines

**Statewide sources:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA (Illinois Information Technology Accessibility Act)</a> — Illinois state accessibility requirements
- <a href="https://doit.illinois.gov/doit-news/accessibility-news/iitaa-2-1-update.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Update (DoIT)</a> — Effective date and current standards

### What does the April 2026 deadline cover?

**See also:** [What does the IITAA cover?](#compliance-requirements-iitaa-and-ada-title-ii-what-does-the-iitaa-cover) for comparison with Illinois state requirements.

**Everything digital and public-facing.** The deadline applies to all public-facing digital content, not just websites:

- **Websites and web applications** — All pages and interactive features.
- **Documents** — PDFs, Word documents, Excel spreadsheets, PowerPoint presentations.
- **Multimedia** — Videos (must have captions), audio (must have transcripts).
- **Mobile apps** — Any apps provided to the public.
- **Social media** — Posts, images, and videos shared on social platforms (going forward).
- **Third-party content** — Embedded tools, maps, dashboards, widgets provided through contracts.

**Why the scope is so broad:** Government services have moved online rapidly, especially since 2020. What used to be in-person services are now digital, making digital accessibility essential for equal access.

**Reference:** <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule - Covered Content</a> (see section on "What Web Content and Mobile Apps Are Covered")

**See also:** [How do I make mobile apps accessible?](#website-accessibility-how-do-i-make-mobile-apps-accessible)

### Does ADA Title II apply to internal documents?

**See also:** [Does our agency's password-protected intranet need to be accessible?](#website-accessibility-does-our-agency-s-password-protected-intranet-need-to-be-accessible) | [What about archived documents on the intranet?](#website-accessibility-what-about-archived-documents-on-the-intranet) | [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible)

**No, the ADA Title II web rule does not directly apply to purely internal content.** The rule specifically covers "services, programs, and activities provided or made available" to the public.

**What is considered "internal" vs. "public-facing"?**

**Internal documents/content** typically includes:

- **Employee-only intranets** — Internal portals, wikis, and knowledge bases accessible only to staff
- **Internal training materials** — Training documents, presentations, and resources used only by employees
- **Internal communications** — Staff memos, internal newsletters, and employee-facing announcements
- **HR documents** — Employee handbooks, policies, and procedures not shared with the public
- **Internal databases and systems** — Administrative systems, internal reporting tools, and employee-facing applications not accessible to the public
- **Draft documents** — Work-in-progress content that has not been published or shared publicly

**Public-facing documents/content** (covered by ADA Title II) includes:

- **Public websites** — Any content accessible to the public, even if primarily intended for specific audiences
- **Publicly shared documents** — PDFs, Word docs, or presentations posted on public websites or shared via public links
- **Documents provided to the public** — Forms, reports, or resources distributed to external stakeholders, partners, or the general public
- **Content accessible without login** — Any digital content that can be accessed without authentication, even if not actively promoted
- **Documents shared with external partners** — Content shared with contractors, grantees, or other external parties

**Important distinction:** If a document is accessible to anyone outside your organization (even if not widely publicized), it may be considered public-facing and subject to ADA Title II requirements.

**However**, internal content may still need to be accessible under other legal requirements:

- **ADA Title I** — Employers must provide reasonable accommodations for employees with disabilities, which could include making internal systems, training materials, and documents accessible. This applies to all employers with 15 or more employees.
- **Section 504 of the Rehabilitation Act** — Organizations receiving federal funding must ensure programs and activities are accessible to employees with disabilities. This includes internal systems and documents used by employees.
- **IITAA** — Illinois law covers intranets and internal systems used by state employees. The IITAA applies to "information systems" and "information technologies" used by Illinois state agencies, which includes internal systems.

**Best practice:** Make internal documents accessible proactively. It's easier than retrofitting later, and you may have employees with disabilities who need access. Additionally, internal documents often become public-facing over time, and making them accessible from the start avoids future remediation work.

**References:**

**Federal sources:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — Defines covered content as "services, programs, and activities provided or made available" to the public
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: Final Rule (28 CFR Part 35)</a> — Full legal text defining scope of covered content
- <a href="https://www.ada.gov/topics/title-i/" target="_blank" rel="noopener noreferrer">ADA.gov: Title I Overview</a> — Employment provisions requiring reasonable accommodations
- <a href="https://www.ada.gov/law-and-regs/ada/" target="_blank" rel="noopener noreferrer">ADA Title I Regulations</a> — Employment discrimination and accommodation requirements
- <a href="https://www.hhs.gov/civil-rights/for-individuals/disability/section-504-fact-sheet/index.html" target="_blank" rel="noopener noreferrer">HHS: Section 504 Fact Sheet</a> — Requirements for recipients of federal funding

**Statewide sources:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">IITAA (Illinois Information Technology Accessibility Act)</a> — Covers information systems and technologies used by state agencies, including internal systems
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa-2-1-update.html" target="_blank" rel="noopener noreferrer">IITAA 2.1 Standards</a> — Current standards applicable to internal and external systems

---

## Website Accessibility

### How do I test my website for accessibility?

**See also:** [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility) (for testing PDF documents specifically)

**Why this matters:** Automated tools catch many issues quickly, but they can't detect everything. Manual testing with keyboard navigation and screen readers reveals barriers that automated tools miss — and these barriers can prevent people with disabilities from using your website entirely.

Use a combination of automated and manual testing:

**Automated Testing Tools (free):**

- **WAVE** — <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">https://wave.webaim.org/</a> (browser extension)
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

1. Download NVDA from <a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer">nvaccess.org</a> (free)
2. Press **Ctrl+Alt+N** to start NVDA
3. Navigate your page using **Tab** (interactive elements) and **arrow keys** (content)
4. Press **H** to jump between headings — do they make sense and follow a logical order?
5. Press **D** to jump between landmarks — is the page structure clear?
6. Test forms — are labels announced when you focus on form fields?
7. Test images — is meaningful alt text announced?
8. Press **Insert+Q** to quit NVDA

**What to listen for:**

- Are headings announced with their level (Heading Level 1, Heading Level 2)?
- Are form fields announced with their labels?
- Are images described meaningfully (or announced as decorative)?
- Can you complete key tasks (submit a form, navigate to important content)?
- Are error messages announced when they appear?

**Illinois testing guidance:** <a href="https://doit.illinois.gov/initiatives/accessibility/testing.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/testing.html</a>

**See also:** [What are the most common accessibility mistakes and issues to avoid?](#common-concerns-what-are-the-most-common-accessibility-mistakes-and-issues-to-avoid) | [I'm a web developer. Where do I start?](#getting-started-i-m-a-web-developer-where-do-i-start) | [How do we ensure accessibility compliance with third-party tools?](#procurement-and-third-party-tools-how-do-we-ensure-accessibility-compliance-with-third-party-tools-like-lmss-docebo-docusign-tableau-and-arcgis)

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#keyboard" target="_blank" rel="noopener noreferrer">Success Criterion 2.1.1 Keyboard - Level A</a> (keyboard navigation)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#name-role-value" target="_blank" rel="noopener noreferrer">Success Criterion 4.1.2 Name, Role, Value - Level A</a> (screen reader compatibility)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#resize-text" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.4 Resize Text - Level AA</a> (zoom/200% requirement)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)

### Do we need an independent (external) accessibility audit to prove compliance? When is it worth it?

{new:2026-01-02}

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

**References:**

- <a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer">W3C WAI: Evaluating Web Accessibility Overview</a> — Explains that evaluation is also called “audit” and that no tool alone can determine conformance
- <a href="https://www.w3.org/TR/WCAG-EM/" target="_blank" rel="noopener noreferrer">W3C WCAG-EM</a> — Methodology for conformance evaluation and reporting
- <a href="https://www.section508.gov/test/" target="_blank" rel="noopener noreferrer">Section508.gov: Test for Accessibility</a> — Federal overview of automated/manual/hybrid testing and the testing lifecycle

### Can’t we just use an accessibility overlay/widget (a “one-click fix”) instead of doing remediation?

{new:2026-01-02}

**Quick answer:** No. Overlays/widgets can add UI features, but they **do not reliably make a site conform to WCAG 2.1 Level AA** because accessibility issues usually require **fixing the underlying code and content**. Also, **conformance cannot be validated by automation alone**.

**Why overlays don’t solve compliance:**

- **WCAG issues are often structural** (labels, headings, keyboard behavior, focus order, meaningful text alternatives, error handling). These require real fixes in templates, components, and content—not a layer on top.
- **Automation limits still apply.** If a tool can’t determine conformance on its own, an overlay (which is largely automation) can’t guarantee compliance either.
- **Accessibility practitioners consistently rate overlays as ineffective** compared to doing real remediation.

**What to do instead (the practical manager approach):**

1. **Stop creating new barriers** (publish/purchase/build with accessibility checks).
2. **Prioritize** high-traffic and high-stakes services first.
3. **Use tools + human testing** to find issues, then remediate and re-test.

**References:**

- <a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer">W3C WAI: Evaluating Web Accessibility Overview</a> — “No tool alone can determine if a site meets accessibility standards” (human evaluation required)
- <a href="https://webaim.org/projects/practitionersurvey3/" target="_blank" rel="noopener noreferrer">WebAIM: Survey of Web Accessibility Practitioners #3 (results)</a> — Includes practitioner ratings of overlay/plugin/widget effectiveness
- <a href="https://wave.webaim.org/help" target="_blank" rel="noopener noreferrer">WAVE Help (WebAIM)</a> — Notes that automated tools cannot determine true accessibility/conformance by themselves

### What WCAG requirements are commonly overlooked?

{new:2026-01-06}

**See also:** [What are the most common accessibility mistakes and issues to avoid?](#common-concerns-what-are-the-most-common-accessibility-mistakes-and-issues-to-avoid) | [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility)

Beyond the most common issues (alt text, color contrast, headings), these WCAG 2.1 Level AA requirements are frequently missed during accessibility reviews. **Note:** WCAG applies to websites, documents (PDFs, Word, Excel, PowerPoint), videos, and third-party tools — not just websites.

> **What does "SC" mean?** SC stands for **Success Criterion** — the specific, testable requirements within WCAG. Each SC has a number (like 2.4.1) and a conformance level (A, AA, or AAA). For example, "SC 2.4.1" means Success Criterion 2.4.1. You can look up any SC at the <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a> — use the search box to find specific criteria by number or keyword.

#### Website-Specific Requirements Often Missed

**Navigation and Structure:**

1. **Skip links / Bypass blocks (<a href="https://www.w3.org/WAI/WCAG21/quickref/#bypass-blocks" target="_blank" rel="noopener noreferrer">SC 2.4.1 - Level A</a>)** — Pages with repeated content (like navigation menus) should provide a way to skip directly to main content. This is typically implemented as a "Skip to main content" link.

2. **Consistent navigation (<a href="https://www.w3.org/WAI/WCAG21/quickref/#consistent-navigation" target="_blank" rel="noopener noreferrer">SC 3.2.3 - Level AA</a>)** — Navigation menus should appear in the same relative order across all pages of a website.

3. **Multiple ways to find pages (<a href="https://www.w3.org/WAI/WCAG21/quickref/#multiple-ways" target="_blank" rel="noopener noreferrer">SC 2.4.5 - Level AA</a>)** — Users should have more than one way to locate pages (e.g., navigation menu + site search + sitemap).

**Forms and User Input:**

4. **Error identification (<a href="https://www.w3.org/WAI/WCAG21/quickref/#error-identification" target="_blank" rel="noopener noreferrer">SC 3.3.1 - Level A</a>)** — When a form error is detected, the error must be identified and described in text. Visual indicators alone (like red borders) are not sufficient.

5. **Error suggestions (<a href="https://www.w3.org/WAI/WCAG21/quickref/#error-suggestion" target="_blank" rel="noopener noreferrer">SC 3.3.3 - Level AA</a>)** — When an error is detected and suggestions for correction are known, provide them to the user (e.g., "Please enter a valid email address in the format name@example.com").

6. **Labels or instructions (<a href="https://www.w3.org/WAI/WCAG21/quickref/#labels-or-instructions" target="_blank" rel="noopener noreferrer">SC 3.3.2 - Level A</a>)** — All form fields must have clear labels or instructions. Placeholder text alone is not sufficient.

7. **Timing adjustable (<a href="https://www.w3.org/WAI/WCAG21/quickref/#timing-adjustable" target="_blank" rel="noopener noreferrer">SC 2.2.1 - Level A</a>)** — If a page has a time limit (session timeout, form expiration), users must be able to turn off, adjust, or extend the time.

**Content Presentation:**

8. **Reflow (<a href="https://www.w3.org/WAI/WCAG21/quickref/#reflow" target="_blank" rel="noopener noreferrer">SC 1.4.10 - Level AA</a>)** — Content must reflow without horizontal scrolling at 400% zoom (or 320px viewport width). Content should not require scrolling in two dimensions.

9. **Text spacing (<a href="https://www.w3.org/WAI/WCAG21/quickref/#text-spacing" target="_blank" rel="noopener noreferrer">SC 1.4.12 - Level AA</a>)** — Content must remain readable when users adjust line height, paragraph spacing, letter spacing, or word spacing. No loss of content or functionality.

10. **Language of page (<a href="https://www.w3.org/WAI/WCAG21/quickref/#language-of-page" target="_blank" rel="noopener noreferrer">SC 3.1.1 - Level A</a>)** — The default human language of each page must be programmatically determined (e.g., `<html lang="en">`).

#### Document-Specific Requirements Often Missed (PDFs, Word, Excel, PowerPoint)

These requirements apply to all documents, not just websites:

1. **Document language (<a href="https://www.w3.org/WAI/WCAG21/quickref/#language-of-page" target="_blank" rel="noopener noreferrer">SC 3.1.1 - Level A</a>)** — Set the document language in document properties. Screen readers use this to pronounce words correctly.

2. **Proper tags and reading order (<a href="https://www.w3.org/WAI/WCAG21/quickref/#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1</a>, <a href="https://www.w3.org/WAI/WCAG21/quickref/#meaningful-sequence" target="_blank" rel="noopener noreferrer">SC 1.3.2 - Level A</a>)** — PDFs must have tags that define structure (headings, lists, tables). Reading order must match visual order.

3. **Scanned documents = inaccessible** — A scanned PDF is an image. Without OCR and manual remediation, screen readers cannot read the text.

4. **Table headers (<a href="https://www.w3.org/WAI/WCAG21/quickref/#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)** — Tables in documents must have designated header rows/columns so screen readers announce column/row context.

5. **Color alone to convey meaning (<a href="https://www.w3.org/WAI/WCAG21/quickref/#use-of-color" target="_blank" rel="noopener noreferrer">SC 1.4.1 - Level A</a>)** — "Items in red are required" fails because users who can't perceive color won't know which items are required.

6. **Complex images without text alternatives (<a href="https://www.w3.org/WAI/WCAG21/quickref/#non-text-content" target="_blank" rel="noopener noreferrer">SC 1.1.1 - Level A</a>)** — Charts, graphs, and infographics need both alt text and a text description of the data (often as a data table or long description).

7. **Excel spreadsheets without context (<a href="https://www.w3.org/WAI/WCAG21/quickref/#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)** — Spreadsheets need named ranges, header rows, and text descriptions explaining how to navigate the data.

8. **PowerPoint without slide titles (<a href="https://www.w3.org/WAI/WCAG21/quickref/#page-titled" target="_blank" rel="noopener noreferrer">SC 2.4.2 - Level A</a>)** — Every slide needs a unique title for navigation. Decorative "title-less" slides fail this requirement.

#### Third-Party Tools Requirements Often Missed

When your agency uses third-party platforms (Docebo, DocuSign, Tableau, ArcGIS, survey tools, etc.):

1. **Vendor claims ≠ your compliance** — A vendor saying "we're accessible" doesn't mean your implementation is accessible. Your content, configurations, and customizations must also be accessible.

2. **Interactive elements must be keyboard accessible (<a href="https://www.w3.org/WAI/WCAG21/quickref/#keyboard" target="_blank" rel="noopener noreferrer">SC 2.1.1 - Level A</a>)** — If users can't complete a workflow using only a keyboard, it fails. Test all critical user paths.

3. **Custom content on vendor platforms (<a href="https://www.w3.org/WAI/WCAG21/quickref/#non-text-content" target="_blank" rel="noopener noreferrer">SC 1.1.1</a>, <a href="https://www.w3.org/WAI/WCAG21/quickref/#info-and-relationships" target="_blank" rel="noopener noreferrer">SC 1.3.1 - Level A</a>)** — Training modules, survey questions, dashboards, and maps that you create must meet the same standards.

4. **Data visualizations need text alternatives (<a href="https://www.w3.org/WAI/WCAG21/quickref/#non-text-content" target="_blank" rel="noopener noreferrer">SC 1.1.1 - Level A</a>)** — Charts and maps must provide equivalent information for users who can't see them.

**See also:** [How do we ensure accessibility compliance with third-party tools like LMSs (Docebo), DocuSign, Tableau, and ArcGIS?](#procurement-and-third-party-tools-how-do-we-ensure-accessibility-compliance-with-third-party-tools-like-lmss-docebo-docusign-tableau-and-arcgis)

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
| **PDFs**              | Adobe Acrobat Accessibility Checker, PAC 2024, screen reader testing               |
| **Word/PowerPoint**   | Microsoft Accessibility Checker, screen reader testing                             |
| **Excel**             | Microsoft Accessibility Checker, verify navigation with screen reader              |
| **Third-party tools** | Request VPAT/ACR from vendor, test critical user workflows manually                |

**References:**

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference (Level AA filter)</a> — Complete list of Level A and AA requirements
- <a href="https://webaim.org/standards/wcag/checklist" target="_blank" rel="noopener noreferrer">WebAIM WCAG 2 Checklist</a> — Simplified checklist format
- <a href="https://www.section508.gov/create/" target="_blank" rel="noopener noreferrer">Section508.gov: Create Accessible Content</a> — Guidance for documents, presentations, and more

### What color contrast ratio is required?

> **Note:** "SC" = Success Criterion. Look up any SC number at the <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a>.

For WCAG 2.1 Level AA:

- **Normal text** (smaller than 18pt/~24px regular or 14pt/~19px bold): **4.5:1** contrast ratio.
- **Large text** (18pt/~24px+ regular or 14pt/~19px+ bold): **3:1** contrast ratio.
- **UI components and graphics**: **3:1** contrast ratio (for interactive elements, icons, and graphical objects required to understand content - WCAG <a href="https://www.w3.org/WAI/WCAG21/quickref/#non-text-contrast" target="_blank" rel="noopener noreferrer">Success Criterion (SC) 1.4.11 Non-text Contrast - Level AA</a>).

**Check contrast:** <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">https://webaim.org/resources/contrastchecker/</a>

**Visual example: Color contrast ratios**

| Text Size          | Contrast Ratio | Example                        | Status    |
| ------------------ | -------------- | ------------------------------ | --------- |
| Normal text        | 4.5:1 minimum  | Dark gray (#767676) on white   | ✅ Passes |
| Normal text        | 3.0:1          | Light gray (#999999) on white  | ❌ Fails  |
| Large text (18pt+) | 3:1 minimum    | Medium gray (#808080) on white | ✅ Passes |
| UI components      | 3:1 minimum    | Blue button (#0066CC) on white | ✅ Passes |

**Quick test:** If you can't easily read text without squinting, the contrast is likely too low. Use the <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">WebAIM Contrast Checker</a> to verify exact ratios.

**WCAG Reference:**

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a>
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-contrast" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.11 Non-text Contrast - Level AA</a>

**See also:** [What are focus indicators and why do they matter?](#website-accessibility-what-are-focus-indicators-and-why-do-they-matter) | [I'm a web developer. Where do I start?](#getting-started-i-m-a-web-developer-where-do-i-start)

### What are focus indicators and why do they matter?

{new:2026-01-06}

> **Note:** "SC" = Success Criterion. Look up any SC number at the <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a>.

**Quick answer:** Focus indicators are the visible outlines or highlights that show which element currently has keyboard focus. WCAG 2.1 Level AA requires that focus is visible (<a href="https://www.w3.org/WAI/WCAG21/quickref/#focus-visible" target="_blank" rel="noopener noreferrer">Success Criterion (SC) 2.4.7 - Level AA</a>). Removing or suppressing focus indicators creates a significant barrier for keyboard users.

**Why focus indicators matter:**

Users who navigate by keyboard (including screen reader users, users with motor disabilities, and power users) need to see where they are on the page. Without visible focus, they cannot:

- Know which link or button is currently selected
- Navigate forms reliably
- Confirm which element will activate when they press Enter

**Common mistakes:**

1. **Removing outlines with CSS** — `outline: none` or `outline: 0` without providing an alternative focus style removes focus indicators entirely. This is a WCAG failure.

2. **Low-contrast focus indicators** — Focus indicators must meet the 3:1 contrast requirement against adjacent colors (<a href="https://www.w3.org/WAI/WCAG21/quickref/#non-text-contrast" target="_blank" rel="noopener noreferrer">SC 1.4.11 Non-text Contrast - Level AA</a>).

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
4. Ensure focus order matches visual reading order

**WCAG Reference:**

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#focus-visible" target="_blank" rel="noopener noreferrer">Success Criterion 2.4.7 Focus Visible - Level AA</a> — Focus indicator must be visible
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-contrast" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.11 Non-text Contrast - Level AA</a> — Focus indicators need 3:1 contrast

**See also:** [What color contrast ratio is required?](#website-accessibility-what-color-contrast-ratio-is-required) | [I'm a web developer. Where do I start?](#getting-started-i-m-a-web-developer-where-do-i-start) | [How do I test my website?](#website-accessibility-how-do-i-test-my-website-for-accessibility)

### Do I need to caption all videos?

{new:2026-01-06}

> **Note:** "SC" = Success Criterion. Look up any SC number at the <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a>.

**Quick answer:** Yes, for WCAG 2.1 Level AA compliance:

- **Pre-recorded video with audio** — Requires synchronized captions (<a href="https://www.w3.org/WAI/WCAG21/quickref/#captions-prerecorded" target="_blank" rel="noopener noreferrer">SC 1.2.2 - Level A</a>).
- **Live video with audio** — Requires live captions (<a href="https://www.w3.org/WAI/WCAG21/quickref/#captions-live" target="_blank" rel="noopener noreferrer">SC 1.2.4 - Level AA</a>). Accuracy matters; auto-captions may need human support.
- **Pre-recorded audio only** — Requires a text transcript (<a href="https://www.w3.org/WAI/WCAG21/quickref/#audio-only-and-video-only-prerecorded" target="_blank" rel="noopener noreferrer">SC 1.2.1 - Level A</a>).
- **Video with essential visual content** — Requires audio description at Level AA **only if** important visual information isn't already conveyed in the existing audio track (<a href="https://www.w3.org/WAI/WCAG21/quickref/#audio-description-prerecorded" target="_blank" rel="noopener noreferrer">SC 1.2.5 - Level AA</a>). For example, a video where a speaker says 'as you can see on this chart...' without describing the chart would need audio description. A talking-head video where the speaker fully explains their points verbally typically does not.

**Are AI-generated subtitles (like YouTube's auto-captions) enough?**

**No.** AI-generated subtitles are a **starting point**, but they typically contain errors that must be corrected for WCAG 2.1 Level AA compliance. Success Criterion 1.2.2 requires captions to be **accurate** and **synchronized**. AI-generated captions that contain errors do not meet the accuracy requirement.

**Common accuracy issues with AI-generated captions:**

- Misspellings and incorrect word substitutions (e.g., "accessibility" becomes "access ability")
- Missing or incorrect punctuation
- Failure to identify speakers in multi-speaker videos
- Misinterpretation of technical terms, names, or acronyms
- Missing non-speech sounds (e.g., "[door closes]", "[music playing]")

**What to do instead:**

1. **Use AI subtitles as a starting point** — YouTube's auto-generated captions can save time, but you must:
   - Review and edit the captions for accuracy
   - Correct misspellings and word errors
   - Add proper punctuation and capitalization
   - Identify speakers when multiple people are speaking
   - Add descriptions of important non-speech sounds (e.g., "[applause]", "[phone ringing]")

2. **Provide a text transcript** — For **prerecorded video with audio**, WCAG 2.1 Level AA requires captions but does not require a transcript. However:
   - **Audio-only content** (podcasts, audio recordings) **requires a transcript** at Level A
   - **Transcripts are recommended** for all video content as a best practice — they benefit users who prefer reading, need to search content, or cannot access video
   - **Transcripts may be necessary** for complex content where captions alone may not provide equivalent access (e.g., dense information, technical terminology, or users with cognitive disabilities)
   - **Deafblind users** cannot access captions — transcripts are the only way they can access audio content via refreshable braille displays

**How to add accurate captions to YouTube videos:**

1. Upload your video to YouTube
2. Go to YouTube Studio → Content → Select your video → Subtitles
3. Click "Edit" on the auto-generated subtitles
4. Review and correct errors, add speaker names, and improve formatting
5. Save the edited captions

**How to provide a transcript:**

- Link to a text transcript in the video description
- Include the transcript on the webpage where the video is embedded
- Provide the transcript as a downloadable document (PDF, Word, or plain text)

**References:**

- <a href="https://www.w3.org/WAI/media/av/captions/" target="_blank" rel="noopener noreferrer">W3C: Captions/Subtitles</a> — Complete guide to video captions
- <a href="https://www.w3.org/WAI/media/av/transcripts/" target="_blank" rel="noopener noreferrer">W3C: Transcripts</a> — Guidance on audio transcripts
- <a href="https://support.google.com/youtube/answer/2734796" target="_blank" rel="noopener noreferrer">YouTube Help: Add subtitles and captions</a> — How to edit YouTube captions

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#captions-prerecorded" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.2 Captions (Prerecorded) - Level A</a> — Requires accurate, synchronized captions
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#captions-live" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.4 Captions (Live) - Level AA</a>
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#audio-only-and-video-only-prerecorded" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.1 Audio-only and Video-only (Prerecorded) - Level A</a>
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#audio-description-prerecorded" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.5 Audio Description (Prerecorded) - Level AA</a>

**See also:** [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start) | [What about cognitive accessibility and plain language?](#website-accessibility-what-about-cognitive-accessibility-and-plain-language)

### What about cognitive accessibility and plain language?

{new:2026-01-06}

**Quick answer:** WCAG 2.1 Level AA includes several requirements that support cognitive accessibility: readable text, predictable navigation, error prevention, and sufficient time. Beyond WCAG compliance, plain language principles help make content accessible to users with cognitive disabilities, learning disabilities, limited literacy, and non-native speakers.

**WCAG 2.1 Level AA requirements supporting cognitive accessibility:**

> **Note:** "SC" = Success Criterion. Look up any SC number at the <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference</a>.

1. **Readable content** (<a href="https://www.w3.org/WAI/WCAG21/quickref/#language-of-page" target="_blank" rel="noopener noreferrer">SC 3.1.1 - Level A</a>) — Specify the language of the page so assistive technologies can render it correctly.

2. **Consistent navigation** (<a href="https://www.w3.org/WAI/WCAG21/quickref/#consistent-navigation" target="_blank" rel="noopener noreferrer">SC 3.2.3 - Level AA</a>) — Navigation appears in the same order across pages, reducing cognitive load.

3. **Consistent identification** (<a href="https://www.w3.org/WAI/WCAG21/quickref/#consistent-identification" target="_blank" rel="noopener noreferrer">SC 3.2.4 - Level AA</a>) — Components with the same function are identified consistently (e.g., all "Submit" buttons use the same label).

4. **Error identification** (<a href="https://www.w3.org/WAI/WCAG21/quickref/#error-identification" target="_blank" rel="noopener noreferrer">SC 3.3.1 - Level A</a>) — Errors are clearly described in text, helping users understand what went wrong.

5. **Error suggestion** (<a href="https://www.w3.org/WAI/WCAG21/quickref/#error-suggestion" target="_blank" rel="noopener noreferrer">SC 3.3.3 - Level AA</a>) — When errors are detected, provide specific suggestions for correction.

6. **Error prevention** (<a href="https://www.w3.org/WAI/WCAG21/quickref/#error-prevention-legal-financial-data" target="_blank" rel="noopener noreferrer">SC 3.3.4 - Level AA</a>) — For pages with legal commitments or financial transactions, allow users to review, correct, or confirm before final submission.

7. **Timing adjustable** (<a href="https://www.w3.org/WAI/WCAG21/quickref/#timing-adjustable" target="_blank" rel="noopener noreferrer">SC 2.2.1 - Level A</a>) — Users can extend time limits, important for users who need more time to read and process content.

**Plain language best practices (beyond WCAG compliance):**

While WCAG doesn't specify reading level requirements at Level AA, these practices improve accessibility for all users:

- **Use simple, clear language** — Avoid jargon, acronyms (or define them on first use), and complex sentence structures
- **Structure content logically** — Use headings, lists, and short paragraphs
- **Front-load important information** — Put key points first, details later
- **Use consistent terminology** — Don't use multiple terms for the same concept
- **Provide context and instructions** — Don't assume users know what to do next
- **Avoid walls of text** — Break content into scannable sections

**Why this matters:**

Cognitive disabilities are the most common type of disability. According to the CDC, approximately 12% of U.S. adults have cognitive difficulties that affect concentration, memory, or decision-making. Plain language and cognitive accessibility features benefit:

- Users with cognitive disabilities or learning disabilities
- Users with attention disorders
- Non-native English speakers
- Users accessing content in stressful or distracting environments
- Older adults experiencing age-related cognitive changes
- Everyone who prefers clear, direct communication

**References:**

- <a href="https://www.w3.org/WAI/cognitive/" target="_blank" rel="noopener noreferrer">W3C: Cognitive Accessibility at W3C</a> — Overview of cognitive accessibility efforts
- <a href="https://www.plainlanguage.gov/" target="_blank" rel="noopener noreferrer">PlainLanguage.gov</a> — Federal plain language guidelines
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#readable" target="_blank" rel="noopener noreferrer">WCAG 2.1: Readable (Guideline 3.1)</a> — Make text content readable and understandable
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#input-assistance" target="_blank" rel="noopener noreferrer">WCAG 2.1: Input Assistance (Guideline 3.3)</a> — Help users avoid and correct mistakes

### How do I make forms accessible?

{new:2026-01-06}

**Quick answer:** Every form field needs a visible label that is programmatically associated with the field, error messages must be clear and specific, and users must be able to navigate and complete the form using only a keyboard.

**Critical elements of accessible forms:**

**1. Labels and Instructions**

- Every input field must have a visible `<label>` element associated using `for` and `id` attributes
- Placeholder text is NOT a substitute for labels (it disappears when users start typing)
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

- Indicate required fields both visually AND programmatically
- Use `required` attribute or `aria-required="true"`
- Don't rely only on asterisks (\*) — explain what they mean

**4. Keyboard Accessibility**

- All form controls must be reachable and operable via keyboard
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

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#labels-or-instructions" target="_blank" rel="noopener noreferrer">Success Criterion 3.3.2 Labels or Instructions - Level A</a>
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#error-identification" target="_blank" rel="noopener noreferrer">Success Criterion 3.3.1 Error Identification - Level A</a>
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#error-suggestion" target="_blank" rel="noopener noreferrer">Success Criterion 3.3.3 Error Suggestion - Level AA</a>
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#error-prevention-legal-financial-data" target="_blank" rel="noopener noreferrer">Success Criterion 3.3.4 Error Prevention - Level AA</a>

### How do I make mobile apps accessible?

**Quick answer:** Mobile apps must meet the same WCAG 2.1 Level AA standards as websites. This includes proper labeling, keyboard/gesture navigation, sufficient color contrast, and compatibility with mobile screen readers (VoiceOver on iOS, TalkBack on Android).

**Full explanation:**

Mobile apps provided to the public by state and local governments must meet WCAG 2.1 Level AA standards under the ADA Title II web rule. Mobile accessibility follows the same principles as web accessibility, but with platform-specific considerations.

**Core mobile accessibility requirements:**

1. **Screen reader compatibility** — Apps must work with:
   - **iOS:** VoiceOver (built-in)
   - **Android:** TalkBack (built-in)
   - Content should be properly labeled and navigable

2. **Touch target size** — While WCAG 2.1 Level AA doesn't mandate specific sizes, platform guidelines recommend at least 44x44 points (iOS) or 48x48 density-independent pixels (Android) for usability. This is considered essential best practice for users with motor disabilities.

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

- <a href="https://developer.apple.com/accessibility/ios/" target="_blank" rel="noopener noreferrer">Apple iOS Accessibility</a>
- <a href="https://developer.android.com/guide/topics/ui/accessibility" target="_blank" rel="noopener noreferrer">Android Accessibility</a>
- <a href="https://www.w3.org/WAI/mobile/" target="_blank" rel="noopener noreferrer">W3C Mobile Accessibility</a>
- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule - Mobile Apps</a>

**See also:** [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility) | [What does the April 2026 deadline cover?](#compliance-requirements-iitaa-and-ada-title-ii-what-does-the-april-2026-deadline-cover)

**Key takeaway:** Test the workflows people actually use. If the tool can't be made accessible quickly, you still need to provide an **accessible alternative** for the service.

### Does our agency's password-protected intranet need to be accessible?

**See also:** [Does ADA Title II apply to internal documents?](#compliance-requirements-iitaa-and-ada-title-ii-does-ada-title-ii-apply-to-internal-documents) | [What about archived documents on the intranet?](#website-accessibility-what-about-archived-documents-on-the-intranet)

**Quick answer:** Password-protected intranet sites for employees only are generally **not covered by the ADA Title II web rule's WCAG requirement** (because the rule focuses on content made available to the public). However, they **may still need to be accessible under Illinois state law (IITAA), ADA Title I (employment), and Section 504** (federal funding). Always prioritize employee accommodations if requested.

**Full explanation:**

**It depends.** Password-protected intranet sites that are **only accessible to agency employees** (not the public) are generally **outside the scope of the ADA Title II web rule’s WCAG requirement**, but they may still need to be accessible under other laws.

**ADA Title II exemption:**

The ADA Title II web rule focuses on content "provided or made available to the public." Password-protected intranet sites that are:

- Only accessible to agency employees
- Not accessible to the general public
- Protected by authentication (login required)

...are generally **outside the scope of the Title II web rule’s WCAG 2.1 Level AA requirement**.

**However, other compliance requirements may still apply:**

1. **IITAA (Illinois Information Technology Accessibility Act)** — Illinois state law requires that intranets and internal systems used by state employees be accessible
2. **ADA Title I (Employment)** — Employers must provide reasonable accommodations for employees with disabilities. If an employee needs to access the intranet to do their job, it may need to be accessible
3. **Section 504** — Organizations receiving federal funding must ensure programs are accessible to employees with disabilities

**Best practice:** Make your intranet accessible proactively. It supports employees with disabilities, prevents costly retrofitting, and ensures compliance with IITAA.

**Resources:**

- **IITAA Requirements:** <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/iitaa.html</a>
- **ADA Title I (Employment):** <a href="https://archive.ada.gov/ada_title_I.htm" target="_blank" rel="noopener noreferrer">https://archive.ada.gov/ada_title_I.htm</a>
- **ADA Title II Web Rule (scope):** <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">https://www.ada.gov/resources/2024-03-08-web-rule/</a>

### What about archived documents on the intranet?

**See also:** [Does our agency's password-protected intranet need to be accessible?](#website-accessibility-does-our-agency-s-password-protected-intranet-need-to-be-accessible) | [Does ADA Title II apply to internal documents?](#compliance-requirements-iitaa-and-ada-title-ii-does-ada-title-ii-apply-to-internal-documents) | [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible) | [Are there exceptions to the April 2026 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2026-deadline-what-qualifies)

**Quick answer:** Truly archived documents that are no longer used may not need proactive remediation, but you may still need to provide access in an alternative format if an employee with a disability needs them (typically handled through reasonable accommodation processes). Note: This section addresses **internal/intranet** documents; for public-facing archived content exceptions, see the comprehensive exceptions FAQ linked above.

**Full explanation:**

**Archived documents that are not currently used may not need proactive remediation** — but you may still need to provide an accessible alternative **when needed for an employee with a disability**, depending on the circumstances and your agency’s accommodation process.

**For truly archived documents:**

- Historical records not currently referenced
- Old versions replaced by newer documents
- Content no longer needed for business operations

**Exception:** Even archived documents should be made accessible if they're:

- Referenced or linked from active intranet pages
- Part of a searchable document library
- Needed for reference or historical context

**If an employee needs access to archived content:** Coordinate with your ADA/HR process to provide an accessible alternative in a timely manner (for example, an accessible version of the document, or another effective format that provides equivalent access).

**Reference:** <a href="https://archive.ada.gov/ada_title_I.htm" target="_blank" rel="noopener noreferrer">Archive.ADA.gov: Employment (Title I)</a>

## Content Accessibility (Documents, PDFs, Presentations)

### My documents look fine — why do they need to be "accessible"?

{new:2025-12-27}

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

**Quick test:** Open your document and try navigating it using only the keyboard (Tab, arrow keys, Enter). If you can't reach everything or don't know where you are, it's not accessible.

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
- **Word documents** — Right-click image > Edit Alt Text.
- **PowerPoint** — Right-click image > Edit Alt Text.
- **Social media** — Each platform has an alt text option (see Social Media Accessibility section).
- **Email** — Outlook and Gmail both support alt text for images.

**WCAG Reference:**

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> — All non-text content must have a text alternative

**See also:** [How long should alt text be?](#content-accessibility-documents-pdfs-presentations-how-long-should-alt-text-be) | [How do I handle complex images like charts, graphs, or infographics?](#content-accessibility-documents-pdfs-presentations-how-do-i-handle-complex-images-like-charts-graphs-or-infographics) | [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start)

### How long should alt text be?

**Best practice: Keep alt text concise—aim for 1-2 sentences in most cases.** The commonly cited "125 character limit" isn't a technical requirement (modern screen readers handle longer text just fine), but brevity helps users process information quickly.

- **Ideal:** Concise and scannable (roughly 15-25 words).
- **Acceptable:** Longer alt text when the image requires detailed description.
- **Too short:** Single words like "photo" or "image" don't help anyone.
- **Consider alternatives:** If you need extensive description (charts, infographics, diagrams), use a visible caption, long description, or linked text instead of cramming everything into alt text.

**The key principle:** Alt text should be **concise but complete**. Describe what's meaningful about the image in as few words as necessary — but don't sacrifice clarity just to hit an arbitrary character limit.

**Key takeaway:** If you took the photo because it captures something meaningful, that meaning needs to be conveyed in alt text for people who can't see it. Keep it concise when possible, but don't truncate important information just to stay under 125 characters — modern screen readers can handle more.

**References:**

- <a href="https://webaim.org/techniques/alttext/" target="_blank" rel="noopener noreferrer">WebAIM: Alternative Text</a> — Best practices for writing alt text
- <a href="https://www.w3.org/WAI/tutorials/images/" target="_blank" rel="noopener noreferrer">W3C: Images Tutorial</a> — Official guidance on alt text length and complexity
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content</a> — WCAG requirement for text alternatives

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

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content</a> — Complex images need text alternatives that serve equivalent purpose
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#images-of-text" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.5 Images of Text - Level AA</a> — Avoid images of text; use actual text when possible

### How do I make images accessible on social media, Constant Contact, or Canva?

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

- **Canva supports alt text** — When you download or share, Canva can include alt text
- **Better approach:** Export important text content separately, not just as an image
- **For presentations:** Use Canva's presentation mode which supports alt text, or export to PowerPoint and add alt text there
- **For print vs. digital:** If creating something for digital distribution, consider whether it needs to be an image at all

**General rule for social/email:**

If you're sharing a complex image on social media or email, ask yourself: "If someone can't see this image, can they still get the information?" If not, you need to provide the content as text — either in the post/email body or linked to an accessible page.

**References:**

- <a href="https://www.section508.gov/create/social-media/" target="_blank" rel="noopener noreferrer">Section508.gov: Social Media Accessibility</a> — Federal guidance on accessible social media
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content</a> — WCAG requirement for text alternatives

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
- **Caption already describes it** — If there's a visible caption that fully describes the visual content, alt text can be briefer — but alt text is still required (even if just "Award ceremony as described in caption").

**References:**

- <a href="https://webaim.org/techniques/alttext/" target="_blank" rel="noopener noreferrer">WebAIM: Alternative Text</a> — Explains the difference between alt text and captions
- <a href="https://www.w3.org/WAI/tutorials/images/decision-tree/" target="_blank" rel="noopener noreferrer">W3C: Alt Decision Tree</a> — Helps determine what kind of text alternative is needed

### Do all documents need to be accessible?

**Quick answer:** For public-facing documents, yes — with limited exceptions. Under both IITAA and ADA Title II, conventional electronic documents must be accessible. **Public-facing** documents created or published after April 24, 2026 must meet WCAG 2.1 Level AA under the ADA Title II web rule. **Internal** documents and intranet content may still need to be accessible under IITAA and employment/accommodation obligations.

**See also:** [Are there exceptions to the April 2026 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2026-deadline-what-qualifies) for comprehensive details on all five exceptions, their strict criteria, and practical examples. | [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility)

**What documents need to be accessible:**

- PDFs
- Word documents
- Excel spreadsheets
- PowerPoint presentations

**For new public-facing documents (created after April 24, 2026):**

- **Yes** — New public-facing documents should be created accessibly by default.
- Make accessibility part of your document creation workflow
- This includes documents created internally or received from external sources

**For existing documents (created before April 24, 2026):**

- **Prioritize by usage** — Focus on:
  - Documents actively used by employees or the public
  - Frequently accessed documents
  - Documents required for services or job functions
  - Documents linked from main pages
- **Pre-existing documents exception** — Documents created before April 24, 2026 may qualify for an exception under § 35.200(b)(2), but **only if** they are not currently used to "apply for, gain access to, or participate in" your agency's services, programs, or activities. See the comprehensive [exceptions FAQ](#state-agency-applicability-are-there-exceptions-to-the-april-2026-deadline-what-qualifies) for full details.

**Important:** Even if a document qualifies for an exception, you must still provide accessible alternatives upon request under the ADA's effective communication requirements. The exception reduces proactive remediation burden — it does not eliminate the obligation to provide access when needed.

**Internal/intranet documents:**

While the Title II web rule focuses on public-facing content, Illinois state agencies should still plan for accessibility in internal systems and documents under IITAA and workplace accommodation obligations. See: [Does ADA Title II apply to internal documents?](#compliance-requirements-iitaa-and-ada-title-ii-does-ada-title-ii-apply-to-internal-documents) | [Does our agency's password-protected intranet need to be accessible?](#website-accessibility-does-our-agency-s-password-protected-intranet-need-to-be-accessible) | [What about archived documents on the intranet?](#website-accessibility-what-about-archived-documents-on-the-intranet)

**Accessibility best practice:** Before creating a document (especially a PDF), consider whether the content could be published as webpage text instead. HTML webpages are generally easier to make and keep accessible than PDFs. As <a href="https://it.cornell.edu/accessibility/create-accessible-pdfs" target="_blank" rel="noopener noreferrer">Cornell IT notes</a>, "Remediating PDFs for web accessibility can be more time consuming than creating a webpage. When possible, convert your PDFs to HTML web pages." If you must use a document format, follow established guidance and test it (see <a href="https://www.section508.gov/create/pdfs/" target="_blank" rel="noopener noreferrer">Section508.gov: Accessible PDFs</a>). This aligns with WCAG 2.1 Level AA requirements and accessibility best practices.

**Best practices:**

1. **Create an accessibility workflow** — Make all new documents accessible before posting
2. **Prioritize remediation** — Focus on frequently used existing documents
3. **Respond to requests** — Have a process to quickly provide accessible versions of archived documents upon request
4. **Document your efforts** — Keep records of what's accessible, what needs work, and any requests you've fulfilled

**Key principle:** The requirement is to ensure people with disabilities can access the information they need. If a document is truly archived and never accessed, it may not need immediate remediation — but if access is needed, you should be prepared to provide an accessible alternative.

### How do I make a Word document accessible?

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

1. **Set up document language** — File > Options > Language > Set as default
2. **Use built-in heading styles** (Heading 1, Heading 2, etc.) — don't just make text bold and large
   - _Visual example:_ Instead of making text 18pt and bold, use the "Heading 1" style from the Styles pane
   - _Why:_ Screen readers use heading styles to navigate; bold text doesn't create navigation structure
3. **Add alt text to images** — Right-click image > Edit Alt Text
   - _Visual example:_ For a photo of a meeting, alt text might be "Five people sitting around a conference table discussing a document"
   - _Why:_ Screen readers read alt text aloud; without it, images are invisible to users who can't see them
4. **Use simple table structures** — Avoid merged cells; designate header rows
   - _Visual example:_ Use Table Tools > Design > Header Row checkbox to mark the first row as headers
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
   - Fix all errors (red X)
   - Review warnings (yellow triangle)
   - Address tips (blue circle) when possible
9. **Test with a screen reader** — If available, use Narrator (Windows) or VoiceOver (Mac) to verify the document makes sense when read aloud
10. **Save as accessible PDF** — If converting to PDF, use File > Save As > PDF, then check "Best for electronic distribution and accessibility"

**Common mistakes to avoid:**

- Using text boxes for content (screen readers may skip them)
- Using watermarks that interfere with readability
- Embedding essential information only in headers/footers
- Using decorative fonts that are hard to read

**Training available from DoIT:** DoIT.Accessibility@Illinois.gov

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#info-and-relationships" target="_blank" rel="noopener noreferrer">Success Criterion 1.3.1 Info and Relationships - Level A</a> (heading structure, table headers, lists)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#link-purpose-in-context" target="_blank" rel="noopener noreferrer">Success Criterion 2.4.4 Link Purpose (In Context) - Level A</a> (link text)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)

### How do I make a PDF accessible?

{new:2026-01-06}

**See also:** [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start) | [My documents look fine — why do they need to be "accessible"?](#content-accessibility-documents-pdfs-presentations-my-documents-look-fine-why-do-they-need-to-be-accessible) | [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible) | [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility)

**Best practice:** Consider publishing content as webpage text instead of PDF when feasible — it's generally easier to make and keep accessible. See: [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible) for details. If you must use a PDF, follow the steps below.

**Critical: Scanned PDFs are not accessible**

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

1. Run the Accessibility Checker in Adobe Acrobat Pro (Tools > Accessibility > Full Check)
2. Add tags using the Reading Order tool (Tools > Accessibility > Reading Order)
3. Add alt text to images (Right-click image > Edit Alt Text)
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

**Testing tool:** PAC 2024 (free) — <a href="https://pac.pdf-accessibility.org/" target="_blank" rel="noopener noreferrer">https://pac.pdf-accessibility.org/</a>

**Adobe guidance:**

- <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html" target="_blank" rel="noopener noreferrer">Create and verify PDF accessibility (Acrobat Pro)</a>
- <a href="https://www.adobe.com/accessibility/pdf.html" target="_blank" rel="noopener noreferrer">Adobe PDF Accessibility Overview</a>

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#info-and-relationships" target="_blank" rel="noopener noreferrer">Success Criterion 1.3.1 Info and Relationships - Level A</a> (document structure, reading order)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#language-of-page" target="_blank" rel="noopener noreferrer">Success Criterion 3.1.1 Language of Page - Level A</a> (document language)

### Is there a quick way to test PDF files for accessibility?

{new:2026-03-10}

**See also:** [How do I make a PDF accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-a-pdf-accessible) | [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible)

**Quick answer:** Yes. ICJIA has created a free, open-source drag-and-drop PDF accessibility checker at <a href="https://audit.icjia.app" target="_blank" rel="noopener noreferrer">https://audit.icjia.app</a>. It runs 9 different accessibility checks on your PDF files instantly in the browser — no installation or account required.

**What it does:**

The tool checks PDF files across 9 accessibility checks, including document structure (tags), reading order, alt text for images, document language, heading hierarchy, and more. It provides a clear pass/fail report for each check so you can quickly identify what needs to be fixed.

**What it does not do:**

The tool is a **checker, not a remediator** — it identifies accessibility issues but does not fix them. Once you know what's wrong, you'll still need to remediate the PDF using tools like Adobe Acrobat Pro, the source document (Word, InDesign, etc.), or other remediation software.

**Why this is especially useful:**

- **Free and open source** — Many PDF accessibility testing tools are expensive or require paid software licenses. This tool is completely free to use, with no hidden costs, subscriptions, or usage limits.
- **No installation required** — It runs entirely in your browser. Just drag and drop your PDF file.
- **Privacy-friendly** — Files are processed locally in your browser; they are not uploaded to a server.
- **Fast triage** — Quickly test a batch of PDFs to identify which ones need remediation and what specific issues to fix, helping you prioritize your remediation workload before the April 24, 2026 deadline.

**Links:**

- **App:** <a href="https://audit.icjia.app" target="_blank" rel="noopener noreferrer">https://audit.icjia.app</a>
- **GitHub repository:** <a href="https://github.com/ICJIA/icjia-pdf-audit" target="_blank" rel="noopener noreferrer">https://github.com/ICJIA/icjia-pdf-audit</a>

**Note:** Automated checkers (including this one) catch many common issues but cannot verify everything — for example, whether alt text accurately describes an image or whether reading order is logical. Always combine automated testing with manual review for full compliance.

### Is Canva accessible?

**Canva has made progress on accessibility** and offers several helpful features. However, tool capabilities change over time — always verify current features with Canva's latest documentation.

_Note: The information below reflects Canva's accessibility features as of early 2026. Verify current capabilities at <a href="https://www.canva.com/accessibility/" target="_blank" rel="noopener noreferrer">Canva's accessibility page</a>._

**What Canva offers (verify current features):**

- **Design Accessibility checker** — Checks contrast, alt text, and typography
- **Alt text support** — Ability to add alt text to images
- **Reading order and heading tagging** — Better structure for PDFs
- **Easier for non-designers** — More accessible than learning Adobe InDesign

**Important limitation:** Canva PDFs may not be fully WCAG or PDF/UA compliant out of the box. Always test exported content.

**Best practices for using Canva:**

1. **Use the Design Accessibility tool before exporting** — It will catch many issues
2. **Keep designs simple** — Simpler designs produce better accessibility results
3. **Test exported PDFs** — Use PAC 2024 or Adobe Acrobat to check accessibility
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
- <a href="https://pac.pdf-accessibility.org/" target="_blank" rel="noopener noreferrer">PAC 2024 (PDF Accessibility Checker)</a> — Free tool to test PDF accessibility

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

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#info-and-relationships" target="_blank" rel="noopener noreferrer">Success Criterion 1.3.1 Info and Relationships - Level A</a> (table structure, headers)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text for charts/images)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#use-of-color" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.1 Use of Color - Level A</a> (don't rely on color alone)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)

### I work with complex data tables. Why does our website use Markdown, and how do I make my tables accessible?

{new:2026-01-23}

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

**Markdown is the translation layer.** Content management systems like Strapi, WordPress, and others use Markdown because:

1. **It's simple** — You can learn the basics in 10 minutes
2. **It converts to HTML automatically** — The CMS handles the technical conversion
3. **It separates content from design** — Writers focus on content; the website handles how it looks
4. **It's accessible by design** — Markdown headings become proper HTML headings; Markdown tables become proper HTML tables with headers

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
| **Header row** | Format as Table with header row checked | First row automatically becomes headers |
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

| Region | Q1 Sales | Q1 % | Q2 Sales | Q2 % | Q3 Sales | Q3 % | Q4 Sales | Q4 % | Total | YoY Change |
| ------ | -------- | ---- | -------- | ---- | -------- | ---- | -------- | ---- | ----- | ---------- |

✅ **Easier approach:** Split into multiple tables (one per quarter) or provide a summary with a link to detailed data.

**Practical tips for Word → Markdown workflow:**

1. **Build your table simply in Word first** — Use Table > Insert Table; check "Header Row" in Table Design
2. **Avoid merged cells** — They don't convert cleanly to Markdown
3. **Test the Accessibility Checker in Word** — Fix issues before converting
4. **Use your CMS's table tools** — Most have visual table editors
5. **If you must write Markdown tables** — Use a <a href="https://www.tablesgenerator.com/markdown_tables" target="_blank" rel="noopener noreferrer">Markdown table generator</a> to create the syntax

**Key takeaway:** Markdown isn't an obstacle — it's a tool that makes web content possible. Focus on making your content accessible in Word (simple structure, proper headers, no merged cells), and the Markdown conversion will follow. The accessibility principles are the same regardless of format.

**References:**

- <a href="https://www.markdownguide.org/basic-syntax/#tables" target="_blank" rel="noopener noreferrer">Markdown Guide: Tables</a> — Basic Markdown table syntax
- <a href="https://www.tablesgenerator.com/markdown_tables" target="_blank" rel="noopener noreferrer">Tables Generator</a> — Visual tool for creating Markdown tables
- <a href="https://www.w3.org/WAI/tutorials/tables/" target="_blank" rel="noopener noreferrer">W3C: Tables Tutorial</a> — Comprehensive guide to accessible tables
- <a href="https://webaim.org/techniques/tables/data" target="_blank" rel="noopener noreferrer">WebAIM: Creating Accessible Tables</a> — Practical accessibility guidance

**See also:** [How do I make Excel spreadsheets accessible?](#content-accessibility-documents-pdfs-presentations-how-do-i-make-excel-spreadsheets-accessible) | [My documents look fine — why do they need to be "accessible"?](#content-accessibility-documents-pdfs-presentations-my-documents-look-fine-why-do-they-need-to-be-accessible)

### How do I make PowerPoint presentations accessible?

Key steps for accessible PowerPoint:

1. **Use built-in slide layouts** — Don't create from blank slides
2. **Add alt text to images, charts, and graphics**
3. **Ensure reading order is correct** — Home > Arrange > Selection Pane
4. **Use unique, descriptive slide titles**
5. **Use sufficient color contrast**
6. **Make hyperlinks descriptive**
7. **Add captions to embedded videos**
8. **Run the Accessibility Checker** — Review tab > Check Accessibility

**WCAG References:**

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#info-and-relationships" target="_blank" rel="noopener noreferrer">Success Criterion 1.3.1 Info and Relationships - Level A</a> (reading order, structure)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#page-titled" target="_blank" rel="noopener noreferrer">Success Criterion 2.4.2 Page Titled - Level A</a> (slide titles)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#link-purpose-in-context" target="_blank" rel="noopener noreferrer">Success Criterion 2.4.4 Link Purpose (In Context) - Level A</a> (link text)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#captions-prerecorded" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.2 Captions (Prerecorded) - Level A</a> (video captions)

### How do I make emails and newsletters accessible?

{new:2025-12-27}

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

- Use the built-in Accessibility Checker (Review > Check Accessibility)
- Add alt text to images (right-click > Edit Alt Text)
- Use heading styles from the formatting toolbar
- Avoid excessive use of tables for layout

**Gmail:**

- Gmail has limited accessibility features for composing
- Keep formatting simple — bold, italics, lists
- Add image descriptions in the email body if alt text isn't available
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

- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#info-and-relationships" target="_blank" rel="noopener noreferrer">Success Criterion 1.3.1 Info and Relationships - Level A</a> (structure)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#link-purpose-in-context" target="_blank" rel="noopener noreferrer">Success Criterion 2.4.4 Link Purpose (In Context) - Level A</a> (link text)

---

## Social Media Accessibility

### Do social media posts need to be accessible? How do I make them accessible?

**Yes.** Under the ADA Title II rule, new social media posts by state and local governments must meet accessibility standards. Pre-existing posts (made before the compliance date) may qualify for an exception under § 35.200(b)(5) — see [Are there exceptions to the April 2026 deadline?](#state-agency-applicability-are-there-exceptions-to-the-april-2026-deadline-what-qualifies) for full details on all five exceptions and their limitations.

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
  - **X (Twitter):** When composing, click the image > "Add description"
  - **Facebook:** Click the image > Edit > Alternative Text
  - **Instagram:** Advanced Settings > Write Alt Text (or edit after posting)
  - **LinkedIn:** Click the image while composing > Alt text

**For video:**

- Add captions (not just auto-generated — review for accuracy)
- Provide audio description for essential visual content if needed

**Resources:**

- **Platform-specific guidance:** <a href="https://www.section508.gov/create/social-media/" target="_blank" rel="noopener noreferrer">https://www.section508.gov/create/social-media/</a>
- **ADA Title II Reference:** <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule - Social Media</a> (see section on "Social Media Posts")
- **WCAG References:**
  - <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#captions-prerecorded" target="_blank" rel="noopener noreferrer">Success Criterion 1.2.2 Captions (Prerecorded) - Level A</a> (captions)
  - <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#non-text-content" target="_blank" rel="noopener noreferrer">Success Criterion 1.1.1 Non-text Content - Level A</a> (alt text for images)
  - <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa#contrast-minimum" target="_blank" rel="noopener noreferrer">Success Criterion 1.4.3 Contrast (Minimum) - Level AA</a> (color contrast)

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

### How do we ensure accessibility compliance with third-party tools like LMSs (Docebo), DocuSign, Tableau, and ArcGIS?

{new:2026-01-06}

**Quick answer:** Your agency is responsible for accessibility of services delivered through third-party tools, even if you don't control the platform code. This requires: (1) verifying the platform's accessibility claims, (2) ensuring your content and workflows are accessible, (3) testing real user workflows, and (4) providing accessible alternatives when needed.

**Why this matters:**

Under the ADA Title II web rule, public entities are responsible for the accessibility of third-party content when it is provided "under contractual, licensing, or other arrangements" (§ 35.200(a)). This means:

- **Content you contract for** — Payment processors, scheduling tools, chat widgets, LMS platforms, document signing tools, embedded maps (ArcGIS), dashboards (Tableau), survey tools, and other contracted services — falls under your agency's responsibility
- **Content posted by third parties without a contractual relationship** — Such as user comments on a public forum — is generally excepted (§ 35.200(b)(3))

**Common third-party tools requiring accessibility:**

- Learning Management Systems (LMSs) like Docebo, Canvas, Moodle
- Document signing tools like DocuSign
- Data visualization and dashboards like Tableau, Power BI
- Mapping platforms like ArcGIS, Google Maps
- Payment processors, scheduling tools, chat widgets
- Survey and form tools integrated into your site

**Important note:** Vendor accessibility status changes over time. All major vendors (Docebo, DocuSign, Tableau, Esri/ArcGIS) publish accessibility information and VPATs on their websites. The guidance below reflects general principles — always verify current accessibility status with the vendor's latest documentation for your specific product version and configuration.

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

**Compliance requirement:**

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

**Compliance requirement:**

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

4. **Provide accessible alternatives** — For complex dashboards that can't be fully remediated quickly:
   - Accessible data tables or CSV downloads
   - Plain-language summaries of key findings
   - Text-based reports with the same information

**For ArcGIS Maps:**

**Compliance requirement:**

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

4. **Provide accessible alternatives** — For complex maps that can't be fully remediated quickly:
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

5. **Document what you found**:
   - Date/version tested, workflow steps, issues, and screenshots
   - "Workaround/alternative provided" if the vendor can't fix quickly

**Procurement/contract expectations:**

- **VPAT/ACR** for the exact product/version you're buying/using
- A list of **known issues** + vendor **remediation timeline**
- Contract language requiring **WCAG 2.1 Level AA** and support for accessibility fixes

**Common pitfalls to avoid:**

- **Assuming vendor claims are accurate** — Always verify with current VPAT/ACR and test yourself
- **Focusing only on the platform** — Your content and configuration matter just as much
- **Ignoring customizations** — Custom themes, plugins, or integrations can introduce accessibility issues
- **Skipping workflow testing** — Testing individual pages isn't enough; test complete user journeys
- **No backup plan** — Always have an accessible alternative ready

**Ongoing monitoring:**

- Re-test after major platform updates, configuration/theme changes, or new integrations
- Track user feedback and escalate issues to vendors
- Keep accessibility requirements in renewal contracts
- Document your testing and remediation efforts

**See also:**

- [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility) — Additional testing guidance for web content

**References:**

- <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">ADA Title II Web Rule Fact Sheet</a> — See section on "Third-Party Content"
- <a href="https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state" target="_blank" rel="noopener noreferrer">Federal Register: Final Rule</a> — § 35.200(a) on contractual arrangements
- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-procurement.html" target="_blank" rel="noopener noreferrer">IITAA Procurement Guidance</a> — Illinois-specific procurement requirements
- <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa" target="_blank" rel="noopener noreferrer">WCAG 2.1 Quick Reference (Level AA)</a> — Filterable checklist of accessibility requirements
- <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">WebAIM Contrast Checker</a> — Tool for checking color contrast ratios
- <a href="https://doit.illinois.gov/initiatives/accessibility/testing.html" target="_blank" rel="noopener noreferrer">DoIT Testing Resources</a> — Illinois-specific testing guidance
- <a href="https://www.section508.gov/test/" target="_blank" rel="noopener noreferrer">Section 508 Testing Resources</a> — Federal testing guidance

**Key takeaway:** Third-party tools don't exempt you from accessibility requirements. Verify platform accessibility, ensure your content is accessible, test real workflows, and always have an accessible alternative ready.

### What contract language should I use?

Illinois DoIT recommends including language similar to:

> "All information technology, including electronic information, software, systems, and equipment, developed or provided under this contract or procurement must comply with the applicable requirements of the Illinois Information Technology Accessibility Act (30 ILCS 587) Standards as published at <a href="https://doit.illinois.gov/accessibility/iitaa" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/accessibility/iitaa</a>"

**References:**

- <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa/iitaa-procurement.html" target="_blank" rel="noopener noreferrer">IITAA Procurement Guidance</a> — Official Illinois contract language recommendations
- <a href="https://www.section508.gov/buy/request-accessibility-information/" target="_blank" rel="noopener noreferrer">Section508.gov: Request Accessibility Information</a> — Federal procurement best practices

### What is a VPAT? What is an ACR or MCAR?

{new:2025-12-27}

**Quick answer:** A **VPAT (Voluntary Product Accessibility Template)** is a standardized form vendors fill out to describe how their product meets accessibility standards. An **ACR (Accessibility Conformance Report)** is the completed VPAT — the actual document you request from vendors. **MCAR** stands for **Manufacturer's Conformance Accessibility Report**, which is essentially the same thing.

**Full explanation:**

**VPAT = the blank form; ACR = the completed report.** These terms are often used interchangeably, but technically:

- **VPAT (Voluntary Product Accessibility Template)** — The blank template created by the IT Industry Council (ITI) that provides a standard format for documenting accessibility conformance
- **ACR (Accessibility Conformance Report)** — The completed document a vendor provides, showing how their specific product meets (or doesn't meet) accessibility standards
- **MCAR (Manufacturer's Conformance Accessibility Report)** — Another term for ACR, emphasizing that it comes from the manufacturer/vendor

**What a VPAT/ACR tells you:**

1. **Which standard is evaluated** — Look for WCAG 2.1 Level AA (the current requirement)
2. **Conformance level for each criterion** — Common ratings include:
   - **Supports** — Fully meets the criterion
   - **Partially Supports** — Meets some but not all aspects
   - **Does Not Support** — Fails to meet the criterion
   - **Not Applicable** — Criterion doesn't apply to this product
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

**The bottom line:** Always request a current VPAT/ACR before purchasing technology. It won't guarantee accessibility, but it's your first line of defense against buying inaccessible tools.

**References:**

- <a href="https://www.itic.org/policy/accessibility/vpat" target="_blank" rel="noopener noreferrer">ITI VPAT Template</a> — Official VPAT template and guidance
- <a href="https://www.section508.gov/sell/how-to-create-acr-with-vpat/" target="_blank" rel="noopener noreferrer">Section508.gov: How to Create an ACR</a> — Federal guidance on VPATs

---

## ICJIA-Specific Information

This section contains information specific to the Illinois Criminal Justice Information Authority (ICJIA). If you work for a different Illinois state agency, the general principles apply, but the specific resources and contacts may differ.

### ICJIA has many public sites. Where can I see the audit reports for each site?

{new:2025-12-30}

**Quick answer:** ICJIA web developers are methodically adding accessibility reports for each public site. Look for an "Accessibility Report" link in the footer of ICJIA websites. Additionally, website audit reports will be posted on an ongoing basis as they become available.

**Available website audit reports:**

| Site                                                 | Accessibility Report                                                                                                                |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Domestic Violence Fatality Review (dvfr.illinois.gov)| <a href="https://dvfr.illinois.gov/docs/accessibility/" target="_blank" rel="noopener noreferrer">View Report</a>                   |
| ICJIA Accessibility Portal (this site)               | <a href="https://accessibility.icjia.app/docs/accessibility/index.html" target="_blank" rel="noopener noreferrer">View Report</a>   |
| i2i (i2i.illinois.gov)                               | <a href="https://i2i.illinois.gov/documentation/accessibility/index.html" target="_blank" rel="noopener noreferrer">View Report</a> |
| R3 (r3.illinois.gov)                                 | <a href="https://r3.illinois.gov/docs/accessibility/index.html" target="_blank" rel="noopener noreferrer">View Report</a>           |
| Safe From the Start (sfs.icjia.illinois.gov)         | <a href="https://sfs.icjia.illinois.gov/docs/accessibility/" target="_blank" rel="noopener noreferrer">View Report</a>              |
| Violence Prevention Project (vpp.icjia.illinois.gov) | <a href="https://vpp.icjia.illinois.gov/docs/accessibility/index.html" target="_blank" rel="noopener noreferrer">View Report</a>    |

**Website audit reports:**

Website audit reports for existing public websites will be posted on an ongoing basis as they become available. Remediation is challenging and time-consuming, so reports will be posted as soon as they're ready. Web developers are working as fast and as efficiently as possible to audit and remediate all of ICJIA's sites. Check back periodically for updates.

**Important:** These website audit reports cover existing public websites only. Content (PDFs, Word documents, videos, etc.) and social media require their own separate auditing and remediation processes. See: [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible) | [Do I need to caption all videos?](#website-accessibility-do-i-need-to-caption-all-videos) | [Do social media posts need to be accessible?](#social-media-accessibility-do-social-media-posts-need-to-be-accessible-how-do-i-make-them-accessible) | <a href="https://www.section508.gov/create/documents/" target="_blank" rel="noopener noreferrer">Section508.gov: Accessible Documents</a> | <a href="https://www.w3.org/WAI/media/av/captions/" target="_blank" rel="noopener noreferrer">W3C: Video Captions</a>

**How to find audit reports for websites:**

- **Look in the footer** — Most ICJIA sites will have an "Accessibility Report" link in the footer.
- **Reports are site-specific** — Each website has its own report documenting that site's accessibility status.

**Important limitations:**

- **Website reports only** — These reports use <a href="https://github.com/dequelabs/axe-core" target="_blank" rel="noopener noreferrer">axe-core</a> to test websites (HTML, navigation, forms). They do NOT cover PDFs, Word documents, Excel files, or other content files.
- **Content creator responsibility** — If you create documents, you're responsible for making them accessible. See: [Do all documents need to be accessible?](#content-accessibility-documents-pdfs-presentations-do-all-documents-need-to-be-accessible)
- **Automated testing limits** — Manual testing with keyboard navigation and screen readers is still required for full compliance.

### How do we handle accessibility complaints?

{new:2025-12-31}

**Quick answer:** A formal complaint handling procedure has not yet been established at ICJIA. The guidance below is provisional and will be updated once the process is finalized.

**Provisional guidance:**

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
4. **Coordinate with the accessibility coordinator** (once designated) or **ICJIA's IT department** — They should be involved in the response

**The goal:** Treat accessibility reports as service improvement opportunities, not as problems to defend against. Most people who report barriers just want to access the service — they're not looking for legal action.

**This section will be updated** once ICJIA designates an accessibility coordinator and establishes a formal complaint handling procedure. In the meantime, contact **ICJIA's IT department** with accessibility complaints or concerns.

---

## Getting Help

### Illinois Resources

| Resource                                 | Contact/Link                                                                                                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DoIT Office of Information Accessibility | DoIT.Accessibility@Illinois.gov                                                                                                                                                             |
| DoIT Accessibility Website               | <a href="https://doit.illinois.gov/initiatives/accessibility.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility.html</a>                   |
| IITAA Standards                          | <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/iitaa.html</a>       |
| Accessibility Training                   | <a href="https://doit.illinois.gov/initiatives/accessibility/training.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/training.html</a> |
| Testing Resources                        | <a href="https://doit.illinois.gov/initiatives/accessibility/testing.html" target="_blank" rel="noopener noreferrer">https://doit.illinois.gov/initiatives/accessibility/testing.html</a>   |

### Federal Resources

| Resource                    | Link                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ADA.gov — Title II Web Rule | <a href="https://www.ada.gov/title-ii-web-rule/" target="_blank" rel="noopener noreferrer">https://www.ada.gov/title-ii-web-rule/</a> |
| Section508.gov              | <a href="https://www.section508.gov/" target="_blank" rel="noopener noreferrer">https://www.section508.gov/</a>                       |
| W3C WCAG 2.1                | <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">https://www.w3.org/TR/WCAG21/</a>                   |
| WebAIM                      | <a href="https://webaim.org/" target="_blank" rel="noopener noreferrer">https://webaim.org/</a>                                       |

### Free Testing Tools

| Tool                    | Link                                                                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WAVE                    | <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">https://wave.webaim.org/</a>                                                                 |
| axe DevTools            | <a href="https://www.deque.com/axe/" target="_blank" rel="noopener noreferrer">https://www.deque.com/axe/</a>                                                             |
| ANDI                    | <a href="https://www.ssa.gov/accessibility/andi/help/install.html" target="_blank" rel="noopener noreferrer">https://www.ssa.gov/accessibility/andi/help/install.html</a> |
| WebAIM Contrast Checker | <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">https://webaim.org/resources/contrastchecker/</a>                       |
| PAC 2024 (PDF checker)  | <a href="https://pac.pdf-accessibility.org/" target="_blank" rel="noopener noreferrer">https://pac.pdf-accessibility.org/</a>                                             |
| ICJIA PDF Audit         | <a href="https://audit.icjia.app" target="_blank" rel="noopener noreferrer">https://audit.icjia.app</a>                                                                    |

---

## Glossary

**Confused by the jargon?** Here are plain-language definitions of common accessibility terms used throughout these FAQs:

### Legal and Standards Terms

{new:2025-12-27}

**ADA (Americans with Disabilities Act)** — Federal civil rights law that prohibits discrimination against people with disabilities. **Title I** covers employment accommodations. **Title II** covers public services and requires state and local governments to make digital content accessible. <a href="https://www.ada.gov/" target="_blank" rel="noopener noreferrer">Learn more about ADA</a>

**ADA Title II Web Rule** — The 2024 Department of Justice rule that requires state and local governments to meet **WCAG 2.1 Level AA** standards for public-facing digital content by April 24, 2026 (for entities with populations of 50,000+). <a href="https://www.ada.gov/resources/2024-03-08-web-rule/" target="_blank" rel="noopener noreferrer">Read the ADA Title II Web Rule Fact Sheet</a>

**IITAA (Illinois Information Technology Accessibility Act)** — Illinois state law (30 ILCS 587) requiring Illinois state agencies and universities to ensure their digital content is accessible to people with disabilities. Current standards require **WCAG 2.1 Level AA** compliance. <a href="https://doit.illinois.gov/initiatives/accessibility/iitaa.html" target="_blank" rel="noopener noreferrer">Learn more about IITAA</a>

**Section 504** — Part of the Rehabilitation Act of 1973 that requires organizations receiving federal funding to ensure their programs and activities are accessible to people with disabilities. <a href="https://www.law.cornell.edu/uscode/text/29/794" target="_blank" rel="noopener noreferrer">Read 29 U.S.C. § 794 (Section 504)</a>

**WCAG (Web Content Accessibility Guidelines)** — International standards published by the World Wide Web Consortium (W3C) that explain how to make digital content accessible. Think of them as a detailed checklist for making websites, documents, and apps usable by everyone. <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">Learn more about WCAG</a>

**WCAG 2.1 Level AA** — The specific accessibility standard required by both IITAA and ADA Title II. "Level AA" means meeting both Level A (minimum) and Level AA (standard) criteria. This is the compliance target for all public-facing digital content. <a href="https://www.w3.org/WAI/WCAG21/quickref/?levels=aa" target="_blank" rel="noopener noreferrer">View WCAG 2.1 Level AA Quick Reference</a>

### Procurement Terms

{new:2025-12-27}

**ACR (Accessibility Conformance Report)** — The completed document a vendor provides showing how their product meets (or doesn't meet) accessibility standards. This is the actual report you request from vendors — the filled-out version of a VPAT. <a href="https://www.section508.gov/sell/how-to-create-acr-with-vpat/" target="_blank" rel="noopener noreferrer">Learn how to create an ACR</a>

**MCAR (Manufacturer's Conformance Accessibility Report)** — Another term for ACR, emphasizing that it comes from the manufacturer/vendor. Essentially the same as ACR.

**VPAT (Voluntary Product Accessibility Template)** — The blank template created by the IT Industry Council (ITI) that provides a standard format for documenting accessibility conformance. Vendors fill out VPATs to create ACRs. <a href="https://www.itic.org/policy/accessibility/vpat" target="_blank" rel="noopener noreferrer">Download VPAT template</a>

**VPAT ratings** — Common ratings in VPATs/ACRs include:

- **Supports** — Fully meets the criterion
- **Partially Supports** — Meets some but not all aspects
- **Does Not Support** — Fails to meet the criterion
- **Not Applicable** — Criterion doesn't apply to this product

### Technical Terms

{new:2025-12-27}

**Alt text (Alternative text)** — A brief written description of an image that screen readers read aloud to users who can't see the image. Example: "Director Smith presenting award to Officer Jones at the annual ceremony." Best practice: Keep concise (roughly 15-25 words), though modern screen readers handle longer text when needed.

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

**Screen reader** — Software that reads digital content aloud for people who are blind or have low vision. Common screen readers include <a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer">NVDA</a> (free, Windows), <a href="https://www.freedomscientific.com/products/software/jaws/" target="_blank" rel="noopener noreferrer">JAWS</a> (Windows), and VoiceOver (built into Mac/iOS).

**Transcript** — A written version of spoken audio content. Required for audio-only content (like podcasts) under WCAG 2.1 Level AA. <a href="https://www.w3.org/WAI/media/av/transcripts/" target="_blank" rel="noopener noreferrer">Learn about transcripts</a>

### Content-Specific Terms

{new:2025-12-27}

**Accessible document** — A document (Word, PDF, PowerPoint, Excel) that has proper structure (headings, not just bold text), alt text for images, readable tables, and other features that make it usable by assistive technologies. <a href="https://www.section508.gov/create/documents/" target="_blank" rel="noopener noreferrer">Learn how to create accessible documents</a>

**Accessible template** — A document template (Word, PowerPoint, etc.) that's already set up with proper heading styles, accessible fonts, sufficient color contrast, and other accessibility features built in.

**Remediation** — The process of fixing inaccessible content to make it accessible. Example: Adding alt text to images, fixing heading structure, adding captions to videos.

**Semantic HTML** — HTML code that uses the correct elements for their intended purpose (e.g., `<button>` for buttons, `<nav>` for navigation, `<h1>`–`<h6>` for headings). This helps screen readers understand the structure and purpose of content.

### Process Terms

{new:2025-12-27}

**Automated testing** — Using software tools (like <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer">WAVE</a>, <a href="https://www.deque.com/axe/" target="_blank" rel="noopener noreferrer">axe DevTools</a>, Lighthouse) to automatically scan for accessibility issues. These tools catch many problems but can't detect everything — manual testing is also required. <a href="https://doit.illinois.gov/initiatives/accessibility/testing.html" target="_blank" rel="noopener noreferrer">Illinois DoIT Testing Resources</a>

**Manual testing** — Testing accessibility by actually using assistive technologies (keyboard navigation, screen readers) or checking things manually (color contrast, zoom testing). Required because automated tools miss many issues. <a href="https://doit.illinois.gov/initiatives/accessibility/testing.html" target="_blank" rel="noopener noreferrer">Illinois DoIT Testing Resources</a>

**Prioritization** — The process of deciding which accessibility issues to fix first when you can't fix everything at once. Typically based on impact: high-traffic content, critical services, and complete blockers come first.

**VPAT/ACR review** — The process of evaluating a vendor's accessibility documentation (VPAT/ACR) to determine if their product meets your accessibility requirements before purchasing.

---

## Keyword Index

**Find questions by topic:** Use this index to quickly locate FAQs related to specific keywords or topics. Questions may appear under multiple keywords.

### Accessibility Basics

- [What is digital accessibility?](#understanding-accessibility-what-is-digital-accessibility)
- [What is WCAG?](#common-concerns-what-is-wcag)
- [What does "WCAG 2.1 Level AA" mean?](#common-concerns-what-does-wcag-2-1-level-aa-mean)
- [What are the most common accessibility mistakes and issues to avoid?](#common-concerns-what-are-the-most-common-accessibility-mistakes-and-issues-to-avoid)
- [What WCAG requirements are commonly overlooked?](#website-accessibility-what-wcag-requirements-are-commonly-overlooked)

### Getting Started by Role

- [I'm a content creator. Where do I start?](#getting-started-i-m-a-content-creator-where-do-i-start)
- [I'm a web developer. Where do I start?](#getting-started-i-m-a-web-developer-where-do-i-start)
- [I'm a manager. Where do I start?](#getting-started-i-m-a-manager-where-do-i-start)
- [I'm on executive staff. Where do I start?](#getting-started-i-m-on-executive-staff-where-do-i-start)
- [Quick Reference: Critical Actions By Role](#quick-reference-critical-actions-by-role)

### Compliance & Legal

- [What is the IITAA?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-iitaa)
- [What is the ADA Title II digital accessibility rule?](#compliance-requirements-iitaa-and-ada-title-ii-what-is-the-ada-title-ii-digital-accessibility-rule)
- [When must we comply with the ADA Title II rule?](#compliance-requirements-iitaa-and-ada-title-ii-when-must-we-comply-with-the-ada-title-ii-rule)
- [What happens after April 24, 2026?](#state-agency-applicability-what-happens-after-april-24-2026)
- [What if we can't meet the April 24, 2026 deadline?](#state-agency-applicability-what-if-we-can-t-meet-the-april-24-2026-deadline)
- [Are there exceptions to the April 2026 deadline? What qualifies?](#state-agency-applicability-are-there-exceptions-to-the-april-2026-deadline-what-qualifies)

### Testing & Auditing

- [How do I test my website for accessibility?](#website-accessibility-how-do-i-test-my-website-for-accessibility)
- [Is there a quick way to test PDF files for accessibility?](#content-accessibility-documents-pdfs-presentations-is-there-a-quick-way-to-test-pdf-files-for-accessibility)
- [Do we need an independent (external) accessibility audit to prove compliance? When is it worth it?](#website-accessibility-do-we-need-an-independent-external-accessibility-audit-to-prove-compliance-when-is-it-worth-it)
- [Can't we just use an accessibility overlay/widget (a "one-click fix") instead of doing remediation?](#website-accessibility-can-t-we-just-use-an-accessibility-overlay-widget-a-one-click-fix-instead-of-doing-remediation)

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
- [How do we ensure accessibility compliance with third-party tools like LMSs (Docebo), DocuSign, Tableau, and ArcGIS?](#procurement-and-third-party-tools-how-do-we-ensure-accessibility-compliance-with-third-party-tools-like-lmss-docebo-docusign-tableau-and-arcgis)
- [What contract language should I use?](#procurement-and-third-party-tools-what-contract-language-should-i-use)
- [What is a VPAT? What is an ACR or MCAR?](#procurement-and-third-party-tools-what-is-a-vpat-what-is-an-acr-or-mcar)

### Agency Management

- [Do we need an agency accessibility coordinator?](#state-agency-applicability-do-we-need-an-agency-accessibility-coordinator)
- [How do we prioritize accessibility work with limited resources and a ticking clock?](#state-agency-applicability-how-do-we-prioritize-accessibility-work-with-limited-resources-and-a-ticking-clock)
- [What's the bare minimum we need to do by April 2026?](#state-agency-applicability-what-s-the-bare-minimum-we-need-to-do-by-april-2026)
- [How can I track and demonstrate "good-faith progress" toward compliance?](#getting-started-how-can-i-track-and-demonstrate-good-faith-progress-toward-compliance)
- [Who signs off that we're compliant? Can we "certify" WCAG 2.1 Level AA compliance?](#getting-started-who-signs-off-that-we-re-compliant-can-we-certify-wcag-2-1-level-aa-compliance)

### Getting Help

- [Illinois Resources](#getting-help-illinois-resources)
- [Federal Resources](#getting-help-federal-resources)
- [Free Testing Tools](#getting-help-free-testing-tools)
- [How do we handle accessibility complaints?](#icjia-specific-information-how-do-we-handle-accessibility-complaints)

### ICJIA-Specific

- [ICJIA has many public sites. Where can I see the audit reports for each site?](#icjia-specific-information-icjia-has-many-public-sites-where-can-i-see-the-audit-reports-for-each-site)
- [How do we handle accessibility complaints?](#icjia-specific-information-how-do-we-handle-accessibility-complaints)

---

_Last updated: March 10, 2026_
