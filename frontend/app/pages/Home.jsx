import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { usePosts } from "../hook/usePosts";
import PostLists from "../components/PostLists";

export default function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  // 처음 렌더링 시 localStorage에서 user_id 읽기
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // 로그인 된 경우에만 게시글 fetch
  const {
    data: posts = [],
    isLoading,
    error,
  } = usePosts({ enabled: !!userId });

  const handleCreatePostClick = () => {
    navigate("/posts/create");
  };

  // 🔹 로그인 안 했을 때: Welcome 화면만
  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <h1 className="text-4xl font-bold mb-4">ZZAPstargram</h1>
        <p className="text-lg text-slate-300">Welcome my ZZAPstargram!!</p>
        <NavLink
          to="/auth?mode=login"
          className="mt-6 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600"
        >
          longin
        </NavLink>
      </div>
    );
  }

  // 🔹 로그인 했을 때: 게시글 리스트 화면
  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">ZZAPstargram</h1>
            <p className="text-sm text-slate-300 mt-1">Welcome back! 👋</p>
          </div>
          <button
            onClick={handleCreatePostClick}
            className="px-4 py-2 rounded bg-black text-white"
          >
            게시물 작성하러 가기
          </button>
        </header>

        {/* 로딩 / 에러 / 목록 */}
        {isLoading && <p>게시글을 불러오는 중입니다...</p>}
        {error && <p>게시글을 불러오는 중 오류가 발생했습니다.</p>}
        {!isLoading && !error && <PostLists posts={posts} />}
      </div>
    </div>
  );
}
