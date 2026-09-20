import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type CourseNode = { id: string; type: string; body?: string; meta: Record<string, unknown> };
const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as {
  course: { code: string; title: string };
  nodes: CourseNode[];
};
const ofType = (type: string) => api.nodes.filter((node) => node.type === type);

describe("the course promised to a prospective student", () => {
  it("keeps this student's allocated course identity", () => {
    expect(api.course.code).toMatch(/^SLOP[123468]954$/);
    expect(api.course.title).toContain("How to Leave");
  });
  it("provides every teaching week with a dated lecture and a workshop", () => {
    for (const type of ["lectures", "sessions"]) {
      const nodes = ofType(type);
      expect(nodes).toHaveLength(12);
      expect(nodes.map((node) => Number(node.meta.week)).sort((a, b) => a - b))
        .toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
      expect(new Set(nodes.map((node) => String(node.meta.date).slice(0, 10))).size).toBe(12);
    }
  });
  it("aligns the three graded outputs with taught consumer skills", () => {
    const assessments = ofType("assessments");
    expect(assessments).toHaveLength(3);
    expect(assessments.reduce((sum, node) => sum + Number(node.meta.weight), 0)).toBe(100);
    expect(assessments.map((node) => Number(node.meta.week)).sort((a, b) => a - b)).toEqual([4, 8, 12]);
  });
  it("gives each lecture an assessable outcome and a practical follow-through", () => {
    for (const node of ofType("lectures")) {
      expect(Array.isArray(node.meta.outcomes), node.id).toBe(true);
      expect((node.meta.outcomes as string[]).length, node.id).toBeGreaterThanOrEqual(2);
      expect(node.body?.length, node.id).toBeGreaterThan(500);
    }
  });
  it("attaches source scope to all five real-platform case lessons", () => {
    const cases = ofType("lectures").filter((node) => node.meta.caseStudy);
    expect(cases).toHaveLength(5);
    for (const node of cases) {
      expect(node.meta.verified, node.id).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(typeof node.meta.scope, node.id).toBe("string");
      expect((node.meta.sourceIds as string[]).length, node.id).toBeGreaterThan(0);
    }
  });
  it("links at least one lecture to a built teaching deck", () => {
    const decks = ofType("lectures").filter((node) => typeof node.meta.slides === "string");
    expect(decks.length).toBeGreaterThanOrEqual(1);
    for (const node of decks) {
      expect(readFileSync(resolve("dist", String(node.meta.slides).replace(/^\//, ""), "index.html"), "utf8"))
        .toContain("<html");
    }
  });
});
