const express = require('express');
let Pool = require('pg').Pool;
let cors = require('cors');

let bodyParser = require('body-parser');

const server = express();
let config = {
    host: 'localhost',
    user: 'dockerperson' ,
    password: 'docker' ,
    database: 'tasks'
};


let pool = new Pool(config);

server.set('port', (8080));
server.use(cors());
server.use(bodyParser.json({type: 'application/json'}));
server.use(bodyParser.urlencoded({extended: true}));

server.get('/api', async (req, res) => {
    try {
        let response = await pool.query('select * from todo');
        res.json(response.rows);
    } catch(err) { 
        res.status(500);
        res.json({error: err, message: 'try again later'});
    }
});


server.post('/api', async (req, res) => {
    let task = req.body.task,
        completed = req.body.completed;

    if ((task == undefined) || (completed == undefined)) {
        res.status(400);
        res.json({error: 'Missing parameter(s), all need to be specified'});
    } else {
        try {
            let response = await pool.query('insert into todo values($1,$2)', [task, completed]);
            res.json({status: 'inserted'});
        } catch(err) {
            res.status(500);
            res.json({error: 'DB error'});
        }
    }
});

server.delete('/api', async (req, res) => {
    let task = req.body.task,
        completed = req.body.completed;
    if((completed == undefined) || (task == undefined)) {
        res.json(400);
        res.json({error: 'Missing parameter(s), all need to be specified'});
    } else {
        try {
            let response = await pool.query('delete from todo where task = $1 and completed = $2', [task, completed]);
            res.json({status: 'deleted'});
        } catch (err) {
            res.status(500);
            res.json({error: 'DB error'});
        }
    }
});

server.post('/api/complete', async (req, res) => {
    let task = req.body.task,
        completed = req.body.completed;
    let newCompleted = (() => {
        if(completed == 'true') {
            return 'false';
        } else {
            return 'true';
        }
    })();

    if(task == undefined) {
        res.json(400);
        res.json({error: 'Missing parameter(s), all need to be specified'});
    } else {
        try {
            let response = await pool.query('update todo set completed = $2 where task = $1', [task, newCompleted]);
            res.json({status: 'updated'});
        } catch(err) {
            console.log(err);
            res.status(500);
            res.json({error: 'DB error'});
        }
    }
});


server.listen(server.get('port'), () => {
});