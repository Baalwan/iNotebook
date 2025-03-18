import React, { useContext, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import './AddNote.css'; 

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!note.title || !note.description) {
      alert("Title and Description are required!");
      return;
    }
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };

  return (
    <div className="add-note-container">
      <h1 className="add-note-title">Add a Note</h1>
      <form className="add-note-form">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            placeholder="Enter note title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            placeholder="Enter note description"
            rows="4"
          />
        </div>
        <button type="submit" onClick={handleClick} className="btn btn-primary btn-add-note">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
