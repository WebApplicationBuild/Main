/*
// 로그인/회원가입 페이지에서 공통으로 사용하는 재사용 입력 컴포넌트 
로그인, 회원가입 페이지에서 사용(id, pw 사용)
*/
import { forwardRef } from "react";

 // 부모가 내부 input 태그에 직접 접근 불가능
const InputField = forwardRef(
    ({ label, type, name, value, onChange, placeholder }, ref) => {
    return (
        <div className="input-group">

        {label && (
            <label className="input-label">
                {label}
            </label>
        )}

        <input
            ref={ref}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="input-field"
        />
        </div>
    );
    }
);

export default InputField;