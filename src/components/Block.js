import React from 'react';

function Block({ icon, text, onClick, iconSize }) {
    const iconClass = iconSize === 'large' ? `${icon} large-icon` : icon;
    return (
        <div className="block" onClick={onClick}>
            <i className={iconClass}>
                
            </i>
            <div className="text">
                {text}
            </div>
        </div>
    );
}

export default Block;
