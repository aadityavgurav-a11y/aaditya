export interface WorkItem {
  id: string;
  number: string;
  title: string;
  category: "Flutter App" | "Video Edit" | "Other";
  link: string;
  thumbnailSrc: string;
}

export const PORTFOLIO_CONTENT = {
  person: {
    name: "Aaditya Gurav",
    identity: "BSc IT (final year student) · Flutter Developer Intern · Freelance Video Editor",
    taglineParts: ["Crafting apps.", "Cutting frames."],
    bio: "Final-year BSc IT student, currently a Flutter developer intern, and freelancing in video editing. I build apps that solve problems and edit stories that capture attention.",
    skills: [
      "Flutter", "Dart", "Firebase", "REST APIs", "Git",
      "Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut"
    ],
    email: "hello@example.com",
    location: "Mumbai, India",
    socials: [
      { name: "GitHub", url: "#" },
      { name: "LinkedIn", url: "#" },
      { name: "Instagram", url: "#" },
      { name: "YouTube", url: "#" }
    ],
  },
  marqueePhrases: [
    "FLUTTER DEVELOPER",
    "VIDEO EDITOR",
    "PROBLEM SOLVER",
    "STORYTELLER",
    "—"
  ],
  projects: [] as WorkItem[], // Empty for now as requested
};
