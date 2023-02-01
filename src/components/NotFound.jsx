import React, { Link } from "react-router-dom";
import text from "../utils/translations.json";

export default function NotFound() {
	/* console.log(text[localStorage.getItem("Lang").wrongUrl.ops]) */
	console.log(text[localStorage.getItem("Lang")].wrongUrl.ops)
	return (
		<div id="notFound">
			<div id="notFound-inner">
				<h1>{text[localStorage.getItem("Lang")].wrongUrl.ops}</h1>
				<p>{text[localStorage.getItem("Lang")].wrongUrl.offer}</p>
				<Link to='/'>{text[localStorage.getItem("Lang")].wrongUrl.mainPage}</Link>
			</div>
		</div>
	)
}