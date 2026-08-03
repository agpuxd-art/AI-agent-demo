const fs = require('fs');

let fileContent = fs.readFileSync('e:/Assignment 2026/Build_Project Governance Agent/Agent_Version2_30_07_26/src/components/GovernanceAgent.jsx', 'utf8');
const lines = fileContent.split('\n');

for (let i = 0; i < lines.length; i++) {
  // Only replace in handleSend (starts ~190), handleResolveDeepest (~365), commitAutoResolveComplete (~590), commitOverrideExecution (~665)
  // Let's just check the index roughly.
  if ((i > 190 && i < 400) || (i > 580 && i < 630) || (i > 660 && i < 700)) {
    // Exclude the typing placeholder effect (lines 120-145) and UndoToast (lines 80-90)
    lines[i] = lines[i].replace(/setTimeout\(/g, 'setAgentTimeout(');
  }
}

fs.writeFileSync('e:/Assignment 2026/Build_Project Governance Agent/Agent_Version2_30_07_26/src/components/GovernanceAgent.jsx', lines.join('\n'));
console.log('Replaced setTimeout with setAgentTimeout in specific blocks.');
