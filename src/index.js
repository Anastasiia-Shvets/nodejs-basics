import { initMongoDb } from "./db/initMongoDB";
import { startServer } from "./server";

const bootstrap = async () => {
    await initMongoDb()
    startServer();
};
bootstrap();
