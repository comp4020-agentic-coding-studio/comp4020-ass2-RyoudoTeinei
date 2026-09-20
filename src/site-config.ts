import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";
import { courseMeta } from "./course-config";

export const sessionLabels = { singular: "Workshop", plural: "Workshops" } as const;
export const graphCollections = ["sessions", "assessments", "lectures", "people"];
export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];
export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "Slop University",
  colorScheme: "light",
  links: [
    { text: "The course", href: "/guide/" },
    { text: "12 weeks", href: "/lectures/" },
    { text: "Assessment", href: "/assessments/" },
    { text: "Exit Lab", href: "/lab/" },
    { text: "Resources", href: "/resources/" },
  ],
  licence: "CC-BY-NC-SA-4.0",
  socialImage: "/src/assets/images/course-card.png",
  socialImageAlt: courseMeta.title + " — a torn subscription receipt stamped renewal off",
  legalLinks: [{ text: "Policies & support", href: "/policies/" }, { text: "Teaching team", href: "/people/" }],
  meta: ["A fictional course at Slop University. Real sources. Practice accounts only."],
});
