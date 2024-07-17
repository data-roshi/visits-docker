const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({
    // the service name in the docker-compose file (same network, docker will resolve)
    host: 'redis-server'
    // port: 6379
});
client.set('visits', 0);

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send(`Number of visits is ${visits}`);
        client.set('visits', parseInt(visits) + 1);
    });
});

app.get('/fail', (req, res) => {
    process.exit(0);
});

const port = 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});