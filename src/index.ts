import {app} from "./app";
import {runDb} from "./db/db";


const port = 3000;

const startApp = async () => {
    await runDb()
    console.log('db is successful connected')

    return app.listen(port, () => {
        console.log(`The app is listening on port ${port}`);
    });
};

startApp();