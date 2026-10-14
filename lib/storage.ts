import type { AppData, Checklist, ChecklistTask, EligibilityRule, EvidenceItem, Scholarship, ScholarshipRequirement, StudentProfile, User } from "@/types";
import { createDemoState } from "@/lib/seed";

const STORAGE_KEY = "scholarready:workspace:v1";
const ELIGIBILITY_FIELDS = new Set(["gpa", "currentYear", "major", "state", "citizenship", "firstGeneration", "financialNeed", "volunteerHours"]);
const ELIGIBILITY_OPERATORS = new Set(["min", "equals", "includes", "boolean"]);
const EVIDENCE_TYPES = new Set(["essay", "transcript", "recommendation", "portfolio", "faFsa", "resume", "other"]);
const EVIDENCE_STATUSES = new Set(["ready", "in-progress", "needs-renewal"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isString(value: unknown): value is string { return typeof value === "string"; }
function isFiniteNumber(value: unknown): value is number { return typeof value === "number" && Number.isFinite(value); }
function isNullableNumber(value: unknown): value is number | null { return value === null || isFiniteNumber(value); }
function isNullableBoolean(value: unknown): value is boolean | null { return value === null || typeof value === "boolean"; }
function isStringArray(value: unknown): value is string[] { return Array.isArray(value) && value.every(isString); }
function isDateString(value: unknown): value is string { return isString(value) && /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value) && !Number.isNaN(Date.parse(value)); }

function isUser(value: unknown): value is User {
  return isRecord(value) && isString(value.id) && isString(value.displayName) && isString(value.email) && isDateString(value.createdAt) && isDateString(value.lastSeenAt);
}
function isProfile(value: unknown): value is StudentProfile {
  return isRecord(value) && isString(value.id) && isString(value.userId)
    && (value.currentYear === null || (isFiniteNumber(value.currentYear) && value.currentYear >= 1 && value.currentYear <= 10))
    && (value.gpa === null || (isFiniteNumber(value.gpa) && value.gpa >= 0 && value.gpa <= 4))
    && isString(value.major) && isString(value.state) && isString(value.citizenship)
    && isNullableBoolean(value.firstGeneration) && isNullableBoolean(value.financialNeed)
    && isNullableNumber(value.annualHouseholdIncome) && isNullableNumber(value.volunteerHours)
    && isStringArray(value.activities) && isStringArray(value.interests) && isString(value.goals) && isDateString(value.updatedAt);
}
function isRule(value: unknown): value is EligibilityRule {
  return isRecord(value) && isString(value.id) && ELIGIBILITY_FIELDS.has(String(value.field))
    && ELIGIBILITY_OPERATORS.has(String(value.operator))
    && (isString(value.value) || isFiniteNumber(value.value) || typeof value.value === "boolean")
    && isString(value.label);
}
function isRequirement(value: unknown): value is ScholarshipRequirement {
  return isRecord(value) && isString(value.id) && isString(value.title)
    && EVIDENCE_TYPES.has(String(value.kind)) && typeof value.required === "boolean";
}
function isScholarship(value: unknown): value is Scholarship {
  return isRecord(value) && isString(value.id) && isString(value.title) && isString(value.sponsor)
    && isString(value.category) && isFiniteNumber(value.awardMin) && isFiniteNumber(value.awardMax)
    && value.awardMin >= 0 && value.awardMax >= value.awardMin && isDateString(value.deadline)
    && isStringArray(value.fieldOfStudy) && isString(value.description)
    && Array.isArray(value.eligibilityRules) && value.eligibilityRules.every(isRule)
    && Array.isArray(value.requirements) && value.requirements.every(isRequirement)
    && isFiniteNumber(value.effortHours) && isString(value.renewal) && isString(value.fictionNotice);
}
function isEvidence(value: unknown): value is EvidenceItem {
  return isRecord(value) && isString(value.id) && isString(value.userId) && isString(value.title)
    && EVIDENCE_TYPES.has(String(value.type)) && EVIDENCE_STATUSES.has(String(value.status))
    && isDateString(value.updatedAt) && (value.expiresAt === undefined || isDateString(value.expiresAt))
    && isString(value.notes) && isStringArray(value.linkedScholarshipIds) && isStringArray(value.requirementIds);
}
function isTask(value: unknown): value is ChecklistTask {
  return isRecord(value) && isString(value.id) && isString(value.title) && isString(value.description)
    && typeof value.done === "boolean" && (value.dueDate === undefined || isDateString(value.dueDate))
    && (value.requirementId === undefined || isString(value.requirementId));
}
function isChecklist(value: unknown): value is Checklist {
  return isRecord(value) && isString(value.id) && isString(value.userId) && isString(value.scholarshipId)
    && Array.isArray(value.tasks) && value.tasks.every(isTask) && isDateString(value.updatedAt);
}

export function validateAppData(value: unknown): value is AppData {
  if (!isRecord(value) || value.schemaVersion !== 1) return false;
  if (!Array.isArray(value.users) || !value.users.every(isUser)) return false;
  if (!Array.isArray(value.profiles) || !value.profiles.every(isProfile)) return false;
  if (!Array.isArray(value.scholarships) || !value.scholarships.every(isScholarship)) return false;
  if (!Array.isArray(value.evidence) || !value.evidence.every(isEvidence)) return false;
  if (!Array.isArray(value.checklists) || !value.checklists.every(isChecklist)) return false;
  if (!(value.activeUserId === null || isString(value.activeUserId)) || !isStringArray(value.comparisonIds)) return false;

  const users = value.users as User[];
  const profiles = value.profiles as StudentProfile[];
  const scholarships = value.scholarships as Scholarship[];
  const evidence = value.evidence as EvidenceItem[];
  const checklists = value.checklists as Checklist[];
  const userIds = new Set(users.map((user) => user.id));
  const scholarshipIds = new Set(scholarships.map((scholarship) => scholarship.id));
  const requirementIds = new Set(scholarships.flatMap((scholarship) => scholarship.requirements.map((requirement) => requirement.id)));
  if (value.activeUserId !== null && !userIds.has(value.activeUserId)) return false;
  if (profiles.some((profile) => !userIds.has(profile.userId))) return false;
  if (evidence.some((item) => !userIds.has(item.userId)
    || item.linkedScholarshipIds.some((id) => !scholarshipIds.has(id))
    || item.requirementIds.some((id) => !requirementIds.has(id)))) return false;
  if (checklists.some((checklist) => !userIds.has(checklist.userId) || !scholarshipIds.has(checklist.scholarshipId)
    || checklist.tasks.some((task) => task.requirementId !== undefined && !requirementIds.has(task.requirementId)))) return false;
  if (value.comparisonIds.some((id) => !scholarshipIds.has(id))) return false;
  return true;
}

export function loadLocalState(): AppData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return validateAppData(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveLocalState(data: AppData): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function resetLocalState(): AppData {
  const demo = createDemoState();
  saveLocalState(demo);
  return demo;
}
