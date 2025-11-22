import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleCreatePostClick = () => {
    navigate("/posts/create");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-4">ZZAPstargram</h1>
      <p className="text-lg text-slate-300">Welcome my ZZAPstargram!!</p>
      <button
        onClick={handleCreatePostClick}
        className="px-4 py-2 rounded bg-black text-white"
      >
        게시물 작성하러 가기
      </button>
    </div>
  );
}
