import React, { useContext } from 'react';
import NoteContext from '../Context/Notes/NoteContext';

const NoteItem = (props) => {
  const { note } = props;
  const { deleteNote } = useContext(NoteContext); // Get deleteNote function from context

  return (
    <div className="col-md-3 mb-4"> {/* Increased margin for better spacing */}
      <div className="card h-100 shadow-sm border-0"> {/* Added shadow and removed border */}
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3"> {/* Aligned icons */}
            <h5 className="card-title mb-0">{note.title}</h5> {/* Removed default margin from title */}
            <div>
              {/* Trash icon with delete functionality */}
              <i 
                className="fa-solid fa-trash text-danger me-2" 
                style={{ cursor: 'pointer' }} 
                onClick={() => deleteNote(note._id)} // Delete the note on click
              ></i> 

              {/* Edit icon */}
              <i className="fa-solid fa-pen-to-square text-primary" style={{ cursor: 'pointer' }}></i> 
            </div>
          </div>
          <p className="card-text text-muted">{note.description}</p> {/* Added muted text */}
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
