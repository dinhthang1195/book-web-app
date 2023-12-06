// eslint-disable-next-line react/prop-types
function SearchBar({ handleKeyDown }) {
	return (
		<form action="" className="relative ml-4 w-max my-3">
			<input
				onKeyDown={handleKeyDown}
				type="search"
				className=" cursor-pointer  h-12 w-12 rounded-full border bg-transparent pl-12 outline-none w-full focus:cursor-text focus:border-blue-500 focus:pl-16 focus:pr-4 duration-100 "
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-blue-500 peer-focus:stroke-blue-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth="2"
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		</form>
	);
}

export default SearchBar;
