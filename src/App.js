import React, { Component } from "react";
import GifViewer from "./Components/GifViewer";
import axios from "axios";
import _ from "lodash";
import config from "./config";
import "./App.css";

const BASE_URL = "https://api.giphy.com/v1/gifs/search?api_key=";
const QUERY = "&q=";
const LIMITS = "&limit=50&offset=0&rating=G&lang=en";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: "",
			counter: 0,
			pastSearches: [],
			data: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleAxios = _.debounce(this.handleAxios.bind(this), 500);
	}

	componentDidMount() {
		console.log("Mounted");
	}

	handleAxios() {
		console.log("Request sent.");
		axios
			.get(
				`${BASE_URL}${config.apiKey}${QUERY}${this.state.searchTerm}${LIMITS}`
			)
			.then(result => {
				this.setState({ data: result.data.data });
				console.log(this.state.data);
			});
	}

	handleChange(event) {
		this.setState({ searchTerm: event.target.value });
		this.handleAxios();
	}

	render() {
		// Creating
		if (this.state.data) {
			var holder = {
				0: [],
				1: [],
				2: [],
				3: [],
				4: []
			};
			this.state.data.map((d, i) => {
				holder[i % 5] = [
					...holder[i % 5],
					<GifViewer
						keyyer={d.embed_url}
						id={d.id}
						url={d.bitly_url}
						title={d.title}
					/>
				];
			});
		}

		if (holder) {
			console.log("hold me", holder[0]);
		}

		return (
			<div className="container-fluid">
				<div className="row py-5 bg-success">
					<div className="col-8 offset-2">
						<h3 className="text-center">LET'S BREAK THE INTER-WEBZ</h3>
						<input
							type="text"
							className="form-control"
							value={this.state.searchTerm}
							onChange={this.handleChange}
							placeholder="Search"
						/>
					</div>
				</div>
				{this.state.data ? (
					<div className="row">
						<div className="col" id="gifCol0">
							{holder ? holder[0] : ""}
						</div>
						<div className="col" id="gifCol1">
							{holder ? holder[1] : ""}
						</div>
						<div className="col" id="gifCol2">
							{holder ? holder[2] : ""}
						</div>
						<div className="col" id="gifCol3">
							{holder ? holder[3] : ""}
						</div>
						<div className="col" id="gifCol4">
							{holder ? holder[4] : ""}
						</div>
					</div>
				) : (
					"Nothing yet"
				)}
			</div>
		);
	}
}

export default App;
