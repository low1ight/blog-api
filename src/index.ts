import {app} from "./app";
import {runDb} from "./db/db";
import ngrok from "ngrok";

const port = 3000;


async function startNgrok() {
    const url = await ngrok.connect({addr: 3000,authtoken: '2OPMnc3FfbEdG34Y9mqTx8kfozH_55JBj7CAq4oAGnkj5hGfX'});
    console.log('ngrok url:', url);
}

const startApp = async () => {
    await runDb()
    console.log('db is successful connected')

    await startNgrok()


    return app.listen(port, () => {
        console.log(`The app is listening on port ${port}`);
    });
};

startApp();