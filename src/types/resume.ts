
export interface BasicInfo {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  website?: string;
  location?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  title?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  university?: string;
  degree: string;
  major?: string;
  graduationDate?: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  technologies?: string[];
}

export interface ResumeData {
  basicInfo: BasicInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
}
