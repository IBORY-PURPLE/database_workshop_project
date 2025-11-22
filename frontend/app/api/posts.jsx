import { API_BASE } from "./apiBase";

// 전체 게시글 가져오기
// export async function fetchPosts() {
//   const res = await fetch(`${API_BASE}/posts`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     throw new Error("게시글 목록을 가져오지 못했음");
//   }

//   return res.json(); // 백엔드에서 posts 배열 리턴한다고 가정
// }

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
