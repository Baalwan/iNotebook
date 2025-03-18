import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    
    const [notes, setNotes] = useState(notesInitial);
    const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" }); 
    const [showModal, setShowModal] = useState(false); 

    // ✅ Fetch all Notes (API Call)
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkM2VkZWYyYzBhNDdlYTI1MzFmOGY1In0sImlhdCI6MTc0MjI5Mzk2OX0.TZN0XGRZIfxjCKLUSLbVnltXatorf1Lh-CzM7MZSq6E"
                },
            });
            const json = await response.json();
            if (response.ok) {
                setNotes(json);
            } else {
                console.error("Failed to fetch notes:", json);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    // ✅ Add a Note (API Call)
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnotes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkM2VkZWYyYzBhNDdlYTI1MzFmOGY1In0sImlhdCI6MTc0MjI5Mzk2OX0.TZN0XGRZIfxjCKLUSLbVnltXatorf1Lh-CzM7MZSq6E"
                },
                body: JSON.stringify({ title, description, tag }),
            });

            const json = await response.json();
            setNotes([...notes, json]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    // ✅ Edit a Note (API Call)
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkM2VkZWYyYzBhNDdlYTI1MzFmOGY1In0sImlhdCI6MTc0MjI5Mzk2OX0.TZN0XGRZIfxjCKLUSLbVnltXatorf1Lh-CzM7MZSq6E"
                },
                body: JSON.stringify({ title, description, tag }),
            });
    
            if (response.ok) {
                const updatedNote = await response.json();
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note._id === id ? { ...note, title, description, tag } : note
                    )
                );
                setShowModal(false); // Close the modal
            } else {
                console.error("Failed to update note:", await response.json());
            }
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    // ✅ Delete a Note (API Call)
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkM2VkZWYyYzBhNDdlYTI1MzFmOGY1In0sImlhdCI6MTc0MjI5Mzk2OX0.TZN0XGRZIfxjCKLUSLbVnltXatorf1Lh-CzM7MZSq6E"
                },
            });

            if (response.ok) {
                setNotes(notes.filter((note) => note._id !== id));
            } else {
                console.error("Failed to delete note.");
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes, setCurrentNote, showModal, setShowModal }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
