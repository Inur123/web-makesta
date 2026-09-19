const fs = require('fs');

// 1. Update React UI to use the same form for both IPNU and IPPNU
let uiFile = 'resources/js/pages/kegiatan/SertifikatTab.tsx';
let uiContent = fs.readFileSync(uiFile, 'utf8');

// Replace "if (org === 'ippnu') {" with "if (true) { // Both use the same UI now"
uiContent = uiContent.replace(/if \(org === 'ippnu'\) \{/, "if (true) {");

// Remove the else block for IPNU (we can just truncate the file or carefully replace it)
// It's safer to just replace the whole IPNU section.
let ipnuSectionStart = uiContent.indexOf('return (', uiContent.indexOf('if (true) {') + 2000); // Find the second return
if (ipnuSectionStart !== -1) {
    uiContent = uiContent.substring(0, uiContent.lastIndexOf('}', ipnuSectionStart)) + '\n}';
}
fs.writeFileSync(uiFile, uiContent);
