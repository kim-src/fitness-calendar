import React, { Fragment, useEffect, useState } from 'react';
import '../assets/css/time.css'

function FitnessTimer({onClose}) {
    
    const [initialTime, setInitialTime] = useState('');
    const [deliveredTime, setDeliveredTime] = useState('');
    const [displayTime, setDisplayTime] = useState({hours:'',minutes:'',seconds:''})
    const [isActive, setIsActive] = useState(false);

    /* 타이머 시간 설정 */
    const readyTimer = () => {
        // initialTime 상태 변수에 할당된 초기값 수정
        setDeliveredTime(initialTime)
        // console.log('initialTIme : ', initialTime)
        // console.log('deliveredTime : ', deliveredTime)
    };

    // reset 함수 정의
    const reset = () => {
        // deliveredTime 초기화
        setDeliveredTime(initialTime);
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
        // 타이머를 실행하고 싶을 경우
        if(isActive) {
            interval = setInterval(() => {
                setDeliveredTime(deliveredTime => deliveredTime - 1);
            }, 1000);
        // 타이머 실행을 중지하고 싶을 경우
        } else if(!isActive && deliveredTime !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
        // isActive, deliveredTime 의존성 부여
        // isActive의 상태가 true에서 false로 전환 시 실행 중지
        // deliveredTime 값이 변경되면 useEffect 재실행
    }, [isActive, deliveredTime]);

    /* 타이머 숫자 표시 형식 */
    function formatTime(deliveredTime) {
        const hours = Math.floor(deliveredTime / 3600);
        // %로 나머지 계산
        const minutes = Math.floor((deliveredTime % 3600) / 60);
        // %로 나머지 계산
        const seconds = deliveredTime % 60;
    
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

    const handleInputTime = (e) => {
        const totalSeconds = parseInt(e.target.value, 10);
        setInitialTime(totalSeconds);

        // NaN = Not a Number = 숫자가 아닌 값
        if(!isNaN(totalSeconds)) {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            setDisplayTime({
                hours: hours.toString(),
                minutes: minutes.toString(),
                seconds: seconds.toString()
            });
        }
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
    };

    return (
        <div>
            <div className='time-place'>
                {/* 타이머 설정 영역 */}
                <div style={{display:'flex', justifyContent:'center'}}>
                    <input
                        id='timer'
                        type='number'
                        value={initialTime}
                        style={{width:'40px',textAlign:'center'}}
                        onChange={handleInputTime}
                        autoFocus
                        onKeyDown={keyboardHandler}
                    ></input>
                    <label htmlFor='timer' style={{marginRight: '1rem'}}>초
                        = {displayTime.hours}시간 {displayTime.minutes}분 {displayTime.seconds}초</label>
                    <button onClick={readyTimer}
                            autoFocus
                            onKeyDown={keyboardHandler}
                    >타이머 설정</button>
                    <span style={{marginRight:'1rem'}}/>
                    <button onClick={toggle}
                            autoFocus
                            onKeyDown={keyboardHandler}
                    >{isActive ? '정지' : '시작'}</button>
                </div>

                <br/>

                {/* 타이머 표시 영역 */}
                <div className='time-exterior'>
                    {/* 스톱워치 내부 영역 */}
                    <div className='time-interior'>{formatTime(deliveredTime)}</div>
                </div>

                <br/>

                {/* 타이머 footer 영역 */}
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

export default FitnessTimer;
