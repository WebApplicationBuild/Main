import { createContext, useContext } from "react";

export const ProjectDataContext = createContext(null);

export function useProjectData() {
    const context = useContext(ProjectDataContext);

    if (!context) {
        throw new Error("useProjectData must be used within MatchingDataProvider.");
    }

    return context;
}
