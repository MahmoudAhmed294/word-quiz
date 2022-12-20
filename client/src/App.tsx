import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WordsQuestion from './pages/WordsQuestion';
import Score from './pages/Score';
import StartQuiz from './pages/StartQuiz';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartQuiz />} />
                <Route path="/quiz" element={<WordsQuestion />} />
                <Route path="/score" element={<Score />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
