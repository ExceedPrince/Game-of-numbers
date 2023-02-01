import text from "../utils/translations.json";

export const giveHint = (mainArray, setAlert, setisFinished, setScore) => {
	const hintArr = mainArray;
	const selectedArr = [];

	hintArr.forEach(element => {
		if (element.isActive === true) {
			//search horizontally
			for (let index = element.orderIndex + 1; index < hintArr.length; index++) {
				if (hintArr[index].isActive === true) {
					if (element.value === hintArr[index].value || element.value + hintArr[index].value === 10) {
						const miniArr = [element, hintArr[index]]
						selectedArr.push(miniArr);

						break;
					} else {
						break;
					}
				}
			}

			//search vertically
			for (let index = element.orderIndex + 10; index < hintArr.length; index += 10) {
				if (hintArr[index].isActive === true) {
					if (element.value === hintArr[index].value || element.value + hintArr[index].value === 10) {
						const miniArr = [element, hintArr[index]]
						selectedArr.push(miniArr);

						break;
					} else {
						break;
					}
				}
			}

			//search diagonally down-left
			for (let index = element.orderIndex + 9; index < hintArr.length; index += 9) {
				if (hintArr[index].isActive === false && hintArr[index].orderIndex % 10 === 0) {
					break;
				}
				if (hintArr[index].isActive === true) {
					if (index % 9 !== 0 && element.orderIndex % 10 !== 0 && hintArr[index].orderIndex % 10 !== 0 && (element.value === hintArr[index].value || element.value + hintArr[index].value === 10)) {
						const miniArr = [element, hintArr[index]]
						selectedArr.push(miniArr);

						break;
					} else {
						break;
					}
				}
			}

			//search diagonally down-right
			for (let index = element.orderIndex + 11; index < hintArr.length; index += 11) {
				if (hintArr[index].isActive === false && (hintArr[index].orderIndex + 1) % 10 === 0) {
					break;
				}
				if (hintArr[index].isActive === true) {
					if (index % 10 !== 0 && (element.orderIndex + 1) % 10 !== 0 && hintArr[index].orderIndex % 10 !== 0 && (element.value === hintArr[index].value || element.value + hintArr[index].value === 10)) {
						const miniArr = [element, hintArr[index]]
						selectedArr.push(miniArr);

						break;
					} else {
						break;
					}
				}
			}
		}
	});

	if (selectedArr.length > 0) {
		const selectedIndex = [Math.floor(Math.random() * selectedArr.length)];

		selectedArr[selectedIndex].forEach(item => {
			const hintedElement = document.querySelector(`#${item.id}`);
			hintedElement.classList.add("hinted");

			setTimeout(() => {
				hintedElement.classList.remove("hinted");
			}, 3000);
		})
	} else {
		setAlert({ message: text[localStorage.getItem("Lang")].alertText.noHint, type: "danger" });
	}

	setScore(prev => prev + 5);
}