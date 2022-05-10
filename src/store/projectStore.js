import { createSlice } from "@reduxjs/toolkit";

export const projectStoreSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
    updatedNote: [],
  },
  reducers: {
    addNote: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
    },
    deleteNote: {
      reducer: (state, action) => {
        const id = action.payload;
        const filtered = state.items.filter((item) => item.id !== id);
        state.items = filtered;
      },
    },
    updateNote: {
      reducer: (state, action) => {
        const { id, title, content, color } = action.payload;

        const existingNote = state.items.find((item) => item.id === id);

        if (existingNote) {
          existingNote.title = title;
          existingNote.content = content;
          existingNote.color = color;
          state.updatedNote = existingNote;
        }
      },
    },
  },
});

export const { addNote, deleteNote, updateNote } = projectStoreSlice.actions;

export default projectStoreSlice.reducer;
