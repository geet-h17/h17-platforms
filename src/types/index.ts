export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  thumbnail: string;
  category: ProjectCategory;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectCategory = 
  | 'developer-tools'
  | 'utilities'
  | 'libraries'
  | 'applications';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}
