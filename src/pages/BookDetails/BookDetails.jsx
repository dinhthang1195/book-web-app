import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchListsContainingABookQuery, useFetchEditionsInfoByWorkIDQuery } from "../../features/books/bookApiSlice";
import { SpinnerCircular } from "spinners-react";
import { getCurrentBookEditions, getCurrentEdition, updateCurrentBookReader } from "../../features/books/bookSlice";
import { useNavigate, useParams } from "react-router-dom";

function BookDetails() {
	const book = useSelector((state) => state.book.currentBook);
	const editions = useSelector((state) => state.book.currentBookEditions.entries);
	const { title, cover_img, authors, publish_year, edition_key, currentBook_readers } = book;
	const trimUser = (url) => url.replace("/people/", "").replace(/\/lists.*$/, "");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { work } = useParams();
	const [skipLists, setSkipLists] = useState(true);
	const [skipEditions, setSkipEditions] = useState(true);
	const ed_keys = edition_key.slice(0, 100);
	const { data, isSuccess, isError, isFetching, isLoading } = useFetchListsContainingABookQuery(ed_keys, { skipLists });
	const {
		data: dataEditions,
		isSuccess: isSuccessEditions,
		isError: isErrorEditions,
	} = useFetchEditionsInfoByWorkIDQuery({ work_id: work }, { skipEditions });

	const updateCurrentReaders = () => {
		setSkipLists((prev) => !prev);
		if (isError) {
			console.log("Something went wrong!");
		}
		if (isSuccess) {
			const readers = [];
			for (const item of data) {
				for (const entry of item.entries) {
					const reader = trimUser(entry.url);
					readers.push(reader);
				}
			}
			dispatch(updateCurrentBookReader(readers));
		}
	};

	const getCurrentEditions = () => {
		setSkipEditions((prev) => !prev);
		if (isErrorEditions) {
			console.log("Something went wrong!");
		}

		if (isSuccessEditions) {
			dispatch(getCurrentBookEditions(dataEditions));
		}
	};

	useEffect(() => {
		updateCurrentReaders();
		getCurrentEditions();
	}, [data, isSuccess, isSuccessEditions, isError, isFetching, isSuccessEditions]);

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

	const handleClick = (item) => {
		dispatch(getCurrentEdition(item));
		navigate(`./${item.key.replace("/books/", "")}`);
	};

	return (
		<section className="text-gray-700 body-font overflow-hidden bg-white md:min-w-full  ">
			<div className="container px-5 py-5 mx-auto">
				<div className=" sm:w-3/5 lg:w-4/5 mx-auto flex flex-wrap">
					<img alt="cover_img" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={cover_img} />
					<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{title}</h1>
						<h2 className="text-sm title-font text-gray-500 tracking-widest">By: {authors.join(", ")}</h2>
						<div className="flex items-center mb-3">
							<p className="text-gray-600">Publish year: {publish_year}</p>
						</div>
						<div className="flex items-center">
							<p className="text-gray-600">
								{currentBook_readers?.length > 0 && currentBook_readers?.length < 20 ? <span>Readers: {currentBook_readers.join(", ")}</span> : <></>}
								{currentBook_readers?.length > 20 ? <span>Readers: {currentBook_readers.slice(0, 20).join(", ") + " ..."}</span> : <></>}
								{currentBook_readers?.length === 0 ? <span>Readers: N/A </span> : <></>}
							</p>
						</div>
						<div className="flex items-center mt-10">
							<p className="text-gray-600 text-lg font-bold ">Available Editions:</p>
						</div>
						<div className="flex flex-col">
							<div className=" max-h-96 overflow-auto sm:-mx-6 lg:-mx-8">
								<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
									<div className="overflow-hidden">
										<table className="min-w-full text-center">
											<thead className="border-b bg-blue-300">
												<tr>
													<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
														Edition
													</th>
													<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
														Publish Year
													</th>
													<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
														No. of pages
													</th>
												</tr>
											</thead>
											<tbody>
												{editions?.length > 0 ? (
													<>
														{editions.map((item, index) => {
															return (
																<tr
																	onClick={() => handleClick(item)}
																	key={index}
																	className="border-b bg-blue-100 border-blue-200 hover:cursor-pointer hover:underline"
																>
																	<td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">{item.key.replace("/books/", "")}</td>
																	<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.publish_date}</td>
																	<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.number_of_pages}</td>
																</tr>
															);
														})}
													</>
												) : (
													<></>
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						;
					</div>
				</div>
			</div>
		</section>
	);
}

export default BookDetails;
