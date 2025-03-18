import { createContext, useState } from "react";

const NoteContext = createContext();

const NoteState = ({ children }) => {
    const host = "http://localhost:5000"; // Your API URL
    const [notes, setNotes] = useState([]); // ✅ Define state for notes

    // Function to get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkNGY5OTJiOWY2MWE0ZGRjODIxYjI3In0sImlhdCI6MTc0MjI2NzE1MiwiZXhwIjoxNzQyMjcwNzUyfQ.GcwAhubt840CGuItq2DLuwqpz0dvUrh2VucF1TnxJ_w"
            },
        });
        const json = await response.json();
        setNotes(json); // ✅ Update state with fetched notes
    };

    // Function to update a note
    const updateNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkNGY5OTJiOWY2MWE0ZGRjODIxYjI3In0sImlhdCI6MTc0MjI2NzE1MiwiZXhwIjoxNzQyMjcwNzUyfQ.GcwAhubt840CGuItq2DLuwqpz0dvUrh2VucF1TnxJ_w"
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const json = await response.json();
        
        // ✅ Update notes in state
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note._id === id ? { ...note, title, description, tag } : note
            )
        );
    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, getNotes, updateNote }}>
            {children}
        </NoteContext.Provider>
    );
};

export { NoteState };
export default NoteContext;

