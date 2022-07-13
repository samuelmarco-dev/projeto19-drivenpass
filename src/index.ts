import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

import routes from './routers/index.js';
import handleError from './middlewares/errorMIddleware.js';

const app = express();
app.use(json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(routes);
app.use(handleError);

const port = +process.env.PORT || 4000;
app.listen(port, ()=> {
    console.log(chalk.green(`Server is running on port ${port}`));
});
