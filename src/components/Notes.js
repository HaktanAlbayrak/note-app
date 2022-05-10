import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, editNote } from "../store/projectStore";
import "../scss/notes.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Notes = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.projectSlice.items);

  const handleDelete = (id) => {
    if (window.confirm("emin misin?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <div className="app-container">
      <div className="app-siderbar-header">
        <h1 className="header-title">Notes</h1>
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
              <span
                onClick={() => handleDelete(item.id)}
                className="app-sidebar-title-button"
              >
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
            <p>{item.content && item.content.substr(0, 100) + "..."}</p>
            <small>
              {new Date(item.lastModified).toLocaleDateString("tr", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
