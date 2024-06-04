import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { initMongoDb } from './db/initMongoDB.js';



const PORT = env(ENV_VARS.PORT, 3000);

export const startServer = () => {
    initMongoDb();
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello world!',
        });
    });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Somthing went wrong',
            error: err.message,
        })
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

// export const ENV_VARS = {
//     PORT: 'PORT',
// };

// export const MONGO_VARS = {
//     MONGODB_USER: 'MONGODB_USER',
//     MONGODB_PASSWORD: 'MONGODB_PASSWORD',
//     MONGODB_URL: 'MONGODB_URL',
//     MONGODB_DB: 'MONGODB_DB',
// };

