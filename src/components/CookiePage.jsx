import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { TiTick } from "react-icons/ti";
import { AiOutlineStop } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { VscDebugContinue } from "react-icons/vsc";

import Alert from './Alert';
import LanguageSelect from './LanguageSelect';
import text from "../utils/translations.json";

const CookiePage = () => {
	const [acceptCookie, setAcceptCookie] = useState(false);
	const [delClicked, setDelClicked] = useState(0);
	const [alert, setAlert] = useState({ message: "", type: "" });
	const [wantToPlay, setWantToPlay] = useState(true);
	const [chosenLang, setChosenLang] = useState(localStorage.getItem("Lang") ? localStorage.getItem("Lang") : localStorage.setItem("Lang", "English"));
	const [showThanks, setshowThanks] = useState(false);

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

	const showThankyou = () => {
		setshowThanks(true);
		setTimeout(() => {
			setshowThanks(false);
		}, 5000);
	}

	return (
		<div id="preloadPage">
			{acceptCookie && localStorage.getItem("savedData") && wantToPlay && !localStorage.getItem("askedContinue") ?
				<div className='preloadContent'>
					<h1>Game of Numbers</h1>
					<p>{text[localStorage.getItem("Lang")].haveSavedData.question}</p>
					<div className='preloadbuttons'>
						<Link to="/game" state={{ saved: true, navigated: true }}>
							<button type='button' className="actionBtn" id="loadBtn"><TiTick className='svgIcons' /> {text[localStorage.getItem("Lang")].haveSavedData.yes}</button>
						</Link>
						<Link to="/game" state={{ saved: false, navigated: true }}>
							<button type='button' className="actionBtn" id="rejectAndNewBtn" onClick={() => localStorage.removeItem("savedData")}><AiOutlineStop className='svgIcons' /> {text[localStorage.getItem("Lang")].haveSavedData.no}</button>
						</Link>
					</div>
					<div className='preloadbuttons'>
						<button type='button' className="actionBtn" id="backToMainPageBtn" onClick={() => { setWantToPlay(false); localStorage.setItem("askedContinue", "true") }}><RxReset className='svgIcons' /> {text[localStorage.getItem("Lang")].haveSavedData.goBack}</button>
					</div>
				</div>
				:
				<div className='preloadContent'>
					<h1>Game of Numbers</h1>
					<span>{text[localStorage.getItem("Lang")].intro.chooseLanguage} <LanguageSelect chosenLang={chosenLang} setChosenLang={setChosenLang} showThankyou={showThankyou} /></span>
					<p>
						{text[localStorage.getItem("Lang")].intro.welcome}
						<br />
						{text[localStorage.getItem("Lang")].intro.acceptCookie}
					</p>
					<p>
						{text[localStorage.getItem("Lang")].intro.forRules.split("/").map((item, index) => {
							if (index === 1) {
								return <Link to="/rules" key={`rulesPart${index}`} className='link'>{item}</Link>
							} else {
								return item
							}
						})
						}
					</p>
					<p>{text[localStorage.getItem("Lang")].intro.haveFun}</p>
					{acceptCookie &&
						<Link to="/game" state={{ navigated: true }}>
							<button type='button' className="actionBtn" id="startNewBtn" onClick={() => localStorage.removeItem("askedContinue")}><TiTick className='svgIcons' /> {text[localStorage.getItem("Lang")].intro.startGame}</button>
						</Link>
					}
					{acceptCookie && localStorage.getItem("savedData") ?
						<Link to="/game" state={{ saved: true, navigated: true }}>
							<button type='button' className="actionBtn" id="continueBtn" onClick={() => localStorage.removeItem("askedContinue")}><VscDebugContinue className='svgIcons' /> {text[localStorage.getItem("Lang")].intro.continueGame}</button>
						</Link>
						: null
					}

					<button type='button' id="delScoreBtn" onClick={() => setDelClicked(prev => prev + 1)}><FaTrashAlt className='svgIcons' /> {text[localStorage.getItem("Lang")].intro.deleteScores}</button>
					{showThanks &&
						<div id="thankyou-message">{text[localStorage.getItem("Lang")].intro.thanks}</div>
					}
				</div>
			}
			<CookieConsent
				location="bottom"
				buttonText={text[localStorage.getItem("Lang")].intro.cookieButton}
				cookieName="TableGameCookie"
				style={{ background: "#d11780" }}
				buttonStyle={{ background: "rgb(255, 199, 121)", color: "#4e503b", fontSize: "13px" }}
				expires={150}
				onAccept={() => {
					setAcceptCookie(true)
				}}
			>
				{text[localStorage.getItem("Lang")].intro.cookieContent}
			</CookieConsent>
			{
				alert.message.length > 0 &&
				<Alert message={alert.message} type={alert.type} />
			}
		</div>
	)
}


export default CookiePage
