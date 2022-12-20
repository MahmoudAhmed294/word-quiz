import { Request, Response } from 'express';
import { scoresList } from '../data.json';


/**
 * this function is take score from front end          
 * 
 * after that it filter to get the lower score for score we send it  
 * 
 * division lower score length on score list * 100 and formats the number to nearest number
 */
export const rank = async (req: Request, res: Response) => {
    const { score } = req.body;
    let lowerScore = scoresList.filter((value) => value < score);

    res.json(((lowerScore.length / scoresList.length) * 100).toFixed(2));
};
