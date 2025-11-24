// app/api/comments.jsx
import { API_BASE } from "./apiBase";

export async function getCommentsByPost(postId) {
  const res = await fetch(`${API_BASE}/comment/post/${postId}`);

  if (!res.ok) {
    throw new Error("댓글 목록을 불러오지 못했습니다.");
  }

  // 백엔드에서 주는 형식 그대로 반환
  return res.json();
}

export async function createComment({ userId, postId, content, name }) {
  const res = await fetch(`${API_BASE}/comment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      post_id: postId,
      content,
      name,
    }),
  });

  if (!res.ok) {
    throw new Error("댓글 작성에 실패했습니다.");
  }

  return res.json();
}
