import React, { useState } from 'react';
import ItemEditor from './ItemEditor';

function FitnessItem({id, title, isDone, onUpdate, onToggle, onDelete}) {

    const [showItemEditor, setShowItemEditor] = useState(false);

    return (
        <div>
            <div
                className='fitness-item'
                onClick={() => setShowItemEditor(true)}
            >
                <input
                    type='checkbox'
                    checked={isDone}
                    onChange={onToggle}
                    style={{ marginRight: '5px' }}
                    onClick={(e) => e.stopPropagation()}
                />
                <span
                    style={{
                        textDecoration : isDone ? 'line-through' : 'none',
                        color : isDone ? 'gray' : ''
                    }}
                >{title}</span>
            </div>
            {showItemEditor &&
                <ItemEditor
                    id={id}
                    title={title}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onClose={() => setShowItemEditor(false)}
                />
            }
        </div>
    );
}

export default FitnessItem;
