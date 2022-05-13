import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import "../scss/text.scss";

import { saveNote } from "../store/projectStore";

const Text = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#44C767");

  const dispatch = useDispatch();

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
      setContent("");
    }
  };

  return (
    <div className="app-text-container">
      <div className="app-text-note-edit">
        <div className="input-form">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            autoFocus
            autoComplete="off"
            className="textInput"
            value={title}
            maxLength="20"
          />
          <label htmlFor="text" className="textInput-label">
            Title
          </label>
        </div>
        <div className="textarea-form">
          <textarea
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="textArea"
            value={content}
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
            <button onClick={handleSaveNoteButton} className="add-button">
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="app-text-note-preview">
        <h1 className="preview-title">{title}</h1>
        <br />
        <ReactMarkdown className="markdown-preview">{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Text;
