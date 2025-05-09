export interface Project {
  name: string;
  tech: string[];
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  dates: {
    start: string;
    end: string;
  };
  responsibilities: string[];
  tech: string[];
}

export interface ResumeData {
  skills: string[];
  projects: Project[];
  experience: Experience[];
}
