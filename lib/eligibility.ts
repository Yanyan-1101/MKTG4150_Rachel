import type { EligibilityRule, RuleResult, Scholarship, ScholarshipMatch, StudentProfile } from "@/types";

function fieldValue(profile: StudentProfile, field: EligibilityRule["field"]): string | number | boolean | null {
  return profile[field] as string | number | boolean | null;
}

export function evaluateRule(rule: EligibilityRule, profile: StudentProfile): RuleResult {
  const actual = fieldValue(profile, rule.field);
  if (actual === null || actual === "" || typeof actual === "undefined") {
    return { rule, status: "missing", explanation: `Add ${rule.field === "gpa" ? "your GPA" : rule.field === "currentYear" ? "your current year of study" : rule.field === "major" ? "your major" : rule.field === "state" ? "your state of residence" : rule.field === "citizenship" ? "your citizenship status" : rule.field === "volunteerHours" ? "your volunteer hours" : "this profile detail"} to see how this requirement applies.` };
  }
  const expected = rule.value;
  let pass = false;
  if (rule.operator === "min") pass = Number(actual) >= Number(expected);
  if (rule.operator === "equals") pass = String(actual).toLowerCase() === String(expected).toLowerCase();
  if (rule.operator === "includes") pass = String(actual).toLowerCase().includes(String(expected).toLowerCase());
  if (rule.operator === "boolean") pass = actual === expected;
  const status: RuleResult["status"] = pass ? "pass" : "fail";
  let explanation = "";
  if (rule.operator === "min") explanation = pass ? `Your ${rule.field === "gpa" ? "GPA" : "volunteer experience"} (${actual}${rule.field === "gpa" ? "" : " hours"}) meets the ${expected}${rule.field === "gpa" ? "" : "-hour"} minimum.` : `Your ${rule.field === "gpa" ? "GPA" : "volunteer hours"} (${actual}) is below the ${expected} minimum.`;
  else if (rule.operator === "boolean") explanation = pass ? `Your profile confirms ${rule.label.toLowerCase()}.` : `Your profile does not currently confirm ${rule.label.toLowerCase()}.`;
  else if (rule.operator === "includes") explanation = pass ? `${actual} matches the requested ${expected.toString().toLowerCase()} field.` : `Your current major (${actual}) does not match the requested ${expected} field.`;
  else explanation = pass ? `Your ${rule.field} (${actual}) matches this requirement.` : `Your ${rule.field} (${actual}) does not match the required ${expected}.`;
  return { rule, status, explanation };
}

export function matchScholarship(scholarship: Scholarship, profile: StudentProfile): ScholarshipMatch {
  const results = scholarship.eligibilityRules.map((rule) => evaluateRule(rule, profile));
  const fails = results.filter((item) => item.status === "fail").length;
  const missing = results.filter((item) => item.status === "missing").length;
  const status = fails > 0 ? "not-eligible" : missing > 0 ? "needs-info" : "qualified";
  const passes = results.filter((item) => item.status === "pass").length;
  const score = Math.round(((passes + (missing ? 0.35 : 0)) / Math.max(results.length, 1)) * 100);
  return { scholarship, status, score, results, metRequirements: passes, totalRequirements: results.length };
}

export function matchesFor(scholarships: Scholarship[], profile: StudentProfile): ScholarshipMatch[] {
  return scholarships.map((scholarship) => matchScholarship(scholarship, profile)).sort((a, b) => {
    const rank = { qualified: 0, "needs-info": 1, "not-eligible": 2 } as const;
    return rank[a.status] - rank[b.status] || new Date(a.scholarship.deadline).getTime() - new Date(b.scholarship.deadline).getTime();
  });
}
