import React, { useContext } from 'react';
import NoteContext from '../Context/Notes/NoteContext';

const Alert = () => {
    const { alert } = useContext(NoteContext);

    if (!alert.message) return null; // Don’t render if no message

    return (
        <div className={`alert alert-${alert.type || 'primary'}`} role="alert">
            {alert.message}
        </div>
    );
};

export default Alert;