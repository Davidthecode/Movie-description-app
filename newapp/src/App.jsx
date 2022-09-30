import React, { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Results from "./components/Results";
import Detail from "./components/Detail";
import "./App.css";

function App() {
const [state, setState] = useState({
	s: "",
	results: [],
	selected: {},
});

const apiurl = "https://www.omdbapi.com/?apikey=a2526df0";

const searchInput = (e) => {
	let s = e.target.value
	let holdState = {...state, s: s}
	setState(holdState)
};

const search = (e) => {
	if (e.key === "Enter") {
	axios(apiurl + "&s=" + state.s).then(
		({ data }) => {
		let results = data.Search

		console.log(results);
		let holdState = {...state, results: results}
		setState(holdState)
	})
	}
}


const openDetail = (id) => {
	axios(apiurl + "&i=" + id).then(({ data }) => {
	let result = data;
	console.log(result)

	let holdState = {...state, selected: result}
	console.log(holdState)
	setState(holdState)
	});
};

const closeDetail = () => {

	let holdState = {...state, selected: {}}
	setState(holdState)
};

return (
	<div className="App">
	<header className="App-header">
		<h1>Movie Mania</h1>
	</header>
	<main>
		<Search searchInput={searchInput} search={search} />

		<Results results={state.results} openDetail={openDetail} />

		{typeof state.selected.Title != "undefined" ? (
		<Detail selected={state.selected} closeDetail={closeDetail} />
		) : (
		false
		)}
	</main>
	</div>
);
}

export default App;
