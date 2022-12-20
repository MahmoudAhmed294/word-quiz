import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/useStore';
import { setScore, toggleIsAnswer } from '../store/quizSlice';

type Props = {
    pos: string;
    word: string;
    isAnswered: boolean;
};

enum AnswerStatus {
    correct = 'CORRECT',
    wrong = 'WRONG',
    noAnswer = 'NO_ANSWER'
}
/**
 * this Component most take 3 props
 * word ==> is the text will be displayed on of 4 options  (noun, adverb, adjective, verb)
 * pos ==> is the correct answer to check it with answer
 * isAnswered ==> after clicked on button  will be disabled
 */
const Answer = ({ word, pos, isAnswered }: Props) => {
    // this state in to save button answer status if answered or wrong answer or correct answer
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(AnswerStatus.noAnswer);
    const dispatch = useAppDispatch();
    // this variable is to change button background color if the user clicks on button depending on condition
    const ButtonColor =
        answerStatus === AnswerStatus.noAnswer
            ? 'cyan'
            : answerStatus === AnswerStatus.correct
            ? 'green'
            : answerStatus === AnswerStatus.wrong && 'red';

    // this Function is to check answer and send result to redux store
    const checkAnswer = () => {
        if (!isAnswered) {
            dispatch(toggleIsAnswer());
            if (pos === word) {
                setAnswerStatus(AnswerStatus.correct);
                dispatch(setScore())
            } else {
                setAnswerStatus(AnswerStatus.wrong);
            }
        }
    };
    useEffect(() => {
         if(!isAnswered) {
            setAnswerStatus(AnswerStatus.noAnswer);
        }
    }, [isAnswered]);

    return (
        <Button
            fullWidth
            variant="filled"
            size="md"
            my={16}
            color={`${ButtonColor}`}
            onClick={() => checkAnswer()}
        >
            {word}
        </Button>
    );
};

export default Answer;
