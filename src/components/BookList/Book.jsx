import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeCurrentBook } from "../../features/books/bookSlice";

function Book(book) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { title, id, cover_img, authors, publish_year, edition_count, edition_key, isbn, lccn, oclc, goodreads } = book;
	const handleClick = () => {
		dispatch(
			storeCurrentBook({
				title,
				id,
				cover_img,
				authors,
				publish_year,
				edition_count,
				edition_key,
				isbn,
				lccn,
				oclc,
				goodreads,
			})
		);
		navigate(`/books/${id}`);
	};

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<img onClick={handleClick} src={cover_img} alt="Placeholder" className="w-full h-48 object-cover" />
			<div className="p-4">
				<h2 onClick={handleClick} className="text-lg font-semibold text-gray-800 hover:underline">
					{title.length < 35 ? title : title.slice(0, 35) + "..."}
				</h2>
				<div className="flex flex-col justify-between py-6">
					<div>
						<div className="text-sm text-gray-500 dark:text-gray-300">
							Authors:{" "}
							{authors?.length > 0 ? (
								<>
									<span>{authors.join(", ")}</span>
								</>
							) : (
								<span>N/A</span>
							)}
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-300">
							Publish Year: <span>{publish_year}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Book;
