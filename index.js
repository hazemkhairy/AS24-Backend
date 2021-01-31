const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./app/routes.js')

const app = express();
const port = process.env.port || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//will be needed if we created frontend
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
})
//my routes
app.use(routes);



app.listen(port, () => {
    console.log(`App is listing on port ${port}`);
})
