import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./pages/Home/Home";
import Sidebar, { SidebarItem } from "./components/SideBar/SideBar";
import { HomeIcon, SearchIcon } from "lucide-react";
import Search from "./pages/Search/Search";
import BookDetails from "./pages/BookDetails/BookDetails";
import NotFound from "./pages/NotFound/NotFound";
import EditionDetails from "./pages/EditionDetails/EditionDetails";

function App() {
	return (
		<main className="flex">
			<Sidebar>
				<SidebarItem navlink="/" icon={<HomeIcon />} size={20} text="Home" />
				<SidebarItem navlink="/books" icon={<SearchIcon />} size={20} text="Search" />
			</Sidebar>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/books">
					<Route index element={<Search />} />

					<Route path=":work">
						<Route index element={<BookDetails />} />
						<Route path=":edition" element={<EditionDetails />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</main>
	);
}

export default App;
