import React from "react";
import { Link } from "react-router-dom";
import { useLike } from "../hook/useLike";

export default function PostItem({ post }) {
  const postId = post.post_id;
  const { isLiked, likeCount, toggleLike, isLoading } = useLike({
    postId: post.post_id,
    initialLikeCount: post.like_count,
  });
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white mb-4">
      {/* 이미지 */}
      {post.image_url && post.image_url.length > 0 && (
        <div className="mb-3">
          <img
            src={post.image_url[0]}
            alt="post"
            className="w-full h-60 object-cover rounded-md"
          />
        </div>
      )}

      {/* 제목 */}
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

      {/* 내용 */}
      <p className="text-gray-700 mb-3">{post.content}</p>

      <p className="text-gray-700 mb-3">{post.name}</p>

      {/* 해시태그 */}
      <div className="mb-3 flex gap-2 flex-wrap">
        {post.hashtag &&
          post.hashtag.map((tag) => (
            <span
              key={tag.tag_id}
              className="px-2 py-1 bg-emerald-100 text-emerald-600 text-sm rounded"
            >
              #{tag.word}
            </span>
          ))}
      </div>

      {/* 좋아요 */}
      <button
        onClick={toggleLike}
        disabled={isLoading}
        className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border ${
          isLiked
            ? "bg-rose-100 border-rose-300 text-rose-600"
            : "bg-gray-50 border-gray-300 text-gray-600"
        } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <span>{isLiked ? "❤️" : "🤍"}</span>
        <span>{likeCount}</span>
      </button>
      {postId && (
        <Link
          to={`/posts/${postId}`}
          state={{ post }} // 디테일에서 바로 보여줄 수 있도록
          className="inline-flex items-center text-emerald-600 hover:underline text-sm"
        >
          댓글 보기 / 작성하기
        </Link>
      )}
    </div>
  );
}
