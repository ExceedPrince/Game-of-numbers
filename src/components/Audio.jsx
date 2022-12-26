import React, { useState, useEffect } from 'react';

import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { CgPlayButtonO, CgPlayStopO } from "react-icons/cg";

const Audio = (props) => {
	const [music, setMusic] = useState(null);
	const [play, setPlay] = useState(true);

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
		console.log(music);
		console.log(play);
	}, [music, play])

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

	return (
		<div id="musicContainer">
			<audio type="audio/mp3" id="bg-music" src={`../../songs/song_0${music}.mp3`} onEnded={() => nextSong()} />
			<div id="prev" className="audioBtns" onClick={() => changeMusic("prev")}><TbPlayerTrackPrev /></div>
			<div id="audioBtn" className="audioBtns" onClick={() => setPlay(!play)}>{play ? <CgPlayStopO /> : <CgPlayButtonO />}</div>
			<div id="next" className="audioBtns" onClick={() => changeMusic("next")}><TbPlayerTrackNext /></div>
		</div>
	);
}

export default Audio;