import React, { useState } from 'react';

// MyCalendar 컴포넌트로부터 전달되는 date, onClose, onSave props
// props (properties)= 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 사용
// props로 전달받은 데이터를 렌더링하는 과정 발생
function Editor({date, onClose, onSave}) {

    // 운동 내용 입력을 위한 useState 사용
    // title = FullCalendar의 내용 속성
    const [title, setTitle] = useState('');

    // 저장 버튼 클릭 시 호출될 handleSave 함수 정의
    const handleSave = () => {
        // title의 상태를 onSave 함수에 전달
        onSave(title);
        // title 상태 전달 후 입력 필드 초기화
        setTitle('');
    }

    return (
        <div>
            <div
                style={{
                    // 상단으로부터 20%, 좌측으로부터 50% 위치에 고정
                    position : 'absolute',
                    top : '20%',
                    left : '50%',
                    // 컴포넌트의 너비에 상관없이 항상 중앙에 위치하도록 설정
                    transform : 'translateX(-50%)',
                    background : 'white',
                    padding : '20px',
                    boxShadow : '0 2px 7px rgba(0,0,0,0.7)',
                    // z-index 값을 최대치로 설정하여 상위 요소로 설정
                    zIndex : 1000
                }}
            >
                {/* MyCalendar 컴포넌트의 date */}
                <h2 style={{textAlign:'center'}}>{date}</h2>
                {/* 사용자에게 내용 입력 기능 제공 */}
                <input
                    type="text"
                    value={title}
                    // e = 이벤트 정보가 담긴 객체
                    // e.target = 이벤트가 발생한 DOM 요소
                    // e.target.value = 입력 필드의 현재 값
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="운동 루틴을 입력하세요."
                ></input>
                {/* handleSave 함수에 데이터 저장 */}
                <button onClick={handleSave}>저장</button>
                {/* 에디터를 종료시키는 onClose 함수 호출 */}
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
}

export default Editor;
