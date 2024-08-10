import React from 'react';

function FitnessItem({title, isDone, onToggle}) {
    return (
        <div className='fitness-item'>
            <input
                type='checkbox'
                checked={isDone}
                onChange={onToggle}
                style={{ marginRight: '5px' }}
            />
            <span
                style={{
                    textDecoration : isDone ? 'line-through' : 'none',
                    color : isDone ? 'gray' : ''
                }}
            >{title}</span>
        </div>
    );
}

export default FitnessItem;
