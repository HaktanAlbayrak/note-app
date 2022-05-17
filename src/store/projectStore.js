import { createSlice, nanoid } from "@reduxjs/toolkit";

export const projectStoreSlice = createSlice({
  name: "notes",
  initialState: {
    items: localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : [],
    edit: [],
    filter: "",
  },
  reducers: {
    saveNote: {
      reducer: (state, action) => {
        state.items.push(action.payload);
        localStorage.setItem("notes", JSON.stringify(state.items));
      },
      prepare: ({ title, content, color, lastModified }) => {
        return {
          payload: {
            id: nanoid(),
            title: title,
            content: content,
            color: color,
            lastModified: lastModified,
          },
        };
      },
    },
    saveEditedNote: {
      reducer: (state, action) => {
        const { id, title, content, color, lastModified } = action.payload;
        const editedNote = state.items.find((item) => item.id === id);

        editedNote.title = title;
        editedNote.content = content;
        editedNote.color = color;
        editedNote.lastModified = lastModified;

        state.edit = [];
        localStorage.setItem("notes", JSON.stringify(state.items));
      },
    },
    deleteNote: {
      reducer: (state, action) => {
        const id = action.payload;
        const filtered = state.items.filter((item) => item.id !== id);
        state.items = filtered;
        localStorage.setItem("notes", JSON.stringify(state.items));
      },
    },
    searchNote: {
      reducer: (state, action) => {
        state.filter = action.payload.toLowerCase();
      },
    },
    editNote: {
      reducer: (state, action) => {
        const id = action.payload;
        state.edit = [...state.items];
        state.edit = state.edit.find((item) => item.id === id);
      },
    },
  },
});

export const { saveNote, deleteNote, searchNote, editNote, saveEditedNote } =
  projectStoreSlice.actions;

export default projectStoreSlice.reducer;
