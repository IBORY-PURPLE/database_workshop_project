import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../api/posts";

export function usePosts({ enabled = true, userId = null, mode = "all" } = {}) {
  return useQuery({
    queryKey: ["posts", { userId: userId ?? "all", mode }],
    queryFn: getAllPosts,
    staleTime: 1000 * 60, // 1분 캐싱 (선택)
    enabled,

    select: (data) => {
      if (!data) return [];

      // 1) 내가 쓴 글만
      if (mode === "mine") {
        if (!userId) return [];
        return data.filter((post) => String(post.user_id) === String(userId));
      }

      // 2) 내가 좋아요한 글만
      if (mode === "liked") {
        return data.filter((post) => post.is_liked);
      }

      // 3) 내가 썼거나(or) 좋아요한 글
      if (mode === "mineOrLiked") {
        if (!userId) {
          // userId 없으면 좋아요한 글만이라도
          return data.filter((post) => post.is_liked);
        }
        return data.filter(
          (post) => String(post.user_id) === String(userId) || post.is_liked
        );
      }

      // 기본: 전체
      return data;
    },
  });
}
