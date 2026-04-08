import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProject } from "@/lib/project-storage";

type RequestType = { id: string };

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<{ data: { id: string } }, Error, RequestType>({
    mutationFn: async ({ id }) => {
      const success = deleteProject(id);

      if (!success) {
        throw new Error("Project not found");
      }

      return { data: { id } };
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", { id: data.id }] });
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  return mutation;
};
