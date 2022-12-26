import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { TiTick } from "react-icons/ti";
import { AiOutlineStop } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

import Alert from './Alert';

const CookiePage = () => {
	const [acceptCookie, setAcceptCookie] = useState(false);
	const [delClicked, setDelClicked] = useState(0);
	const [alert, setAlert] = useState({ message: "", type: "" });

	useEffect(() => {
		if (document.cookie.indexOf("TableGameCookie=true") > -1) {
			setAcceptCookie(true);
		}
	}, [acceptCookie])

	useEffect(() => {
		if (alert.message.length > 0) {
			setTimeout(() => {
				setAlert({ message: "", type: "" })
			}, 5000);
		}
	}, [alert])

	useEffect(() => {
		const delBtn = document.querySelector("#delScoreBtn");

		if (delClicked === 3) {
			delBtn.classList.add("visible");

			setTimeout(() => {
				setDelClicked(0);
				delBtn.classList.remove("visible");
			}, 3000);
		}

		if (delClicked >= 4 && delBtn.classList.contains("visible")) {
			let thisCookie;

			if (document.cookie.indexOf("bestTableScore=") > -1) {
				thisCookie = document.cookie.split("; ").filter(item => item.indexOf("bestTableScore=") > -1)[0];

				document.cookie = thisCookie + "; expires=Sat, 20 Jan 1980 12:00:00 UTC";

				setAlert({ message: "Scores are successfully deleted!", type: "success" });
			}
		}
	}, [delClicked])

	return (
		<div id="preloadPage">
			{acceptCookie && localStorage.getItem("savedData") ?
				<div className='preloadContent'>
					<h1>Game of Numbers</h1>
					<p>You have saved data on this device. Would you like to continue that previous game?</p>
					<div className='preloadbuttons'>
						<Link to="/game" state={{ saved: true, navigated: true }}>
							<button type='button' className="actionBtn" id="loadBtn"><TiTick className='svgIcons' /> Yes</button>
						</Link>
						<Link to="/game" state={{ saved: false, navigated: true }}>
							<button type='button' className="actionBtn" id="rejectAndNewBtn" onClick={() => localStorage.removeItem("savedData")}><AiOutlineStop className='svgIcons' /> No, I start a new game</button>
						</Link>
					</div>
				</div>
				:
				<div className='preloadContent'>
					<h1>Game of Numbers</h1>
					<p>Welcome to the world of numbers!<br />Please, accept the cookies (if you still haven't) and head to the game!</p>
					<p>Click <Link to="/rules" className='link'>here</Link> to read a rules!</p>
					<p>Have fun!</p>
					{acceptCookie &&
						<Link to="/game" state={{ navigated: true }}>
							<button type='button' className="actionBtn" id="startNewBtn"><TiTick className='svgIcons' /> Start a new game</button>
						</Link>
					}
					<button type='button' id="delScoreBtn" onClick={() => setDelClicked(prev => prev + 1)}><FaTrashAlt className='svgIcons' /> Delete the scores</button>

				</div>
			}
			<CookieConsent
				location="bottom"
				buttonText="Ok, I understand"
				cookieName="TableGameCookie"
				style={{ background: "#d11780" }}
				buttonStyle={{ background: "rgb(255, 199, 121)", color: "#4e503b", fontSize: "13px" }}
				expires={150}
				onAccept={() => {
					setAcceptCookie(true)
				}}
			>
				This website uses cookies and stored data to enhance the user experience.
			</CookieConsent>
			{
				alert.message.length > 0 &&
				<Alert message={alert.message} type={alert.type} />
			}
		</div>
	)
}


export default CookiePage
