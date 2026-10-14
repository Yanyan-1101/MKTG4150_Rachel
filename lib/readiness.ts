import type { AppData, StudentProfile } from "@/types";

export interface ReadinessBreakdown {
  score: number;
  profile: number;
  evidence: number;
  applications: number;
  nextStep: string;
}

export function getReadiness(data: AppData, profile: StudentProfile | undefined): ReadinessBreakdown {
  if (!profile) return { score: 0, profile: 0, evidence: 0, applications: 0, nextStep: "Complete your student profile" };
  const core = [profile.currentYear, profile.gpa, profile.major, profile.state, profile.citizenship, profile.firstGeneration, profile.financialNeed, profile.volunteerHours];
  const profileScore = Math.round(core.filter((value) => value !== null && value !== "").length / core.length * 100);
  const evidenceItems = data.evidence.filter((item) => item.userId === profile.userId);
  const evidenceScore = evidenceItems.length ? Math.round(evidenceItems.filter((item) => item.status === "ready").length / evidenceItems.length * 100) : 0;
  const tasks = data.checklists.filter((checklist) => checklist.userId === profile.userId).flatMap((checklist) => checklist.tasks);
  const applicationScore = tasks.length ? Math.round(tasks.filter((task) => task.done).length / tasks.length * 100) : 0;
  const score = Math.round(profileScore * 0.45 + evidenceScore * 0.3 + applicationScore * 0.25);
  const nextStep = profileScore < 100 ? "Fill in the remaining profile details" : evidenceScore < 100 ? "Refresh or finish a supporting document" : applicationScore < 100 ? "Complete your next application checklist task" : "Your workspace is ready for a final application review";
  return { score, profile: profileScore, evidence: evidenceScore, applications: applicationScore, nextStep };
}
