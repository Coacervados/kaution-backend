import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './modules/routers';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

routes(app);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
