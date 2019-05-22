const express = require('express');
const compression = require('compression');
const fetch = require('node-fetch');
// Create the express server
const server = express();

const CMC_KEY = '3431a251-10c5-4ed0-b531-eb619c74eef7';
const CMC_URL = 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency';

const Cache = {};

server.use(compression());
server.get('/api/coins', async (request, response) => {
    if (Cache.list !== undefined) {
        response.send(Cache.list);
    } else {
        const url = `${CMC_URL}/listings/latest?start=1&limit=30&convert=USD`;
        const options = {
            headers: {
                'X-CMC_PRO_API_KEY': CMC_KEY,
                'Accept': 'application/json',
            }
        };
        const fetched = await fetch(url, options);
        // Cache the fetched data
        Cache.list = await fetched.json();
        // Just show me
        response.send(Cache.list);
    }
});

server.get('/api/history/:id', async (request, response) => {
    const { id } = request.params;
    if (Cache[id] !== undefined) {
        response.send(Cache[id]);
    } else {
        const url = `${CMC_URL}/quotes/historical?id=${id}&count=100&interval=10m`;
        const options = {
            headers: {
                'X-CMC_PRO_API_KEY': CMC_KEY,
                'Accept': 'application/json',
            }
        };
        const fetched = await fetch(url, options);
        // Cache the fetched data
        Cache[id] = await fetched.json();
        // Just show me
        response.send(Cache[id]);
    }
});

const port = process.env.PORT || 3400;
server.listen(port, () => `running on port ${port}`);
server.use(express.static(__dirname + '/public'));
