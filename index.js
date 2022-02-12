const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const http = require('http');

/**

Hi

Your account number is: 590593

Your new database is now ready to use.

To connect to your database use these details;

Host: sql6.freesqldatabase.com
Database name: sql6472060
Database user: sql6472060
Database password: vAPUp8eHPs
Port number: 3306

*/

const server = require('./server');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ask',
    password: 'ask',
    port: 3306,
    database: 'ask'
});
connection.connect();
const port = process.env.PORT || 3000;

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(server(connection));
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});