import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';

const LanguageSelect = ({ chosenLang, setChosenLang, showThankyou }) => {
	const [langOpen, setLangOpen] = useState(false);

	useEffect(() => {
		if (!chosenLang) {
			setChosenLang("English");
			localStorage.setItem("Lang", "English");
		}
	}, [])

	const changeLanguage = (language) => {
		setChosenLang(language);
		localStorage.setItem("Lang", language);
		setLangOpen(false);
		showThankyou();
	}

	const countries = ["English", "Deutsch", "Polski"];

	return (
		<div id="languageSelector">
			{chosenLang &&
				<div id="selectedLanguage" className={`${langOpen ? "langOpen" : ""}`} onClick={() => setLangOpen(!langOpen)}>
					<span className="flagContainer">
						<img src={`../../img/flags/${chosenLang}.png`} alt={chosenLang} />
					</span>
					<span className="flagName">
						{chosenLang}
					</span>
				</div>
			}
			<Fade top cascade duration={500} when={langOpen}>
				<div id="languageOptions" className={`${langOpen ? "clickable" : ""}`}>
					{countries.map((item, index) => (
						<div id={`country-${index}`} key={`country-${index}`} className="languageOption" onClick={() => changeLanguage(item)}>
							<span className="flagContainer">
								<img src={`../../img/flags/${item}.png`} alt={item} />
							</span>
							<span className="flagName">
								{item}
							</span>
						</div>
					))}
				</div>
			</Fade>
		</div>
	)
}

export default LanguageSelect;
