import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/NavDropdown.css";

function PageDropdown() {
  const navigate = useNavigate(); // 특정 경로로 이동시켜주는 함수
  const location = useLocation(); // 현재 페이지의 경로를 가져옴

  // select에서 옵션 선택 시 실행되는 함수
  const handlePageChange = (e) => {
    const targetPath = e.target.value;
    // 값이 있을 때만 이동 (빈 값 방지)
    if (targetPath) {
      navigate(targetPath); // 선택한 경로로 페이지 이동
    }
  };

  return (
    <div className="page-dropdown-container">
      {/* value에 현재 경로를 바인딩하여 페이지 이동 후에도 드롭다운 표시가 유지되도록 함 */}
      <select 
        className="page-select" 
        value={location.pathname}  // 현재 경로와 일치하는 option이 자동 선택됨
        onChange={handlePageChange}
      >
        <option value="/">메인 페이지</option>
        <option value="/matching">매칭 페이지</option>
        <option value="/projectManage">프로젝트 관리 페이지</option>
      </select>
    </div>
  );
}

export default PageDropdown;