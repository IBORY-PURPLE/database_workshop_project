// src/components/CreatePostForm.jsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";

function CreatePostForm({ userId }) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]); // "url1, url2"
  const [tagInput, setTagInput] = useState(""); // "tag1, tag2"

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (payload) => createPost(payload),
    onSuccess: () => {
      // 새 글 등록 성공하면 목록 리패치
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle("");
      setContent("");
      setFiles([]);
      setTagInput("");
    },
  });

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);

    if (selected.length > 3) {
      alert("이미지는 최대 3장까지 업로드 가능함");
      setFiles(selected.slice(0, 3));
    } else {
      setFiles(selected);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("이미지 최소 1장은 업로드해야 함");
      return;
    }

    const tags = tagInput
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    mutate({
      title,
      content,
      user_id: userId,
      tags,
      images: files,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-lg">
      <div>
        <label className="block text-sm font-medium mb-1">제목</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">내용</label>
        <textarea
          className="border rounded px-2 py-1 w-full h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          이미지 (최소 1장, 최대 3장)
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="fileUpload"
          className="mt-6 inline-block px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
        >
          이미지 업로드 📷
        </label>
        {files.length > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            선택된 파일: {files.map((f) => f.name).join(", ")}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          해시태그 (띄어쓰기 또는 콤마로 구분)
        </label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="여행, 일상, 코딩"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
      >
        {isPending ? "등록 중..." : "게시글 등록"}
      </button>

      {isSuccess && <p className="text-green-600 text-sm mt-1">등록 완료됨!</p>}
      {isError && (
        <p className="text-red-600 text-sm mt-1">
          에러: {error?.message || "등록 실패함"}
        </p>
      )}
    </form>
  );
}

export default CreatePostForm;
