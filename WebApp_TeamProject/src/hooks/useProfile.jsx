import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";

function useProfile(user) {
    const [profile, setProfile] = useState({
        nickname: "",
        department: "",
        mbti: "",
        techStack: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            if (!user) return;

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
        if (!user) return;

        try {
            setLoading(true);

            const userRef = doc(db, "users", user.uid);

            await updateDoc(userRef, {
                nickname: profile.nickname,
                department: profile.department,
                mbti: profile.mbti,
                techStack: profile.techStack,
            });

            alert("프로필이 저장되었습니다.");
            return true;
        } catch (err) {
            console.log("프로필 저장 오류:", err);
            alert("프로필 저장 중 오류가 발생했습니다.");
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        profile,
        loading,
        handleChange,
        saveProfile,
    };
}

export default useProfile;