import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { wordsApi } from '../api/index';
import quizSlice from './quizSlice';

const store = configureStore({
    reducer: {
        quiz:quizSlice,
        [wordsApi.reducerPath]: wordsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wordsApi.middleware)
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
