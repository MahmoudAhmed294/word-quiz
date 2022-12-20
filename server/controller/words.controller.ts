import { Request, Response } from 'express';
import { wordList } from '../data.json';

type WordType = {
    id: number;
    word: string;
    pos: string;
};

/**
 * this function is do 3 steps to get the words
 * 1. it take the data from json and shuffle
 * 2. it take one random type   from  shuffle array to make sure that we have
 * least on of this type [noun , adverb ,adjective ,verb]
 * 3.take a different 6 item from this shuffle array that is not repeatable and put all these value in newWordsList
 *
 */
export const words = async (req: Request, res: Response) => {
    try {
        // this variable will take the data and shuffle the array
        const words: WordType[] = wordList.sort(() => Math.random() - 0.5);

        // this object is for ignore duplicates
        const wordsPos: any = {};
        // the new array with new 10 object
        const newWordsList: WordType[] = [];
        for (let i = 0; i < words.length; i++) {
            // if the object have id equal to  id from the item from the array don't enter
            if (!wordsPos[words[i].pos]?.id) {
                wordsPos[words[i].pos] = words[i];
                newWordsList.push(words[i]);
            }

            // if wordsPos have the same item do not enter and the newWordsList less than 10 items
            if (wordsPos[words[i].pos].id !== words[i].id && newWordsList.length < 10) {
                newWordsList.push(words[i]);
            }
        }

        // send the value
        res.send(newWordsList).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
};
