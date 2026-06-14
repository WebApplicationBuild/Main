import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUserDisplayName } from "../utils/userDisplayName";

const ProjectDataContext = createContext(null);

export function MatchingDataProvider({ children }) {
    const { user, userInfo } = useContext(AuthContext);

    // Client state is only for UI flow. Enforce real authorization in Firebase/server rules.
    const [matchingPostsData, setMatchingPostsData] = useState([]);
    const [matchingActiveCategories, setMatchingActiveCategories] = useState([]);
    const [matchingSearchTerm, setMatchingSearchTerm] = useState("");

    // 프로필 닉네임이 저장/수정되면 사용자가 작성한 게시글의 표시 이름도 함께 갱신한다.
    useEffect(() => {
        if (!user) return;

        const userDisplayName = getUserDisplayName(user, userInfo);

        setMatchingPostsData((prevPosts) => {
            let hasChanged = false;

            const nextPosts = prevPosts.map((post) => {
                let postChanged = false;
                const nextPost = { ...post };

                if (post.authorId === user.uid && post.author !== userDisplayName) {
                    nextPost.author = userDisplayName;
                    postChanged = true;
                    hasChanged = true;
                }

                if (post.ownerId === user.uid && post.ownerName !== userDisplayName) {
                    nextPost.ownerName = userDisplayName;
                    postChanged = true;
                    hasChanged = true;
                }

                return postChanged ? nextPost : post;
            });

            return hasChanged ? nextPosts : prevPosts;
        });
    }, [user, userInfo]);

    const addMatchingPost = useCallback((newPost) => {
        // 새 글은 최신 프로젝트와 매칭 목록 양쪽에서 바로 보이도록 맨 앞에 추가한다.
        setMatchingPostsData((prevPosts) => [newPost, ...prevPosts]);
    }, []);

    const deleteMatchingPost = useCallback((postId) => {
        setMatchingPostsData((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
        );
    }, []);

    const joinMatchingProject = useCallback((postId, userId) => {
        // 같은 사용자가 중복 참여하지 않도록 memberIds를 기준으로 검사한다.
        setMatchingPostsData((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id !== postId) {
                    return post;
                }

                const memberIds = post.memberIds || [];

                // 이미 참여한 멤버가 다시 누르면 appliedMembers가 중복 증가하지 않도록 무시
                if (!userId || memberIds.includes(userId)) {
                    return post;
                }

                return {
                    ...post,
                    memberIds: [...memberIds, userId],
                    appliedMembers: (post.appliedMembers || 0) + 1,
                };
            })
        );
    }, []);

    const toggleMatchingCategory = useCallback((category) => {
        setMatchingActiveCategories((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((item) => item !== category)
                : [...prevCategories, category]
        );
    }, []);

    const updateMatchingSearchTerm = useCallback((searchTerm) => {
        setMatchingSearchTerm(searchTerm);
    }, []);

    const value = useMemo(
        () => ({
            matchingPostsData,
            matchingActiveCategories,
            matchingSearchTerm,
            addMatchingPost,
            deleteMatchingPost,
            joinMatchingProject,
            toggleMatchingCategory,
            updateMatchingSearchTerm,
        }),
        [
            matchingPostsData,
            matchingActiveCategories,
            matchingSearchTerm,
            addMatchingPost,
            deleteMatchingPost,
            joinMatchingProject,
            toggleMatchingCategory,
            updateMatchingSearchTerm,
        ]
    );

    return (
        <ProjectDataContext.Provider value={value}>
            {children}
        </ProjectDataContext.Provider>
    );
}

export function useProjectData() {
    const context = useContext(ProjectDataContext);

    if (!context) {
        throw new Error("useProjectData must be used within MatchingDataProvider.");
    }

    return context;
}
