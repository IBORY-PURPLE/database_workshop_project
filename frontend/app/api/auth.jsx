// src/api/auth.js
import { API_BASE } from "./apiBase";

export async function changePassword({ userId, oldPassword, newPassword }) {
  const response = await fetch(`${API_BASE}/auth/${userId}/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    }),
  });

  if (!response.ok) {
    let errorMessage = "비밀번호 변경에 실패했습니다.";
    try {
      const data = await response.json();
      if (data?.detail || data?.message) {
        errorMessage = data.detail || data.message;
      }
    } catch (e) {
      // json 파싱 실패 시 기본 메시지 사용
    }
    throw new Error(errorMessage);
  }

  // 비밀번호 변경 성공 시, 보통 내용 없는 200만 올 수도 있어서
  try {
    return await response.json();
  } catch {
    return null;
  }
}
