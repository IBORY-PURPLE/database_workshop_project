import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../hook/usePosts";
import PostLists from "../components/PostLists";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { useUserProfile } from "../hook/useUserProfile";
import ProfileEditForm from "../components/ProfileEditForm";

export default function MyPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

  const {
    data: myPosts = [],
    isLoading,
    error,
  } = usePosts({ enabled: !!userId, userId, mode: "mineOrLiked" });

  const {
    profile,
    isLoading: isProfileLoading,
    error: profileError,
    isUpdating,
    updateName,
    updateEmail,
    updateBio,
  } = useUserProfile(userId);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (!storedUserId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    setUserId(storedUserId);
  }, [navigate]);

  if (!userId) {
    // 리다이렉트 직전 잠깐 표시용
    return null;
  }

  const emailFromStorage = localStorage.getItem("email");
  const email = profile?.email ?? emailFromStorage ?? "이메일 정보가 없습니다.";

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">My Page</h1>
            <p className="text-sm text-slate-300">
              내가 업로드했거나 좋아요한 게시물만 모아봤음.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowProfileForm((prev) => !prev)}
              className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-600"
            >
              프로필 수정
            </button>
            <button
              type="button"
              onClick={() => setShowPasswordForm((prev) => !prev)}
              className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              비밀번호 변경
            </button>
          </div>
        </header>

        {/* 프로필 정보 박스 */}
        <section className="mb-4 rounded-lg border border-slate-700 bg-slate-800 p-4">
          <h2 className="mb-3 text-lg font-semibold">프로필 정보</h2>

          {isProfileLoading && (
            <p className="text-sm text-slate-300">
              프로필 정보를 불러오는 중임...
            </p>
          )}

          {profileError && (
            <p className="text-sm text-red-400">
              프로필 정보를 불러오는 중 오류가 발생했음.
            </p>
          )}

          {profile && (
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium text-slate-200">이름</span>
                <span className="ml-2 text-slate-300">
                  {profile.name || "이름 정보가 없습니다."}
                </span>
              </p>
              <p>
                <span className="font-medium text-slate-200">이메일</span>
                <span className="ml-2 text-slate-300">{email}</span>
              </p>
              <p>
                <span className="font-medium text-slate-200">소개</span>
                <span className="ml-2 text-slate-300">
                  {profile.bio && profile.bio.trim().length > 0
                    ? profile.bio
                    : "아직 작성한 소개글이 없습니다."}
                </span>
              </p>
            </div>
          )}
        </section>

        {/* 프로필 수정 폼 */}
        {showProfileForm && (
          <ProfileEditForm
            profile={profile}
            isUpdating={isUpdating}
            updateName={updateName}
            updateEmail={updateEmail}
            updateBio={updateBio}
            onClose={() => setShowProfileForm(false)}
          />
        )}
        {showPasswordForm && (
          <ChangePasswordForm
            userId={userId}
            onClose={() => setShowPasswordForm(false)}
          />
        )}

        <div className="mt-6">
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
    </div>
  );
}
