import React, { useState } from 'react';
import ItemEditor from './ItemEditor';

function FitnessItem({title, isDone, onToggle}) {

    const [showItemEditor, setShowItemEditor] = useState(false);

    return (
        <div
            className='fitness-item'
            onClick={() => setShowItemEditor(true)}
        >
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
            {showItemEditor &&
                <ItemEditor
                    onClose={() => setShowItemEditor(false)}
                />
            }
        </div>
    );
}

export default FitnessItem;
