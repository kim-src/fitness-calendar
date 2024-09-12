import React, { useState } from 'react';
import '../assets/css/editor.css';

function ItemEditor({id, title, date, onUpdate, onClose, onDelete}) {

    // 운동 내용 입력을 위한 useState 사용
    // title = FullCalendar의 내용 속성
    const [updatedTitle, setUpdatedTitle] = useState(title);

    // 저장 버튼 클릭 시 호출될 handleUpdate 함수 정의
    const handleUpdate = () => {
        // onUpdate에 업데이트 된 내용 전달
        onUpdate(updatedTitle);
        setUpdatedTitle('');
        onClose();
    }

    // 이벤트 발생 시 keyHandler 함수 실행
    const keyHandler = (e) => {
        // 엔터 입력 시 handleUpdate 함수 실행
        if(e.keyCode === 13) {
            handleUpdate();
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
                    value={updatedTitle}
                    // e = 이벤트 정보가 담긴 객체
                    // e.target = 이벤트가 발생한 DOM 요소
                    // e.target.value = 입력 필드의 현재 값
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    onKeyDown={keyHandler}
                />

                <button onClick={handleUpdate}>수정</button>
                <button onClick={() => onDelete(id)}>삭제</button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
}

export default ItemEditor;
