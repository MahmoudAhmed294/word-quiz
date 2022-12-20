import { Router } from 'express';
import { words } from '../controller/words.controller';
import { rank } from '../controller/rank.controller';

const router =  Router();

router.get('/words', words);
router.post('/rank', rank);


export default  router