import { useCallback, useContext, useMemo, useState } from "react";
import { initialMembers, initialSchedules, projectManageMockData } from "../api/manageMock";
import { myProjects } from "../api/mockData";
import { AuthContext } from "./AuthContext";
import { ProjectManageDataContext } from "./projectManageDataContext";

// 프로젝트별 더미 데이터가 있으면 그 데이터를, 없으면 공통 기본 데이터를 사용
function createDefaultProjectManageData(projectId) {
    const projectMockData = projectManageMockData[projectId];

    return {
        members: [...(projectMockData?.members ?? initialMembers)],
        schedules: [...(projectMockData?.schedules ?? initialSchedules)],
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
    const [myProjectsData, setMyProjectsData] = useState(myProjects);

    const filteredMyProjectsData = useMemo(
        () =>
            myProjectsData.filter((project) => {
                if (!user) return false;
                // memberIds가 없는 목업 데이터는 모든 로그인 사용자에게 노출
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

            // 같은 id가 이미 있으면(예: 재참여) 새로 추가하지 않고 기존 항목에 덮어써 중복을 방지
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

    // 매칭 글이 삭제될 때 '진행중 프로젝트' 목록에서도 같은 id로 제거하기 위한 함수
    const removeMyProject = useCallback((projectId) => {
        setMyProjectsData((prevProjects) =>
            prevProjects.filter((project) => project.id !== projectId)
        );
    }, []);

    const getProjectManageData = useCallback(
        (projectId) => {
            const numericProjectId = normalizeProjectId(projectId);

            if (numericProjectId === null) {
                return createDefaultProjectManageData(numericProjectId);
            }

            return projectManageData[numericProjectId] || createDefaultProjectManageData(numericProjectId);
        },
        [projectManageData]
    );

    const updateProjectManageData = useCallback((projectId, updater) => {
        const numericProjectId = normalizeProjectId(projectId);

        if (numericProjectId === null) return;

        setProjectManageData((prev) => {
            const currentData =
                prev[numericProjectId] || createDefaultProjectManageData(numericProjectId);
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
            removeMyProject,
            getProjectManageData,
            updateProjectManageData,
        }),
        [
            addMyProject,
            removeMyProject,
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
