import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { MdArrowBack } from "react-icons/md";

import text from "../utils/translations.json";

const Rules = () => {

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (document.cookie.indexOf("TableGameCookie=true") === -1 || !location.state || (location.state && !location.state.navigated)) {
			return navigate("/");
		}
	}, [])

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	return (
		<div id="rulesContainer">
			<Link to={"/"} className="linkBack"><MdArrowBack className='svgIcons' /> {text[localStorage.getItem("Lang")].wrongUrl.backBtn}</Link>
			<div id="rulesSlider">
				<h2>{text[localStorage.getItem("Lang")].rules.mainTitle}</h2>
				<Slider {...settings}>
					{text[localStorage.getItem("Lang")].rules.objects.map((item, index) => (
						<div id={`rule-${index}`} key={`rule-${index}`} className="ruleSlide">
							<h3>{item.title}</h3>
							<div className='two-col-slide'>
								<div className="imgContainer">
									<img src={`../../img/${item.imgSrc}`} alt={item.imgSrc} />
								</div>
								<div className="textContainer">
									<p>{item.description}</p>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	)
}


export default Rules;