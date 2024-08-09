import React, { useState } from 'react';

function FitnessTimer({onClose}) {

    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
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
            <div className='timerHandler'>
                <label htmlFor='width'>너비 : </label>
                <input
                    id='width'
                    type='number'
                    value={width}
                    style={{width:'50px',height:'',textAlign:'center'}}
                    onChange={(e) => {setWidth(e.target.value)}}
                ></input>
                <span style={{marginRight:'15px'}}/>
                <label htmlFor='height'>높이 : </label>
                <input
                    id='height'
                    type='number'
                    value={height}
                    style={{width:'50px',height:'',textAlign:'center'}}
                    onChange={(e) => {setHeight(e.target.value)}}
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
    );
}

export default FitnessTimer;