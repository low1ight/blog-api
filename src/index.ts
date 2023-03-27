import {app} from "./app";


const port = 3000;

const startApp = async () => {
    return app.listen(port, () => {
        console.log(`The app is listening on port ${port}`);
    });
};

startApp();