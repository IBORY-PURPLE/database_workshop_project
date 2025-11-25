// src/components/ProfileEditForm.jsx
import React, { useEffect, useState } from "react";

export default function ProfileEditForm({
  profile,
  isUpdating,
  updateName,
  updateEmail,
  updateBio,
  onClose,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // 프로필 불러온 뒤 초기값 세팅
  useEffect(() => {
    if (!profile) return;
    setName(profile.name || "");
    setEmail(profile.email || "");
    setBio(profile.bio || "");
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const promises = [];

      if (name !== profile.name) {
        promises.push(updateName(name));
      }
      if (email !== profile.email) {
        promises.push(updateEmail(email));
      }
      if (bio !== profile.bio) {
        promises.push(updateBio(bio));
      }

      if (promises.length === 0) {
        alert("변경된 내용이 없음.");
        return;
      }

      await Promise.all(promises);

      alert("프로필이 변경되었음.");
      onClose?.();
    } catch (err) {
      alert(err.message || "프로필 변경 중 오류가 발생했음.");
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">프로필 수정</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          닫기
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-300">이름</label>
          <input
            type="text"
            className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-300">이메일</label>
          <input
            type="email"
            className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-300">소개</label>
          <textarea
            className="min-h-[80px] rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {isUpdating ? "저장 중..." : "프로필 저장"}
        </button>
      </form>
    </div>
  );
}
