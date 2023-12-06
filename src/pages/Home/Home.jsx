import { Link } from "react-router-dom";
import styles from "./home.module.css";

function Home() {
	return (
		<div className={styles.container}>
			<div className="flex flex-col w-full justify-center items-center p-8">
				<h1 className="text-3xl md:text-5xl mb-5 text-blue-500 tracking-loose">Book Finder</h1>
				<h2 className="text-3xl md:text-5xl pr-0  mb-5">Find anything</h2>

				<Link
					to={"/books"}
					className="bg-transparent hover:bg-blue-400 text-blue-400 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-blue-300 hover:border-transparent"
				>
					Explore Now
				</Link>
			</div>
		</div>
	);
}

export default Home;
