import { v4 as uuidv4 } from 'uuid';
import { generateRandomLetter } from './generateRandomLetter';

export const temporaryTestArray = [
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 0, isActive: true, value: 4 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 1, isActive: true, value: 3 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 2, isActive: true, value: 9 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 3, isActive: true, value: 1 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 4, isActive: true, value: 5 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 5, isActive: true, value: 5 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 6, isActive: true, value: 1 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 7, isActive: true, value: 7 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 8, isActive: true, value: 9 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 9, isActive: true, value: 4 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 10, isActive: true, value: 4 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 11, isActive: true, value: 3 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 12, isActive: true, value: 2 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 13, isActive: true, value: 8 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 14, isActive: true, value: 9 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 15, isActive: true, value: 1 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 16, isActive: true, value: 8 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 17, isActive: true, value: 1 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 18, isActive: true, value: 4 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 19, isActive: true, value: 2 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 20, isActive: true, value: 7 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 21, isActive: true, value: 2 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 22, isActive: true, value: 9 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 23, isActive: true, value: 3 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 24, isActive: true, value: 6 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 25, isActive: true, value: 3 },
	{ id: generateRandomLetter() + uuidv4(), orderIndex: 26, isActive: true, value: 4 }
]