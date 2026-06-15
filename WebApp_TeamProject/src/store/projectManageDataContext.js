import { createContext, useContext } from "react";

export const ProjectManageDataContext = createContext(null);

export function useProjectManageData() {
    const context = useContext(ProjectManageDataContext);

    if (!context) {
        throw new Error(
            "useProjectManageData must be used within ProjectManageDataProvider."
        );
    }

    return context;
}
