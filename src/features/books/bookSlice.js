import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
	name: "book",
	initialState: {
		books: [],

		currentBook: {
			title: "",
			id: "",
			cover_img: "",
			authors: [],
			publish_year: null,
			edition_count: null,
			isbn_10: null,
			isbn_13: null,
			lccn: null,
			oclc: null,
			goodreads: null,
			edition_key: [],
			currentBook_readers: [],
		},
		currentBookEditions: {},
		currentEdition: {},
		currentIdentifiers: [],
		// isbn_13: [""], isbn_10: [""], oclc: [""], lccn: [""], olid: [""]
	},
	reducers: {
		storeBook: (state, action) => {
			const { payload } = action;
			state.books = payload.books;
		},
		storeCurrentBook: (state, action) => {
			state.currentBook = action.payload;
		},
		updateCurrentBookReader: (state, action) => {
			state.currentBook.currentBook_readers = action.payload;
		},
		getCurrentBookEditions: (state, action) => {
			state.currentBookEditions = action.payload;
		},
		getCurrentEdition: (state, action) => {
			state.currentEdition = action.payload;
		},
		getCurrentIdentifiers: (state, action) => {
			state.currentIdentifiers = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { storeBook, storeCurrentBook, updateCurrentBookReader, getCurrentBookEditions, getCurrentEdition, getCurrentIdentifiers } =
	bookSlice.actions;

export default bookSlice.reducer;
