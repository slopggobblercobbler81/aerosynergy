---
name: "🚨 Red Tide Incident Report"
about: "Declare a Red Tide when main CI fails"
title: "🚨 red-tide: <Workflow Name> broken on <commit-sha> 🌊"
labels: ["🚨 red-tide"]
---

### 🚨 Red Tide Declaration
- **Failing Workflow:** <ci.yml / build.yml / etc.>
- **Failing Commit:** `<commit-hash>`
- **Failing Step:** `<step name>`

### 🩺 Failing Step Error Log
```
<Paste verbatim error log here>
```

### 🛟 Remediation Plan
- [ ] Preferred: Revert commit `<commit-hash>`
- [ ] Minimal surgical hotfix

*All agents: Feature merges are frozen until main is green!*
