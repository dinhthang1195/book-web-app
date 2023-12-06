import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://openlibrary.org/" }),
	endpoints: (builder) => ({
		fetchBooks: builder.query({
			query: (arg) => {
				const { queryInput, page = 1, limit = 10 } = arg;
				return {
					url: `search.json?q=${queryInput}&page=${page}&limit=${limit}`,
					params: { queryInput, page, limit },
				};
			},
		}),
		fetchBooksByIdentifier: builder.query({
			query: (arg) => {
				const { ISBN1, ISBN2, OCLC, LCCN, OLID } = arg;
				return {
					url: `api/books?bibkeys=ISBN:${ISBN1},ISBN:${ISBN2},OCLC:${OCLC},LCCN:${LCCN},OLID:${OLID}&jscmd=details&format=json`,
					params: { ISBN1, ISBN2, OCLC, LCCN, OLID },
				};
			},
		}),
		fetchEditionsInfoByWorkID: builder.query({
			query: (arg) => {
				const { work_id } = arg;

				return {
					url: `https://openlibrary.org/works/${work_id}/editions.json`,
					params: { work_id },
				};
			},
		}),

		fetchListsContainingABook: builder.query({
			queryFn: (ed_keys) => {
				const promises = ed_keys.map((ed) => {
					return fetchListsContainingOneEdition(ed);
				});
				return Promise.all(promises).then((results) => {
					return { data: results };
				});
			},
		}),

		fetchWorkById: builder.query({
			query: (arg) => {
				const { work_id } = arg;
				return {
					url: `works/${work_id}.json`,
					params: { work_id },
				};
			},
		}),
	}),
});

async function fetchListsContainingOneEdition(ed) {
	const response = await fetch(`https://openlibrary.org/books/${ed}/lists.json`);
	return await response.json();
}

export const {
	useFetchBooksQuery,
	useFetchBooksByIdentifierQuery,
	useFetchListsContainingABookQuery,
	useFetchWorkByIdQuery,
	useFetchEditionsInfoByWorkIDQuery,
} = booksApiSlice;
