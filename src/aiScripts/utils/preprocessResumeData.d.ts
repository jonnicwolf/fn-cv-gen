import { Project, ResumeData } from "../types/types";
export declare function extractKeywords(jobDescription: string): string[];
export declare function filterSkills(jobDescription: string, skills: string[]): string[];
export declare function preprocessResumeData(jobDescription: string, resumeData: ResumeData): {
    skills: string[];
    projects: Project[];
    experience: import("../types/types").Experience[];
};
