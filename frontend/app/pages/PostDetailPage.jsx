// app/pages/PostDetail.jsx
import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import PostItem from "../components/PostItem";
import { useComments } from "../hook/useComments.jsx";

export default function PostDetail() {
  const { postId } = useParams();
  const location = useLocation();
  const post = location.state?.post ?? null; // 리스트에서 넘어온 정보

  const [content, setContent] = useState("");
  const { comments, isLoading, error, addComment, isCreating } =
    useComments(postId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    addComment(content);
    setContent("");
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* 게시글 본문 */}
      {post && (
        <div className="mb-6">
          <PostItem post={post} />
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
