# Main 설명
메인 레포  
Project name: WebApp_TeamProject  
Package name: webapp-teamproject // 소문자로 작성  
Freamwork -> React  
Variant -> JavaScript  

# 사용법
## 최초 clone시
1. cd {프로젝트 주소}    // 프로젝트 주소를 지정해 설치해야함  
2. npm install         // 해당 프로젝트 실행에 필요한 라이브러리 자동설치코드 <- clone하면 라이브러리는 자동 다운 안되니 package 수정할 때마다 동기화를 위해 필수적으로 실행  
3. npm run dev         // 로컬서버 생성 <- 'npm start'과 동일한 명령어  

// 기존 CRA(create-react-app)와 사용법 동일  
// 하지만 몇몇 점에서 기존 CRA와 차이점이 있으니 chat gpt나 검색을 통해 숙지 바람!  
// + node_modules 수정금지  

# 브랜치 설명 및 커밋시 주의사항
## 브랜치 설명
main        # 배포  
develop     # 개발 통합  
feature/... # 기능 개발 -> ex) feature/login    ex)feature/signup
=> develop의 하위브랜치로 생성하고, 기능마다 위 예시처럼 브랜치를 생성할 것

## comit 메세지 규칙
{추가 및 수정 카테고리}: {커밋 관련 내용 작성}  

ex) feature: 로그인 기능 추가  
    fix: 회원가입 버그 수정  
    style: 코드 정리  

# src 디렉터리 설명
src/  
 ├── assets/        # 이미지, 폰트  
 ├── components/    # 공통 컴포넌트  
 ├── pages/         # 페이지 단위  
 ├── hooks/         # 커스텀 훅  
 ├── api/           # API 요청  
 ├── store/         # 상태관리 (zustand 등)  
 ├── utils/         # 함수 모음  
 ├── styles/        # 전역 스타일  
 ├── App.css  
 ├── App.jsx  
 ├── index.css  
 └── main.jsx  
