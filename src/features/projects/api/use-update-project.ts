import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Project, updateProject } from "@/lib/project-storage";

type RequestType = Partial<{
  name: string;
  json: string;
  width: number;
  height: number;
}>;

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<{ data: Project }, Error, RequestType>({
    mutationKey: ["project", { id }],
    mutationFn: async (values) => {
      const project = updateProject(id, values);

      if (!project) {
        throw new Error("Project not found");
      }

      return { data: project };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", { id }] });
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });

  return mutation;
};
