import { errorHandler } from './middlewares/errorHandler';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './modules/routers';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(errorHandler);

routes(app);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
