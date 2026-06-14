import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { initialMembers, initialSchedules, projectManageMockData } from "../api/manageMock";
import { myProjects } from "../api/mockData";
import { AuthContext } from "./AuthContext";
import { getUserDisplayName } from "../utils/userDisplayName";

const ProjectManageDataContext = createContext(null);

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
    const { user, userInfo } = useContext(AuthContext);

    const [projectManageData, setProjectManageData] = useState({});
    const [myProjectsData, setMyProjectsData] = useState([]);

    // 프로필이 뒤늦게 생성되어도 기존 프로젝트 팀원 목록의 내 이름을 최신값으로 맞춘다.
    useEffect(() => {
        if (!user) return;

        const userDisplayName = getUserDisplayName(user, userInfo);

        setProjectManageData((prevData) => {
            let hasChanged = false;

            const nextData = Object.fromEntries(
                Object.entries(prevData).map(([projectId, data]) => {
                    const nextMembers = (data.members || []).map((member) => {
                        if (member.id !== user.uid || member.name === userDisplayName) {
                            return member;
                        }

                        hasChanged = true;
                        return {
                            ...member,
                            name: userDisplayName,
                        };
                    });

                    return [
                        projectId,
                        {
                            ...data,
                            members: nextMembers,
                        },
                    ];
                })
            );

            return hasChanged ? nextData : prevData;
        });
    }, [user, userInfo]);

    const filteredMyProjectsData = useMemo(
        () =>
            // 로그인한 사용자가 memberIds에 포함된 프로젝트만 "내 프로젝트"로 보여준다.
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

            // 잘못된 URL 파라미터가 들어와도 화면이 깨지지 않도록 빈 기본값을 반환한다.
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

export function useProjectManageData() {
    const context = useContext(ProjectManageDataContext);

    if (!context) {
        throw new Error(
            "useProjectManageData must be used within ProjectManageDataProvider."
        );
    }

    return context;
}
