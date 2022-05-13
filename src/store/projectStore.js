import { createSlice, nanoid } from "@reduxjs/toolkit";

export const projectStoreSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
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
    deleteNote: {
      reducer: (state, action) => {
        const id = action.payload;
        const filtered = state.items.filter((item) => item.id !== id);
        state.items = filtered;
      },
    },
  },
});

export const { saveNote, deleteNote } = projectStoreSlice.actions;

export default projectStoreSlice.reducer;
