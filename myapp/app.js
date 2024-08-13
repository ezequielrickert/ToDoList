const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());

const elementRouter = require('./routes/listElement');

app.use("/listElement", elementRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});