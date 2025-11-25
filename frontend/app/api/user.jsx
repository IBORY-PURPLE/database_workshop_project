// src/api/user.js
import { API_BASE } from "./apiBase";

// 프로필 조회
export async function getUserProfile(userId) {
  const res = await fetch(`${API_BASE}/user/${userId}/profile`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("프로필 정보를 불러오지 못했음.");
  }

  return res.json(); // { user_id, name, email?, bio, user_post: [] ... }
}

// 이름 수정
export async function updateUserName({ userId, name }) {
  const res = await fetch(`${API_BASE}/user/${userId}/name`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ new_name: name }),
  });

  if (!res.ok) {
    let msg = "이름 변경에 실패했음.";
    try {
      const data = await res.json();
      msg = data.detail || data.message || msg;
    } catch {}
    throw new Error(msg);
  }
}

// 이메일 수정
export async function updateUserEmail({ userId, email }) {
  const res = await fetch(`${API_BASE}/user/${userId}/email`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ new_email: email }),
  });

  if (!res.ok) {
    let msg = "이메일 변경에 실패했음.";
    try {
      const data = await res.json();
      msg = data.detail || data.message || msg;
    } catch {}
    throw new Error(msg);
  }
}

// bio 수정
export async function updateUserBio({ userId, bio }) {
  const res = await fetch(`${API_BASE}/user/${userId}/bio`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ new_bio: bio }),
  });

  if (!res.ok) {
    let msg = "소개글 변경에 실패했음.";
    try {
      const data = await res.json();
      msg = data.detail || data.message || msg;
    } catch {}
    throw new Error(msg);
  }
}
