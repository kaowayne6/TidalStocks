const app = require('./index');
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
    console.log("Server app listening on port 3001!");
});

module.exports = server;