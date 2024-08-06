import React from 'react';

function FitnessItem({id, title}) {
    return (
        <div className='fitness-item'>
            <input
                type='checkbox'
                style={{ marginRight: '5px' }}
            />
            <span>{title}</span>
        </div>
    );
}

export default FitnessItem;
