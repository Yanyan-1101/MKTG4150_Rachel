"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createDemoState } from "@/lib/seed";
import { loadLocalState, resetLocalState as resetStorage, saveLocalState } from "@/lib/storage";
import type { AppData, Checklist, EvidenceItem, StudentProfile } from "@/types";

interface AppContextValue {
  data: AppData;
  hydrated: boolean;
  storageWarning: boolean;
  activeUser: AppData["users"][number] | null;
  profile: StudentProfile | undefined;
  signIn: (email: string) => void;
  signUp: (name: string, email: string) => void;
  signOut: () => void;
  updateProfile: (patch: Partial<StudentProfile>) => void;
  addEvidence: (item: Omit<EvidenceItem, "id" | "userId" | "updatedAt">) => void;
  updateEvidence: (id: string, patch: Partial<EvidenceItem>) => void;
  deleteEvidence: (id: string) => void;
  addChecklist: (scholarshipId: string) => void;
  toggleTask: (checklistId: string, taskId: string) => void;
  toggleComparison: (scholarshipId: string) => void;
  resetDemo: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => createDemoState());
  const [hydrated, setHydrated] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);

  useEffect(() => {
    const saved = loadLocalState();
    if (saved) setData(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !saveLocalState(data)) setStorageWarning(true);
    else if (hydrated) setStorageWarning(false);
  }, [data, hydrated]);

  const activeUser = data.users.find((user) => user.id === data.activeUserId) ?? null;
  const profile = data.profiles.find((item) => item.userId === data.activeUserId);

  const signIn = useCallback((email: string) => {
    const normalized = email.trim().toLowerCase();
    setData((current) => {
      const existing = current.users.find((user) => user.email.toLowerCase() === normalized);
      if (existing) return { ...current, activeUserId: existing.id, comparisonIds: current.activeUserId === existing.id ? current.comparisonIds : [], users: current.users.map((user) => user.id === existing.id ? { ...user, lastSeenAt: new Date().toISOString() } : user) };
      const demo = current.users.find((user) => user.id === "user-maya");
      const fallbackUserId = demo?.id ?? current.users[0]?.id ?? null;
      return { ...current, activeUserId: fallbackUserId, comparisonIds: current.activeUserId === fallbackUserId ? current.comparisonIds : [] };
    });
  }, []);

  const signUp = useCallback((name: string, email: string) => {
    const normalized = email.trim().toLowerCase();
    setData((current) => {
      const existing = current.users.find((user) => user.email.toLowerCase() === normalized);
      if (existing) return { ...current, activeUserId: existing.id, comparisonIds: current.activeUserId === existing.id ? current.comparisonIds : [] };
      const id = `user-${crypto.randomUUID()}`;
      const now = new Date().toISOString();
      const user = { id, displayName: name.trim(), email: normalized, createdAt: now, lastSeenAt: now };
      const newProfile: StudentProfile = {
        id: `profile-${crypto.randomUUID()}`, userId: id, currentYear: null, gpa: null, major: "", state: "", citizenship: "", firstGeneration: null, financialNeed: null, annualHouseholdIncome: null, volunteerHours: null, activities: [], interests: [], goals: "", updatedAt: now,
      };
      return { ...current, users: [...current.users, user], profiles: [...current.profiles, newProfile], activeUserId: id, comparisonIds: [] };
    });
  }, []);

  const signOut = useCallback(() => setData((current) => ({ ...current, activeUserId: null })), []);

  const updateProfile = useCallback((patch: Partial<StudentProfile>) => {
    const safePatch = { ...patch };
    delete safePatch.id;
    delete safePatch.userId;
    delete safePatch.updatedAt;
    setData((current) => {
      const userId = current.activeUserId;
      if (!userId) return current;
      const found = current.profiles.some((item) => item.userId === userId);
      const now = new Date().toISOString();
      const profiles = found
        ? current.profiles.map((item) => item.userId === userId ? { ...item, ...safePatch, updatedAt: now } : item)
        : [...current.profiles, { id: `profile-${crypto.randomUUID()}`, userId, currentYear: null, gpa: null, major: "", state: "", citizenship: "", firstGeneration: null, financialNeed: null, annualHouseholdIncome: null, volunteerHours: null, activities: [], interests: [], goals: "", ...safePatch, updatedAt: now }];
      return { ...current, profiles };
    });
  }, []);

  const addEvidence = useCallback((item: Omit<EvidenceItem, "id" | "userId" | "updatedAt">) => {
    setData((current) => {
      if (!current.activeUserId) return current;
      const entry: EvidenceItem = { ...item, id: `evidence-${crypto.randomUUID()}`, userId: current.activeUserId, updatedAt: new Date().toISOString() };
      return { ...current, evidence: [entry, ...current.evidence] };
    });
  }, []);

  const updateEvidence = useCallback((id: string, patch: Partial<EvidenceItem>) => setData((current) => ({ ...current, evidence: current.evidence.map((item) => item.id !== id || item.userId !== current.activeUserId ? item : { ...item, ...patch, userId: item.userId, updatedAt: new Date().toISOString() }) })), []);
  const deleteEvidence = useCallback((id: string) => setData((current) => ({ ...current, evidence: current.evidence.filter((item) => item.id !== id || item.userId !== current.activeUserId) })), []);
  const addChecklist = useCallback((scholarshipId: string) => setData((current) => {
    const userId = current.activeUserId;
    const scholarship = current.scholarships.find((item) => item.id === scholarshipId);
    if (!userId || !scholarship || current.checklists.some((item) => item.userId === userId && item.scholarshipId === scholarshipId)) return current;
    const now = new Date().toISOString();
    const checklist: Checklist = {
      id: `check-${crypto.randomUUID()}`, userId, scholarshipId, updatedAt: now,
      tasks: [
        ...scholarship.requirements.map((requirement) => ({ id: `task-${crypto.randomUUID()}`, title: requirement.title, description: requirement.required ? "Prepare and verify this required application material." : "Consider preparing this optional application material.", done: false, dueDate: scholarship.deadline, requirementId: requirement.id })),
        { id: `task-${crypto.randomUUID()}`, title: "Final review and submit", description: "Proofread every field and submit through the official scholarship portal.", done: false, dueDate: scholarship.deadline },
      ],
    };
    return { ...current, checklists: [...current.checklists, checklist] };
  }), []);
  const toggleTask = useCallback((checklistId: string, taskId: string) => setData((current) => ({ ...current, checklists: current.checklists.map((checklist) => checklist.id !== checklistId || checklist.userId !== current.activeUserId ? checklist : { ...checklist, updatedAt: new Date().toISOString(), tasks: checklist.tasks.map((task) => task.id === taskId ? { ...task, done: !task.done } : task) }) })), []);
  const toggleComparison = useCallback((scholarshipId: string) => setData((current) => ({ ...current, comparisonIds: current.comparisonIds.includes(scholarshipId) ? current.comparisonIds.filter((id) => id !== scholarshipId) : [...current.comparisonIds, scholarshipId].slice(-4) })), []);
  const resetDemo = useCallback(() => setData(resetStorage()), []);

  const value = useMemo(() => ({ data, hydrated, storageWarning, activeUser, profile, signIn, signUp, signOut, updateProfile, addEvidence, updateEvidence, deleteEvidence, addChecklist, toggleTask, toggleComparison, resetDemo }), [data, hydrated, storageWarning, activeUser, profile, signIn, signUp, signOut, updateProfile, addEvidence, updateEvidence, deleteEvidence, addChecklist, toggleTask, toggleComparison, resetDemo]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppData() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useAppData must be used within AppProvider");
  return value;
}
