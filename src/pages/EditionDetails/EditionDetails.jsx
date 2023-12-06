import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchBooksByIdentifierQuery } from "../../features/books/bookApiSlice";
import { SpinnerCircular } from "spinners-react";
import { getCurrentIdentifiers } from "../../features/books/bookSlice";

function EditionDetails() {
	const book = useSelector((state) => state.book.currentEdition);
	const { title, isbn_13, isbn_10, oclc, lccn, olid } = book;
	const dispatch = useDispatch();
	const { isError, isSuccess, isFetching, isLoading, data } = useFetchBooksByIdentifierQuery({
		ISBN1: isbn_10 !== undefined ? isbn_10[0] : "",
		ISBN2: isbn_13 !== undefined ? isbn_13[0] : "",
		OCLC: oclc !== undefined ? oclc[0] : "",
		LCCN: lccn !== undefined ? lccn[0] : "",
		OLID: olid !== undefined ? olid[0] : "",
	});

	useEffect(() => {
		console.log("isbn_13", isbn_13);
		console.log("isbn_10", isbn_10);
		console.log("oclc", oclc);
		console.log("lccn", lccn);
		console.log("olid", olid);

		dispatch(getCurrentIdentifiers({ isbn_10, isbn_13, oclc, lccn, olid }));

		if (isError) {
			console.log("Something went wrong!");
		}
		if (isFetching || isLoading) {
			console.log("Loading");
		}
		if (isSuccess) {
			console.log("data", data);
		}
	}, []);

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
		<section className="text-gray-700 body-font overflow-hidden bg-white md:min-w-full  ">
			<div className="container px-5 py-5 mx-auto">
				<div className=" sm:w-3/5 lg:w-4/5 mx-auto flex flex-wrap">
					<img alt="cover_img" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" />
					<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{title}</h1>
						<h2 className="text-sm title-font text-gray-500 tracking-widest">By: </h2>

						<div className="flex items-center mb-3 mt-3">
							<p className="text-gray-600">Publish year: </p>
						</div>

						<div className="flex items-center">
							<p className="text-gray-600">pending...</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default EditionDetails;
