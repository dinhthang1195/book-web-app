import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/books/bookSlice";
import { booksApiSlice } from "../features/books/bookApiSlice";

export const store = configureStore({
	reducer: {
		[booksApiSlice.reducerPath]: booksApiSlice.reducer,
		book: bookReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApiSlice.middleware),
});
