/*
    ☆ 추가:
    재사용 가능한 리스트 컴포넌트

    사용 예시
    1) 일정 출력
    <EditableList />
    2) 팀원 출력
    <EditableList />
    3) 공지 출력
    <EditableList />

    하나의 컴포넌트로
    여러 데이터를 출력하기 위해 생성
*/

function EditableList({
    title,
    items,
    renderItem,
}) {
    return (
    <div className="editable-list">

      {/* 리스트 제목 */}
        <h2>{title}</h2>

        {items.length === 0 ? (

        /*
        ☆ 추가:
        데이터가 없을 경우 안내 문구 출력
        */
        <p>등록된 데이터가 없습니다.</p>

        ) : (

        items.map((item, index) => (
            <div key={item.id}>
            {renderItem(item, index)}
            </div>
        ))

        )}
    </div>
    );
}

export default EditableList;