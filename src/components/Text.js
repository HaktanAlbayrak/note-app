import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import "../scss/text.scss";

import { addNote } from "../store/projectStore";

const Text = () => {
  const updatedNote = useSelector((state) => state.projectSlice.updatedNote);

  const [id] = useState(updatedNote.id);
  const [title, setTitle] = useState(updatedNote?.title || "");
  const [content, setContent] = useState(updatedNote?.content || "");
  const [color, setColor] = useState("#3FC1C9");

  const dispatch = useDispatch();

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}, ${current.getHours()}:${current.getMinutes()}`;

  const handleSaveNoteButton = (e) => {
    e.preventDefault();

    if (title === "" && content === "") {
      alert("Lütfen alanları doldurun");
    } else {
      dispatch(
        addNote({
          id: nanoid(),
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
            key={id}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            autoFocus
            autoComplete="off"
            className="textInput"
            placeholder=" "
            value={title}
          />
          <label htmlFor="text" className="textInput-label">
            Not Başlığı
          </label>
        </div>
        <div className="textarea-form">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            className="textArea"
            value={content}
          ></textarea>
          <label htmlFor="text" className="textarea-label">
            Not
          </label>
        </div>
        <div className="buttons">
          <div className="color-select-form">
            <div className="colors">
              <input
                type="radio"
                style={{ backgroundColor: "#3FC1C9" }}
                name="color"
                value="#3FC1C9"
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
              Kaydet
            </button>
          </div>
        </div>
      </div>
      <div className="app-text-note-preview">
        <h1 className="preview-title">{title}</h1>
        <ReactMarkdown className="markdown-preview">{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Text;
