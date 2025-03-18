import { useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";

const EditModal = ({ showModal, setShowModal, currentNote, setCurrentNote }) => {
    const { editNote } = useContext(NoteContext); // Get updateNote function from context

    if (!showModal) return null; // Don't render modal if showModal is false

    const handleClick = (e) => {
        e.preventDefault(); // Prevent form submission default behavior

        // Call updateNote function to save changes
        editNote(currentNote._id, currentNote.title, currentNote.description, currentNote.tag);
        
        setShowModal(false);
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Note</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={currentNote.title}
                                    onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    value={currentNote.description}
                                    onChange={(e) => setCurrentNote({ ...currentNote, description: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tag</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={currentNote.tag}
                                    onChange={(e) => setCurrentNote({ ...currentNote, tag: e.target.value })}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
