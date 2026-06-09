import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

const ProjectManageDataContext = createContext(null);

function createDefaultProjectManageData() {
    return {
        members: [],
        schedules: [],
        voteList: [],
    };
}

function normalizeProjectId(projectId) {
    const numericProjectId = Number(projectId);
    return Number.isFinite(numericProjectId) ? numericProjectId : null;
}

export function ProjectManageDataProvider({ children }) {
    const { user } = useContext(AuthContext);

    const [projectManageData, setProjectManageData] = useState({});
    const [myProjectsData, setMyProjectsData] = useState([]);

    const filteredMyProjectsData = useMemo(
        () =>
            myProjectsData.filter((project) => {
                if (!user) return false;
                if (!project.memberIds) return true;

                return project.memberIds.includes(user.uid);
            }),
        [myProjectsData, user]
    );

    const addMyProject = useCallback((project) => {
        setMyProjectsData((prevProjects) => {
            const existingProject = prevProjects.find(
                (prevProject) => prevProject.id === project.id
            );

            if (existingProject) {
                return prevProjects.map((prevProject) =>
                    prevProject.id === project.id
                        ? { ...prevProject, ...project }
                        : prevProject
                );
            }

            return [...prevProjects, project];
        });
    }, []);

    const getProjectManageData = useCallback(
        (projectId) => {
            const numericProjectId = normalizeProjectId(projectId);

            if (numericProjectId === null) {
                return createDefaultProjectManageData();
            }

            return projectManageData[numericProjectId] || createDefaultProjectManageData();
        },
        [projectManageData]
    );

    const updateProjectManageData = useCallback((projectId, updater) => {
        const numericProjectId = normalizeProjectId(projectId);

        if (numericProjectId === null) return;

        setProjectManageData((prev) => {
            const currentData =
                prev[numericProjectId] || createDefaultProjectManageData();
            const nextData =
                typeof updater === "function" ? updater(currentData) : updater;

            return {
                ...prev,
                [numericProjectId]: {
                    ...currentData,
                    ...nextData,
                },
            };
        });
    }, []);

    const value = useMemo(
        () => ({
            myProjectsData: filteredMyProjectsData,
            addMyProject,
            getProjectManageData,
            updateProjectManageData,
        }),
        [
            addMyProject,
            filteredMyProjectsData,
            getProjectManageData,
            updateProjectManageData,
        ]
    );

    return (
        <ProjectManageDataContext.Provider value={value}>
            {children}
        </ProjectManageDataContext.Provider>
    );
}

export function useProjectManageData() {
    const context = useContext(ProjectManageDataContext);

    if (!context) {
        throw new Error(
            "useProjectManageData must be used within ProjectManageDataProvider."
        );
    }

    return context;
}
