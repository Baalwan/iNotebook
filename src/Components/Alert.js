import React, { useContext } from 'react';
import NoteContext from '../Context/Notes/NoteContext';
import './Alert.css'; // Import a custom CSS file for styling

const Alert = () => {
    const { alert } = useContext(NoteContext);

    if (!alert.message) return null; // Don’t render if no message

    return (
        <div className={`alert alert-${alert.type || 'primary'} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
};

export default Alert;
