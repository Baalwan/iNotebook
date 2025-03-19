import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    
    const [notes, setNotes] = useState(notesInitial);
    const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" }); 
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState({ message: "", type: "" }); // Add alert state

    // Function to set alert with a timeout to clear it
    const showAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => {
            setAlert({ message: "", type: "" });
        }, 3000); // Clear alert after 3 seconds
    };

    // Fetch all Notes (API Call)
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
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

    // Add a Note (API Call)
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnotes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag }),
            });

            const json = await response.json();
            if (response.ok) {
                setNotes([...notes, json]);
                showAlert("Note added successfully!", "success");
            } else {
                showAlert("Failed to add note.", "danger");
            }
        } catch (error) {
            console.error("Error adding note:", error);
            showAlert("Error adding note.", "danger");
        }
    };

    // Edit a Note (API Call)
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
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
                setShowModal(false);
                showAlert("Note updated successfully!", "success");
            } else {
                console.error("Failed to update note:", await response.json());
                showAlert("Failed to update note.", "danger");
            }
        } catch (error) {
            console.error("Error updating note:", error);
            showAlert("Error updating note.", "danger");
        }
    };

    // Delete a Note (API Call)
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
            });

            if (response.ok) {
                setNotes(notes.filter((note) => note._id !== id));
                showAlert("Note deleted successfully!", "success");
            } else {
                console.error("Failed to delete note.");
                showAlert("Failed to delete note.", "danger");
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            showAlert("Error deleting note.", "danger");
        }
    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes, setCurrentNote, showModal, setShowModal, alert, showAlert }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;