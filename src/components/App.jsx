import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Zoom from 'react-reveal/Zoom';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { RxReset } from "react-icons/rx";
import { TbZoomQuestion } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { RiSave3Fill } from "react-icons/ri";
import { GoChecklist } from "react-icons/go";
import { MdArrowBack } from "react-icons/md";

import Alert from './Alert';
import { createNumbers } from '../utils/createNumbers';
import { generateRandomLetter } from '../utils/generateRandomLetter';
import { compareSearch } from '../utils/compareSearch';
import { giveHint } from '../utils/giveHint';
import { temporaryTestArray } from '../utils/temporaryTestArray';
import text from "../utils/translations.json";

const App = () => {
  const [mainArr, setMainArr] = useState();
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [chosenArr, setChosenArr] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState({ user: "", point: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [isFinished, setisFinished] = useState(false);
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  const [mobileWork, setMobileWork] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSubmitted(false);

    if (location.state && location.state.saved && localStorage.getItem("savedData") && localStorage.getItem("savedScore")) {
      const fromLocalStorage = JSON.parse(localStorage.getItem("savedData"));
      setMainArr(fromLocalStorage);
      setScore(JSON.parse(localStorage.getItem("savedScore")));
    } else {
      setMainArr(createNumbers());
      /* setMainArr(temporaryTestArray); */
    }

    if (document.cookie.indexOf("bestTableScore") > -1) {
      const scoreCookie = document.cookie.split(";").filter(item => item.split("=")[0].indexOf("bestTableScore") > -1)[0].split("=")[1];
      setBestScore({ user: scoreCookie.split("+")[0], point: +scoreCookie.split("+")[1] });
    }

    if (document.cookie.indexOf("TableGameCookie=true") === -1 || !location.state || (location.state && !location.state.navigated)) {
      return navigate("/");
    }

    if (navigator.userAgent.toLowerCase().indexOf("mobile") > -1) {
      if (size[0] < 768) {
        setMobileWork("false");
      }

      if (size[0] >= 768 || size[0] > size[1]) {
        setMobileWork("true");
      }

    } else {
      if (size[0] < 768) {
        setMobileWork("uncertain");
      }
    }
  }, [])

  useEffect(() => {
    if (mainArr) {

      if (mainArr.length > 50) {
        document.querySelector("body .app").classList.add("extended");
      }

      const checkArr = mainArr.filter(obj => obj.isActive === true);

      if (checkArr.length === 0) {
        setAlert({ message: text[localStorage.getItem("Lang")].alertText.win, type: "success" });
        setisFinished(true);
      }
      localStorage.removeItem("savedData");
      localStorage.removeItem("savedScore");
    }
  }, [mainArr])

  useEffect(() => {
    if (alert.message.length > 0) {
      setTimeout(() => {
        setAlert({ message: "", type: "" })
      }, 5000);
    }
  }, [alert])

  useEffect(() => {
    if (chosenArr.length === 2) {
      if (chosenArr[0].id === chosenArr[1].id) {
        document.querySelector(`#${chosenArr[0].id}`).classList.remove("selected");
        setChosenArr([]);
        return;
      }

      if (chosenArr[0].value === chosenArr[1].value || chosenArr[0].value + chosenArr[1].value === 10) {
        const sortedChosenArr = chosenArr.sort((a, b) => a.orderIndex - b.orderIndex);

        const result = compareSearch(sortedChosenArr, mainArr, setChosenArr, setMainArr, setScore);
        if (result) {
          result.map(item => {
            setMainArr(prevState => {
              const newState =
                prevState.map(object => {
                  if (object.id === item.id) {
                    return item;
                  }
                  return object;
                });
              return newState;
            })
          })
        }
      } else {
        setTimeout(() => {
          chosenArr.forEach(element => {
            document.querySelector(`#${element.id}`).classList.remove("selected");
          })
          setChosenArr([]);
        }, 200);
      }
    }
  }, [chosenArr])

  useEffect(() => {
    if (mobileWork === "false") {
      if (size[0] >= 768 || size[0] > size[1]) {
        setMobileWork("true");
      }
    } else if (mobileWork !== "false") {
      if (size[0] < 768) {
        if (navigator.userAgent.toLowerCase().indexOf("mobile") > -1) {
          if (size[0] > size[1]) {
            setMobileWork("true");
          } else {
            setMobileWork("false");
          }
        } else {
          setMobileWork("uncertain");
        }
      } else {
        setMobileWork(null);
      }
    }
  }, [size])

  useEffect(() => {
    const audioCallBtn = document.querySelector("#audioCallBtn");

    if (audioCallBtn) {
      if ((mobileWork && mobileWork === "false") || (mobileWork && mobileWork === "uncertain")) {
        audioCallBtn.classList.add("d-none");
      }

      if ((mobileWork && mobileWork === "true") || !mobileWork) {
        audioCallBtn.classList.remove("d-none");
      }
    }
  }, [mobileWork])

  const addToGrid = (state) => {
    let index = -1;
    const filteredArr = state.map((item) => {
      if (item.isActive === true) {
        index++;
        const object = { id: generateRandomLetter() + uuidv4(), orderIndex: state.length + index, isActive: true, value: item.value };

        return object;
      } else {

        return null;
      }
    });

    setMainArr(state.concat(filteredArr.filter(obj => obj !== null)));
    setScore(prev => prev + 3);
  }

  const resetGrid = () => {
    document.querySelector("body .app").classList.remove("extended");

    const leftSelected = document.querySelector(".selected");
    if (leftSelected) {
      leftSelected.classList.remove("selected");
    }
    setChosenArr([]);
    setScore(0);
    setMainArr(createNumbers());

    if (mobileWork === "true") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const choseGrid = (itemId, itemValue, targetId, targetValue) => {
    if (itemId !== targetId || itemValue !== +targetValue) {
      setAlert({ message: text[localStorage.getItem("Lang")].alertText.dontModify, type: "danger" });
      return;
    }

    const foundItem = mainArr.find(object => object.id === itemId);

    if (!foundItem || (foundItem && foundItem.value !== itemValue) || (foundItem && foundItem.isActive === false)) {
      setAlert({ message: text[localStorage.getItem("Lang")].alertText.invalid, type: "danger" });
      return;
    }

    setChosenArr([...chosenArr, foundItem]);
    document.querySelector(`#${itemId}`).classList.add("selected");
  }

  const saveGame = (cellData) => {
    localStorage.setItem("savedData", JSON.stringify(cellData));
    localStorage.setItem("savedScore", JSON.stringify(score));
    setAlert({ message: text[localStorage.getItem("Lang")].alertText.saved, type: "success" });
  }

  const setBestScoreCookie = (name, user, value) => {
    let expires = "";
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (user + "+" + value || "") + expires + "; path=/";
  }

  const onSubmit = (event, playerName) => {
    event.preventDefault();

    setBestScoreCookie("bestTableScore", playerName, score);
    setBestScore({ user: playerName, point: score });
    setSubmitted(true);
  }

  const startNewGame = () => {
    setSubmitted(false);
    setScore(0);
    setChosenArr([]);
    setisFinished(false);
    setMainArr(createNumbers());
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
    <div className={`app ${mobileWork === "true" ? "mobile" : ""} `}>
      {mobileWork && mobileWork === "false" ? (
        <div id="mobilePopUp">
          <div className="mobilePopUp-inner">
            <h1>{text[localStorage.getItem("Lang")].responsive.rotate}</h1>
            <img src='../../img/rotate_screen.gif' alt="rotate screen" />
          </div>
        </div>
      ) : mobileWork && mobileWork === "uncertain" ? (
        <div id="mobilePopUp">
          <div className="mobilePopUp-inner">
            <h1>{text[localStorage.getItem("Lang")].responsive.deviceQuestion}</h1>
            <div className="mobilePopUp-twoCol">
              <div className="mobilePopUp-col">
                <h2 style={{ whiteSpace: "pre-line" }}>{text[localStorage.getItem("Lang")].responsive.computer}</h2>
                <p>{text[localStorage.getItem("Lang")].responsive.zoomOut}</p>
                <img className='pic' src='../../img/zoom-out.png' alt="rotate screen" />
              </div>
              <div className="mobilePopUp-col">
                <h2 style={{ whiteSpace: "pre-line" }}>{text[localStorage.getItem("Lang")].responsive.tablet}</h2>
                <p>{text[localStorage.getItem("Lang")].responsive.rotate}</p>
                <img src='../../img/rotate_screen.gif' alt="rotate screen" />
              </div>
            </div>
          </div>
        </div>
      ) : null
      }
      {mobileWork !== "uncertain" && mobileWork !== "false" ? (
        <Link to={"/"} className="linkBack"><MdArrowBack className='svgIcons' /> {text[localStorage.getItem("Lang")].wrongUrl.backBtn}</Link>
      ) : null}
      {mobileWork !== "uncertain" && mobileWork !== "false" ? (
        <div id="mainContainer">
          <div id="scoreContainer">
            <span className="scoreSpan">{text[localStorage.getItem("Lang")].game.yourScore} {score}</span>
            <span className="scoreSpan">{text[localStorage.getItem("Lang")].game.bestScore} {bestScore.point > 0 ? `${bestScore.user} (${bestScore.point})` : "-"}</span>
          </div>
          <Zoom cascade duration={1000}>
            <div id="gridTable" className={`${isFinished ? "finished" : ""} `}>
              {mainArr &&
                mainArr.map((item, index) => (
                  <div key={index} id={item.id} data-order={item.orderIndex} className={`gridCell ${item.isActive === true ? "" : "disabled"} `} onClick={(e) => choseGrid(item.id, item.value, e.target.id, e.target.innerText)}>{item.value}</div>
                ))
              }
            </div>
          </Zoom>
          <div id="buttonContainer">
            {isFinished ?
              <div id="finishContainer">
                {!submitted && (bestScore.point === 0 || score <= bestScore.point) ?
                  <form onSubmit={(e) => onSubmit(e, playerName)}>
                    <input type="text" id="nameInput" placeholder={text[localStorage.getItem("Lang")].game.placeholder} minLength={2} value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                    <button type="submit" id="submitBtn"><GoChecklist className='svgIcons' /> {text[localStorage.getItem("Lang")].game.submit}</button>
                  </form>
                  :
                  null
                }
                <button type="button" className="actionBtn" id="newGameBtn" onClick={() => startNewGame()}><TiTick className='svgIcons' /> {text[localStorage.getItem("Lang")].game.newGame}</button>
              </div>
              :
              <>
                <button type="button" className="actionBtn" id="newNumBtn" onClick={() => addToGrid(mainArr)}><AiOutlineAppstoreAdd className='svgIcons' /> {text[localStorage.getItem("Lang")].game.addNums}</button>
                <button type="button" className="actionBtn" id="resetBtn" onClick={() => resetGrid()}><RxReset className='svgIcons' /> {text[localStorage.getItem("Lang")].game.newGame}</button>
                <button type="button" className="actionBtn" id="hintBtn" onClick={() => giveHint(mainArr, setAlert, setisFinished, setScore)}><TbZoomQuestion className='svgIcons' /> {text[localStorage.getItem("Lang")].game.hint}</button>
                <button type="button" className="actionBtn" id="saveBtn" onClick={() => saveGame(mainArr)}><RiSave3Fill className='svgIcons' /> {text[localStorage.getItem("Lang")].game.save}</button>
              </>
            }
          </div>
        </div>
      ) : null}
      {
        alert.message.length > 0 &&
        <Alert message={alert.message} type={alert.type} />
      }
    </div >
  );
}

export default App;