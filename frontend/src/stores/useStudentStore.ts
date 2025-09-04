import { create } from "zustand";
import type {
  ClassProfile,
  Student,
  StrandStudentRef,
  StrandKey,
  CompetenceClasses,
  Competence,
} from "../types/education";
import { studentService } from "../services/studentService";
import { getStrandDisplayName } from "../utils/strands";
import { getCompetenceClasses } from "../utils/competence";

interface StudentState {
  classProfile: ClassProfile | null;
  students: Student[];
  loading: boolean;
  error: string | null;
  searchQuery: string;

  setSearchQuery: (q: string) => void;
  clearError: () => void;

  // Actions async (appellent le service)
  fetchClassProfile: () => Promise<void>;
  fetchStudents: () => Promise<void>;

  // Selectors/Helpers
  getStudentById: (id: string) => Student | undefined;
  getFilteredStudents: (strandStudents: StrandStudentRef[]) => StrandStudentRef[];
}

export const useStudentStore = create<StudentState>((set, get) => ({
  classProfile: null,
  students: [],
  loading: false,
  error: null,
  searchQuery: "",

  setSearchQuery: (q) => set({ searchQuery: q }),
  clearError: () => set({ error: null }),

  fetchClassProfile: async () => {
    set({ loading: true, error: null });
    try {
      const data = await studentService.getClassProfile();
      set({ classProfile: data, loading: false });
    } catch (e: any) {
      set({ error: e?.message ?? "Failed to fetch class profile", loading: false });
    }
  },

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const data = await studentService.getStudents();
      set({ students: data, loading: false });
    } catch (e: any) {
      set({ error: e?.message ?? "Failed to fetch students", loading: false });
    }
  },

  // --- Selectors/Helpers ---
  getStudentById: (id) => {
    const { students } = get();
    return students.find((s) => s.id === id);
  },

  getFilteredStudents: (strandStudents) => {
    const q = get().searchQuery?.trim().toLowerCase();
    if (!q) return strandStudents;
    return strandStudents.filter((st) => st.name.toLowerCase().includes(q));
  },
}));
