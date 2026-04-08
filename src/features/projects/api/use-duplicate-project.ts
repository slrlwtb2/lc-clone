import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Project, duplicateProject } from "@/lib/project-storage";

type RequestType = { id: string };

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<{ data: Project }, Error, RequestType>({
    mutationFn: async ({ id }) => {
      const project = duplicateProject(id);

      if (!project) {
        throw new Error("Project not found");
      }

      return { data: project };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Failed to duplicate project");
    },
  });

  return mutation;
};
