import { useState } from "react";
import { ProjectContext } from "./ProjectContext";
import {
    projectInitialData,
} from "./initialData";

/*
    ☆ 추가:
    프로젝트 데이터를 전역으로 관리하는 Provider

    관리 데이터:
    - 팀원 목록
    - 일정 목록
    - 투표 목록

    장점:
    - 페이지 이동 시 유지
    - 다른 페이지에서도 접근 가능
    - 상태를 부모에서 관리
*/

export function ProjectProvider({ children }) {

    const [projectData, setProjectData] =
        useState(projectInitialData);

    return (
        <ProjectContext.Provider
            value={{
                projectData,
                setProjectData,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
}