import React from "react";

const LoadingIcon = () => {
    return (
    <span className="loadingIcon" >
        <svg viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="#005CB9" strokeWidth="8" />
        </svg>
    </span>)
}

export default React.memo(LoadingIcon);