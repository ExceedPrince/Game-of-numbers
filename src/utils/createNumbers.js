import { v4 as uuidv4 } from 'uuid';
import { generateRandomLetter } from './generateRandomLetter';

export const createNumbers = () => {
	const gridNum = 30;
	const array = [];

	for (let index = 0; index < gridNum; index++) {
		const randomNumber = Math.ceil(Math.random() * 9);
		const object = { id: generateRandomLetter() + uuidv4(), orderIndex: index, isActive: true, value: randomNumber };
		array.push(object);
	}

	return array;
};