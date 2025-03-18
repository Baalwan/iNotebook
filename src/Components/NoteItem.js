import React, { useContext } from 'react';
import NoteContext from '../Context/Notes/NoteContext';
import './NoteItem.css'; // Import a custom CSS file for styling

const NoteItem = ({ note, setShowModal, setCurrentNote }) => {
  const { deleteNote } = useContext(NoteContext);

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm border-0 note-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0 note-title">{note.title}</h5>
            <div>
              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => deleteNote(note._id)}
                title="Delete Note"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setCurrentNote({
                    _id: note._id,
                    title: note.title,
                    description: note.description,
                    tag: note.tag,
                  });
                  setShowModal(true); // Show modal when edit is clicked
                }}
                title="Edit Note"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
          </div>
          <p className="card-text text-muted note-description">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
