// src/pages/CreatePostPage.jsx
import CreatePostForm from "../components/CreatePostForm";

function CreatePostPage() {
  const user_id = localStorage.getItem("user_id");

  if (!user_id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <h1 className="text-4xl font-bold mb-4">로그인 후 이용가능합니다.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">게시물 작성</h1>
      <CreatePostForm userId={user_id} />
    </div>
  );
}

export default CreatePostPage;
