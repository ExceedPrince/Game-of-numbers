export const compareSearch = (sortedArray, mainArray, setChosenArr, setMainArr, setScore) => {
	const tempArr = mainArray;
	let ez = false;

	//horizontal search
	for (let i = sortedArray[0].orderIndex + 1; i <= sortedArray[1].orderIndex; i++) {
		if (tempArr[i].isActive === true) {
			if (tempArr[i].id === sortedArray[1].id) {
				sortedArray[0].isActive = false;
				sortedArray[1].isActive = false;
				tempArr.forEach(element => {
					if (element.id === sortedArray[0].id || element.id === sortedArray[1].id) {
						element.isActive = false;
						document.querySelector(`#${element.id}`).classList.remove("selected");
					}
				});

				setChosenArr([]);
				//setMainArr(tempArr);
				ez = true;
				break;
			} else {
				setTimeout(() => {
					sortedArray.forEach(element => {
						document.querySelector(`#${element.id}`).classList.remove("selected");
					})
					setChosenArr([]);
				}, 200);
				break;
			}
		}
	}

	//vertical search
	for (let o = sortedArray[0].orderIndex + 10; o <= sortedArray[1].orderIndex; o += 10) {
		if (tempArr[o].isActive === true) {
			if (tempArr[o].id === sortedArray[1].id) {
				sortedArray[0].isActive = false;
				sortedArray[1].isActive = false;
				tempArr.forEach(element => {
					if (element.id === sortedArray[0].id || element.id === sortedArray[1].id) {
						element.isActive = false;
						document.querySelector(`#${element.id}`).classList.remove("selected");
					}
				});

				setChosenArr([]);
				//setMainArr(tempArr);
				ez = true;
				break;
			} else {
				setTimeout(() => {
					sortedArray.forEach(element => {
						document.querySelector(`#${element.id}`).classList.remove("selected");
					})
					setChosenArr([]);
				}, 200);
				break;
			}
		}
	}

	//search - left-down
	for (let u = sortedArray[0].orderIndex + 9; u <= sortedArray[1].orderIndex; u += 9) {
		if (tempArr[u].isActive === false && tempArr[u].orderIndex % 10 === 0) {
			setTimeout(() => {
				sortedArray.forEach(element => {
					document.querySelector(`#${element.id}`).classList.remove("selected");
				})
				setChosenArr([]);
			}, 200);
			break;
		}
		if (tempArr[u].isActive === true) {
			if (tempArr[u].id === sortedArray[1].id && sortedArray[0].orderIndex % 10 !== 0) {
				sortedArray[0].isActive = false;
				sortedArray[1].isActive = false;
				tempArr.forEach(element => {
					if (element.id === sortedArray[0].id || element.id === sortedArray[1].id) {
						element.isActive = false;
						document.querySelector(`#${element.id}`).classList.remove("selected");
					}
				});

				setChosenArr([]);
				//setMainArr(tempArr);
				ez = true;
				break;
			} else {
				setTimeout(() => {
					sortedArray.forEach(element => {
						document.querySelector(`#${element.id}`).classList.remove("selected");
					})
					setChosenArr([]);
				}, 200);
				break;
			}
		}

	}

	//search - right-down
	for (let a = sortedArray[0].orderIndex + 11; a <= sortedArray[1].orderIndex; a += 11) {
		if (tempArr[a].isActive === false && (tempArr[a].orderIndex + 1) % 10 === 0) {
			setTimeout(() => {
				sortedArray.forEach(element => {
					document.querySelector(`#${element.id}`).classList.remove("selected");
				})
				setChosenArr([]);
			}, 200);
			break;
		}
		if (tempArr[a].isActive === true) {
			if (tempArr[a].id === sortedArray[1].id && (sortedArray[0].orderIndex + 1) % 10 !== 0) {
				sortedArray[0].isActive = false;
				sortedArray[1].isActive = false;
				tempArr.forEach(element => {
					if (element.id === sortedArray[0].id || element.id === sortedArray[1].id) {
						element.isActive = false;
						document.querySelector(`#${element.id}`).classList.remove("selected");
					}
				});

				setChosenArr([]);
				//setMainArr(tempArr);
				ez = true;
				break;
			} else {
				setTimeout(() => {
					sortedArray.forEach(element => {
						document.querySelector(`#${element.id}`).classList.remove("selected");
					})
					setChosenArr([]);
				}, 200);
				break;
			}
		}
	}

	if (ez === true) {
		setScore(prev => prev + 1);
		return sortedArray;
	}
};