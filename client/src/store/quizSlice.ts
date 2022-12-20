import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { WordType } from '../api/types';

interface QuizType {
    isAnswer: boolean;
    currentQuestion: number;
    score: number;
    words: WordType[];
}
const initialState: QuizType = {
    isAnswer: false,
    currentQuestion: 0,
    score: 0,
    words: []
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        /** to set the array of words that is come from server */
        setWords: (state, action: PayloadAction<WordType[]>) => {
            state.words = action.payload;
        },

        /** to stop answer twice  */
        toggleIsAnswer: (state) => {
            state.isAnswer = !state.isAnswer;
        },
        
        /** go to next Question for word  */
        nextQuestion: (state) => {
            state.isAnswer = false;
            state.currentQuestion += 1;
        },
        /** get total score  */
        setScore: (state) => {
            state.score += 1 * 10;
        },
        /** reset all previous value  */
        tryAgain: (state) => {
            state.isAnswer = false;
            state.currentQuestion = 0;
            state.score = 0;
            state.words = [];
        }
    }
});

export const { setScore, nextQuestion, toggleIsAnswer, setWords, tryAgain } = quizSlice.actions;

export const allWords = (state: RootState) => state.quiz.words;
export const currentQuestionNumber = (state: RootState) => state.quiz.currentQuestion;
export const getIsAnswer = (state: RootState) => state.quiz.isAnswer;
export const getCurrantScore = (state: RootState) => state.quiz.score;

export default quizSlice.reducer;
