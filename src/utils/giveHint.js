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
			for (let index = element.orderIndex + 9; index < hintArr.length; index += 9) {
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
			for (let index = element.orderIndex + 8; index < hintArr.length; index += 8) {
				if (hintArr[index].isActive === false && (hintArr[index].orderIndex + 1) % 9 === 0) {
					break;
				}
				if (hintArr[index].isActive === true) {
					if (index % 8 !== 0 && element.orderIndex % 9 !== 0 && (hintArr[index].orderIndex + 1) % 9 !== 0 && (element.value === hintArr[index].value || element.value + hintArr[index].value === 10)) {
						const miniArr = [element, hintArr[index]]
						selectedArr.push(miniArr);

						break;
					} else {
						break;
					}
				}
			}

			//search diagonally down-right
			for (let index = element.orderIndex + 10; index < hintArr.length; index += 10) {
				if (hintArr[index].isActive === false && hintArr[index].orderIndex % 9 === 0) {
					break;
				}
				if (hintArr[index].isActive === true) {
					if (index % 9 !== 0 && (element.orderIndex + 1) % 9 !== 0 && hintArr[index].orderIndex % 9 !== 0 && (element.value === hintArr[index].value || element.value + hintArr[index].value === 10)) {
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
		setAlert({ message: "You're out of options! Ask for more numbers or start a new game!", type: "danger" });
	}

	setScore(prev => prev + 5);
}