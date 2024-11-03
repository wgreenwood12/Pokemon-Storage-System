import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello de');
});

app.get('/api/greeting', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the backend!!!' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
