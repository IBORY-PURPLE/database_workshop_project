// src/api/likeApi.js
import { API_BASE } from "./apiBase";

export async function createLike({ user_id, post_id }) {
  const res = await fetch(`${API_BASE}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, post_id }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "좋아요 생성 실패");
  }

  return true;
}

export async function deleteLike({ user_id, post_id }) {
  const res = await fetch(`${API_BASE}/like`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, post_id }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "좋아요 삭제 실패");
  }

  return true;
}
