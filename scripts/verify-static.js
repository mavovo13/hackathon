'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const requiredFiles = [
  'src/detection.html',
  'src/index.html',
  'src/css/style.css',
  'src/js/data.js',
  'src/js/detection.js'
];

const errors = [];

requiredFiles.forEach(function (filePath) {
  const fullPath = path.join(root, filePath);
  if (!fs.existsSync(fullPath)) {
    errors.push('Missing file: ' + filePath);
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');

  if (filePath === 'src/js/data.js') {
    const patternCount = (content.match(/lieType:/g) || []).length;
    if (patternCount < 10) {
      errors.push('LIE_JUDGMENT_PATTERNS must have at least 10 entries (found ' + patternCount + ')');
    }
  }

  if (filePath === 'src/js/detection.js') {
    if (!content.includes('getUserMedia')) {
      errors.push('detection.js must use getUserMedia');
    }
    if (!content.includes('NotAllowedError')) {
      errors.push('detection.js must handle NotAllowedError');
    }
  }

  if (filePath === 'src/detection.html') {
    if (!content.includes('id="camera-view"')) {
      errors.push('detection.html must include camera-view element');
    }
    if (!content.includes('id="reanalyze-btn"')) {
      errors.push('detection.html must include reanalyze button');
    }
  }
});

if (errors.length > 0) {
  console.error('Verification failed:');
  errors.forEach(function (error) {
    console.error(' - ' + error);
  });
  process.exit(1);
}

console.log('Static verification passed (' + requiredFiles.length + ' files checked).');
