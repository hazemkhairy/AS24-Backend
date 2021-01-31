const routes = require('express').Router();
const { generateReports } = require('./controller');
routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

routes.post('/generateReports', generateReports)

module.exports = routes;