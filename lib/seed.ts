import type { AppData, EligibilityRule, Scholarship, StudentProfile } from "@/types";

const rules = (items: Array<Omit<EligibilityRule, "id"> & { id: string }>): EligibilityRule[] => items;
const R = {
  gpa: (value: number): EligibilityRule => ({ id: `gpa-${value}`, field: "gpa", operator: "min", value, label: `Minimum GPA ${value.toFixed(1)}` }),
  year: (value: number): EligibilityRule => ({ id: `year-${value}`, field: "currentYear", operator: "equals", value, label: `Currently in year ${value}` }),
  major: (value: string): EligibilityRule => ({ id: `major-${value}`, field: "major", operator: "includes", value, label: `${value} or a closely related field` }),
  state: (value: string): EligibilityRule => ({ id: `state-${value}`, field: "state", operator: "equals", value, label: `Resident of ${value}` }),
  firstGen: (): EligibilityRule => ({ id: "first-generation", field: "firstGeneration", operator: "boolean", value: true, label: "First-generation college student" }),
  need: (): EligibilityRule => ({ id: "financial-need", field: "financialNeed", operator: "boolean", value: true, label: "Demonstrated financial need" }),
  service: (value: number): EligibilityRule => ({ id: `volunteer-${value}`, field: "volunteerHours", operator: "min", value, label: `${value}+ volunteer hours` }),
  citizenship: (value: string): EligibilityRule => ({ id: `citizenship-${value}`, field: "citizenship", operator: "equals", value, label: `${value} citizenship status` }),
};

const req = (id: string, title: string, kind: Scholarship["requirements"][number]["kind"], required = true): Scholarship["requirements"][number] => ({ id, title, kind, required });
const fictionNotice = "Illustrative demo listing — fictional sponsor and award. Verify all terms with an official provider.";

export const seedScholarships: Scholarship[] = [
  {
    id: "sch-catalyst-stem", title: "Catalyst Future of Science Award", sponsor: "Catalyst Learning Trust", category: "STEM & research", awardMin: 2500, awardMax: 5000, deadline: "2026-11-18", fieldOfStudy: ["Biology", "Environmental science", "Engineering", "Computer science"], description: "For thoughtful undergraduate problem-solvers applying science to a healthier, more sustainable future.", eligibilityRules: rules([R.gpa(3.3), R.citizenship("US citizen or permanent resident")]), requirements: [req("catalyst-essay", "A 500-word impact essay", "essay"), req("catalyst-transcript", "Unofficial transcript", "transcript"), req("catalyst-recommendation", "One faculty recommendation", "recommendation")], effortHours: 5, renewal: "One-time award", fictionNotice,
  },
  {
    id: "sch-first-gen", title: "First in the Family Scholars Grant", sponsor: "Northstar Student Opportunity Fund", category: "First generation", awardMin: 1500, awardMax: 3500, deadline: "2026-12-02", fieldOfStudy: ["All undergraduate fields"], description: "Celebrates first-generation undergraduates building a clear path for themselves and the communities that raised them.", eligibilityRules: rules([R.firstGen(), R.need(), R.gpa(2.8)]), requirements: [req("firstgen-essay", "A 600-word personal story", "essay"), req("firstgen-fafsa", "Financial-aid summary", "faFsa"), req("firstgen-recommendation", "Mentor or instructor reference", "recommendation")], effortHours: 4, renewal: "Renewable for up to two years", fictionNotice,
  },
  {
    id: "sch-green-futures", title: "Green Futures Community Award", sponsor: "Evergreen Civic Foundation", category: "Community impact", awardMin: 1000, awardMax: 2500, deadline: "2027-01-14", fieldOfStudy: ["All undergraduate fields"], description: "Supports students who turn local climate, conservation, or food-access ideas into steady community action.", eligibilityRules: rules([R.service(40), R.gpa(2.7)]), requirements: [req("green-resume", "Community-service résumé", "resume"), req("green-essay", "Project reflection (400 words)", "essay"), req("green-transcript", "Unofficial transcript", "transcript")], effortHours: 3, renewal: "One-time award", fictionNotice,
  },
  {
    id: "sch-creative-voice", title: "Creative Voice Arts Fellowship", sponsor: "Common Thread Arts Council", category: "Arts & humanities", awardMin: 2000, awardMax: 4000, deadline: "2027-02-01", fieldOfStudy: ["Design", "Fine arts", "Creative writing", "Media arts", "Humanities"], description: "A small fellowship for emerging artists whose work makes room for stories that are often left out.", eligibilityRules: rules([R.major("arts"), R.year(2)]), requirements: [req("creative-portfolio", "Digital portfolio (5–8 works)", "portfolio"), req("creative-essay", "Artist statement", "essay"), req("creative-transcript", "Current transcript", "transcript")], effortHours: 7, renewal: "One-time fellowship", fictionNotice,
  },
  {
    id: "sch-midwest-innovators", title: "Midwest Innovators Scholarship", sponsor: "Lakes & Prairie Education Alliance", category: "Regional opportunity", awardMin: 3000, awardMax: 6000, deadline: "2027-02-20", fieldOfStudy: ["Business", "Engineering", "Computer science", "Public policy"], description: "Encourages practical, ethical innovation by students who call a Great Lakes or Plains state home.", eligibilityRules: rules([R.state("Illinois"), R.gpa(3.0), R.citizenship("US citizen or permanent resident")]), requirements: [req("midwest-essay", "Idea brief (one page)", "essay"), req("midwest-transcript", "Unofficial transcript", "transcript"), req("midwest-recommendation", "One recommendation", "recommendation")], effortHours: 4, renewal: "Renewable with 3.0 GPA", fictionNotice,
  },
  {
    id: "sch-service-leadership", title: "Service by Design Leadership Award", sponsor: "Civic Design Collective", category: "Leadership & service", awardMin: 1200, awardMax: 3000, deadline: "2027-03-06", fieldOfStudy: ["All undergraduate fields"], description: "For students who lead by listening first and make community programs easier for people to access.", eligibilityRules: rules([R.service(60), R.gpa(3.0)]), requirements: [req("service-resume", "Leadership résumé", "resume"), req("service-essay", "Community impact statement", "essay"), req("service-recommendation", "Community reference", "recommendation")], effortHours: 4, renewal: "One-time award", fictionNotice,
  },
  {
    id: "sch-public-good", title: "Public Good Data Scholars Fund", sponsor: "Bright Commons Initiative", category: "Technology for good", awardMin: 3500, awardMax: 7500, deadline: "2027-03-22", fieldOfStudy: ["Data science", "Public health", "Sociology", "Computer science", "Statistics"], description: "Invests in students who use evidence and technology thoughtfully to strengthen public services.", eligibilityRules: rules([R.major("data"), R.gpa(3.2), R.need()]), requirements: [req("publicgood-essay", "Data-for-good project note", "essay"), req("publicgood-transcript", "Transcript", "transcript"), req("publicgood-resume", "One-page résumé", "resume")], effortHours: 6, renewal: "Renewable for senior year", fictionNotice,
  },
  {
    id: "sch-horizon-women", title: "Horizon Women in Computing Grant", sponsor: "Horizon Code & Community Fund", category: "Computing & access", awardMin: 2000, awardMax: 4500, deadline: "2027-04-04", fieldOfStudy: ["Computer science", "Information systems", "Human-computer interaction"], description: "Helps women and gender-expansive students make technology more useful, humane, and inclusive.", eligibilityRules: rules([R.major("computer"), R.gpa(3.0), R.year(2)]), requirements: [req("horizon-portfolio", "Project portfolio or code samples", "portfolio"), req("horizon-essay", "A problem you want to solve", "essay"), req("horizon-recommendation", "Faculty recommendation", "recommendation")], effortHours: 6, renewal: "Renewable for up to two years", fictionNotice,
  },
  {
    id: "sch-open-door", title: "Open Door Undergraduate Opportunity Award", sponsor: "Open Door Learner Foundation", category: "Broad eligibility", awardMin: 750, awardMax: 1800, deadline: "2027-04-27", fieldOfStudy: ["All undergraduate fields"], description: "A low-friction award for students balancing coursework with work, caregiving, or community commitments.", eligibilityRules: rules([R.gpa(2.5)]), requirements: [req("opendoor-essay", "Short response (250 words)", "essay"), req("opendoor-transcript", "Unofficial transcript", "transcript")], effortHours: 2, renewal: "One-time award", fictionNotice,
  },
  {
    id: "sch-coastal-research", title: "Coastal Communities Research Award", sponsor: "Tidepool Research Network", category: "Regional research", awardMin: 1800, awardMax: 3200, deadline: "2027-05-11", fieldOfStudy: ["Marine biology", "Environmental science", "Geography", "Public policy"], description: "For emerging researchers asking how coastal communities can adapt without leaving neighbors behind.", eligibilityRules: rules([R.major("environment"), R.state("California"), R.gpa(3.1)]), requirements: [req("coastal-essay", "Research interest statement", "essay"), req("coastal-transcript", "Transcript", "transcript"), req("coastal-recommendation", "Research mentor reference", "recommendation")], effortHours: 5, renewal: "One-time award", fictionNotice,
  },
];

export const seedProfile: StudentProfile = {
  id: "profile-maya", userId: "user-maya", currentYear: 2, gpa: 3.72, major: "Environmental Science", state: "Illinois", citizenship: "US citizen or permanent resident", firstGeneration: true, financialNeed: true, annualHouseholdIncome: 42000, volunteerHours: 86, activities: ["Campus sustainability club", "Community garden volunteer", "Peer writing tutor"], interests: ["Climate resilience", "Public health", "Accessible education"], goals: "Bring community-led climate research into neighborhood planning.", updatedAt: "2026-10-14T00:00:00.000Z",
};

const tasksFor = (scholarshipId: string, essayTitle: string, dueDate: string) => [
  { id: `${scholarshipId}-review`, title: "Review eligibility and award details", description: "Confirm the official criteria with the provider before applying.", done: true },
  { id: `${scholarshipId}-draft`, title: essayTitle, description: "Save a draft locally, then revise for this opportunity.", done: false, dueDate },
  { id: `${scholarshipId}-records`, title: "Attach transcript and supporting evidence", description: "Check that linked records are current and complete.", done: false },
  { id: `${scholarshipId}-final`, title: "Final review and submit", description: "Proofread every field and submit through the official scholarship portal.", done: false, dueDate },
];

export function createDemoState(): AppData {
  const now = new Date().toISOString();
  const first = seedScholarships[0];
  const second = seedScholarships[1];
  const third = seedScholarships[2];
  return {
    schemaVersion: 1,
    users: [{ id: "user-maya", displayName: "Maya Chen", email: "maya.chen@example.edu", createdAt: now, lastSeenAt: now }],
    activeUserId: "user-maya",
    profiles: [{ ...seedProfile, updatedAt: now }],
    scholarships: seedScholarships,
    evidence: [
      { id: "ev-transcript", userId: "user-maya", title: "Unofficial transcript", type: "transcript", status: "ready", updatedAt: now, notes: "Downloaded from student portal · Fall 2026", linkedScholarshipIds: [first.id, third.id, "sch-midwest-innovators", "sch-open-door"], requirementIds: ["catalyst-transcript", "green-transcript", "midwest-transcript", "opendoor-transcript"] },
      { id: "ev-resume", userId: "user-maya", title: "Campus & community résumé", type: "resume", status: "ready", updatedAt: now, notes: "One-page version; last reviewed September 2026", linkedScholarshipIds: [third.id, "sch-service-leadership", "sch-public-good"], requirementIds: ["green-resume", "service-resume", "publicgood-resume"] },
      { id: "ev-personal-essay", userId: "user-maya", title: "Personal statement draft", type: "essay", status: "in-progress", updatedAt: now, notes: "Outline includes community garden work and climate interests.", linkedScholarshipIds: [second.id, first.id], requirementIds: ["firstgen-essay", "catalyst-essay"] },
      { id: "ev-fafsa", userId: "user-maya", title: "Financial aid summary", type: "faFsa", status: "needs-renewal", updatedAt: now, expiresAt: "2026-11-01", notes: "Refresh the summary before attaching to a new cycle.", linkedScholarshipIds: [second.id], requirementIds: ["firstgen-fafsa"] },
    ],
    checklists: [
      { id: "check-catalyst", userId: "user-maya", scholarshipId: first.id, tasks: tasksFor(first.id, "Draft science impact essay", first.deadline), updatedAt: now },
      { id: "check-firstgen", userId: "user-maya", scholarshipId: second.id, tasks: tasksFor(second.id, "Write first-generation story", second.deadline), updatedAt: now },
      { id: "check-green", userId: "user-maya", scholarshipId: third.id, tasks: tasksFor(third.id, "Describe community project impact", third.deadline), updatedAt: now },
    ],
    comparisonIds: [first.id, second.id, third.id],
  };
}
