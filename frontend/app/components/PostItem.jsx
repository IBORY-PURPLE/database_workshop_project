import React from "react";

export default function PostItem({ post }) {
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
      <div className="text-gray-500 text-sm">❤️ {post.like_count}</div>
    </div>
  );
}
