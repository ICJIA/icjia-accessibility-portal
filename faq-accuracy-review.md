# FAQ Accuracy Review

Generated: December 30, 2025

This document identifies FAQs that need additional editing for accuracy, clarity, or consistency.

---

## ISSUES REQUIRING EDITING

### 1. Color Contrast Text Size Phrasing (Minor Clarity Issue)

**LOCATION:** Line 1116 - "What color contrast ratio is required?"

**CURRENT TEXT:**

```
- **Normal text** (under 18pt or 14pt bold): **4.5:1** contrast ratio
- **Large text** (18pt+ or 14pt+ bold): **3:1** contrast ratio
```

**ISSUE:**
The phrasing "under 18pt or 14pt bold" is slightly ambiguous. WCAG defines "large text" as 18pt regular font OR 14pt bold font. The current phrasing could be clearer.

**SUGGESTED REVISION:**

```
- **Normal text** (smaller than 18pt regular or 14pt bold): **4.5:1** contrast ratio
- **Large text** (18pt+ regular or 14pt+ bold): **3:1** contrast ratio
```

**SEVERITY:** Low - Minor clarity improvement

---

### 2. Images of Text - Minimum Size Claim (Inaccurate)

**LOCATION:** Line 1914 - "How do I make emails and newsletters accessible?" (in table)

**CURRENT TEXT:**

```
3. **Tiny text in images** — Text in graphics should be at least 14pt equivalent
```

**ISSUE:**
WCAG 1.4.5 (Images of Text) does not specify a minimum text size. The criterion states that images of text should be avoided when possible, but if used, they must meet contrast requirements. There is no "14pt minimum" requirement for text in images.

**SUGGESTED REVISION:**

```
3. **Text in images** — Avoid putting text in images when possible; if you must, ensure sufficient contrast (4.5:1 for normal text, 3:1 for large text)
```

**SEVERITY:** Medium - Could mislead readers about actual requirements

---

### 3. Color Contrast Ratio Consistency Check

**LOCATION:** Multiple locations

**ISSUE:**
The FAQ consistently states 4.5:1 for normal text and 3:1 for large text, which is correct. However, line 1118 mentions "UI components and graphics: 3:1 contrast ratio" which is correct for WCAG 2.1 Level AA (SC 1.4.11 Non-text Contrast), but this could be clarified that it applies to UI components and graphical objects that are required to understand content.

**VERIFICATION:**

- Line 1118 correctly states UI components and graphics need 3:1 (this is SC 1.4.11)
- This is accurate and doesn't need changing, but could benefit from a brief clarification

**SUGGESTED ENHANCEMENT (Optional):**
Add a brief note: "UI components and graphics: 3:1 contrast ratio (for interactive elements, icons, and graphical objects required to understand content - WCAG SC 1.4.11)"

**SEVERITY:** Low - Optional clarification

---

## POTENTIAL CLARIFICATIONS (Not Errors, But Could Be Improved)

### 4. IITAA 2.1 Standards Effective Date

**LOCATION:** Line 637 and 895

**CURRENT TEXT:**

- Line 637: "The current IITAA 2.1 Standards (effective June 2024) require WCAG 2.1 Level AA compliance."
- Line 895: "The current IITAA 2.1 Standards require conformance with WCAG 2.1 Level AA."

**ISSUE:**
Line 637 mentions "effective June 2024" but line 895 doesn't. This is a minor inconsistency, though not necessarily an error.

**SUGGESTED REVISION:**
Consider adding the effective date to line 895 for consistency, or verify the exact effective date is accurate.

**SEVERITY:** Very Low - Minor consistency issue

---

### 5. WCAG 2.2 Backward Compatibility Statement

**LOCATION:** Line 205

**CURRENT TEXT:**
"WCAG versions are backward-compatible, so meeting 2.2 also means meeting 2.1 and 2.0."

**ISSUE:**
This is accurate, but could be slightly more precise. WCAG 2.2 adds new success criteria but doesn't remove any from 2.1. However, the statement is correct as written.

**VERIFICATION:**
The statement is accurate - no changes needed.

**SEVERITY:** None - Statement is correct

---

## SUMMARY TABLE

| #   | Issue                                | Severity | Location         | Status   |
| --- | ------------------------------------ | -------- | ---------------- | -------- |
| 1   | Color contrast text size phrasing    | Low      | Lines 1116, 2141 | ✅ FIXED |
| 2   | Images of text minimum size claim    | Medium   | Line 1914        | ✅ FIXED |
| 3   | UI components contrast clarification | Low      | Line 1118        | ✅ FIXED |
| 4   | IITAA effective date consistency     | Very Low | Lines 637, 895   | ✅ FIXED |

---

## RECOMMENDATIONS

**✅ ALL ISSUES FIXED:**

- Issue #1: ✅ Fixed - Clarified color contrast text size phrasing (Lines 1116, 2141)
- Issue #2: ✅ Fixed - Removed inaccurate "14pt minimum" claim for text in images (Line 1914)
- Issue #3: ✅ Fixed - Added clarification about UI component contrast requirements (Line 1118)
- Issue #4: ✅ Fixed - Added IITAA effective date for consistency (Line 895)

---

## OVERALL ASSESSMENT

The FAQ content is generally accurate and well-written. All identified issues have been fixed:

- ✅ One medium-severity issue (inaccurate minimum size claim) - FIXED
- ✅ One low-severity clarity issue - FIXED
- ✅ Two optional enhancements - FIXED

The document demonstrates strong understanding of WCAG requirements and legal obligations. All revisions from both reviews have been successfully implemented. The FAQ is now accurate, consistent, and ready for use.

---

END OF REVIEW
