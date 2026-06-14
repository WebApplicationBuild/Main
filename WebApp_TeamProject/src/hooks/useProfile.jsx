import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { useToast } from "../contexts/ToastContext";

function useProfile(user, userInfo, onProfileUpdate) {
    const showToast = useToast();
    const [profile, setProfile] = useState({
        nickname: "",
        department: "",
        mbti: "",
        techStack: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // AuthProvider가 로그인 시점에 이미 받아온 userInfo를 그대로 반영한다.
    // 여기서 다시 Firestore를 조회하면 페이지 이동 때마다 빈 값 -> 실제 값으로
    // 한 박자 늦게 바뀌는 깜빡임이 생긴다.
    useEffect(() => {
        if (!userInfo) return;

        setProfile({
            nickname: userInfo.nickname || "",
            department: userInfo.department || "",
            mbti: userInfo.mbti || "",
            techStack: userInfo.techStack || "",
        });
    }, [userInfo]);

    function handleChange(e) {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function saveProfile() {
        if (!user) return false;

        try {
            setLoading(true);
            setError("");

            const nextProfile = {
                nickname: profile.nickname.trim(),
                department: profile.department.trim(),
                mbti: profile.mbti.trim(),
                techStack: profile.techStack.trim(),
            };

            const userRef = doc(db, "users", user.uid);

            await setDoc(userRef, nextProfile, { merge: true });
            setProfile(nextProfile);
            onProfileUpdate?.(nextProfile);

            showToast("프로필이 저장되었습니다.", "success");
            return true;
        } catch (err) {
            console.error("프로필 저장 오류:", err);
            setError("프로필 저장 중 오류가 발생했습니다.");
            showToast("프로필 저장 중 오류가 발생했습니다.", "error");
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        profile,
        loading,
        error,
        handleChange,
        saveProfile,
    };
}

export default useProfile;
