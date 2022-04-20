import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, addNote } from "../store/projectStore";
import "../scss/notes.scss";
import { nanoid } from "@reduxjs/toolkit";

const Notes = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.projectSlice.items);

  const handleDelete = (id) => {
    if (window.confirm("emin misin?")) {
      dispatch(deleteNote(id));
    }
  };

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const handleAdd = () => {
    dispatch(
      addNote({
        id: nanoid(),
        title: "Untitled Note",
        content: "",
        lastModified: date,
        color: "#3FC1C9",
      })
    );
  };

  const handleUpdate = () => {};

  return (
    <div className="app-container">
      <div className="app-siderbar-header">
        <h1 className="header-title">Notes</h1>
        <span onClick={handleAdd} className="header-add-button">
          Ekle
        </span>
      </div>
      <div className="app-sidebar-notes">
        {items.map((item) => (
          <div
            key={item.id}
            className="app-sidebar-note"
            style={{ backgroundColor: item.color }}
            onClick={handleUpdate}
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
