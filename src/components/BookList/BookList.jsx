import { useSelector } from "react-redux";
import Book from "./Book";

function BookList() {
	const books = useSelector((state) => state.book.books);
	let searchedBooks = [];

	if (books) {
		searchedBooks = books.map((bookItem) => {
			return {
				...bookItem,

				id: bookItem.id.replace("/works/", ""),
				cover_img: bookItem.cover_id
					? `https://covers.openlibrary.org/b/id/${bookItem.cover_id}-M.jpg`
					: "https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png",
			};
		});
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ml-4">
			{searchedBooks.length > 0 ? (
				<>
					{searchedBooks.map((item, index) => {
						return <Book key={index} {...item} />;
					})}
				</>
			) : (
				<></>
			)}
		</div>
	);
}

export default BookList;
