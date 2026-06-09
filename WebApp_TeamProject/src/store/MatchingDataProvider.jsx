import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ProjectDataContext = createContext(null);

export function MatchingDataProvider({ children }) {
    // Client state is only for UI flow. Enforce real authorization in Firebase/server rules.
    const [matchingPostsData, setMatchingPostsData] = useState([]);
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
