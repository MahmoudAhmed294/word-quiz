import { Button, Center, Container, Paper, Title } from '@mantine/core';
import { useGetScoreMutation } from '../api';
import { useAppSelector, useAppDispatch } from '../store/useStore';
import { getCurrantScore, tryAgain } from '../store/quizSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Score = (props: Props) => {
    const [getScore, { data}] = useGetScoreMutation();
    const score = useAppSelector(getCurrantScore);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (score) {
            // send the score to server
            getScore(score);
        }
    }, [score]);

    /**
     * to start new Quiz
     */
    const handleTryAgain = () => {
        dispatch(tryAgain());
        navigate('/');
    };

    return (
        <Container size="xs" sx={{ height: '90vh' }}>

            <Center sx={{ height: '100%' }}>
                <Paper withBorder radius="md" p="md" sx={{ width: '100%' }}>
                    <Title order={3} align="center">
                        score: {data}%
                    </Title>
                    <Button fullWidth color="blue" mt={16} onClick={handleTryAgain}>
                        Try Again
                    </Button>
                </Paper>
            </Center>
        </Container>
    );
};

export default Score;
