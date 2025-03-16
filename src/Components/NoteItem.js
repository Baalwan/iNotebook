import React from 'react';

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3 mb-3 d-flex align-items-stretch"> {/* Added align-items-stretch */}
      <div className="card w-100"> {/* Added w-100 */}
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;