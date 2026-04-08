import { useInfiniteQuery } from "@tanstack/react-query";

import { Project, getProjectsPaginated } from "@/lib/project-storage";

export type ResponseType = {
  data: Project[];
  nextPage: number | null;
};

export const useGetProjects = () => {
  const query = useInfiniteQuery<ResponseType, Error>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      return getProjectsPaginated(pageParam as number, 5);
    },
  });

  return query;
};
