import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Project, createProject } from "@/lib/project-storage";

type RequestType = {
  name: string;
  json: string;
  width: number;
  height: number;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<{ data: Project }, Error, RequestType>({
    mutationFn: async (input) => {
      const project = createProject(input);
      return { data: project };
    },
    onSuccess: () => {
      toast.success("Project created.");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Failed to create project.");
    },
  });

  return mutation;
};
