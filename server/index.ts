import express from 'express';
import router from './router';
import cors from 'cors';

const app: express.Application = express();
app.use(
    cors({
        origin: '*'
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: number = 8000;

app.get('/', (_req, _res) => {
    _res.send('Welcome to english Score');
});

app.use(router);
// Server setup
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
