import React, { useContext } from 'react';
import NoteItem from './NoteItem';
import AddNote from "./AddNote";
import NoteContext from '../Context/Notes/NoteContext';

const Notes = () => {
    const context = useContext(NoteContext); 
    const { notes } = context; 

    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="d-flex flex-wrap">
                    {notes.map((note) => (
                        <NoteItem key={note._id} note={note} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Notes;