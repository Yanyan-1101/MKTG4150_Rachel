export type Id = string;
export type EligibilityField =
  | "gpa"
  | "currentYear"
  | "major"
  | "state"
  | "citizenship"
  | "firstGeneration"
  | "financialNeed"
  | "volunteerHours";

export interface User {
  id: Id;
  displayName: string;
  email: string;
  createdAt: string;
  lastSeenAt: string;
}

export interface StudentProfile {
  id: Id;
  userId: Id;
  currentYear: number | null;
  gpa: number | null;
  major: string;
  state: string;
  citizenship: string;
  firstGeneration: boolean | null;
  financialNeed: boolean | null;
  annualHouseholdIncome: number | null;
  volunteerHours: number | null;
  activities: string[];
  interests: string[];
  goals: string;
  updatedAt: string;
}

export interface EligibilityRule {
  id: string;
  field: EligibilityField;
  operator: "min" | "equals" | "includes" | "boolean";
  value: string | number | boolean;
  label: string;
}

export interface ScholarshipRequirement {
  id: string;
  title: string;
  kind: "essay" | "transcript" | "recommendation" | "portfolio" | "faFsa" | "resume" | "other";
  required: boolean;
}

export interface Scholarship {
  id: Id;
  title: string;
  sponsor: string;
  category: string;
  awardMin: number;
  awardMax: number;
  deadline: string;
  fieldOfStudy: string[];
  description: string;
  eligibilityRules: EligibilityRule[];
  requirements: ScholarshipRequirement[];
  effortHours: number;
  renewal: string;
  fictionNotice: string;
}

export type EvidenceStatus = "ready" | "in-progress" | "needs-renewal";

export interface EvidenceItem {
  id: Id;
  userId: Id;
  title: string;
  type: ScholarshipRequirement["kind"];
  status: EvidenceStatus;
  updatedAt: string;
  expiresAt?: string;
  notes: string;
  linkedScholarshipIds: Id[];
  requirementIds: string[];
}

export interface ChecklistTask {
  id: Id;
  title: string;
  description: string;
  done: boolean;
  dueDate?: string;
  requirementId?: string;
}

export interface Checklist {
  id: Id;
  userId: Id;
  scholarshipId: Id;
  tasks: ChecklistTask[];
  updatedAt: string;
}

export interface AppData {
  schemaVersion: 1;
  users: User[];
  activeUserId: Id | null;
  profiles: StudentProfile[];
  scholarships: Scholarship[];
  evidence: EvidenceItem[];
  checklists: Checklist[];
  comparisonIds: Id[];
}

export type EligibilityStatus = "qualified" | "needs-info" | "not-eligible";
export interface RuleResult {
  rule: EligibilityRule;
  status: "pass" | "missing" | "fail";
  explanation: string;
}
export interface ScholarshipMatch {
  scholarship: Scholarship;
  status: EligibilityStatus;
  score: number;
  results: RuleResult[];
  metRequirements: number;
  totalRequirements: number;
}
