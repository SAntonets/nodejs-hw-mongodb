import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from '../src/utils/env.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';





const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {

    const app = express();

    app.use(express.json());
    app.use(cors());

    // app.use(
    //    pino({
    //        transport: {
    //        target: 'pino-pretty',
    //        },
    //    }),
    // );

    app.get('/', (req, res) => {
        res.json({
        message: 'Hello World!',
        });
    });

    app.use(router)


    app.use(errorHandler);

    app.use('*', notFoundHandler);


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);})
    }




