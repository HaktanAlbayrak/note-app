import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, searchNote, editNote } from "../store/projectStore";
import "../scss/notes.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Notes = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.projectSlice.items);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(id));
    }
  };

  const handleSearch = (value) => {
    dispatch(searchNote(value));
  };

  const handleEdit = (id) => {
    dispatch(editNote(id));
  };

  return (
    <div className="app-container">
      <div className="app-siderbar-header">
        <h1 className="header-title">Notes</h1>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          autoComplete="false"
          className="header-input"
          maxLength="20"
        />
      </div>
      <div className="app-sidebar-notes">
        {items.map((item) => (
          <div
            key={item.id}
            className="app-sidebar-note"
            style={{ backgroundColor: item.color }}
          >
            <div className="app-sidebar-notes-title">
              <h4>{item.title}</h4>
              <div className="notes-buttons">
                <span
                  onClick={() => handleEdit(item.id)}
                  className="app-sidebar-title-edit-button"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
                <span
                  onClick={() => handleDelete(item.id)}
                  className="app-sidebar-title-delete-button"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            </div>
            <p className="note-content">{item.content}</p>
            <small>{item.lastModified}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
