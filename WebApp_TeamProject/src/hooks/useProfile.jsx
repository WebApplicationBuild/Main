import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { useToast } from "../contexts/ToastContext";

function useProfile(user, onProfileUpdate) {
    const showToast = useToast();
    const [profile, setProfile] = useState({
        nickname: "",
        department: "",
        mbti: "",
        techStack: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            if (!user) return;

            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();

                    setProfile({
                        nickname: data.nickname || "",
                        department: data.department || "",
                        mbti: data.mbti || "",
                        techStack: data.techStack || "",
                    });
                }
            } catch (err) {
                console.error("프로필 정보를 불러오지 못했습니다:", err);
                setError("프로필 정보를 불러오지 못했습니다.");
            }
        }

        fetchProfile();
    }, [user]);

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
