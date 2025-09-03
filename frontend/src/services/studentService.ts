import { httpGet } from "./api";
import type { ClassProfile, Student } from "../types/education";


export const studentService = {
  async getClassProfile(): Promise<ClassProfile> {
    return httpGet<ClassProfile>('/class_profile');
  },

  async getStudents(): Promise<Student[]> {
    return httpGet<Student[]>('/students');
  },
};
