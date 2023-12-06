import { useEffect, useState } from "react";
import BookList from "../../components/BookList/BookList";

import styles from "./search.module.css";
import { useFetchBooksQuery } from "../../features/books/bookApiSlice";
import { useDispatch } from "react-redux";
import { storeBook } from "../../features/books/bookSlice";
import SearchBar from "../../components/SearchBar/SearchBar";
import { SpinnerCircular } from "spinners-react";

function Search() {
	const [searchInput, setSearchInput] = useState("pokemon");
	const dispatch = useDispatch();
	const [skip, setSkip] = useState(true);
	const { data, isSuccess, isFetching, isLoading, isError } = useFetchBooksQuery(
		{
			queryInput: searchInput,
		},
		{ skip }
	);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			setSkip((prev) => !prev);
			setSearchInput(e.target.value);
		}
	};

	useEffect(() => {
		if (isError) {
			console.log("Something went wrong!");
		}

		if (isSuccess && data.docs.length > 0) {
			const newBooks = data.docs.map((bookSingle) => {
				const { key, author_name, cover_i, first_publish_year, title, edition_key, edition_count, isbn, lccn, oclc, goodreads } = bookSingle;

				return {
					id: key,
					authors: author_name,
					cover_id: cover_i,
					publish_year: first_publish_year,
					title: title,
					edition_count: edition_count,
					edition_key: edition_key,
					isbn,
					lccn: lccn,
					oclc: oclc,
					goodreads: goodreads,
				};
			});

			dispatch(storeBook({ books: newBooks }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, setSearchInput, dispatch]);

	if (isError) {
		return (
			<div>
				<div className={styles.container}>
					<div>
						<SearchBar handleKeyDown={handleKeyDown} />
					</div>
					<div className="ml-4">
						<h2>Something went wrong...</h2>
					</div>
				</div>
			</div>
		);
	}

	if (isFetching || isLoading) {
		return (
			<div className=" w-screen mt-10 ">
				<div className="grid items-center justify-center">
					<SpinnerCircular color="#87CEEB" />
				</div>
				<div className="grid items-center justify-center">
					<p className="text-lg font-bold">Now Loading ...</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className={styles.container}>
				<div>
					<SearchBar handleKeyDown={handleKeyDown} />
				</div>
				<div>
					<BookList />
				</div>
			</div>
		</div>
	);
}

export default Search;
