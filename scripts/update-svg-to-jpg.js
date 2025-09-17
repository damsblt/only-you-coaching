#!/usr/bin/env node

/**
 * Update "Image de couverture" column in CSV: change .svg to .jpg
 */

const fs = require('fs');

const INPUT = '/Users/damien/Documents/only-you-coaching/Dossier Cliente/Wix CMS/desired_output.csv';
const OUTPUT = '/Users/damien/Documents/only-you-coaching/Dossier Cliente/Wix CMS/desired_output_updated.csv';

function main() {
  console.log('🔄 Reading CSV and updating .svg to .jpg in "Image de couverture" column...');
  
  const content = fs.readFileSync(INPUT, 'utf8');
  const lines = content.split(/\r?\n/);
  
  if (lines.length === 0) {
    throw new Error('Empty CSV');
  }
  
  // Find the "Image de couverture" column index
  const header = lines[0];
  const delimiter = header.includes(';') ? ';' : ',';
  const columns = header.split(delimiter);
  const imageColumnIndex = columns.findIndex(col => col.includes('Image de couverture'));
  
  if (imageColumnIndex === -1) {
    throw new Error('Could not find "Image de couverture" column');
  }
  
  console.log(`Found "Image de couverture" at column ${imageColumnIndex + 1}`);
  
  const updatedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) {
      updatedLines.push(line);
      continue;
    }
    
    if (i === 0) {
      // Header line - keep as is
      updatedLines.push(line);
      continue;
    }
    
    // Split the line by delimiter, being careful with quoted fields
    const fields = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      if (ch === '"') {
        inQuotes = !inQuotes;
        current += ch;
      } else if (ch === delimiter && !inQuotes) {
        fields.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    fields.push(current);
    
    // Update the image column if it exists
    if (fields[imageColumnIndex]) {
      let imageUrl = fields[imageColumnIndex].replace(/^"|"$/g, ''); // Remove quotes
      if (imageUrl.endsWith('.svg')) {
        imageUrl = imageUrl.replace(/\.svg$/, '.jpg');
        fields[imageColumnIndex] = `"${imageUrl}"`; // Add quotes back
      }
    }
    
    updatedLines.push(fields.join(delimiter));
  }
  
  fs.writeFileSync(OUTPUT, updatedLines.join('\n'));
  console.log(`✅ Updated CSV written to: ${OUTPUT}`);
  
  // Show a sample of changes
  console.log('\n📋 Sample changes:');
  for (let i = 1; i <= Math.min(3, lines.length - 1); i++) {
    const original = lines[i].split(delimiter)[imageColumnIndex] || '';
    const updated = updatedLines[i].split(delimiter)[imageColumnIndex] || '';
    if (original !== updated) {
      console.log(`Row ${i}: ${original} → ${updated}`);
    }
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
}

module.exports = { main };

