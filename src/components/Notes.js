import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchNote } from "../store/projectStore";
import "../scss/notes.scss";
import NoteItems from "./NoteItems";

const Notes = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.projectSlice.items);
  const search = useSelector((state) => state.projectSlice.search);
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
          maxLength="20"
          value={searchValue}
        />
      </div>
      <div className="app-sidebar-notes">
        {items.map((note, index) =>
          note.title.search(search) != -1 ||
          note.content.search(search) != -1 ? (
            <NoteItems key={index} note={note} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default Notes;
