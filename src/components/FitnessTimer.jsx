import React, { useState } from 'react';

function FitnessTimer({onClose}) {

    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(200);
    const [boxSize, setBoxSize] = useState({
                                    width : '400px',
                                    height : '200px',
                                });

    const readyBoxSize = () => {
        setBoxSize(
            {
                ...boxSize,
                width : `${width}px`,
                height : `${height}px`,
            }
        )
    }

    const keyboardHandler = (e) => {
        if(e.keyCode === 13) {
            readyBoxSize();
        }
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
                <div className='timerHandler' style={{display:'flex', justifyContent:'center'}}>
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
                    <button >시작</button>
                    <span style={{marginRight:'15px'}}/>
                    <button >정지</button>                    
                </div>

                <br/>

                <div className='timerMain' style={{display:'flex', justifyContent:'center'}}>
                    <div
                        style={{
                            ...boxSize,
                            borderRadius: '10px',
                            border: '1px solid black'
                        }}
                    ></div>
                </div>

                <br/>

                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button >중지 / 리셋</button>
                    <span style={{marginRight:'15px'}}/>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default FitnessTimer;
