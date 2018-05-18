import React from 'react';
import './loading-icon.css'

function LoadingIcon (props) {
    return (
        <div className="loading-icon">
            <div id="loading-icon"><div id="loading-icon-inner"></div></div>
            <h3>Loading...</h3>
        </div>
    );
}

export default LoadingIcon;