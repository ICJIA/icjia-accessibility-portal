/**
 * Regenerate all internal FAQ links with 150-character slugs
 */
const fs = require('fs');
const path = require('path');

// Slugify function matching the new composable (150 chars)
function slugify(text, maxLength = 150) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, maxLength)
    .replace(/-+$/, '');
}

function getQuestionId(sectionHeading, questionText) {
  const sectionSlug = slugify(sectionHeading, 150);
  const questionSlug = slugify(questionText, 150);
  const combinedSlug = `${sectionSlug}-${questionSlug}`;
  return slugify(combinedSlug, 150);
}

const faqPath = path.join(__dirname, 'content', 'faqs.md');
let content = fs.readFileSync(faqPath, 'utf8');

// Parse the FAQ structure
const lines = content.split('\n');
let currentSection = '';
const sections = [];
const questions = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.startsWith('## ') && !line.includes('Quick Reference')) {
    currentSection = line.replace('## ', '').trim();
    sections.push({
      heading: currentSection,
      line: i,
      id: slugify(currentSection, 150)
    });
  } else if (line.startsWith('### ')) {
    const questionText = line.replace('### ', '').trim();
    questions.push({
      text: questionText,
      section: currentSection,
      line: i,
      id: getQuestionId(currentSection, questionText)
    });
  }
}

console.log('\n=== SECTIONS ===');
sections.forEach(s => {
  console.log(`${s.heading}`);
  console.log(`  ID: ${s.id}\n`);
});

console.log('\n=== QUESTIONS BY SECTION ===');
let lastSection = '';
questions.forEach(q => {
  if (q.section !== lastSection) {
    console.log(`\n## ${q.section}`);
    lastSection = q.section;
  }
  console.log(`\n${q.text}`);
  console.log(`  ID: ${q.id}`);
});

console.log('\n\n=== FINDING ALL INTERNAL LINKS ===');
const linkRegex = /\[([^\]]+)\]\(#([^)]+)\)/g;
let match;
const linksFound = [];

while ((match = linkRegex.exec(content)) !== null) {
  const linkText = match[1];
  const currentHash = match[2];
  linksFound.push({ text: linkText, hash: currentHash, fullMatch: match[0] });
}

console.log(`Found ${linksFound.length} internal links\n`);

let replacements = 0;

// Fix each link
linksFound.forEach(link => {
  // Try to find matching question
  let newHash = null;
  
  // First try exact match on question text
  const matchingQuestion = questions.find(q => 
    q.text.toLowerCase() === link.text.toLowerCase() ||
    q.text.toLowerCase().includes(link.text.toLowerCase()) ||
    link.text.toLowerCase().includes(q.text.toLowerCase().substring(0, 30))
  );
  
  if (matchingQuestion) {
    newHash = matchingQuestion.id;
  } else {
    // Try to find matching section
    const matchingSection = sections.find(s => 
      s.heading.toLowerCase() === link.text.toLowerCase() ||
      s.heading.toLowerCase().includes(link.text.toLowerCase()) ||
      link.text.toLowerCase().includes(s.heading.toLowerCase().substring(0, 20))
    );
    
    if (matchingSection) {
      newHash = matchingSection.id;
    }
  }
  
  if (newHash && newHash !== link.hash) {
    console.log(`\nFixing: ${link.text}`);
    console.log(`  Old: #${link.hash}`);
    console.log(`  New: #${newHash}`);
    
    const oldLink = `[${link.text}](#${link.hash})`;
    const newLink = `[${link.text}](#${newHash})`;
    
    if (content.includes(oldLink)) {
      content = content.replace(new RegExp(escapeRegex(oldLink), 'g'), newLink);
      replacements++;
    }
  }
});

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

console.log(`\n\n=== SUMMARY ===`);
console.log(`Total links found: ${linksFound.length}`);
console.log(`Links updated: ${replacements}`);

// Write the updated content back
fs.writeFileSync(faqPath, content, 'utf8');
console.log(`\n✓ Updated ${faqPath}`);

