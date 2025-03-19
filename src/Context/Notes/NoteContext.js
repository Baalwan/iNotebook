import { createContext, useState } from "react";

const NoteContext = createContext();

const NoteState = ({ children }) => {
    const host = "http://localhost:5000"; 
    const [notes, setNotes] = useState([]); // ✅ Define state for notes    
};

export { NoteState };
export default NoteContext;

