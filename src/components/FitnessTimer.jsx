import React, { useState } from 'react';

function FitnessTimer({onClose}) {

    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [boxSize, setBoxSize] = useState({
                                    width : '0px',
                                    height : '0px',
                                    backgroundColor : ''
                                });

    const goBoxSize = () => {
        setBoxSize(
            {
                ...boxSize,
                width : `${width}px`,
                height : `${height}px`,
                backgroundColor : 'red'
            }
        )
        console.log(width);
        console.log(height);
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
                    // z-index 값 조정
                    zIndex : 1500
                }}
            >
                <div className='timerHandler'>
                    <label htmlFor='width'>너비 : </label>
                    <input
                        id='width'
                        type='number'
                        value={width}
                        style={{width:'80px',height:'',textAlign:'center'}}
                        onChange={(e) => {setWidth(e.target.value)}}
                        placeholder='숫자 입력'
                    ></input>
                    <span style={{marginRight:'15px'}}/>
                    <label htmlFor='height'>높이 : </label>
                    <input
                        id='height'
                        type='number'
                        value={height}
                        style={{width:'80px',height:'',textAlign:'center'}}
                        onChange={(e) => {setHeight(e.target.value)}}
                        placeholder='숫자 입력'
                    ></input>
                    <span style={{marginRight:'15px'}}/>
                    <button onClick={goBoxSize}>타이머 면적 설정</button>
                    <br/>
                    <button onClick={onClose}>닫기</button>
                </div>
                <div className='timerMain'>
                    <div style={boxSize}/>
                </div>
            </div>
        </div>
    );
}

export default FitnessTimer;
