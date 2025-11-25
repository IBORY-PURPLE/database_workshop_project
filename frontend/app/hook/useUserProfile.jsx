// src/hook/useUserProfile.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserName,
  updateUserEmail,
  updateUserBio,
} from "../api/user";

export function useUserProfile(userId) {
  const queryClient = useQueryClient();

  // 프로필 조회
  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  });

  // 이름 변경
  const nameMutation = useMutation({
    mutationFn: ({ name }) => updateUserName({ userId, name }),
    onSuccess: (_, vars) => {
      queryClient.setQueryData(["userProfile", userId], (old) =>
        old ? { ...old, name: vars.name } : old
      );
    },
  });

  // 이메일 변경
  const emailMutation = useMutation({
    mutationFn: ({ email }) => updateUserEmail({ userId, email }),
    onSuccess: (_, vars) => {
      queryClient.setQueryData(["userProfile", userId], (old) =>
        old ? { ...old, email: vars.email } : old
      );
    },
  });

  // bio 변경
  const bioMutation = useMutation({
    mutationFn: ({ bio }) => updateUserBio({ userId, bio }),
    onSuccess: (_, vars) => {
      queryClient.setQueryData(["userProfile", userId], (old) =>
        old ? { ...old, bio: vars.bio } : old
      );
    },
  });

  const isUpdating =
    nameMutation.isPending || emailMutation.isPending || bioMutation.isPending;

  return {
    profile: data,
    isLoading,
    error,
    isUpdating,
    // mutateAsync 래핑해서 사용함
    updateName: (name) => nameMutation.mutateAsync({ name }),
    updateEmail: (email) => emailMutation.mutateAsync({ email }),
    updateBio: (bio) => bioMutation.mutateAsync({ bio }),
  };
}
