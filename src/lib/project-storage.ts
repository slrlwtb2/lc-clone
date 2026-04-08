const STORAGE_KEY = "canvas-projects";

export interface Project {
  id: string;
  name: string;
  json: string;
  width: number;
  height: number;
  thumbnailUrl: string | null;
  isTemplate: boolean | null;
  isPro: boolean | null;
  createdAt: string;
  updatedAt: string;
}

function generateId(): string {
  return crypto.randomUUID();
}

export function getProjects(): Project[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}

export function createProject(input: {
  name: string;
  json: string;
  width: number;
  height: number;
}): Project {
  const projects = getProjects();
  const now = new Date().toISOString();

  const project: Project = {
    id: generateId(),
    name: input.name,
    json: input.json,
    width: input.width,
    height: input.height,
    thumbnailUrl: null,
    isTemplate: null,
    isPro: null,
    createdAt: now,
    updatedAt: now,
  };

  projects.unshift(project);
  saveProjects(projects);
  return project;
}

export function updateProject(
  id: string,
  values: Partial<Omit<Project, "id" | "createdAt">>
): Project | null {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) return null;

  projects[index] = {
    ...projects[index],
    ...values,
    updatedAt: new Date().toISOString(),
  };

  saveProjects(projects);
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = getProjects();
  const filtered = projects.filter((p) => p.id !== id);

  if (filtered.length === projects.length) return false;

  saveProjects(filtered);
  return true;
}

export function duplicateProject(id: string): Project | null {
  const project = getProjectById(id);
  if (!project) return null;

  return createProject({
    name: `Copy of ${project.name}`,
    json: project.json,
    width: project.width,
    height: project.height,
  });
}

export function getProjectsPaginated(page: number, limit: number) {
  const projects = getProjects();
  const start = (page - 1) * limit;
  const data = projects.slice(start, start + limit);

  return {
    data,
    nextPage: start + limit < projects.length ? page + 1 : null,
  };
}
