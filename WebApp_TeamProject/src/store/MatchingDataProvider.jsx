import { useCallback, useMemo, useState } from "react";
import { matchingPosts } from "../api/mockData";
import { ProjectDataContext } from "./matchingDataContext";

export function MatchingDataProvider({ children }) {
    // Client state is only for UI flow. Enforce real authorization in Firebase/server rules.
    const [matchingPostsData, setMatchingPostsData] = useState(matchingPosts);
    const [matchingActiveCategories, setMatchingActiveCategories] = useState([]);
    const [matchingSearchTerm, setMatchingSearchTerm] = useState("");

    const addMatchingPost = useCallback((newPost) => {
        setMatchingPostsData((prevPosts) => [newPost, ...prevPosts]);
    }, []);

    const deleteMatchingPost = useCallback((postId) => {
        setMatchingPostsData((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
        );
    }, []);

    const joinMatchingProject = useCallback((postId, userId) => {
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
