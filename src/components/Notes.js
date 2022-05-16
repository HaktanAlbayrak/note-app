import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchNote } from "../store/projectStore";
import "../scss/notes.scss";
import NoteItems from "./NoteItems";

const Notes = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.projectSlice.items);
  const filter = useSelector((state) => state.projectSlice.filter);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(searchNote(searchValue));
  }, [searchValue]);

  return (
    <div className="app-container">
      <div className="app-siderbar-header">
        <h1 className="header-title">Notes</h1>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search..."
          autoComplete="false"
          className="header-input"
          maxLength="25"
          value={searchValue}
        />
      </div>
      <div className="app-sidebar-notes">
        {items.map((note, index) =>
          note.title.search(filter) != -1 ||
          note.content.search(filter) != -1 ? (
            <NoteItems key={index} note={note} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default Notes;
