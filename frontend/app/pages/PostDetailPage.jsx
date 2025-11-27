// app/pages/PostDetail.jsx
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PostItem from "../components/PostItem";
import { useComments } from "../hook/useComments.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost, deletePost } from "../api/posts";

export default function PostDetail() {
  const { postId } = useParams();
  const location = useLocation();
  const post = location.state?.post ?? null; // 리스트에서 넘어온 정보
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUserId = localStorage.getItem("user_id");

  const [content, setContent] = useState("");
  const { comments, isLoading, error, addComment, isCreating } =
    useComments(postId);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post?.title ?? "");
  const [editContent, setEditContent] = useState(post?.content ?? "");
  const [editHashtags, setEditHashtags] = useState(
    post?.hashtag?.map((h) => h.word).join(", ") ?? ""
  );
  const [editImages, setEditImages] = useState([]);

  const handleImageChange = (e) => {
    setEditImages(Array.from(e.target.files || []));
  };

  // 🔸 게시글 수정 mutation
  const updateMutation = useMutation({
    mutationFn: (payload) => updatePost(payload),
    onSuccess: (updated) => {
      // 리스트 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // 현재 화면에서도 제목/내용 갱신
      setIsEditing(false);
      setEditTitle(updated.title);
      setEditContent(updated.content);
      setEditHashtags(updated.hashtag?.map((h) => h.word).join(", ") ?? "");
      navigate("/");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  // 🔸 게시글 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: () =>
      deletePost({
        post_id: post.post_id,
        current_user_id: currentUserId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/"); // 홈으로 이동
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    addComment(content);
    setContent("");
  };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    const tags = editHashtags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    updateMutation.mutate({
      post_id: post.post_id,
      title: editTitle,
      content: editContent,
      current_user_id: currentUserId,
      hashtags: tags,
      images: editImages, // 사용자가 다시 선택한 이미지들
    });
  };

  const handleDeletePost = () => {
    if (!window.confirm("이 게시글을 삭제하시겠습니까?")) return;
    deleteMutation.mutate();
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* 게시글 본문 */}
      {post && (
        <div className="mb-6 space-y-4">
          <PostItem post={post} />

          {/* 🔸 내 게시글일 때만 수정/삭제 버튼 표시 */}
          {String(post.user_id) === String(currentUserId) && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="px-3 py-1 rounded-md text-sm bg-blue-500 text-white"
              >
                {isEditing ? "수정 취소" : "게시글 수정"}
              </button>
              <button
                onClick={handleDeletePost}
                disabled={deleteMutation.isPending}
                className="px-3 py-1 rounded-md text-sm bg-red-500 text-black disabled:opacity-60"
              >
                {deleteMutation.isPending ? "삭제 중..." : "삭제"}
              </button>
            </div>
          )}

          {/* 🔸 수정 폼 */}
          {isEditing && (
            <form
              onSubmit={handleUpdatePost}
              className="mt-4 border rounded-md p-4 space-y-3 bg-gray-50"
            >
              <div>
                <label className="block text-black text-sm mb-1">제목</label>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="
          w-full px-3 py-2
          bg-white border border-gray-300 rounded-md
          text-sm text-gray-900
          placeholder:text-gray-400
          hover:border-emerald-400
          focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none
        "
                />
              </div>

              <div>
                <label className="block text-black text-sm mb-1">내용</label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="
          w-full px-3 py-2
          bg-white border border-gray-300 rounded-md
          text-sm text-gray-900
          placeholder:text-gray-400
          hover:border-emerald-400
          focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none
        "
                />
              </div>

              <div>
                <label className="block text-black text-sm mb-1">
                  해시태그 (쉼표로 구분)
                </label>
                <input
                  value={editHashtags}
                  onChange={(e) => setEditHashtags(e.target.value)}
                  className="
          w-full px-3 py-2
          bg-white border border-gray-300 rounded-md
          text-sm text-gray-900
          placeholder:text-gray-400
          hover:border-emerald-400
          focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 focus:outline-none
        "
                  placeholder="예: 여행, 카페, 감성"
                />
              </div>

              <div>
                <label className="block text-black text-sm mb-1">
                  이미지 다시 선택
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="fileUpload"
                  className="mt-6 inline-block px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
                >
                  이미지 업로드 📷
                </label>
              </div>

              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm disabled:opacity-60"
              >
                {updateMutation.isPending ? "수정 중..." : "수정 완료"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* 댓글 섹션 */}
      <section className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">댓글</h3>

        {/* 댓글 작성 폼 (로그인한 유저 기준) */}
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            className="w-full border rounded-md p-2 text-sm min-h-[80px]"
            placeholder="댓글을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            disabled={isCreating || !content.trim()}
            className="mt-2 px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm disabled:opacity-60"
          >
            {isCreating ? "작성 중..." : "댓글 달기"}
          </button>
        </form>

        {/* 댓글 목록 */}
        {isLoading && (
          <p className="text-sm text-gray-500">댓글 불러오는 중...</p>
        )}
        {error && (
          <p className="text-sm text-red-500">댓글을 불러오지 못했습니다.</p>
        )}

        <ul className="space-y-3">
          {comments.map((comment) => (
            <li
              key={comment.comment_id ?? comment.id}
              className="border rounded-md p-3 bg-gray-50"
            >
              <p className="text-xs text-gray-500 mb-1">
                {comment.user_name ?? comment.username ?? "익명"}
              </p>
              <p className="text-sm text-black  ">{comment.content}</p>
            </li>
          ))}

          {!isLoading && comments.length === 0 && (
            <p className="text-sm text-gray-500">첫 댓글을 남겨보세요.</p>
          )}
        </ul>
      </section>
    </div>
  );
}
