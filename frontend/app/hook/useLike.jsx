// src/hooks/useLike.js
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike, deleteLike } from "../api/likeApi";

export function useLike({
  postId,
  initialIsLiked = false,
  initialLikeCount = 0,
}) {
  const userId = localStorage.getItem("user_id");

  const [isLiked, setIsLiked] = useState(!!initialIsLiked); // 항상 false에서 시작
  const [likeCount, setLikeCount] = useState(initialLikeCount ?? 0);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (willLike) =>
      willLike
        ? createLike({ user_id: userId, post_id: postId })
        : deleteLike({ user_id: userId, post_id: postId }),

    onSuccess: (_data, willLike) => {
      setIsLiked(willLike);
      setLikeCount((prev) => prev + (willLike ? 1 : -1));

      // posts 리스트 업데이트
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onError: (err) => {
      alert(err.message);
    },
  });

  const toggleLike = () => {
    if (mutation.isPending) return;
    mutation.mutate(!isLiked);
  };

  return {
    isLiked,
    likeCount,
    toggleLike,
    isLoading: mutation.isPending,
  };
}
