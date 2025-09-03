export type Competence = 'BE' | 'AE' | 'ME' | 'EE';

export type StrandKey =
  | 'letterIdentification'
  | 'letterNaming'
  | 'letterFormation'
  | 'phonemicAwareness';

export type StrandDisplayName =
  | 'Letter Identification'
  | 'Letter Naming'
  | 'Letter Formation'
  | 'Phonemic Awareness';

export interface StrandStudentRef {
  studentId: string;
  name: string;
  competence: Competence;
}

export interface StrandOverview {
  strandId: string;
  strand: StrandDisplayName;
  workCovered: number;
  students: StrandStudentRef[];
}

export interface ClassProfile {
  strands: StrandOverview[];
}

export interface StudentStrandInfo {
  competence: Competence;
  progress: number;
}

export interface StudentStrands {
  letterIdentification: StudentStrandInfo;
  letterNaming: StudentStrandInfo;
  letterFormation: StudentStrandInfo;
  phonemicAwareness: StudentStrandInfo;
}

export interface Student {
  id: string;
  name: string;
  strands: StudentStrands;
}