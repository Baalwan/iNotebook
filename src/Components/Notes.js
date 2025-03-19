import React, { useContext, useEffect, useState } from 'react';
import NoteItem from './NoteItem';
import AddNote from "./AddNote";
import NoteContext from '../Context/Notes/NoteContext';
import EditModal from './editModal';
import './Notes.css'; // Import a custom CSS file for styling
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate('/login'); // Redirect to login if no token
        }
    }, [getNotes, navigate]); // Dependencies fixed

    const [showModal, setShowModal] = useState(false);
    const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" });

    return (
        <>
            <AddNote />
            <div className="container my-3">
                <h1 className="notes-title">Your Notes</h1>
                {notes.length > 0 ? (
                    <div className="d-flex flex-wrap justify-content-start">
                        {notes.map((note) => (
                            <NoteItem
                                key={note._id}
                                note={note}
                                setShowModal={setShowModal}
                                setCurrentNote={setCurrentNote}
                            />
                        ))}
                    </div>
                ) : (
                    <h2 className="no-notes-message">You have no notes to display</h2>
                )}
            </div>
            {/* Render the modal here and control visibility */}
            {showModal && (
                <EditModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    currentNote={currentNote}
                    setCurrentNote={setCurrentNote}
                />
            )}
        </>
    );
};

export default Notes;