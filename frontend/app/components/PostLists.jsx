import React from "react";
import PostItem from "./PostItem";

export default function PostLists({ posts }) {
  return (
    <div className="mt-6">
      {posts.length === 0 ? (
        <p className="text-gray-600">게시글이 없습니다.</p>
      ) : (
        posts.map((post) => <PostItem key={post.post_id} post={post} />)
      )}
    </div>
  );
}
