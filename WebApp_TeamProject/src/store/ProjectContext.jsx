import { createContext } from "react";

/*
    ☆ 추가:
    프로젝트 데이터를 전역으로 공유하기 위한 Context

    사용 예시:

    const {
        projectData,
        setProjectData
    } = useContext(ProjectContext);
*/

export const ProjectContext = createContext(null);