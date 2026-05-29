import { createContext, useContext, useState } from "react";
import { initialMembers, initialSchedules } from "../api/manageMock";
import { myProjects } from "../api/mockData";
import { AuthContext } from "./AuthContext";

const ProjectManageDataContext = createContext(null);

export function ProjectManageDataProvider({ children }) {
    const { user } = useContext(AuthContext);

    const [projectManageData, setProjectManageData] = useState({});
    const [myProjectsData, setMyProjectsData] = useState(myProjects);

    const filteredMyProjectsData = myProjectsData.filter((project) => {
        if (!user) return false;
        if (!project.memberIds) return false;

        return project.memberIds.includes(user.uid);
    });

    function addMyProject(project) {
        setMyProjectsData((prev) => [...prev, project]);
    }

    function getProjectManageData(projectId) {
        const numericProjectId = Number(projectId);

        return (
        projectManageData[numericProjectId] || {
            members: initialMembers,
            schedules: initialSchedules,
            voteList: [],
        }
        );
    }

    function updateProjectManageData(projectId, updater) {
        const numericProjectId = Number(projectId);

        setProjectManageData((prev) => {
            const currentData =
                prev[numericProjectId] || {
                    members: initialMembers,
                    schedules: initialSchedules,
                    voteList: [],
                };

            return {
                ...prev,
                [numericProjectId]: updater(currentData),
            };
        });
    }

    return (
        <ProjectManageDataContext.Provider
            value={{
                myProjectsData: filteredMyProjectsData,
                addMyProject,
                getProjectManageData,
                updateProjectManageData,
            }}
        >
            {children}
        </ProjectManageDataContext.Provider>
    );
}

export function useProjectManageData() {
    const context = useContext(ProjectManageDataContext);

    if (!context) {
        throw new Error(
        "useProjectManageData는 ProjectManageDataProvider 안에서만 사용해야 합니다."
        );
    }

    return context;
}