import React, { Fragment, useEffect, useState } from 'react';
import '../assets/css/time.css'

function FitnessStopwatch({onClose}) {
    
    const [initialTime, setInitialTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // reset 함수 정의
    const reset = () => {
        // deliveredTime 초기화
        setInitialTime(0);
        // isActive 상태를 false로 전환
        setIsActive(false);
    };

    // toggle 함수 정의
    const toggle = () => {
        // 현재의 isActive 상태와 반대로 전환
        // 예를들어 현재 false인 경우 true로 전환
        setIsActive(!isActive);
    };

    // useEffect = 부수 효과(side effects) 수행 목적
    // 컴포넌트의 렌더링이 완료된 후 실행
    // 종속성 배열에 따라 실행 조건이 결정되는 것이 특징
    // 예를들면, 의존성을 부여한 것의 상태가 변경되면 실행
    useEffect(() => {
        // interval의 초기값을 null로 설정
        let interval = null;
        // 스톱워치를 실행하고 싶을 경우
        if(isActive) {
            interval = setInterval(() => {
                setInitialTime(initialTime => initialTime + 1);
            }, 1000);
        // 스톱워치 실행을 중지하고 싶을 경우
        } else if(!isActive && initialTime !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
        // isActive, initialTime 의존성 부여
        // isActive의 상태가 true에서 false로 전환 시 실행 중지
        // initialTime 값이 변경되면 useEffect 재실행
    }, [isActive, initialTime]);

    /* 스톱워치 숫자 표시 형식 */
    function formatTime(initialTime) {
        const hours = Math.floor(initialTime / 3600);
        // %로 나머지 계산
        const minutes = Math.floor((initialTime % 3600) / 60);
        // %로 나머지 계산
        const seconds = initialTime % 60;

        // 변수 선언을 최소화하기 위해 join 제외
        return (
            <Fragment>
                <div>{hours.toString().padStart(2, '0')}</div>
                <span className='colon'>:</span>
                <div>{minutes.toString().padStart(2, '0')}</div>
                <span className='colon'>:</span>
                <div>{seconds.toString().padStart(2, '0')}</div>
            </Fragment>
        )
    };

    const keyboardHandler = (e) => {
        if(e.keyCode === 27) {
            onClose();
        }
    };
    
    return (
        <div>
            <div className='time-place'>
                {/* 스톱워치 설정 영역 */}
                <div style={{display:'flex', justifyContent:'center'}}>
                    <button onClick={toggle}
                            autoFocus
                            onKeyDown={keyboardHandler}
                    >{isActive ? '정지' : '시작'}</button>
                </div>

                <br/>

                {/* 스톱워치 외부 영역 */}
                <div className='time-exterior'>
                    {/* 스톱워치 내부 영역 */}
                    <div className='time-interior'>{formatTime(initialTime)}</div>
                </div>

                <br/>

                {/* 스톱워치 footer 영역 */}
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button onClick={reset}
                            autoFocus
                            onKeyDown={keyboardHandler}
                    >리셋</button>
                    <span style={{marginRight:'15px'}}/>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default FitnessStopwatch;
