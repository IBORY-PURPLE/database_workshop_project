// src/components/ChangePasswordForm.jsx
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/auth";

export default function ChangePasswordForm({ userId, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => changePassword({ userId, oldPassword, newPassword }),
    onSuccess: () => {
      alert("비밀번호가 변경되었습니다.");
      setOldPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
      onClose?.();
    },
    onError: (error) => {
      alert(error.message || "비밀번호 변경 중 오류가 발생했습니다.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !newPasswordConfirm) {
      alert("모든 값을 입력해주세요.");
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      alert("새 비밀번호가 서로 일치하지 않습니다.");
      return;
    }
    mutate();
  };

  return (
    <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">비밀번호 변경</h2>
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
          <label className="text-sm text-slate-300">현재 비밀번호</label>
          <input
            type="password"
            className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-300">새 비밀번호</label>
          <input
            type="password"
            className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-300">새 비밀번호 확인</label>
          <input
            type="password"
            className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {isPending ? "변경 중..." : "비밀번호 변경하기"}
        </button>
      </form>
    </div>
  );
}
