import { Button, Container, Stack, Title } from '@mantine/core';
import { useGetWordsMutation } from '../api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setWords } from '../store/quizSlice';
import { useAppDispatch } from '../store/useStore';

type Props = {};

const Start = (props: Props) => {
    const [getWords, { data, isLoading, error }] = useGetWordsMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /** get the words list from server */
    const handleStartQuiz = () => {
        getWords('');
    };

    useEffect(() => {
        // when data is available go to quiz page

        if (data) {
            dispatch(setWords(data));
            navigate('/quiz');
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    return (
        <Container size="xs">
            <Stack align="center" justify="center" sx={{ height: '90vh' }} spacing={16}>
                <Title color="white">Ready for the task?</Title>
                <Button px={48} size="md" onClick={() => handleStartQuiz()} loading={isLoading}>
                    Start
                </Button>
            </Stack>
        </Container>
    );
};

export default Start;
