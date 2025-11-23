import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api/posts";

export function usePosts({ enabled = true, userId = null } = {}) {
  return useQuery({
    queryKey: ["posts", userId ?? "all"],
    queryFn: getAllPosts,
    staleTime: 1000 * 60, // 1분 캐싱 (선택)
    enabled,

    select: (data) => {
      if (!userId) return data;
      return data.filter((post) => post.user_id === userId);
    },
  });
}
