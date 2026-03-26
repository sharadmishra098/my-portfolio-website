export type SkillCategory = 'Generative AI' | 'Backend' | 'Cloud' | 'Data' | 'Practices';

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
  accent: string;
}

export interface ProjectItem {
  name: string;
  summary: string;
  stack: string[];
  achievements: string[];
  accent: string;
  links?: ContactLink[];
}

export interface SkillGroup {
  category: SkillCategory;
  items: string[];
  color: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  location: string;
  summary: string;
  email: string;
  phone: string;
  taglines: string[];
  contact: ContactLink[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: string;
  metrics: Array<{ label: string; value: string }>;
}
