export const rulesObject = [
	{
		title: "What's the goal?",
		imgSrc: "rule_01.png",
		description: `Your main goal is picking pairs of numbers for making the whole table empty. \n\nYou can create pairs if the numbers are the same or if their sum is equal to 10!`
	},
	{
		title: "Picking horizontally",
		imgSrc: "rule_02.png",
		description: "You can create pairs if the correct numbers are in the same row. But if there is at least one active number between them, you can't create pairs! \n\nBut if every number between your chosen ones are non-active numbers, then you can create pairs by skipping those non-active numbers!"
	},
	{
		title: "Picking horizontally, but from different rows",
		imgSrc: "rule_03.png",
		description: "You can create pairs \"horizontally\" if your first number is the last active number in that row, and your next compatible number is the first active number in another row. \n\nIf there is at least one active number between them, you can't create pairs! But if every number between your chosen ones are non-active numbers, then you can create pairs by skipping those non-active numbers (or rows as well)!"
	},
	{
		title: "Picking vertically",
		imgSrc: "rule_04.png",
		description: "You can create pairs if the correct numbers are in the same column. But if there is at least one active number between them, you can't create pairs! \n\nBut if every number between your chosen ones are non-active numbers, then you can create pairs by skipping those non-active numbers!"
	},
	{
		title: "Picking diagonally",
		imgSrc: "rule_05.png",
		description: "You can create pairs if the correct numbers are placed diagonally. But if there is at least one active number between them, you can't create pairs! \n\nBut if every number between your chosen ones are non-active numbers, then you can create pairs by skipping those non-active numbers!"
	},
	{
		title: "Adding new numbers",
		imgSrc: "rule_06.png",
		description: "If you're out of options, then you can click on the \"Add Numbers\" for adding the copies of all active numbers to the table."
	},
	{
		title: "Asking for help",
		imgSrc: "rule_07.png",
		description: "If you're uncertain about your next step, you can ask for some help by clicking on the \"Hint\" button."
	},
	{
		title: "Starting new game",
		imgSrc: "rule_08.png",
		description: "You can exit your currect game anytime by clicking on the \"New Game\" button and start a new one."
	},
	{
		title: "Saving the game",
		imgSrc: "rule_09.png",
		description: "You can save your current game anytime but there's only one slot to use for saving! \n\nThe next time you can choose whether to continue your saved game or start a new one. Whatever you choose your saved data will be removed and you can't load it anymore!"
	},
	{
		title: "Getting points",
		imgSrc: "rule_10.png",
		description: "You receive points for pairing numbers (1), adding new numbers (3) and asking for help (5). \n\nTry to collect as little points as possible to be the best on this device!"
	},
	{
		title: "Refreshing Scores",
		imgSrc: "rule_11.png",
		description: "You can erase the best score by clicking on the \"Delete the scores\" button. \n\nGood luck for calling it forth 😄"
	}
];