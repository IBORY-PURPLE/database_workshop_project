import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../hook/usePosts";
import PostLists from "../components/PostLists";

export default function MyPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (!storedUserId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    setUserId(storedUserId);
  }, [navigate]);

  const {
    data: myPosts = [],
    isLoading,
    error,
  } = usePosts({ enabled: !!userId, userId });

  if (!userId) {
    // 리다이렉트 직전 잠깐 표시용
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-1">My Page</h1>
          <p className="text-sm text-slate-300">
            내가 업로드한 게시물만 모아봤음.
          </p>
        </header>

        {isLoading && <p>내 게시글을 불러오는 중입니다...</p>}
        {error && <p>게시글을 불러오는 중 오류가 발생했습니다.</p>}
        {!isLoading && !error && myPosts.length === 0 && (
          <p>아직 작성한 게시물이 없음.</p>
        )}
        {!isLoading && !error && myPosts.length > 0 && (
          <PostLists posts={myPosts} />
        )}
      </div>
    </div>
  );
}
