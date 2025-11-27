import { API_BASE } from "./apiBase";

// 전체 게시글 가져오기
export async function getAllPosts() {
  const user_id = localStorage.getItem("user_id");
  const res = await fetch(`${API_BASE}/post/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("게시글 목록을 가져오지 못했음");
  }

  const data = await res.json();
  console.log(data);
  return data;
}

// 게시글 생성
export async function createPost({ title, content, user_id, tags, images }) {
  // payload 안에 user_id, title, content, image_url, hashtag 들어있다고 가정함

  const formData = new FormData();

  formData.append("title", title);
  formData.append("content", content);
  formData.append("user_id", user_id);

  (tags || []).forEach((tag) => {
    formData.append("tags", tag);
  });

  (images || []).forEach((file) => {
    formData.append("images", file);
  });

  const res = await fetch(`${API_BASE}/post/create`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("게시글 생성 실패함");
  }

  return res.json();
}

// 🔸 게시글 수정 (PUT /post, multipart/form-data)
export async function updatePost({
  post_id,
  title,
  content,
  current_user_id,
  hashtags = [],
  images = [],
}) {
  const formData = new FormData();
  formData.append("post_id", String(post_id));
  formData.append("title", title);
  formData.append("content", content);
  formData.append("current_user_id", String(current_user_id));

  // swagger 에서 hashtag array<string> 이므로 같은 키로 여러개 보내기
  hashtags.forEach((tag) => {
    formData.append("hashtag", tag);
  });

  // 이미지도 배열로 전송
  images.forEach((file) => {
    formData.append("images", file);
  });

  const res = await fetch(`${API_BASE}/post`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "게시글 수정 실패");
  }

  return res.json(); // 수정된 post 객체 반환
}

// 🔸 게시글 삭제 (DELETE /post)
export async function deletePost({ post_id, current_user_id }) {
  const res = await fetch(`${API_BASE}/post`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id,
      current_user_id,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "게시글 삭제 실패");
  }

  return true;
}
