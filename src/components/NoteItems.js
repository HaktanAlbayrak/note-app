import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { deleteNote, editNote } from "../store/projectStore";

const NoteItems = ({ note }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <div
      key={note.id}
      className="app-sidebar-note"
      style={{ backgroundColor: note.color }}
    >
      <div className="app-sidebar-notes-title">
        <h4>{note.title}</h4>
        <div className="notes-buttons">
          <span
            // onClick={() => handleEdit(note.id)}
            className="app-sidebar-title-edit-button"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </span>
          <span
            onClick={() => handleDelete(note.id)}
            className="app-sidebar-title-delete-button"
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      </div>
      <p className="note-content">{note.content}</p>
      <small>{note.lastModified}</small>
    </div>
  );
};

export default NoteItems;
