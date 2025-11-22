// src/components/PostList.jsx
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

function PostList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>게시글을 불러오지 못했음</div>;

  if (!data || data.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <ul className="space-y-4">
      {data.map((post) => (
        <li key={post.id} className="border p-4 rounded-lg">
          <h2 className="font-bold text-lg mb-1">{post.title}</h2>
          <p className="mb-2 whitespace-pre-wrap">{post.content}</p>

          {post.image_url && post.image_url.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-2">
              {post.image_url.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          )}

          {post.hashtag && post.hashtag.length > 0 && (
            <div className="flex gap-2 flex-wrap text-sm text-blue-600">
              {post.hashtag.map((tag) => (
                <span key={tag.tag_id}>#{tag.word}</span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default PostList;
