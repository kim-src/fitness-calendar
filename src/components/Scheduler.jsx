import React, { useState } from 'react';
import '../assets/css/editor.css'

// MyCalendar 컴포넌트로부터 전달되는 date, onClose, onSave props
// props (properties)= 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 사용
// props로 전달받은 데이터를 렌더링하는 과정 발생
function Scheduler({date, onClose, onSave}) {

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

    // 이벤트 발생 시 keyHandler 함수 실행
    const keyHandler = (e) => {
        // 엔터 입력 시 handleSave 함수 실행
        if(e.keyCode === 13) {
            handleSave();
        }
        if(e.keyCode === 27) {
            onClose();
        }
    }

    return (
        <div>
            <div className='editor-container'>
                <div className='editor-title'>{date}</div>
                {/* 사용자에게 내용 입력 기능 제공 */}
                <input
                    className='editor-input'
                    type="text"
                    // 자동으로 포커스 설정
                    autoFocus
                    // value에 title 할당
                    value={title}
                    // e = 이벤트 정보가 담긴 객체
                    // e.target = 이벤트가 발생한 DOM 요소
                    // e.target.value = 입력 필드의 현재 값
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="운동 루틴을 입력하세요."
                    onKeyDown={keyHandler}
                />
                {/* handleSave 함수에 데이터 저장 */}
                <button onClick={handleSave}>저장</button>
                {/* 에디터를 종료시키는 onClose 함수 호출 */}
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
}

export default Scheduler;
