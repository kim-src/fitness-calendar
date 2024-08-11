import React, { useEffect, useState } from 'react';

function FitnessTimer({onClose}) {
    
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(200);
    const [boxSize, setBoxSize] = useState({
                                    width : '400px',
                                    height : '200px',
                                });

    // toggle 함수 정의
    const toggle = () => {
        setIsActive(!isActive);
    }

    // reset 함수 정의
    const reset = () => {
        setSeconds(60);
        setIsActive(false);
    }

    useEffect(() => {
        // interval의 초기값을 null로 설정
        let interval = null;
        // 타이머가 실행하고 싶을 경우
        if(isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        // 타이머가 실행을 중지하고 싶을 경우
        } else if(!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
        // isActive, seconds에 의존성 부여
    }, [isActive, seconds]);

    // 비어있는 소괄호 = 실행될 예정이라는 의미
    const readyBoxSize = () => {
        // boxSize 객체에 할당된 초기값 수정
        setBoxSize(
            {
                // 현재까지의 boxSize 기준
                ...boxSize,
                // px 단위의 width 설정
                width : `${width}px`,
                // px 단위의 height 설정
                height : `${height}px`,
            }
        )
    }

    // 소괄호 안에 있는 e = 이벤트 핸들러 함수가 이벤트 발생 시 전달받는 객체
    const keyboardHandler = (e) => {
        // 키보드 엔터 입력 시
        if(e.keyCode === 13) {
            readyBoxSize();
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
                <div className='timerHandler' style={{display:'flex', justifyContent:'center'}}>
                    {/* 너비 설정 */}
                    <label htmlFor='width' style={{marginRight:'5px'}}>너비 :</label>
                    <input
                        id='width'
                        type='number'
                        value={width}
                        style={{width:'50px',height:'',textAlign:'center'}}
                        onChange={(e) => {setWidth(e.target.value)}}
                        placeholder='숫자 입력'
                        autoFocus
                        onKeyDown={keyboardHandler}
                    ></input>

                    <span style={{marginRight:'15px'}}/>

                    {/* 너비 설정 */}
                    <label htmlFor='height' style={{marginRight:'5px'}}>높이 :</label>
                    <input
                        id='height'
                        type='number'
                        value={height}
                        style={{width:'50px',height:'',textAlign:'center',marginRight:'15px'}}
                        onChange={(e) => {setHeight(e.target.value)}}
                        placeholder='숫자 입력'
                        onKeyDown={keyboardHandler}
                    ></input>
                    <button onClick={readyBoxSize}>타이머 생성</button>
                    <span style={{marginRight:'15px'}}/>
                    <button onClick={toggle}>{isActive ? '시작' : '정지'}</button>
                </div>

                <br/>

                {/* 타이머 표시 영역 */}
                <div className='timerMain' style={{display:'flex', justifyContent:'center'}}>
                    <div
                        style={{
                            ...boxSize,
                            borderRadius: '10px',
                            border: '1px solid black',
                            fontSize: '48px',
                        }}
                    >
                        {new Date(seconds * 1000).toISOString().substring(11, 19)}
                    </div>
                </div>

                <br/>

                {/* 타이머 footer 영역 */}
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button onClick={reset}>중지 / 리셋</button>
                    <span style={{marginRight:'15px'}}/>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default FitnessTimer;
