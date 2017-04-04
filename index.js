const port = require('./config').port;
const app = require('./app');

app.listen(port, () => {
    // TODO: add logging
    console.log(`server is listening on port ${port}`);
});