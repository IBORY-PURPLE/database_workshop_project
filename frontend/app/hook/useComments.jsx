// app/hook/useComments.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCommentsByPost, createComment } from "../api/comments";

export function useComments(postId) {
  const queryClient = useQueryClient();

  const userId = localStorage.getItem("user_id");
  const name = localStorage.getItem("name");

  // 댓글 리스트 가져오기
  const commentsQuery = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPost(postId),
    enabled: !!postId, // postId 있을 때만
  });

  // 댓글 작성 mutation
  const createCommentMutation = useMutation({
    mutationFn: ({ content }) =>
      createComment({ userId, postId, content, name }),
    onSuccess: () => {
      // 작성 성공하면 해당 게시글 댓글 목록 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const addComment = (content) => {
    if (!content.trim()) return;
    createCommentMutation.mutate({ content });
  };

  return {
    // 리스트 관련
    comments: commentsQuery.data ?? [],
    isLoading: commentsQuery.isLoading,
    error: commentsQuery.error,

    // 작성 관련
    addComment,
    isCreating: createCommentMutation.isPending,
  };
}
