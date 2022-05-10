import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, updateNote } from "../store/projectStore";
import "../scss/notes.scss";

const Notes = () => {
  const [activeNote, setActiveNote] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.projectSlice.items);

  const handleDelete = (id) => {
    if (window.confirm("emin misin?")) {
      dispatch(deleteNote(id));
    }
  };

  const handleEditNote = (id, title, content, lastModified, color) => {
    setActiveNote(id);
    dispatch(
      updateNote({
        id: id,
        title: title,
        content: content,
        lastModified: lastModified,
        color: color,
      })
    );
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
            className={`app-sidebar-note ${item.id === activeNote && "active"}`}
            style={{ backgroundColor: item.color }}
            onClick={() =>
              handleEditNote(
                item.id,
                item.title,
                item.content,
                item.lastModified,
                item.color
              )
            }
          >
            <div className="app-sidebar-notes-title">
              <h4>{item.title}</h4>
              <span
                onClick={() => handleDelete(item.id)}
                className="app-sidebar-title-button"
              >
                Sil
              </span>
            </div>
            <p>{item.content && item.content.substr(0, 50) + "..."}</p>
            <small>Son düzenleme: {item.lastModified}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
