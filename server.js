const express = require('express');

function createRouter(db) {
    const router = express.Router();
    const owner = '';
    // the routes are defined here
    router.get("/", function(request, result) {
        result.send("Hello World");
    });

    router.post('/register', (req, res, next) => {
        var data = req.body;
        console.log("Data :=" + data);
        db.query(
            'Insert into users SET ?', data,
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json(error);
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Entering Data" + JSON.stringify(results));
                }
            }
        );
    });

    router.post('/upload', (req, res, next) => {
        var data = req.body;
        console.log("Data :=" + JSON.stringify(data), Object.keys(data).length);
        for (var i = 0; i < Object.keys(data).length; i++) {
            // console.log("Data :=" + data[i]);
            db.query(
                'Insert into jsonDetails SET ?', data[i],
                (error, results) => {
                    if (error) {
                        console.error(error);
                        // res.status(500).json(error);
                    } else {
                        // res.status(200).json({ status: 'ok' });
                        // res.status(200).json(results);
                        console.log("Entering Data" + JSON.stringify(results));
                    }
                }
            );
        }
        res.status(200).json({ status: 'ok' });
    });

    router.get('/details', (req, res, next) => {
        db.query(
            'Select * from jsonDetails',
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved Booking Data" + JSON.stringify(results));
                }
            }
        );
    });

    router.get('/login/:email/:password', (req, res, next) => {
        var email = req.params.email;
        var password = req.params.password;
        console.log("Data :=" + email, password);
        db.query(
            'Select * from users where email = ? AND password = ?', [email, password],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'Error' });
                } else {
                    // res.status(200).json({ status: 'ok' });
                    res.status(200).json(results);
                    console.log("Retrieved User Details :: " + JSON.stringify(results));
                }
            }
        );
    });

    return router; 
}
module.exports = createRouter;