import React from 'react';
import '../assets/css/item-editor.css'

function ItemEditor({onClose}) {

    return (
        <div>
            <div className='item-container'>
                <button onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}>취소</button>
            </div>
        </div>
    );
}

export default ItemEditor;