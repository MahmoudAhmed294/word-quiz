import { Button, Paper, Progress, Title } from '@mantine/core';
import { Container, Center, Text } from '@mantine/core';
import Answer from '../components/Answer';
import { useEffect, useState } from 'react';
import {
    allWords,
    currentQuestionNumber,
    getIsAnswer,
    getCurrantScore,
    nextQuestion
} from '../store/quizSlice';
import { useNavigate } from 'react-router-dom';
import { WordType } from '../api/types';
import { useAppSelector, useAppDispatch } from '../store/useStore';

const WordsQuestion = () => {
    const answersOptions = ['noun', 'adverb', 'adjective', 'verb']; // the options of all answers
    const wordList = useAppSelector(allWords); // list of words
    const currentQuestion = useAppSelector(currentQuestionNumber);
    const isAnswer = useAppSelector(getIsAnswer);
    const score = useAppSelector(getCurrantScore);
    const dispatch = useAppDispatch();
    const [question, setQuestion] = useState<WordType>();
    const navigate = useNavigate();

    useEffect(() => {
        // to get the current question word
        setQuestion(wordList[currentQuestion]);
    }, [currentQuestion]);

    useEffect(() => {
        // if no data is available then navigate to home to start quiz
        if (wordList.length === 0) {
            navigate('/');
        }
    }, [wordList]);

    /**
     ** this function will get the next question if number of questions = 10 then navigate to score
     */
    const handelNextQuestion = () => {
        if (currentQuestion !== 9) {
            dispatch(nextQuestion());
        } else {
            navigate('/score');
        }
    };
    return (
        <Container size="xs" sx={{ height: '90vh' }}>
            <Progress value={score} striped animate mt={58} />
            <Center sx={{ height: '100%', flexDirection: 'column' }}>
                <Paper withBorder radius="md" p="md" sx={{ width: '100%' }}>
                    <Text align="center">Question {currentQuestion + 1}/10</Text>
                    <Title align="center" order={4} color="gray" mt={16}>
                        The word is{' '}
                    </Title>
                    <Title align="center" order={2}>
                        {question?.word}
                    </Title>
                    {/* if question available show the answer components */}
                    {question &&
                        answersOptions.map((value, index) => (
                            <Answer
                                word={value}
                                pos={question.pos}
                                isAnswered={isAnswer}
                                key={index}
                            />
                        ))}
                </Paper>
                <Button
                    my={32}
                    size="md"
                    color="orange"
                    disabled={!isAnswer}
                    onClick={handelNextQuestion}
                >
                    {currentQuestion === 9 ? 'Finish' : 'Next Question'}
                </Button>
            </Center>
        </Container>
    );
};

export default WordsQuestion;
