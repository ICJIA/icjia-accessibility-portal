const fs = require('fs');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50)
    .replace(/-$/, '');
}

// Read the FAQ markdown
let content = fs.readFileSync('content/faqs.md', 'utf8');

// Build a map of question text to full IDs (with section prefixes)
const lines = content.split('\n');
let currentSection = '';
const questionMap = new Map();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // H2 section heading
  if (line.startsWith('## ') && !line.includes('Quick Reference')) {
    const sectionTitle = line.replace('## ', '').trim();
    currentSection = slugify(sectionTitle);
  }
  
  // H3 question
  if (line.startsWith('### ')) {
    const question = line.replace('### ', '').trim();
    const questionSlug = slugify(question);
    const fullId = currentSection ? `${currentSection}-${questionSlug}` : questionSlug;
    questionMap.set(questionSlug, fullId);
  }
}

// Extract all internal links from the content
const linkPattern = /\]\(#([a-z0-9-]+)\)/g;
let match;
const linksToFix = [];

while ((match = linkPattern.exec(content)) !== null) {
  const currentLink = match[1];
  const correctLink = questionMap.get(currentLink);
  
  if (correctLink && correctLink !== currentLink) {
    linksToFix.push({
      old: `](#${currentLink})`,
      new: `](#${correctLink})`,
      oldId: currentLink,
      newId: correctLink
    });
  }
}

console.log(`Found ${linksToFix.length} links to fix:\n`);

// Apply fixes
linksToFix.forEach(fix => {
  console.log(`${fix.oldId} → ${fix.newId}`);
  content = content.replace(new RegExp(`\\]\\(#${fix.oldId}\\)`, 'g'), `](#${fix.newId})`);
});

// Write back
fs.writeFileSync('content/faqs.md', content);
console.log(`\n✅ Fixed ${linksToFix.length} internal links`);


