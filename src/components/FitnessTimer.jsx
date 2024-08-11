import React, { Fragment, useEffect, useState } from 'react';
import '../assets/css/fitness-timer.css'

function FitnessTimer({onClose}) {
    
    const [initialTime, setInitialTime] = useState(0);
    const [deliveredTime, setDeliveredTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    /* 타이머 시간 설정 */
    const readyTimer = () => {
        // initialTime 상태 변수에 할당된 초기값 수정
        setDeliveredTime(initialTime)
        // console.log('initialTIme : ', initialTime)
        // console.log('deliveredTime : ', deliveredTime)
    }

    // reset 함수 정의
    const reset = () => {
        // deliveredTime 초기화
        setDeliveredTime(initialTime);
        // isActive 상태를 false로 전환
        setIsActive(false);
    }

    // toggle 함수 정의
    const toggle = () => {
        // 현재의 isActive 상태와 반대로 전환
        // 예를들어 현재 false인 경우 true로 전환
        setIsActive(!isActive);
    }

    useEffect(() => {
        // interval의 초기값을 null로 설정
        let interval = null;
        // 타이머가 실행하고 싶을 경우
        if(isActive) {
            interval = setInterval(() => {
                setDeliveredTime(deliveredTime => deliveredTime - 1);
            }, 1000);
        // 타이머가 실행을 중지하고 싶을 경우
        } else if(!isActive && deliveredTime !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
        // isActive, seconds에 의존성 부여
    }, [isActive, deliveredTime]);

    /* 타이머 숫자 표시 형식 */
    function formatTime(deliveredTime) {
        // 시간의 경우 단순 나눗셈
        const hours = Math.floor(deliveredTime / 3600);
        // 분의 경우 몫 표시
        const minutes = Math.floor((deliveredTime % 3600) / 60);
        // 초의 경우 몫 표시
        const seconds = deliveredTime % 60;
    
        return (
            <Fragment>
                <div>{hours.toString().padStart(2, '0')}</div>
                <span className='colon'>:</span>
                <div>{minutes.toString().padStart(2, '0')}</div>
                <span className='colon'>:</span>
                <div>{seconds.toString().padStart(2, '0')}</div>
            </Fragment>
        )
    }
    
    // 소괄호 안에 있는 e = 이벤트 핸들러 함수가 이벤트 발생 시 전달받는 객체
    const keyboardHandler = (e) => {
        // 키보드 엔터 입력 시
        if(e.keyCode === 13) {
            readyTimer();
        }
        // 키보드 ESC 입력 시
        if(e.keyCode === 27) {
            onClose();
        }
    }

    return (
        <div>
            <div
                style={{
                    // 상단으로부터 20%, 좌측으로부터 50% 위치에 고정
                    position : 'absolute',
                    top: '20%',
                    left: '50%',
                    // 컴포넌트의 너비에 상관없이 항상 중앙에 위치하도록 설정
                    transform: 'translateX(-50%)',
                    background: 'white',
                    padding: '20px',
                    boxShadow: '0 2px 7px rgba(0,0,0,0.7)',
                    // z-index 값 조정
                    zIndex: 1000
                }}
            >
                {/* 타이머 설정 영역 */}
                <div style={{display:'flex', justifyContent:'center'}}>
                    <input
                        id='timer'
                        type='number'
                        value={initialTime}
                        style={{width:'50px',textAlign:'center'}}
                        onChange={(e) => {setInitialTime(e.target.value)}}
                        onKeyDown={keyboardHandler}
                        autoFocus
                    ></input>
                    <button onClick={readyTimer}>타이머 설정</button>
                    <span style={{marginRight:'15px'}}/>
                    <button onClick={toggle}>{isActive ? '정지' : '시작'}</button>
                </div>

                <br/>

                {/* 타이머 표시 영역 */}
                <div className='timerMain' style={{display:'flex', justifyContent:'center'}}>
                    <div
                        className='timerDisplay'
                        style={{
                            width: '1200px',
                            height: '200px',
                            borderRadius: '10px',
                            border: '1px solid black',
                        }}
                    >
                        {formatTime(deliveredTime)}
                    </div>
                </div>

                <br/>

                {/* 타이머 footer 영역 */}
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button onClick={reset}>리셋</button>
                    <span style={{marginRight:'15px'}}/>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default FitnessTimer;
