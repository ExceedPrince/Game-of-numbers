import React, { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div id="notFound">
			<div id="notFound-inner">
				<h1>Oops! You seem to be lost.</h1>
				<p>If you want to go back to the main page, click on the link below:</p>
				<Link to='/'>Main page</Link>
			</div>
		</div>
	)
}