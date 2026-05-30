import { createContext, useContext, useState } from "react";
import { matchingPosts } from "../api/mockData";

const ProjectDataContext = createContext(null);

export function MatchingDataProvider({ children }) {
    const [matchingPostsData, setMatchingPostsData] = useState(matchingPosts);
    const [matchingActiveCategories, setMatchingActiveCategories] = useState([]);
    const [matchingSearchTerm, setMatchingSearchTerm] = useState("");

    return (
        <ProjectDataContext.Provider
            value={{
                matchingPostsData,
                setMatchingPostsData,
                matchingActiveCategories,
                setMatchingActiveCategories,
                matchingSearchTerm,
                setMatchingSearchTerm,
            }}
        >
            {children}
        </ProjectDataContext.Provider>
    );
}

export function useProjectData() {
    const context = useContext(ProjectDataContext);

    if (!context) {
        throw new Error("useProjectData는 ProjectDataProvider 안에서만 사용할 수 있습니다.");
    }

    return context;
}