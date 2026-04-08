import { useQuery } from "@tanstack/react-query";

import { Project, getProjectById } from "@/lib/project-storage";

export type ResponseType = { data: Project };

export const useGetProject = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["project", { id }],
    queryFn: async () => {
      const project = getProjectById(id);

      if (!project) {
        throw new Error("Project not found");
      }

      return project;
    },
  });

  return query;
};
