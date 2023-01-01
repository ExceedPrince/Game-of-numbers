import React, { useState, useEffect, useLayoutEffect } from 'react';

import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { CgPlayButtonO, CgPlayStopO } from "react-icons/cg";
import { BsMusicNoteList } from "react-icons/bs";
import { MdMusicOff } from "react-icons/md";

const Audio = (props) => {
	const [music, setMusic] = useState(null);
	const [play, setPlay] = useState(true);
	const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
	const [isMobile, setIsMobile] = useState(navigator.userAgent.toLowerCase().indexOf("mobile") > -1 || window.innerWidth < 768);
	const [musicOpen, setMusicOpen] = useState(false);

	useEffect(() => {
		setMusic(props.src);
	}, [])


	useEffect(() => {
		if (play === true) {
			const playAttempt = setInterval(() => {
				document.getElementById("bg-music").play()
					.then(() => {
						/* setPlay(true); */
						clearInterval(playAttempt);
					})
					.catch(error => {
						console.log('Unable to play the video, User has not interacted yet.');
					});
			}, 500);
		} else {
			document.getElementById("bg-music").currentTime = 0;
			document.getElementById("bg-music").pause();
		}
	}, [play, music])

	useEffect(() => {
		if (navigator.userAgent.toLowerCase().indexOf("mobile") > -1 || window.innerWidth < 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [size])

	const nextSong = () => {
		if (music < 6) {
			setMusic(prev => prev + 1);
		} else {
			setMusic(1);
		}
	}

	const changeMusic = (command) => {
		if (command === "prev") {
			if (music > 1) {
				setMusic(prev => prev - 1);
			} else {
				setMusic(6);
			}
		} else {
			nextSong();
		}
	}

	(function useWindowSize() {
		useLayoutEffect(() => {
			function updateSize() {
				setSize([window.innerWidth, window.innerHeight]);
			}
			window.addEventListener('resize', updateSize);
			updateSize();
			return () => window.removeEventListener('resize', updateSize);
		}, []);
	})();

	return (
		<div id="musicContainer" className={`${isMobile ? "mobile" : ""} ${musicOpen ? "open" : ""}`}>
			<audio type="audio/mp3" id="bg-music" src={`../../songs/song_0${music}.mp3`} onEnded={() => nextSong()} />
			<div id="prev" className="audioBtns" onClick={() => changeMusic("prev")}><TbPlayerTrackPrev /></div>
			<div id="audioBtn" className="audioBtns" onClick={() => setPlay(!play)}>{play ? <CgPlayStopO /> : <CgPlayButtonO />}</div>
			<div id="next" className="audioBtns" onClick={() => changeMusic("next")}><TbPlayerTrackNext /></div>
			{isMobile ? (
				<div id="audioCallBtn" className={musicOpen ? "open" : ""} onClick={() => setMusicOpen(!musicOpen)}>{!musicOpen ? <BsMusicNoteList /> : <MdMusicOff />}</div>
			)
				: null}
		</div>
	);
}

export default Audio;