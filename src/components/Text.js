import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import "../scss/text.scss";

import { saveNote, saveEditedNote } from "../store/projectStore";

const Text = () => {
  const edit = useSelector((state) => state.projectSlice.edit);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#44C767");

  const [updateTitleValue, setUpdateTitleValue] = useState(edit.title);
  const [updateContentValue, setUpdateContentValue] = useState(edit.content);

  const dispatch = useDispatch();

  useEffect(() => {
    setUpdateContentValue(edit.content);
    setUpdateTitleValue(edit.title);
  }, [edit]);

  const date = new Date().toLocaleString();

  const handleSaveNoteButton = (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      alert("Lütfen tüm alanları doldur!");
    } else {
      dispatch(
        saveNote({
          title,
          content,
          lastModified: date,
          color,
        })
      );
      setTitle("");
      setUpdateTitleValue("");
      setContent("");
      setUpdateContentValue("");
    }
  };

  const handleSaveEditedNoteButton = (e) => {
    dispatch(
      saveEditedNote({
        id: edit.id,
        title: updateTitleValue,
        content: updateContentValue,
        lastModified: date,
        color,
      })
    );

    setTitle("");
    setUpdateTitleValue("");
    setContent("");
    setUpdateContentValue("");
  };

  return (
    <div className="app-text-container">
      <div className="app-text-note-edit">
        <div className="input-form">
          <input
            onChange={(e) => {
              if (edit.id) {
                setUpdateTitleValue(e.target.value);
              } else {
                setTitle(e.target.value);
              }
            }}
            type="text"
            autoFocus
            autoComplete="off"
            className="textInput"
            value={edit.id ? updateTitleValue : title}
            maxLength="25"
          />
          <label htmlFor="text" className="textInput-label">
            Title
          </label>
        </div>
        <div className="textarea-form">
          <textarea
            onChange={(e) => {
              if (edit.id) {
                setUpdateContentValue(e.target.value);
              } else {
                setContent(e.target.value);
              }
            }}
            className="textArea"
            value={edit.id ? updateContentValue : content}
          />
          <label htmlFor="text" className="textarea-label">
            Text
          </label>
        </div>
        <div className="buttons">
          <div className="color-select-form">
            <div className="colors">
              <input
                type="radio"
                style={{ backgroundColor: "#44C767" }}
                name="color"
                value="#44C767"
                defaultChecked={true}
                onClick={(e) => setColor(e.target.value)}
              />
              <input
                type="radio"
                style={{ backgroundColor: "#FC5185" }}
                name="color"
                value="#FC5185"
                onClick={(e) => setColor(e.target.value)}
              />
              <input
                type="radio"
                style={{ backgroundColor: "#AA96DA" }}
                name="color"
                value="#AA96DA"
                onClick={(e) => setColor(e.target.value)}
              />
              <input
                type="radio"
                style={{ backgroundColor: "#F07B3F" }}
                name="color"
                value="#F07B3F"
                onClick={(e) => setColor(e.target.value)}
              />
              <input
                type="radio"
                style={{ backgroundColor: "#FFDE7D" }}
                name="color"
                value="#FFDE7D"
                onClick={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div className="app-add-button">
            {edit.id ? (
              <button
                onClick={handleSaveEditedNoteButton}
                className="save-button"
              >
                Save
              </button>
            ) : (
              <button onClick={handleSaveNoteButton} className="add-button">
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="app-text-note-preview">
        <h1 className="preview-title">{edit.id ? updateTitleValue : title}</h1>
        <br />
        <ReactMarkdown className="markdown-preview">
          {edit.id ? updateContentValue : content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Text;
