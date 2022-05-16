import { createSlice, nanoid } from "@reduxjs/toolkit";

export const projectStoreSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
    search: "",
    // oldItems: [{}],
    noteEdit: [],
    // showNote: {
    //   state: false,
    //   index: 0,
    //   searching: false,
    // },
    editingNote: {
      state: false,
      index: 0,
      editing: false,
    },
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
    searchNote: {
      reducer: (state, action) => {
        //   if (!state.showNote.searching) {
        //     state.oldItems = [...state.items];
        //     state.showNote.searching = true;
        //   }
        //   state.items = state.items.filter((item) =>
        //     item.title.toLowerCase().includes(action.payload.toLowerCase())
        //   );
        //   if (action.payload.length === 0) {
        //     state.items = state.oldItems;
        //     state.showNote.searching = false;
        //   }
        state.search = action.payload.toLowerCase();
      },
    },
    editNote: {
      reducer: (state, action) => {
        const id = action.payload;
        if (!state.editingNote.editing) {
          state.noteEdit = [...state.items];
          state.editingNote.editing = true;
        }
        state.noteEdit = state.noteEdit.find((item) => item.id === id);
        // state.items = state.oldItems;
        // state.editingNote.editing = false;
      },
    },
  },
});

export const { saveNote, deleteNote, searchNote, editNote } =
  projectStoreSlice.actions;

export default projectStoreSlice.reducer;
