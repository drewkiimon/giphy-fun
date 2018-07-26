import React, { Component } from "react";
import "../Styles/GifViewer.css";

class GifViewer extends Component {
	render() {
		return (
			<div>
				<a href={this.props.url} target="_blank">
					<img
						title={this.props.title}
						key={this.props.keyyer}
						src={`https://i.giphy.com/${this.props.id}.gif`}
					/>
				</a>
			</div>
		);
	}
}

export default GifViewer;
