// utils/atsFixes.js
export function applyATSFixes(resume, missingSkills) {
  const updated = { ...resume };

  if (missingSkills.length) {
    updated.experience = [...(updated.experience || [])];

    updated.experience.push({
      title: "Personal Projects",
      company: "Self",
      duration: "Recent",
      bullets: missingSkills.map(
        s => `Built and applied ${s} in a real-world project`
      )
    });
  }

  return updated;
}
