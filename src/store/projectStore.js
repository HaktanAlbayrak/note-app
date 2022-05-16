import { createSlice, nanoid } from "@reduxjs/toolkit";

export const projectStoreSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
    olditems: [],
    edit: [],
    search: "",
  },
  reducers: {
    saveNote: {
      reducer: (state, action) => {
        state.items.push(action.payload);
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
        state.edit = action.payload;
        let editedNote = [state.edit];
        state.items = [...editedNote];
        state.edit = [];
      },
    },
    deleteNote: {
      reducer: (state, action) => {
        const id = action.payload;
        const filtered = state.items.filter((item) => item.id !== id);
        state.items = filtered;
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
